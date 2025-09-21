# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

## Architecture

This is a minimal React application built with Vite as the build tool and bundler. The architecture follows Vite's standard React template structure:

**Build System**: Uses Vite 7+ for fast development and optimized production builds. The build configuration is minimal and located in `vite.config.js`.

**React Setup**: Uses React 19+ with modern patterns:
- Function components with hooks (useState, etc.)
- StrictMode enabled in development
- Entry point is `src/main.jsx` which renders the App component into the root div

**Styling**: CSS modules approach with component-specific CSS files (`App.css`) and global styles (`index.css`). Supports both light and dark color schemes through CSS custom properties.

**Linting**: ESLint 9+ with modern flat config format in `eslint.config.js`. Configured for React with hooks and refresh plugins. Custom rule: unused variables starting with uppercase letters are ignored.

**Module System**: Uses ES modules throughout (`"type": "module"` in package.json). All imports/exports use ES6 syntax.

The application structure is flat with all components in `src/` and static assets split between `src/assets/` (bundled) and `public/` (copied as-is).

## Key Files

- `src/main.jsx` - Application entry point and React root setup
- `src/App.jsx` - Main application component with demo counter
- `vite.config.js` - Build configuration
- `eslint.config.js` - Linting rules and setup