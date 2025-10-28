# Chart Components Refactoring

## Overview

This document describes the refactoring of `TrendChart` and `MiniTrendChart` components to use shared types and configurations, ensuring long-term maintainability and consistency.

## What Changed

### 1. New Shared Files

#### `_shared-chart-types.ts`
- **Purpose**: Defines common types and interfaces for all chart components
- **Key Exports**:
  - `BaseChartDataPoint`: Base data point structure
  - `BaseChartLine`: Line configuration interface
  - `BaseChartProps`: Combined chart props interface
  - `ChartXAxisProps`: X-axis configuration
  - `ChartYAxisProps`: Y-axis configuration (NEW!)
  - `ChartVisualProps`: Visual styling options
  - `ChartDateFilterProps`: Date filtering configuration

#### `_shared-config.ts` (Enhanced)
- **New Exports**:
  - `CHART_DEFAULTS`: Base chart configuration
  - `TREND_CHART_DEFAULTS`: Full-size chart defaults (moved from `TrendChart/_defaults.ts`)
  - `MINI_TREND_CHART_DEFAULTS`: Compact chart defaults (moved from `MiniTrendChart/_defaults.ts`)

### 2. Enhanced Y-Axis Support

Both `TrendChart` and `MiniTrendChart` now support the following Y-axis props:

```typescript
{
  showYAxis?: boolean              // Show/hide Y-axis
  yAxisWidth?: number              // Y-axis width in pixels
  yAxisOrientation?: 'left' | 'right'  // Y-axis position
  yAxisTickFormatter?: (value: number) => string  // Custom tick formatter
  yAxisDomain?: [number | 'auto' | 'dataMin', number | 'auto' | 'dataMax']  // Y-axis range
  yAxisLabel?: string              // Y-axis label/unit text
  yAxisLabelAngle?: number         // Y-axis label rotation angle
}
```

### 3. Backward Compatibility

✅ **All existing code continues to work without changes**

- Default values remain the same
- All existing props are preserved
- Component behavior is unchanged for existing usage

#### Default Differences

| Feature | TrendChart | MiniTrendChart |
|---------|------------|----------------|
| `showYAxis` | `true` | `false` (compact view) |
| `yAxisWidth` | `60` | `40` |
| `showGrid` | `true` | `false` |
| `showDots` | `true` | `false` |
| `animationDuration` | `1500ms` | `1000ms` |

## Usage Examples

### Example 1: Enable Y-Axis in MiniTrendChart

```typescript
import { MiniTrendChart } from '@/components/ui/forDashboard'

<MiniTrendChart
  data={salesData}
  lines={[
    { dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' }
  ]}
  showYAxis={true}  // Enable Y-axis
  yAxisWidth={50}   // Adjust width
/>
```

### Example 2: Format Y-Axis Ticks

```typescript
<MiniTrendChart
  data={salesData}
  lines={lines}
  showYAxis={true}
  yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
  yAxisLabel="Revenue (USD)"
/>
```

### Example 3: Custom Y-Axis Domain

```typescript
<TrendChart
  data={performanceData}
  lines={lines}
  yAxisDomain={[0, 100]}  // Fixed range 0-100
  yAxisTickFormatter={(value) => `${value}%`}
  yAxisLabel="Performance Score"
/>
```

### Example 4: Right-Aligned Y-Axis

```typescript
<TrendChart
  data={data}
  lines={lines}
  yAxisOrientation="right"  // Move Y-axis to right side
/>
```

## Migration Guide

### For Component Consumers

No changes required! All existing code continues to work.

If you want to use new Y-axis features:

```typescript
// Before (Y-axis hidden by default in MiniTrendChart)
<MiniTrendChart data={data} lines={lines} />

// After (enable Y-axis with custom formatting)
<MiniTrendChart 
  data={data} 
  lines={lines}
  showYAxis={true}
  yAxisTickFormatter={(value) => `$${value}`}
/>
```

### For Component Developers

When creating new chart components:

1. **Extend shared types**:
```typescript
import type { BaseChartProps, BaseChartDataPoint, BaseChartLine } from '../_shared-chart-types'

export interface MyChartProps extends BaseChartProps {
  // Add component-specific props only
}
```

2. **Use shared defaults**:
```typescript
import { CHART_DEFAULTS } from '../_shared-config'

export const MY_CHART_DEFAULTS = {
  ...CHART_DEFAULTS,
  // Override specific values
  showYAxis: true,
  yAxisWidth: 60,
}
```

3. **Export from index**:
```typescript
export { MY_CHART_DEFAULTS } from '../_shared-config'
```

## Benefits

### 1. **DRY (Don't Repeat Yourself)**
- Single source of truth for chart configuration
- Shared types reduce code duplication
- Centralized defaults

### 2. **Consistency**
- All chart components use the same prop names
- Uniform behavior across components
- Consistent API surface

### 3. **Maintainability**
- Changes to shared types automatically propagate
- Easier to add new features
- Reduced chance of bugs

### 4. **Type Safety**
- Strong typing for all chart props
- Better IDE autocomplete
- Compile-time error detection

### 5. **Flexibility**
- Easy to create new chart variants
- Simple to extend with new features
- Backward compatible

## Future Enhancements

Potential future improvements:

1. **Grid Customization**
   - `gridStrokeDasharray`
   - `gridOpacity`
   - `gridColor`

2. **Tooltip Customization**
   - `tooltipFormatter`
   - `tooltipLabelFormatter`
   - Custom tooltip component

3. **Legend Customization**
   - `legendIconType`
   - `legendFormatter`
   - Custom legend component

4. **Axis Label Customization**
   - `xAxisLabelFormatter`
   - `xAxisTickCount`
   - Date/time formatting helpers

5. **Animation Options**
   - `animationEasing`
   - `animationBegin`
   - Disable animation per line

## Files Changed

### Created:
- `_shared-chart-types.ts` - New shared chart types

### Modified:
- `_shared-config.ts` - Added chart defaults
- `TrendChart/_component.tsx` - Uses shared types, enhanced Y-axis
- `TrendChart/index.ts` - Exports from shared config
- `MiniTrendChart/_component.tsx` - Uses shared types, enhanced Y-axis
- `MiniTrendChart/index.ts` - Exports from shared config
- `index.ts` - Exports shared chart types and configs

### Deleted:
- `TrendChart/_defaults.ts` - Moved to shared config
- `MiniTrendChart/_defaults.ts` - Moved to shared config

## Questions?

If you have questions about this refactoring or need help using the new features, please reach out to the team.

