# Scripts

This directory contains utility scripts for the Lululemon UI project.

## generate-colors-ts.cjs

Automatically generates `src/styles/colors.ts` from `src/styles/color-chart.scss`.

### Usage

```bash
npm run generate:colors
```

### What it does

1. Parses the SCSS file `src/styles/color-chart.scss`
2. Extracts all color scale definitions (variables like `$sequoia-0`, `$sequoia-1`, etc.)
3. Identifies the original color index from comments
4. Generates a TypeScript file `src/styles/colors.ts` with:
   - Type-safe color scale definitions
   - Helper functions to access colors
   - Proper camelCase naming for TypeScript

### When to run

Run this script whenever you update color values in `color-chart.scss`. This ensures the TypeScript color definitions stay in sync with the SCSS variables.

### Output

The script generates a `colors.ts` file that can be imported and used throughout the codebase:

```typescript
import { COLOR_SCALES, getColor, getAllColorScales } from '@/styles/colors';

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

