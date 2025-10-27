# MiniTrendChart Component

A compact line chart component for visualizing trends in limited space, perfect for dashboard cards showing attack traffic, latency, user activity, and other time-series metrics.

## Features

- **Compact Design**: Optimized for small dashboard cards
- **Multiple Lines**: Support for comparing multiple metrics
- **Flexible Legend**: Show/hide legend as needed
- **Optional Grid**: Toggle grid lines for better readability
- **Auto-scaling**: Data automatically normalized to fit chart area
- **Area Fill**: Subtle gradient fill under each line

## Usage

### Single Line Chart

```tsx
import { MiniTrendChart, type MiniTrendChartLine } from '@/components/ui/forDashboard/MiniTrendChart'

const data: MiniTrendChartLine[] = [
  {
    id: 'latency',
    name: 'API Latency',
    data: [45, 52, 48, 55, 60, 58, 65, 70, 68, 72],
    color: '#8b5cf6',
    strokeWidth: 2,
  },
]

<MiniTrendChart
  title="API Latency"
  subtitle="p95: 234ms"
  lines={data}
  height={180}
  showLegend={false}
/>
```

### Multi-line Comparison

```tsx
const lines: MiniTrendChartLine[] = [
  {
    id: 'attack',
    name: 'Attack Traffic (Gbps)',
    data: [...],
    color: '#ef4444',
    strokeWidth: 2,
  },
  {
    id: 'clean',
    name: 'Clean Traffic (Gbps)',
    data: [...],
    color: '#10b981',
    strokeWidth: 2,
  },
]

<MiniTrendChart
  title="DDOS Attack Traffic"
  subtitle="Mitigation: Active"
  lines={lines}
  height={180}
  showGrid={true}
  showLegend={true}
/>
```

### With X-axis Labels

```tsx
<MiniTrendChart
  title="Hourly Traffic"
  lines={lines}
  xLabels={['8m', '6m', '4m', '2m', '1m']}
  height={180}
/>
```

## Props

### MiniTrendChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Chart title |
| `subtitle` | `string` | `undefined` | Additional info/description |
| `xLabels` | `string[]` | `undefined` | X-axis labels (e.g., time intervals) |
| `lines` | `MiniTrendChartLine[]` | **required** | Data lines to display |
| `height` | `number` | `180` | Chart height in pixels |
| `showGrid` | `boolean` | `false` | Show horizontal grid lines |
| `showLegend` | `boolean` | `true` | Show legend for multiple lines |
| `className` | `string` | `''` | Additional CSS class |

### MiniTrendChartLine

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier |
| `name` | `string` | **required** | Display name in legend |
| `data` | `number[]` | **required** | Data points to plot |
| `color` | `string` | **required** | Line color (CSS color value) |
| `strokeWidth` | `number` | `2` | Line thickness in pixels |

## Design Guidelines

### Recommended Sizes

- **Standard**: 400px width × 240px height (with grid and legend)
- **Compact**: 300px width × 200px height (minimal, no grid)
- **Mini**: 280px width × 160px height (status cards)

### Chart Height Options

- `180px`: Standard dashboard card
- `140px`: Compact card
- `120px`: Minimal inline chart

### Data Points

- **Optimal**: 30-50 data points for smooth curves
- **Minimum**: 10 points to show trend
- **Maximum**: 100 points (may look dense)

### Color Selection

Use semantic colors for clarity:
- **Success/Normal**: `#10b981` (green)
- **Warning**: `#f59e0b` (orange)
- **Error/Alert**: `#ef4444` (red)
- **Info**: `#3b82f6` (blue)
- **Custom**: `#8b5cf6` (purple), `#06b6d4` (cyan)

### When to Show Grid

- **Show**: When precise values matter (latency, performance)
- **Hide**: For general trend indication (activity patterns)

### Legend Display

- **Show**: When comparing 2+ lines
- **Hide**: Single line charts with clear title

## Use Cases

Perfect for:
- **Security Monitoring**: DDOS attacks, WAF blocks, intrusion attempts
- **Performance Metrics**: API latency, response times, error rates
- **User Activity**: Login attempts, page views, active sessions
- **System Health**: CPU usage, memory consumption, network traffic

## Examples

See [debug-dashboard-widgets](/debug/dashboard-widgets) for live examples:
- DDOS Attack Traffic (multi-line with grid)
- WAF Blocks per minute (single line with grid)
- High-Risk Login Attempts (compact, no grid)
- API Latency monitoring (custom colors)

## Performance

- Uses SVG for crisp rendering at any size
- Automatic path generation and data normalization
- Minimal re-renders with React optimization
- Lightweight: ~5KB (component + styles)

## Accessibility

- SVG rendered with proper viewBox for scaling
- Color contrast meets WCAG AA standards
- Semantic structure with title hierarchy
- Works in both light and dark themes

