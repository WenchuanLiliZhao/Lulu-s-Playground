# SwitchableDataWidget Component

A flexible dashboard widget that can switch between table and trend chart views, providing multiple perspectives on the same dataset.

## Features

- ✅ Dual view modes: Table and Trend Chart
- ✅ Smooth mode switching with toggle button
- ✅ Consistent dashboard header styling
- ✅ Alert light indicator support
- ✅ Full customization for both table and chart views
- ✅ Dark/light theme support
- ✅ Callback for mode change tracking
- ✅ Optimized for future extensibility

## Use Cases

This component is perfect for scenarios where you want to:
- Show hourly sales data as both a table and a trend line
- Display performance metrics in tabular or graphical format
- Allow users to choose their preferred data visualization
- Provide different perspectives on the same dataset

## Architecture

The component is built with extensibility in mind:
- Clear separation between table and chart configurations
- Easy to add new view modes in the future (e.g., bar chart, pie chart)
- Leverages existing `TableWidget` and `TrendChart` components
- Consistent API with other dashboard widgets

## Usage

### Basic Example

```tsx
import { SwitchableDataWidget } from '@/components/ui/forDashboard'
import type { TableColumn, TrendChartDataPoint, TrendChartLine } from '@/components/ui'

// Define your data structure
interface SalesData {
  id: string
  time: string
  sales: number
  target: number
  status: 'success' | 'warning' | 'error'
}

// Table data
const tableData: SalesData[] = [
  { id: '1', time: '10:00 - 12:00', sales: 3050, target: 3300, status: 'warning' },
  { id: '2', time: '12:00 - 14:00', sales: 4500, target: 4300, status: 'success' },
  // ... more data
]

// Chart data (can be derived from table data or separate)
const chartData: TrendChartDataPoint[] = [
  { id: 'h10', name: '10 AM', sales: 1200 },
  { id: 'h11', name: '11 AM', sales: 1850 },
  { id: 'h12', name: '12 PM', sales: 2400 },
  // ... more data
]

// Define table columns
const columns: TableColumn<SalesData>[] = [
  {
    key: 'time',
    header: 'Time',
    render: (row) => row.time,
    width: '150px',
  },
  {
    key: 'sales',
    header: 'Sales',
    render: (row) => `$${row.sales.toLocaleString()}`,
    width: '120px',
  },
  {
    key: 'target',
    header: 'Target',
    render: (row) => `$${row.target.toLocaleString()}`,
    width: '120px',
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      const color = row.status === 'success' 
        ? 'var(--color-semantic-success)' 
        : row.status === 'warning'
        ? 'var(--color-semantic-warning)'
        : 'var(--color-semantic-error)'
      return <span style={{ color }}>{row.status.toUpperCase()}</span>
    },
  },
]

// Define chart lines
const chartLines: TrendChartLine[] = [
  {
    dataKey: 'sales',
    name: 'Sales',
    color: 'var(--wilderness-4)',
    strokeWidth: 3,
  },
]

function MyDashboard() {
  return (
    <SwitchableDataWidget
      showHeader
      headerTitle="Today's Sales Performance"
      headerColor="primary"
      showAlertLight
      alertLightColor="var(--color-semantic-success)"
      initialMode="table"
      tableConfig={{
        columns,
        data: tableData,
        striped: true,
        hoverable: true,
        bordered: true,
        rowKey: (row) => row.id,
      }}
      chartConfig={{
        data: chartData,
        lines: chartLines,
        height: 300,
        showGrid: true,
        showLegend: true,
        showXAxis: true,
        showYAxis: true,
      }}
      onModeChange={(mode) => {
        console.log(`Switched to ${mode} view`)
      }}
    />
  )
}
```

### With Multiple Chart Lines

```tsx
const chartLines: TrendChartLine[] = [
  {
    dataKey: 'sales',
    name: 'Actual Sales',
    color: 'var(--wilderness-4)',
    strokeWidth: 3,
  },
  {
    dataKey: 'target',
    name: 'Target',
    color: 'var(--color-semantic-warning)',
    strokeWidth: 2,
  },
]

<SwitchableDataWidget
  showHeader
  headerTitle="Sales vs Target"
  headerColor="primary"
  tableConfig={{
    columns,
    data: salesData,
  }}
  chartConfig={{
    data: chartData,
    lines: chartLines,
    height: 350,
    showLegend: true,
  }}
/>
```

