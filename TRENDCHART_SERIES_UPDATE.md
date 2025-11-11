# TrendChart Series Format Update

## Overview

The `TrendChart` component has been updated to support a unified data format that allows for multiple display modes (line, column, area) through a series-based configuration. This provides a more flexible and consistent API for XY-axis charts.

## Changes Made

### 1. TrendChart Component Enhancement

**File**: `app/src/components/ui/forDashboard/TrendChart/_component.tsx`

#### New Types Added:

```typescript
// Display mode for chart
export type ChartDisplayMode = 'line' | 'column' | 'area'

// Series configuration with display mode
export interface ChartSeriesConfig {
  defaultShowAs: ChartDisplayMode
  data: TrendChartDataPoint[]
  lines: TrendChartLine[]
}
```

#### Updated Props:

The component now supports both legacy and new formats:

- **Legacy format**: `data` + `lines` (still supported for backward compatibility)
- **New format**: `series` (array of `ChartSeriesConfig`)

When `series` is provided, it takes priority over the legacy `data`/`lines` props.

#### New Features:

- **Multiple Display Modes**: Support for `'line'`, `'column'`, and `'area'` chart types
- **Bar Configuration**: Added `barSize` and `barRadius` props for column charts
- **Automatic Mode Detection**: Chart automatically renders based on `defaultShowAs` value

### 2. Updated Exports

**File**: `app/src/components/ui/forDashboard/TrendChart/index.ts`

Exported new types for external use:
- `ChartDisplayMode`
- `ChartSeriesConfig`

### 3. Applied to JingjingOnePage_V0

**File**: `app/src/pages/playground/_luluDemo/JingjingOnePage_V0/data.ts`

Updated the "Today's Plan" chart data to use the new series format:

```typescript
todayTargetDetail: {
  // ... other properties ...
  chartSeries: [
    {
      defaultShowAs: 'line' as const, // Can be changed to 'column' or 'area'
      data: mockTargetTableData.map((row) => ({
        id: row.id,
        name: row.time,
        netSalesAchieved: row.netSales.achieve,
        netSalesGoal: row.netSales.goal,
      })),
      lines: [
        {
          dataKey: "netSalesAchieved",
          name: "Net Sales (Achieved)",
          color: "var(--hot-heat-4)",
        },
        {
          dataKey: "netSalesGoal",
          name: "Net Sales (Goal)",
          color: "var(--hot-heat-4)",
          strokeDasharray: "5 5",
          opacity: 0.4,
        },
      ],
    },
  ],
}
```

**File**: `app/src/pages/playground/_luluDemo/JingjingOnePage_V0/index.tsx`

Updated the chart configuration to use the new series format:

```typescript
chartConfig={{
  series: mockDashboardData.todayTargetDetail.chartSeries,
  height: 300,
  showGrid: true,
  showLegend: true,
  showXAxis: true,
  showYAxis: true,
}}
```

### 4. Updated SwitchableDataWidget

**File**: `app/src/components/ui/forDashboard/SwitchableDataWidget/_component.tsx`

Simplified the chart rendering to properly spread all chartConfig props:

```typescript
<TrendChartCore
  {...chartConfig}
  marginLeft={12}
  marginRight={32}
/>
```

This allows the `series` prop (or legacy `data`/`lines` props) to be passed through correctly.

## Usage Examples

### New Format (Recommended)

#### Line Chart
```typescript
const series = [{
  defaultShowAs: 'line',
  data: [
    { id: '1', name: 'Jan', revenue: 12000 },
    { id: '2', name: 'Feb', revenue: 13500 },
  ],
  lines: [
    { dataKey: 'revenue', name: 'Revenue', color: '#8884d8' }
  ],
}]

<TrendChart series={series} />
```

#### Column Chart
```typescript
const series = [{
  defaultShowAs: 'column',
  data: [...],
  lines: [...],
}]

<TrendChart 
  series={series}
  barSize={40}
  barRadius={[8, 8, 0, 0]}
/>
```

#### Area Chart
```typescript
const series = [{
  defaultShowAs: 'area',
  data: [...],
  lines: [
    { dataKey: 'users', name: 'Users', color: '#82ca9d', opacity: 0.6 }
  ],
}]

<TrendChart series={series} />
```

### Legacy Format (Still Supported)

```typescript
<TrendChart
  data={[...]}
  lines={[...]}
/>
```

## Benefits

1. **Unified API**: Single component for all XY-axis chart types
2. **Backward Compatible**: Existing code continues to work
3. **Flexible Display**: Easy to switch between line, column, and area charts
4. **Type Safe**: Full TypeScript support with proper types
5. **Consistent Data Structure**: Same data format across different chart types

## Migration Guide

To migrate from the legacy format to the new series format:

1. Wrap your existing `data` and `lines` in a series array:
   ```typescript
   // Before
   <TrendChart data={myData} lines={myLines} />
   
   // After
   <TrendChart series={[{
     defaultShowAs: 'line',
     data: myData,
     lines: myLines,
   }]} />
   ```

2. To change chart type, simply update `defaultShowAs`:
   ```typescript
   defaultShowAs: 'column' // or 'area'
   ```

## Testing

All changes have been linted and type-checked. The component maintains backward compatibility with existing implementations.

