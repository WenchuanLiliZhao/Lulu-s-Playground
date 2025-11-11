# TrendChart Usage Examples

This document provides practical examples of using the updated TrendChart component with the new series-based format.

## Quick Reference

```typescript
import { TrendChart } from '@lululemon-ui'
import type { ChartSeriesConfig } from '@lululemon-ui'

// Chart display modes
type ChartDisplayMode = 'line' | 'column' | 'area'
```

## Example 1: Line Chart (Trend Curve)

Perfect for showing trends over time with continuous data.

```typescript
const series: ChartSeriesConfig[] = [
  {
    defaultShowAs: 'line',
    data: [
      { id: 'h10-12', name: '10:00-12:00', sales: 19834, target: 29765 },
      { id: 'h12-14', name: '12:00-14:00', sales: 36848, target: 48186 },
      { id: 'h14-16', name: '14:00-16:00', sales: 24801, target: 29765 },
      { id: 'h16-18', name: '16:00-18:00', sales: 43234, target: 42519 },
      { id: 'h18-20', name: '18:00-20:00', sales: 34012, target: 37563 },
    ],
    lines: [
      {
        dataKey: 'sales',
        name: 'Net Sales (Achieved)',
        color: 'var(--hot-heat-4)',
      },
      {
        dataKey: 'target',
        name: 'Net Sales (Goal)',
        color: 'var(--hot-heat-4)',
        strokeDasharray: '5 5',
        opacity: 0.4,
      },
    ],
  },
]

<TrendChart
  title="Today's Sales Performance"
  series={series}
  showGrid={true}
  showLegend={true}
/>
```

## Example 2: Column Chart (Bar Chart)

Best for comparing discrete values or categories.

```typescript
const series: ChartSeriesConfig[] = [
  {
    defaultShowAs: 'column',
    data: [
      { id: 'mon', name: 'Monday', sales: 42000, target: 40000 },
      { id: 'tue', name: 'Tuesday', sales: 38000, target: 40000 },
      { id: 'wed', name: 'Wednesday', sales: 45000, target: 42000 },
      { id: 'thu', name: 'Thursday', sales: 47000, target: 43000 },
      { id: 'fri', name: 'Friday', sales: 52000, target: 45000 },
    ],
    lines: [
      {
        dataKey: 'sales',
        name: 'Actual Sales',
        color: '#82ca9d',
      },
      {
        dataKey: 'target',
        name: 'Target',
        color: '#ffc658',
      },
    ],
  },
]

<TrendChart
  title="Weekly Sales Comparison"
  series={series}
  barSize={60}
  barRadius={[8, 8, 0, 0]}
  showGrid={true}
  showLegend={true}
/>
```

## Example 3: Area Chart

Ideal for showing volume or magnitude over time with emphasis on cumulative values.

```typescript
const series: ChartSeriesConfig[] = [
  {
    defaultShowAs: 'area',
    data: [
      { id: '9am', name: '9:00', customers: 120, browsers: 180 },
      { id: '10am', name: '10:00', customers: 180, browsers: 250 },
      { id: '11am', name: '11:00', customers: 250, browsers: 320 },
      { id: '12pm', name: '12:00', customers: 300, browsers: 380 },
      { id: '1pm', name: '13:00', customers: 280, browsers: 350 },
    ],
    lines: [
      {
        dataKey: 'browsers',
        name: 'Store Browsers',
        color: '#8884d8',
        opacity: 0.5,
      },
      {
        dataKey: 'customers',
        name: 'Purchasing Customers',
        color: '#82ca9d',
        opacity: 0.7,
      },
    ],
  },
]

<TrendChart
  title="Hourly Traffic & Conversions"
  series={series}
  showGrid={true}
  showLegend={true}
/>
```

## Example 4: Multiple Metrics in One Chart

```typescript
const series: ChartSeriesConfig[] = [
  {
    defaultShowAs: 'line',
    data: [
      { 
        id: 'w1', 
        name: 'Week 1', 
        revenue: 45000, 
        transactions: 230,
        avgBasket: 195 
      },
      { 
        id: 'w2', 
        name: 'Week 2', 
        revenue: 48000, 
        transactions: 245,
        avgBasket: 196 
      },
      { 
        id: 'w3', 
        name: 'Week 3', 
        revenue: 52000, 
        transactions: 265,
        avgBasket: 196 
      },
    ],
    lines: [
      {
        dataKey: 'revenue',
        name: 'Revenue (¥)',
        color: 'var(--indigo-4)',
        strokeWidth: 3,
      },
      {
        dataKey: 'transactions',
        name: 'Transactions',
        color: 'var(--wilderness-4)',
        strokeWidth: 2,
      },
      {
        dataKey: 'avgBasket',
        name: 'Avg Basket Size',
        color: 'var(--amber-4)',
        strokeWidth: 2,
        strokeDasharray: '5 5',
      },
    ],
  },
]

<TrendChart
  title="Weekly Business Metrics"
  series={series}
  showGrid={true}
  showLegend={true}
  showDots={true}
/>
```

## Example 5: Using with SwitchableDataWidget

The new format integrates seamlessly with `SwitchableDataWidget` for table/chart switching:

```typescript
import { SwitchableDataWidget } from '@lululemon-ui'

<SwitchableDataWidget
  widgetId="today-plan"
  showHeader={true}
  headerTitle="Today's Plan"
  headerColor="primary"
  tableConfig={{
    columns: targetColumns,
    data: mockTargetTableData,
    striped: true,
    hoverable: true,
    bordered: true,
    size: "medium",
    rowKey: (row) => row.id,
  }}
  chartConfig={{
    series: [
      {
        defaultShowAs: 'line', // Can easily change to 'column' or 'area'
        data: chartData,
        lines: chartLines,
      },
    ],
    height: 300,
    showGrid: true,
    showLegend: true,
    showXAxis: true,
    showYAxis: true,
  }}
  onModeChange={(mode) => {
    console.log(`View switched to: ${mode}`)
  }}
/>
```

## Switching Chart Types

To change the visualization type, simply update the `defaultShowAs` value:

```typescript
// Line chart
defaultShowAs: 'line'

// Column chart
defaultShowAs: 'column'

// Area chart
defaultShowAs: 'area'
```

## Benefits of the New Format

1. **Consistent API**: Same data structure for all chart types
2. **Easy Type Switching**: Change visualization with one property
3. **Type Safety**: Full TypeScript support
4. **Backward Compatible**: Legacy format still works
5. **Extensible**: Easy to add new chart types in the future

## Tips

- Use **line charts** for continuous trends over time
- Use **column charts** for comparing discrete categories
- Use **area charts** to emphasize volume or magnitude
- Combine with `SwitchableDataWidget` for maximum flexibility
- Adjust `barSize` and `barRadius` for column charts to match your design
- Use `opacity` in line configuration to create layered area effects