### Custom Header with Summary

```tsx
<SwitchableDataWidget
  showHeader
  headerTitle={
    <div>
      <h2>Today's Target</h2>
      <p>$18,500 / $25,200</p>
    </div>
  }
  headerColor="primary"
  tableConfig={{ columns, data: tableData }}
  chartConfig={{ data: chartData, lines: chartLines }}
/>
```

## Props

### SwitchableDataWidgetProps

Extends `DashboardCommonProps` and includes:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMode` | `'table' \| 'chart'` | `'table'` | Initial view mode |
| `tableConfig` | `TableConfig<T>` | **required** | Configuration for table view |
| `chartConfig` | `ChartConfig` | **required** | Configuration for chart view |
| `onModeChange` | `(mode: DataWidgetViewMode) => void` | - | Callback when view mode changes |

### TableConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | **required** | Column definitions |
| `data` | `T[]` | **required** | Table data |
| `striped` | `boolean` | `true` | Show striped rows |
| `hoverable` | `boolean` | `true` | Enable hover effect |
| `bordered` | `boolean` | `true` | Show borders |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `rowKey` | `(row: T, index: number) => string \| number` | - | Unique key function |
| `onRowClick` | `(row: T, index: number) => void` | - | Row click handler |
| `emptyText` | `string` | - | Empty state message |
| `loading` | `boolean` | - | Loading state |

### ChartConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TrendChartDataPoint[]` | **required** | Chart data points |
| `lines` | `TrendChartLine[]` | **required** | Lines to display |
| `height` | `number` | `300` | Chart height in pixels |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showLegend` | `boolean` | `true` | Show legend |
| `showXAxis` | `boolean` | `true` | Show X-axis |
| `showYAxis` | `boolean` | `true` | Show Y-axis |

### DashboardCommonProps

Inherited from `DashboardCommonProps`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `true` | Show widget header |
| `headerTitle` | `string \| ReactNode` | - | Header title or custom content |
| `headerIcon` | `string` | - | Material icon name |
| `headerSummary` | `string` | - | Header summary text |
| `headerColor` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | - | Header color variant |
| `showAlertLight` | `boolean` | `false` | Show alert light indicator |
| `alertLightColor` | `string` | - | Alert light color (CSS color value) |
| `className` | `string` | `''` | Additional CSS classes |

## Design System Integration

### Colors
- Uses design system color variables
- Supports theme switching (light/dark)
- Consistent with other dashboard widgets

### Typography
- Follows Lululemon typography scale
- Responsive text sizing
- Proper font weights and line heights

### Spacing
- Uses design system spacing tokens
- Consistent padding and margins
- Responsive layout

## Future Extensibility

The component is designed to easily support additional view modes:

```typescript
// Future enhancement example
type DataWidgetViewMode = 'table' | 'chart' | 'bar' | 'pie'

interface SwitchableDataWidgetProps {
  // ... existing props
  barChartConfig?: BarChartConfig
  pieChartConfig?: PieChartConfig
}
```

## Best Practices

1. **Data Consistency**: Ensure table and chart data represent the same information
2. **Color Coding**: Use consistent colors between table status indicators and chart lines
3. **Performance**: Keep data arrays reasonably sized (< 1000 rows for smooth performance)
4. **Accessibility**: The toggle button includes aria-label for screen readers
5. **Responsive**: Test both views on different screen sizes

## Examples in Codebase

See the implementation in:
- `app/src/pages/playground/_luluDemo/JingjingOnePage_V0/index.tsx`
- Usage of "Today's Target" widget with switchable views

## Related Components

- [TableWidget](../TableWidget/README.md) - Table view
- [TrendChart](../TrendChart/README.md) - Chart view
- [DashboardWidgetFrame](../DashboardWidgetFrame/README.md) - Container framework

