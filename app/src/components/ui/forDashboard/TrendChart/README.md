# TrendChart Component

A responsive line chart component for displaying trends and analytics data, built with Recharts and following the Lululemon design system.

## Features

- **Theme Support**: Automatically adapts to light/dark themes
- **Responsive Design**: Uses ResponsiveContainer for fluid sizing
- **Multiple Lines**: Support for displaying multiple data series
- **Interactive Tooltips**: Hover tooltips with detailed information
- **Automatic Grid Spacing**: Intelligent x-axis label spacing to prevent overlap (minimum 8px spacing by default)
- **Date Range Filtering**: Built-in date filter for temporal data
- **Configurable Styling**: Adjustable font sizes and padding via SCSS variables
- **Smooth Animations**: Configurable animation duration
- **Grid & Legend**: Optional grid lines and legend display
- **Flexible Axis Configuration**: Customizable label angles, heights, and intervals

## Usage

```tsx
import { TrendChart } from '@lululemon-ui'
import type { TrendChartDataPoint, TrendChartLine } from '@lululemon-ui'

const data: TrendChartDataPoint[] = [
  { id: '2024-01', name: 'Jan', revenue: 12000, users: 2400 },
  { id: '2024-02', name: 'Feb', revenue: 13500, users: 2800 },
  { id: '2024-03', name: 'Mar', revenue: 15000, users: 3200 },
]

const lines: TrendChartLine[] = [
  {
    dataKey: 'revenue',
    name: 'Revenue ($)',
    color: '#8884d8',
    strokeWidth: 2,
  },
  {
    dataKey: 'users',
    name: 'Users',
    color: '#82ca9d',
    strokeWidth: 2,
  },
]

function MyComponent() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <TrendChart
        title="Monthly Performance"
        data={data}
        lines={lines}
        showGrid={true}
        showLegend={true}
        animationDuration={1500}
      />
    </div>
  )
}
```

## Props

### TrendChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Chart title |
| `data` | `TrendChartDataPoint[]` | **required** | Data for the chart |
| `lines` | `TrendChartLine[]` | **required** | Configuration for lines to display |
| `showGrid` | `boolean` | `true` | Show/hide grid lines |
| `showLegend` | `boolean` | `true` | Show/hide legend |
| `animationDuration` | `number` | `1500` | Animation duration in milliseconds |
| `xAxisInterval` | `number \| 'auto' \| 'preserveStart' \| 'preserveEnd' \| 'preserveStartEnd'` | `'auto'` | X-axis tick interval. Use `'auto'` for automatic spacing based on `minXAxisSpacing`, `0` to show all, or a number to skip every n labels |
| `minXAxisSpacing` | `number` | `8` | Minimum spacing between x-axis ticks in pixels (used when `xAxisInterval` is `'auto'`) |
| `estimatedChartWidth` | `number` | `800` | Estimated chart width in pixels for automatic interval calculation |
| `showDots` | `boolean` | `true` | Whether to show dots on the line chart |
| `dotInterval` | `number` | - | Dot display interval (defaults to `xAxisInterval` to keep dots and labels in sync) |
| `xAxisAngle` | `number` | `-45` | X-axis label angle in degrees |
| `xAxisHeight` | `number` | `80` | X-axis height to accommodate rotated labels |
| `marginBottom` | `number` | `-20` | Chart margin bottom (distance from X-axis labels to SVG bottom) |
| `xAxisTickMargin` | `number` | `8` | X-axis tick margin (distance from axis line to labels) |
| `enableDateFilter` | `boolean` | `false` | Enable date range filtering |
| `getDateFromDataPoint` | `(dataPoint: TrendChartDataPoint) => Date` | - | Function to extract date from data point (required if `enableDateFilter` is true) |
| `initialStartDate` | `Date \| null` | `null` | Initial start date for date filter |
| `initialEndDate` | `Date \| null` | `null` | Initial end date for date filter |
| `className` | `string` | - | Optional className for custom styling |

### TrendChartDataPoint

```typescript
interface TrendChartDataPoint {
  id: string                // Unique identifier (e.g., "2024-01", "2024-02")
  name: string              // Display label for X-axis (e.g., "Jan", "Feb")
  [key: string]: string | number  // Data values (dynamic keys)
}
```

