import { useState, useMemo, useRef } from 'react'
import { marked } from 'marked'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const outputRef = useRef(null)

  const htmlOutput = useMemo(() => {
    if (!input.trim()) {
      return '<p class="placeholder">Your markdown content will appear here...</p>'
    }
    return marked(input)
  }, [input])

  const exportToPDF = async () => {
    if (!input.trim()) {
      alert('Please enter some markdown content to export')
      return
    }

    setIsExporting(true)

    try {
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = htmlOutput
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '800px'
      tempContainer.style.padding = '40px'
      tempContainer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      tempContainer.style.fontSize = '16px'
      tempContainer.style.lineHeight = '1.6'
      tempContainer.style.color = '#333'
      tempContainer.style.backgroundColor = '#fff'

      // Apply markdown styles to temp container
      tempContainer.className = 'markdown-content pdf-export'
      document.body.appendChild(tempContainer)

      // Generate canvas from the content
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight
      })

      // Remove temporary container
      document.body.removeChild(tempContainer)

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 190 // A4 width minus margins
      const pageHeight = 277 // A4 height minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 10 // Top margin

      // Add image to PDF (split across pages if needed)
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')
      const filename = `markdown-export-${timestamp}.pdf`

      // Download the PDF
      pdf.save(filename)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="app">
      <button
        className="export-btn"
        onClick={exportToPDF}
        disabled={isExporting}
      >
        {isExporting ? 'Exporting...' : 'Export to PDF'}
      </button>

      <div className="split-container">
        <div className="left-section">
          <textarea
            className="editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your markdown here...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- Unordered list item
- Another item

1. Ordered list item
2. Another item

[Link text](https://example.com)

`inline code`

```
code block
```"
          />
        </div>
        <div className="right-section">
          <div
            ref={outputRef}
            className="output markdown-content"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
