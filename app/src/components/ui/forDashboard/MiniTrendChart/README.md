# MiniTrendChart Component

A compact, responsive line chart component for dashboard cards, built with Recharts and following the Lululemon design system. Perfect for visualizing trends in small spaces while maintaining full interactivity.

## Features

- **Compact Design**: Optimized for dashboard cards and small containers
- **Theme Support**: Automatically adapts to light/dark themes
- **Responsive Design**: Uses ResponsiveContainer for fluid sizing
- **Multiple Lines**: Support for displaying multiple data series
- **Interactive Tooltips**: Hover tooltips with detailed information
- **Automatic Grid Spacing**: Intelligent x-axis label spacing to prevent overlap
- **Date Range Filtering**: Built-in date filter for temporal data
- **Dashboard Integration**: Full support for dashboard header and alert light
- **Configurable Styling**: Adjustable font sizes and padding via SCSS variables
- **Smooth Animations**: Configurable animation duration
- **Grid & Legend**: Optional grid lines and legend display
- **Flexible Axis Configuration**: Show/hide axes, customizable angles and intervals

## Usage

### Basic Mini Chart

```tsx
import { MiniTrendChart } from '@lululemon-ui'
import type { MiniTrendChartDataPoint, MiniTrendChartLine } from '@lululemon-ui'

const data: MiniTrendChartDataPoint[] = [
  { id: '1', name: '8m', latency: 45 },
  { id: '2', name: '6m', latency: 52 },
  { id: '3', name: '4m', latency: 48 },
  { id: '4', name: '2m', latency: 55 },
  { id: '5', name: '1m', latency: 60 },
]

const lines: MiniTrendChartLine[] = [
  {
    dataKey: 'latency',
    name: 'API Latency (ms)',
    color: '#8b5cf6',
    strokeWidth: 2,
  },
]

function MyDashboard() {
  return (
    <div style={{ width: '400px', height: '240px' }}>
      <MiniTrendChart
        title="API Latency"
        subtitle="p95: 234ms"
        data={data}
        lines={lines}
        height={180}
        showGrid={false}
        showLegend={false}
      />
    </div>
  )
}
```

### Multi-line Comparison

```tsx
const lines: MiniTrendChartLine[] = [
  {
    dataKey: 'attack',
    name: 'Attack Traffic',
    color: '#ef4444',
    strokeWidth: 2,
  },
  {
    dataKey: 'clean',
    name: 'Clean Traffic',
    color: '#10b981',
    strokeWidth: 2,
  },
]

<MiniTrendChart
  title="DDOS Traffic"
  subtitle="Mitigation: Active"
  data={trafficData}
  lines={lines}
  height={180}
  showGrid={true}
  showLegend={true}
  legendPosition="bottom"
/>
```

### With Dashboard Header

```tsx
<MiniTrendChart
  showHeader={true}
  headerIcon="speed"
  headerTitle="Performance"
  headerSummary="Last 24 hours"
  headerTitleSize="medium"
  data={data}
  lines={lines}
  height={180}
/>
```

### With Date Filter

```tsx
const getDateFromDataPoint = (dataPoint: MiniTrendChartDataPoint): Date => {
  return dataPoint.date as Date
}

<MiniTrendChart
  title="Traffic Trend"
  data={timeSeriesData}
  lines={lines}
  enableDateFilter={true}
  getDateFromDataPoint={getDateFromDataPoint}
  initialStartDate={new Date(2025, 0, 1)}
  initialEndDate={new Date(2025, 11, 31)}
  height={200}
/>
```

## Props

### MiniTrendChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Chart title (internal header) |
| `subtitle` | `string` | - | Subtitle/additional info |
| `data` | `MiniTrendChartDataPoint[]` | **required** | Data for the chart |
| `lines` | `MiniTrendChartLine[]` | **required** | Configuration for lines to display |
| `height` | `number` | `180` | Chart height in pixels |
| `showGrid` | `boolean` | `false` | Show/hide grid lines |
| `showLegend` | `boolean` | `true` | Show/hide legend |
| `legendPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the legend |
| `animationDuration` | `number` | `1000` | Animation duration in milliseconds |
| `xAxisInterval` | `number \| 'auto' \| 'preserveStart' \| 'preserveEnd' \| 'preserveStartEnd'` | `'auto'` | X-axis tick interval |
| `minXAxisSpacing` | `number` | `8` | Minimum spacing between x-axis ticks in pixels |
| `estimatedChartWidth` | `number` | `400` | Estimated chart width for automatic interval calculation |
| `showDots` | `boolean` | `false` | Whether to show dots on the line chart |
| `dotInterval` | `number` | - | Dot display interval (defaults to xAxisInterval) |
| `xAxisAngle` | `number` | `0` | X-axis label angle in degrees |
| `xAxisHeight` | `number` | `40` | X-axis height to accommodate labels |
| `marginBottom` | `number` | `0` | Chart margin bottom |
| `xAxisTickMargin` | `number` | `5` | X-axis tick margin |
| `showYAxis` | `boolean` | `false` | Show/hide Y-axis |
| `showXAxis` | `boolean` | `true` | Show/hide X-axis |
| `enableDateFilter` | `boolean` | `false` | Enable date range filtering |
| `getDateFromDataPoint` | `(dataPoint: MiniTrendChartDataPoint) => Date` | - | Function to extract date from data point |
| `initialStartDate` | `Date \| null` | `null` | Initial start date for date filter |
| `initialEndDate` | `Date \| null` | `null` | Initial end date for date filter |
| `className` | `string` | - | Optional className for custom styling |

#### Dashboard Integration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `false` | Show dashboard header instead of internal title |
| `headerIcon` | `string` | - | Material Symbol icon name |
| `headerTitle` | `string` | - | Header title text |
| `headerSummary` | `string` | - | Header summary/description text |
| `headerTitleSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Title font size |
| `headerIconSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Icon size |
| `headerSummarySize` | `'small' \| 'medium' \| 'large'` | - | Summary font size |
| `headerColor` | `'primary' \| 'secondary' \| 'active' \| 'success' \| 'warning' \| 'error'` | `'secondary'` | Header text color |
| `showAlertLight` | `boolean` | `false` | Show alert light indicator |
| `alertLightColor` | `string` | `'#10b981'` | Alert light color (CSS color value) |

### MiniTrendChartDataPoint

```typescript
interface MiniTrendChartDataPoint {
  name: string              // Display label for X-axis
  id?: string              // Unique identifier
  date?: Date              // Optional date for filtering
  [key: string]: string | number | Date | undefined  // Data values
}
```

### MiniTrendChartLine

```typescript
interface MiniTrendChartLine {
  dataKey: string     // Key in data object
  name: string        // Display name in legend
  color: string       // Line color (hex or CSS color)
  strokeWidth?: number  // Line thickness (default: 2)
}
```

## SCSS Configuration

The component's appearance can be customized by modifying the following SCSS variables:

```scss
$x-axis-label-font-size: 10px !default;
$y-axis-label-font-size: 10px !default;
$chart-title-font-size: 15px !default;
$chart-subtitle-font-size: 13px !default;
$header-margin-bottom: 12px !default;
```

## Examples

### Minimal Compact Chart

```tsx
<MiniTrendChart
  data={data}
  lines={[
    { dataKey: 'value', name: 'Metric', color: '#8b5cf6' }
  ]}
  height={140}
  showGrid={false}
  showLegend={false}
  showXAxis={false}
  showYAxis={false}
/>
```

### Security Monitoring Dashboard

```tsx
const securityLines = [
  {
    dataKey: 'blocked',
    name: 'Blocked Requests',
    color: '#ef4444',
  },
  {
    dataKey: 'allowed',
    name: 'Allowed Requests',
    color: '#10b981',
  },
]

<MiniTrendChart
  showHeader={true}
  headerIcon="security"
  headerTitle="WAF Protection"
  headerSummary="Real-time"
  showAlertLight={true}
  alertLightColor="#10b981"
  data={wafData}
  lines={securityLines}
  height={200}
  showGrid={true}
  showLegend={true}
/>
```

### With Rotated X-axis Labels

```tsx
<MiniTrendChart
  title="Daily Metrics"
  data={dailyData}
  lines={lines}
  height={220}
  xAxisAngle={-45}
  xAxisHeight={60}
  showXAxis={true}
/>
```

## Design System Integration

The component uses the following design system tokens:

- **Colors**: `--color-main`, `--color-sec`, `--color-bg-main`, `--color-border-main`
- **Typography**: `--ff-sans`
- **Shadows**: `--pop-shadow`
- **Z-index**: `--z-index-popup-sec`

All colors automatically adapt to the current theme (light/dark).

## Comparison with TrendChart

| Feature | MiniTrendChart | TrendChart |
|---------|---------------|------------|
| Primary Use | Dashboard cards | Full-page analytics |
| Default Height | 180px | 300px+ |
| Font Sizes | Smaller (10-15px) | Larger (12-18px) |
| Default Grid | Off | On |
| Default Y-axis | Hidden | Visible |
| Default Dots | Hidden | Visible |
| Dashboard Props | ✅ Full support | ❌ Not available |
| Animation | 1000ms | 1500ms |
| Legend Size | Compact (11px) | Standard (14px) |

## Best Practices

### Recommended Sizes

- **Standard Card**: 400px × 240px
- **Compact Card**: 300px × 200px
- **Mini Card**: 280px × 160px

### Data Points

- **Optimal**: 10-30 data points for clarity in small space
- **Maximum**: 50 points (may need auto interval)

### When to Show Grid

- **Show**: For precise value reading
- **Hide**: For general trend visualization

### Color Selection

Use semantic colors:
- Success/Normal: `#10b981` (green)
- Warning: `#f59e0b` (orange)
- Error/Alert: `#ef4444` (red)
- Info: `#3b82f6` (blue)
- Custom: `#8b5cf6` (purple)

## Dependencies

- [Recharts](https://recharts.org/) - Charting library
- React 18+

## Notes

- The component requires a parent container with defined width and height
- Optimized for compact spaces while maintaining full interactivity
- Inherits all Recharts features including tooltips, animations, and responsiveness
- Works seamlessly with dashboard layout system
