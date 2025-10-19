# Lululemon UI

A modern, accessible React component library for building beautiful user interfaces.

## Installation

```bash
npm install lululemon-ui
```

## Usage

```tsx
import { Button } from 'lululemon-ui'
import 'lululemon-ui/styles'

function App() {
  return (
    <Button variant="primary" size="medium">
      Click Me
    </Button>
  )
}
```

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

This project is organized into three main parts:

### 1. Components (`src/components/`)
The design components that are published to npm. This is the core library.

### 2. Playground (`src/playground/`)
A development environment for testing components and creating page demos.

### 3. Debug (`src/debug/`)
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
│   │   ├── Button/
│   │   └── index.ts
│   ├── playground/        # Development playground
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── debug/            # Debug pages
│   └── lib-entry.ts      # npm package entry point
├── dist/                 # Built library (generated)
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