**Important**: The `id` field must be unique for each data point to ensure correct tooltip display and data mapping, especially when dealing with duplicate labels (e.g., multiple "Jan" across different years).

### TrendChartLine

```typescript
interface TrendChartLine {
  dataKey: string     // Key in data object
  name: string        // Display name in legend
  color: string       // Line color (hex or CSS color)
  strokeWidth?: number  // Line thickness (default: 2)
}
```

## SCSS Configuration

The component's appearance can be customized by modifying the following SCSS variables at the top of `_styles.module.scss`:

```scss
$x-axis-label-font-size: 12px !default;
$y-axis-label-font-size: 12px !default;
$chart-title-font-size: 18px !default;
$chart-padding: 24px !default;
```

### Variables

- **`$x-axis-label-font-size`**: Font size for X-axis labels
- **`$y-axis-label-font-size`**: Font size for Y-axis labels
- **`$chart-title-font-size`**: Font size for the chart title
- **`$chart-padding`**: Padding around the chart container

## Examples

### Basic Chart

```tsx
<TrendChart
  title="Revenue Trend"
  data={data}
  lines={[
    { dataKey: 'revenue', name: 'Revenue', color: '#8884d8' }
  ]}
/>
```

### Multiple Lines with Custom Colors

```tsx
import { COLOR_SCALES } from '@lululemon-ui/styles'

const lines = [
  {
    dataKey: 'revenue',
    name: 'Revenue ($)',
    color: COLOR_SCALES.indigo.colors[5],
  },
  {
    dataKey: 'users',
    name: 'Users',
    color: COLOR_SCALES.wilderness.colors[4],
  },
  {
    dataKey: 'orders',
    name: 'Orders',
    color: COLOR_SCALES.amber.colors[4],
  },
]

<TrendChart
  title="Business Metrics"
  data={data}
  lines={lines}
  showGrid={true}
  showLegend={true}
/>
```

### Without Grid and Legend

```tsx
<TrendChart
  data={data}
  lines={lines}
  showGrid={false}
  showLegend={false}
  animationDuration={1000}
/>
```

### Automatic Grid Spacing

By default, the component automatically calculates the optimal x-axis interval to ensure labels don't overlap:

```tsx
<TrendChart
  data={largeDataset} // 100+ data points
  lines={lines}
  // xAxisInterval defaults to 'auto'
  // minXAxisSpacing defaults to 8px
  // Labels will be automatically spaced to prevent overlap
/>
```

### Custom Grid Spacing

You can customize the minimum spacing or provide a manual interval:

```tsx
// Custom minimum spacing
<TrendChart
  data={data}
  lines={lines}
  xAxisInterval="auto"
  minXAxisSpacing={12} // Require 12px minimum spacing
/>

// Manual interval (show every 5th label)
<TrendChart
  data={data}
  lines={lines}
  xAxisInterval={4} // Skip 4, show every 5th
/>
```

### Date Range Filtering

Enable interactive date filtering for temporal data:

```tsx
const getDateFromDataPoint = (dataPoint: TrendChartDataPoint): Date => {
  return dataPoint.date as Date
}

<TrendChart
  data={timeSeriesData}
  lines={lines}
  enableDateFilter={true}
  getDateFromDataPoint={getDateFromDataPoint}
  initialStartDate={new Date(2025, 0, 1)}
  initialEndDate={new Date(2025, 11, 31)}
/>
```

## Debug Page

A debug page is available at `/debug-trend-chart` for testing and experimenting with the component's features. The debug page includes:

- Interactive controls for all component props
- Live preview of changes
- Sample data generation
- Documentation of features and configuration options

## Design System Integration

The component uses the following design system tokens:

- **Colors**: `--color-main`, `--color-sec`, `--color-bg-main`, `--color-border-main`
- **Typography**: `--ff-sans`
- **Shadows**: `--pop-shadow`
- **Spacing**: Custom padding via SCSS variables

All colors automatically adapt to the current theme (light/dark).

## Dependencies

- [Recharts](https://recharts.org/) - Charting library
- React 18+

## Notes

- The component requires a parent container with defined width and height
- Data is not automatically regenerated; provide new data arrays to update the chart
- Line colors should contrast well with both light and dark themes
- For best results, use design system color scales for line colors

