# Lululemon UI

A modern, accessible React component library for building beautiful user interfaces.

## Installation

```bash
npm install lululemon-ui
```

## Usage

```tsx
import { Button } from 'lululemon-ui'
import 'lululemon-ui/styles' // Import global styles

function App() {
  return (
    <Button variant="primary" size="medium">
      Click Me
    </Button>
  )
}
```

### Styles

The package includes a complete design system with:

- **Reset styles** - CSS reset for consistent cross-browser rendering
- **Typography** - Font definitions and text styles
- **Colors** - CSS custom properties for light/dark theme support
- **Spacing** - Consistent spacing variables
- **Shadows** - Shadow utilities for depth and elevation
- **Z-index** - Z-index scale for layering
- **Custom scrollbar** - Styled scrollbar for better UX

Import the styles at the root of your application:

```tsx
import 'lululemon-ui/styles'
```

All styles use CSS custom properties (CSS variables) that support both light and dark themes. The theme switches automatically based on user preference or can be manually controlled via the `data-theme` attribute on the root element.

## Available Components

- **Button** - A versatile button component with multiple variants and sizes

More components coming soon!

## Component Props

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `disabled` | `boolean` | `false` | Disable button interaction |

## Development

This project is organized into four main parts:

### 1. Components (`src/components/`)
The design components that are published to npm. This is the core library.

### 2. Styles (`src/styles/`)
Global styles and design tokens published to npm. Includes reset, colors, typography, spacing, and more.

### 3. Playground (`src/playground/`)
A development environment for testing components and creating page demos.

### 4. Debug (`src/debug/`)
Debug pages for troubleshooting and testing.

## Scripts

```bash
# Start development server (playground)
npm run dev

# Build the library for npm publishing
npm run build:lib

# Build the playground for deployment
npm run build:playground

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
app/
├── src/
│   ├── components/        # Design components (published to npm)
│   │   ├── ui/           # UI components
│   │   ├── enhanced/     # Enhanced components
│   │   ├── utils/        # Utility functions
│   │   └── index.ts
│   ├── styles/           # Global styles (published to npm)
│   │   ├── _app.scss     # Main entry point
│   │   ├── 0_reset.scss  # CSS reset
│   │   ├── color.scss    # Color variables
│   │   ├── font.scss     # Typography
│   │   ├── spacing.scss  # Spacing system
│   │   ├── shadow.scss   # Shadow utilities
│   │   └── z-index.scss  # Z-index scale
│   ├── playground/        # Development playground
│   ├── debug/            # Debug pages
│   └── lib-entry.ts      # npm package entry point
├── dist/                 # Built library (generated)
│   ├── lululemon-ui.es.js
│   ├── lululemon-ui.umd.js
│   └── lululemon-ui.css  # Bundled styles
├── package.json
├── vite.config.ts        # Playground config
└── vite.config.lib.ts    # Library build config
```

## Publishing to npm

1. Update version in `package.json`
2. Build the library:
   ```bash
   npm run build:lib
   ```
3. Verify the package contents:
   ```bash
   npm pack --dry-run
   ```
4. Publish:
   ```bash
   npm publish
   ```

## Contributing

When adding a new component:

1. Create a new directory in `src/components/`
2. Include these files:
   - `ComponentName.tsx` - Main component file
   - `ComponentName.types.ts` - TypeScript types
   - `ComponentName.module.scss` - Styles
   - `index.ts` - Export file
3. Export the component in `src/components/index.ts`
4. Export types in `src/lib-entry.ts`
5. Test in the playground

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
