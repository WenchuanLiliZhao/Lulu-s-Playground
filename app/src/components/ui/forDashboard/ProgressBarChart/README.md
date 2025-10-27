# ProgressBarChart Component

A horizontal bar chart component for visualizing journey stages, service performance, or any progress-based metrics with health status indicators.

## Features

- **Auto-scaling Bars**: Maximum value shows full width, others scale proportionally
- **Health Status**: Color-coded bars (healthy, warning, critical)
- **Flexible Display**: Optional percentage values and info text
- **Responsive Legend**: Shows status color meanings
- **Clean Layout**: Title, subtitle, and organized bar rows

## Usage

### Basic Example

```tsx
import { ProgressBarChart, type ProgressBarItem } from '@/components/ui/forDashboard/ProgressBarChart'

const items: ProgressBarItem[] = [
  { id: '1', label: 'Discovery', value: 99.9, status: 'healthy', infoText: '80ms' },
  { id: '2', label: 'Interest', value: 99.7, status: 'healthy', infoText: '80ms' },
  { id: '3', label: 'Purchase', value: 68.5, status: 'critical', infoText: '120ms' },
]

<ProgressBarChart
  title="User Journey"
  subtitle="Conversion rates at each stage"
  items={items}
/>
```

### Minimal Configuration

```tsx
<ProgressBarChart
  items={items}
  showPercentage={false}
  showInfo={false}
/>
```

## Props

### ProgressBarChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Chart title |
| `subtitle` | `string` | `undefined` | Chart subtitle/description |
| `items` | `ProgressBarItem[]` | **required** | Data items to display |
| `className` | `string` | `''` | Additional CSS class |
| `showPercentage` | `boolean` | `true` | Display percentage values on bars |
| `showInfo` | `boolean` | `true` | Display info text (e.g., duration) |

### ProgressBarItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display label/title for the bar |
| `value` | `number` | Numeric value (used for percentage calculation) |
| `status` | `'healthy' \| 'warning' \| 'critical'` | Health status (determines bar color) |
| `infoText` | `string` (optional) | Additional info (e.g., "80ms", "500 users") |

## Design Guidelines

### Status Colors

- **Healthy**: Green (`var(--color-semantic-success)`) - For normal/good states
- **Warning**: Orange (`var(--color-semantic-warning)`) - For attention-needed states
- **Critical**: Red (`var(--color-semantic-error)`) - For problematic states

### Bar Scaling

- The item with the maximum `value` renders at 100% width
- All other bars scale proportionally: `(value / maxValue) * 100%`
- Percentage text appears inside bars if width > 10%, otherwise outside

### Layout Sections

1. **Left**: Item label (fixed width: 140px)
2. **Middle**: Progress bar (flexible, fills remaining space)
3. **Right**: Info text (fixed width: 60px, right-aligned)

### Recommended Use Cases

- User journey conversion funnels
- Service performance metrics
- Application health monitoring
- Step-by-step progress tracking

## Examples

See [debug-dashboard-widgets](/debug/dashboard-widgets) for live examples including:
- User Journey tracking
- Application & Service Performance
- Various size configurations

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Color supplemented by text labels and percentages
- High contrast ratios for all status colors
- Keyboard navigable when interactive
- Supports light/dark theme automatically

