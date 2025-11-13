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

---

## generate-trend-data.cjs

Automatically generates static trend data (2023-2025) for the Sales Event Trend demo page.

### Usage

```bash
npm run generate:trend-data
```

### What it does

1. Generates daily sales data for the period 2023-01-01 to 2025-12-31 (1,096 data points)
2. Generates daily user growth data for the same period
3. Creates two TypeScript files:
   - `staticSalesData.ts` - Contains GMV, Transaction, and NetSales data
   - `staticUserGrowthData.ts` - Contains GMV, Transaction, and NetSales data
4. Uses seeded random generation for consistent results across runs

### When to run

Run this script when you need to:
- Update the date range for trend data
- Modify the data generation algorithm
- Change base values or growth patterns
- Regenerate data with different seasonal patterns

### Output

The script generates TypeScript files with static data that can be imported:

```typescript
import { dailySalesData, dailyUserGrowthData } from './data/salesData';

// Use the pre-generated static data
<TrendChart data={dailySalesData} lines={salesLines} />
```

### Benefits

- ✅ **Consistent data**: Same data generated every time (seeded random)
- ✅ **Performance**: No runtime data generation overhead
- ✅ **Type safety**: TypeScript types for all data points
- ✅ **Large dataset**: 3 years of daily data (1,096 points per dataset)
- ✅ **Realistic patterns**: Includes seasonal trends, weekend effects, and year-over-year growth

---

## generate-event-data.cjs

Automatically generates event data from `data.md` for the Hellen Sales Event Trend demo page.

### Usage

```bash
node scripts/generate-event-data.cjs
```

### What it does

1. Reads the markdown table from `data.md` (containing activity phases with channels and dates)
2. Groups activities by (activity_name, channel_type, year) across all sub_channels
3. For each group, calculates:
   - Event name: "FY" + LastTwoDigitsOfYear + " " + activity_name
   - Start date: minimum of all sub_channel_start_time
   - End date: maximum of all sub_channel_end_time
4. Generates `generatedEventData.ts` with TypeScript event definitions

### Input Format (data.md)

The input is a markdown table with the following columns:
- `channel_type`: "Retail" or "EC"
- `channel`: e.g., "Retail", "Wechat", "T_MALL", "JD", etc.
- `sub_channel`: e.g., "Corporate Store", "Wecom", "Virtual Shelf", etc.
- `activity_name`: e.g., "618", "D11", "SMD", "WMD", etc.
- `activity_phase`: e.g., "Phase 1", "Phase 2", "Phase 3"
- `activity_date`: Date of the activity
- `sub_channel_start_time`: Start timestamp
- `sub_channel_end_time`: End timestamp

### Event Definition

Each event aggregates all activity phases with the same:
- `activity_name` (e.g., "618", "D11")
- `channel_type` (e.g., "Retail" or "EC")
- Year (to avoid spanning multiple years)

For example, "D11 2024" with channel type "EC" aggregates all:
- T_MALL D11 phases
- JD D11 phases
- Wechat (all sub_channels) D11 phases
- Douyin D11 phases

### When to run

Run this script when you:
- Add new activities to `data.md`
- Update activity dates or phases
- Change channel configurations
- Need to regenerate event data

### Output

The script generates `generatedEventData.ts` with:

```typescript
import type { EventData } from './eventData';
import { COLOR_SCALES } from '../../../../../styles/color-chart';

const retailColor = COLOR_SCALES.teal.colors[4];
const ecColor = COLOR_SCALES.indigo.colors[5];

// Retail Events
export const retailEvents: EventData[] = [
  { name: 'FY25 SMD', interval: [new Date(2025, 4, 27), new Date(2025, 5, 9)], ... },
  // ... more retail events
];

// EC Events
export const ecEvents: EventData[] = [
  { name: 'FY25 618', interval: [new Date(2025, 4, 16), new Date(2025, 5, 20)], ... },
  // ... more EC events
];

// All Events (Retail + EC)
export const generatedEvents: EventData[] = [...retailEvents, ...ecEvents];
```

### Benefits

- ✅ **Single source of truth**: data.md is the primary data source
- ✅ **Automatic aggregation**: Combines all phases and sub_channels per activity
- ✅ **Fiscal year naming**: Automatic FY prefix calculation
- ✅ **Type safety**: Generates TypeScript with proper types
- ✅ **Date accuracy**: Calculates exact start/end dates from all phases
- ✅ **No duplicates**: Groups events correctly to avoid redundancy
- ✅ **Holidays preserved**: Script only generates events, not holidays

