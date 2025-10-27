# MetricWidget Component

A compact metric card component for displaying key performance indicators with optional sparklines, change indicators, and status badges.

## Features

- **Icon Support**: Material Symbols integration for visual identification
- **Sparkline Visualization**: Gradient-filled mini trend chart in bottom right corner
- **Change Indicators**: Color-coded arrows and text for positive/negative changes
- **Status Badges**: Customizable status indicators with semantic colors
- **Flexible Sizing**: Works in various card sizes (standard, compact, etc.)

## Usage

### Basic Example

```tsx
import { MetricWidget } from '@/components/ui/forDashboard/MetricWidget'

<MetricWidget
  title="Real-time GMV"
  value="$2,013.5 M"
  changeText="+28.4% vs last hour"
  changeType="positive"
/>
```

### With Icon and Sparkline

```tsx
<MetricWidget
  icon="payments"
  title="Real-time GMV"
  value="$2,013.5 M"
  changeText="+28.4% vs last hour"
  changeType="positive"
  sparklineData={[10, 15, 13, 18, 22, 25, 30, 28, 35, 40]}
  sparklineColor="#10b981"
/>
```

### With Status Badge

```tsx
<MetricWidget
  icon="groups"
  title="Active Users"
  value="8,520"
  statusText="Watching"
  statusColor="warning"
  sparklineData={[...]}
  sparklineColor="#f59e0b"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `undefined` | Material Symbol name |
| `title` | `string` | **required** | Metric label/title |
| `value` | `string` | **required** | Main metric value to display |
| `changeText` | `string` | `undefined` | Change indicator text (e.g., "+28.4%") |
| `changeType` | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` | Change direction for color coding |
| `statusText` | `string` | `undefined` | Status badge text |
| `statusColor` | `'success' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Status badge color |
| `sparklineData` | `number[]` | `undefined` | Data points for sparkline chart |
| `sparklineColor` | `string` | `'var(--color-semantic-active)'` | Sparkline color (CSS color value) |
| `className` | `string` | `''` | Additional CSS class |

## Design Guidelines

### Recommended Sizes

- **Standard**: 280px × 160px (6 cards per row on desktop)
- **Compact**: 220px × 140px (more compact layouts)

### Sparkline Data

- Provide 15-30 data points for smooth visualization
- Values are automatically normalized to fit the chart area
- Gradient fill is applied from top (30% opacity) to bottom (0% opacity)

### Change Types

- **Positive**: Green color with up arrow (↑)
- **Negative**: Red color with down arrow (↓)
- **Neutral**: Gray color, no arrow

### Status Colors

- **Success**: Green background
- **Warning**: Orange/yellow background
- **Error**: Red background
- **Neutral**: Gray background

## Examples

See [debug-dashboard-widgets](/debug/dashboard-widgets) for live examples.

## Accessibility

- Uses semantic HTML structure
- Color is not the only indicator (arrows supplement color coding)
- Font sizes are readable and scalable
- Supports dark/light theme automatically

