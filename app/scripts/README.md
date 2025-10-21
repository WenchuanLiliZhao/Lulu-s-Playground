# Scripts

This directory contains utility scripts for the Lululemon UI project.

## generate-colors-ts.cjs

Automatically generates `src/styles/colors.ts` from `src/styles/color-chart.scss`.

## generate-color-use-ts.cjs

Automatically generates `src/styles/color-use.ts` from `src/styles/color-use.scss`.

### Usage

```bash
npm run generate:color-use
```

### What it does

1. Parses the SCSS file `src/styles/color-use.scss`
2. Extracts theme color definitions from `@mixin light-theme` and `@mixin dark-theme`
3. Extracts root-level variables (like `--brand-color`)
4. Generates a TypeScript file `src/styles/color-use.ts` with:
   - Type-safe theme color interfaces
   - Light and dark theme color objects
   - CSS variable name mappings
   - Helper functions to access theme colors programmatically

### When to run

Run this script whenever you update theme color values in `color-use.scss`. This ensures the TypeScript theme color definitions stay in sync with the SCSS variables.

### Output

The script generates a `color-use.ts` file that can be imported and used throughout the codebase:

```typescript
import { 
  LIGHT_THEME, 
  DARK_THEME, 
  getThemeColor,
  getCssVar,
  CSS_VAR_NAMES 
} from '@/styles/color-use';

// Get a specific color from light theme
const mainColor = LIGHT_THEME.colorMain; // '#1a1a1a'

// Get a color based on current theme
const textColor = getThemeColor('dark', 'colorMain'); // '#eaeaea'

// Get CSS variable for use in inline styles
const bgColor = getCssVar('colorBgMain'); // 'var(--color-bg-main)'

// Get CSS variable with fallback
const borderColor = getCssVar('colorBorderMain', '#ebebeb'); // 'var(--color-border-main, #ebebeb)'

// Access CSS variable name directly
const varName = CSS_VAR_NAMES.colorMain; // '--color-main'
```

### Benefits

- ✅ **Single source of truth**: SCSS file is the primary source
- ✅ **Type safety**: TypeScript types for all theme color definitions
- ✅ **Theme switching**: Easy programmatic access to light/dark theme values
- ✅ **CSS variable mapping**: Direct access to CSS variable names
- ✅ **Automatic sync**: No manual copying of color values
- ✅ **DRY principle**: Define theme colors once, use everywhere

---

## generate-colors-ts.cjs

Automatically generates `src/styles/color-chart.ts` from `src/styles/color-chart.scss`.

### Usage

```bash
npm run generate:colors
```

### What it does

1. Parses the SCSS file `src/styles/color-chart.scss`
2. Extracts all color scale definitions (variables like `$sequoia-0`, `$sequoia-1`, etc.)
3. Identifies the original color index from comments
4. Generates a TypeScript file `src/styles/color-chart.ts` with:
   - Type-safe color scale definitions
   - Helper functions to access colors
   - Proper camelCase naming for TypeScript

### When to run

Run this script whenever you update color values in `color-chart.scss`. This ensures the TypeScript color definitions stay in sync with the SCSS variables.

### Output

The script generates a `color-chart.ts` file that can be imported and used throughout the codebase:

```typescript
import { COLOR_SCALES, getColor, getAllColorScales } from '@/styles/color-chart';

// Get a specific color
const primaryColor = getColor('hotHeat', 4); // '#FF4646'

// Get all color scales
const allScales = getAllColorScales();

// Access color scales directly
const sequoiaColors = COLOR_SCALES.sequoia.colors;
```

### Benefits

- ✅ **Single source of truth**: SCSS file is the primary source
- ✅ **Type safety**: TypeScript types for all color definitions
- ✅ **Automatic sync**: No manual copying of color values
- ✅ **DRY principle**: Define colors once, use everywhere

