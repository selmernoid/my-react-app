# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server with hot module replacement
- `yarn build` - Build production bundle
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint on all files
- `yarn add <package>` - Add new dependencies

## Application Overview

This is a **Markdown Editor with PDF Export** - a React application that provides a split-screen markdown editing experience with real-time preview and PDF generation capabilities.

## Architecture

**Build System**: Uses Vite 7+ for fast development and optimized production builds. Uses Yarn for package management instead of npm for better dependency resolution.

**Core Features**:
- Split-screen layout (50/50 vertical division)
- Real-time markdown parsing and preview
- PDF export functionality with professional formatting
- GitHub-inspired markdown styling
- Dark/light mode compatibility

**React Setup**: Uses React 19+ with modern patterns:
- Function components with hooks (useState, useMemo, useRef)
- StrictMode enabled in development
- Entry point is `src/main.jsx` which renders the App component into the root div

**Dependencies**:
- `marked` (^16.3.0) - Markdown parsing and HTML generation
- `jspdf` (^3.0.3) - PDF document generation
- `html2canvas` (^1.4.1) - HTML to canvas conversion for PDF export

**Styling**: Component-specific CSS in `App.css` with comprehensive markdown styling. Includes special PDF export styles for print optimization. Supports both light and dark color schemes.

**Linting**: ESLint 9+ with modern flat config format. Configured for React with hooks and refresh plugins.

## Key Features

**Markdown Editor**:
- Left panel with multiline textarea
- Syntax examples in placeholder text
- Real-time input handling

**Live Preview**:
- Right panel with rendered markdown
- GitHub-inspired styling
- Supports: headings, bold, italic, lists, links, images, code blocks

**PDF Export**:
- Top-right corner "Export to PDF" button
- Generates high-quality A4 PDFs
- Multi-page support with proper page breaks
- Professional typography and formatting
- Auto-generated filenames with timestamps

## Key Files

- `src/main.jsx` - Application entry point and React root setup
- `src/App.jsx` - Main application component with markdown editor and PDF export
- `src/App.css` - Comprehensive styling including markdown and PDF export styles
- `src/index.css` - Global styles and layout
- `vite.config.js` - Build configuration
- `eslint.config.js` - Linting rules and setup
- `package.json` - Dependencies including PDF generation libraries

## Technical Implementation

**PDF Generation Process**:
1. Creates temporary DOM element with markdown HTML
2. Applies print-optimized styling
3. Converts to high-resolution canvas using html2canvas
4. Generates multi-page PDF using jsPDF
5. Downloads file with timestamp in filename

**Performance Optimizations**:
- `useMemo` for markdown parsing to prevent unnecessary re-renders
- Temporary DOM element cleanup for memory management
- Async/await pattern for non-blocking PDF generation