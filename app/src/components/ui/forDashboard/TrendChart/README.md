# TrendChart Component

A responsive line chart component for displaying trends and analytics data, built with Recharts and following the Lululemon design system.

## Features

- **Theme Support**: Automatically adapts to light/dark themes
- **Responsive Design**: Uses ResponsiveContainer for fluid sizing
- **Multiple Lines**: Support for displaying multiple data series
- **Interactive Tooltips**: Hover tooltips with detailed information
- **Configurable Styling**: Adjustable font sizes and padding via SCSS variables
- **Smooth Animations**: Configurable animation duration
- **Grid & Legend**: Optional grid lines and legend display

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

