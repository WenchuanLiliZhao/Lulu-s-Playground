# Calendar Component

A full-year calendar component with self-aware responsive design using ResizeObserver.

## Features

- **Self-aware responsive design**: Uses ResizeObserver instead of `@media` queries to detect container size
- **Desktop layout**: 4 columns × 3 rows (like macOS Calendar)
- **Mobile layout**: 3 columns × 4 rows (like iOS Calendar)
- **Configurable breakpoint**: Customize when to switch between layouts
- **Today highlight**: Current day is highlighted in red
- **Year selection**: View any year from 1900 to 2100

## Usage

```tsx
import { Calendar } from '@/components/ui/Calendar'

// Basic usage - shows current year
<Calendar />

// Show a specific year
<Calendar year={2024} />

// Custom breakpoint (default is 600px)
<Calendar breakpoint={768} />

// Combined with custom styling
<Calendar 
  year={2025} 
  breakpoint={600}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `year` | `number` | Current year | The year to display |
| `className` | `string` | `''` | Optional additional CSS class |
| `breakpoint` | `number` | `600` | Width threshold (in pixels) for switching between desktop and mobile layouts |

## Responsive Behavior

The component uses `ResizeObserver` to monitor its own size and automatically switches layouts:

- **Width ≥ breakpoint**: 4×3 grid (Desktop layout)
- **Width < breakpoint**: 3×4 grid (Mobile layout)

This approach allows the component to adapt based on its container size rather than the viewport, making it perfect for use in sidebars, modals, or any constrained space.

## Debug Page

Visit `/debug-calendar` to test the component with interactive controls:
- Adjust the year
- Change container width to see layout switching
- Modify breakpoint threshold

## Styling

The component uses CSS Modules with the following class structure:

- `.container` - Main wrapper (applies `.desktop` or `.compact` class)
- `.yearHeader` - Year title
- `.grid` - Months grid container
- `.month` - Individual month container
- `.monthHeader` - Month name
- `.dayNames` - Weekday labels row
- `.days` - Days grid
- `.day` - Individual day cell
  - `.today` - Current day highlight
  - `.empty` - Empty cells before month start

### Color System

The component uses the project's CSS variable system for colors, ensuring:
- ✅ Automatic light/dark mode support
- ✅ Consistent branding across the application
- ✅ Easy theme customization

Key CSS variables used:
- `--color-main` - Primary text
- `--color-sec` - Secondary text (weekday labels)
- `--color-bg-main` - Background colors
- `--color-bg-sec` - Month container background
- `--color-semantic-error` - Today highlight (red)

See [COLOR_MAPPING.md](./COLOR_MAPPING.md) for complete color variable mapping.

