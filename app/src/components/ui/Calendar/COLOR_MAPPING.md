# Calendar Component - CSS Variable Mapping

This document shows how the Calendar component colors map to the project's design system CSS variables.

## Color Replacements

| Original Hardcoded Color | CSS Variable | Usage |
|-------------------------|--------------|-------|
| `white` / `#ffffff` | `var(--color-bg-main)` | Main background, day cell background |
| `#2c2c2c` | `var(--color-main)` | Primary text (year, month names, day numbers) |
| `#666` | `var(--color-sec)` | Secondary text (weekday labels) |
| `#f8f9fa` | `var(--color-bg-sec)` | Month container background |
| `#e9ecef` | `var(--color-bg-sec-2)` | Hover state for day cells |
| `rgba(0, 0, 0, 0.1)` | `var(--color-border-darken-trans)` | Container shadow |
| `#d31334` (red) | `var(--color-semantic-error)` | Today highlight (red from hot-heat scale) |

## Theme Support

By using CSS variables, the Calendar component now automatically supports:
- ✅ Light mode
- ✅ Dark mode
- ✅ System preference detection
- ✅ Consistent branding across the application

## Semantic Color Usage

The component uses semantic color variables that adapt to the theme:

### Light Mode
- `--color-main`: `#1a1a1a` (dark text)
- `--color-sec`: `#858585` (medium gray)
- `--color-bg-main`: `white`
- `--color-bg-sec`: `#fafafa`
- `--color-semantic-error`: `var(--hot-heat-4)` (red)

### Dark Mode
- `--color-main`: `#eaeaea` (light text)
- `--color-sec`: `#b3b3b3` (light gray)
- `--color-bg-main`: `#121212`
- `--color-bg-sec`: `#1e1e1e`
- `--color-semantic-error`: `var(--hot-heat-4)` (red)

## Reference

All color variables are defined in:
- `/src/styles/color-use.scss` - Semantic color mappings
- `/src/styles/color-chart.scss` - Color scale definitions
- `/src/styles/colors.ts` - TypeScript color exports

