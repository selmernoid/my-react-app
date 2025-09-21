import { useState, useMemo } from 'react'
import { marked } from 'marked'
import './App.css'

function App() {
  const [input, setInput] = useState('')

  const htmlOutput = useMemo(() => {
    if (!input.trim()) {
      return '<p class="placeholder">Your markdown content will appear here...</p>'
    }
    return marked(input)
  }, [input])

  return (
    <div className="app">
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
            className="output markdown-content"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
