# TrendView Grid Space Calculation

## Overview

The `calcGridSpace()` function ensures that x-axis data points in the trend chart maintain a minimum spacing of 32px, preventing overcrowded labels and improving readability.

## Function: `calcGridSpace()`

Located in `gridSpaceUtils.ts`, this function calculates the appropriate x-axis interval based on data density.

### Parameters

- `dataPointCount` (number): Number of data points to display
- `chartWidth` (number, default: 800): Available chart width in pixels

### Returns

- `number`: The interval value
  - `0` = show all data points (sufficient space available)
  - `n` = show every (n+1)th data point

### Algorithm

```
spacePerPoint = chartWidth / (dataPointCount - 1)

if spacePerPoint >= 32px:
    interval = 0 (show all)
else:
    interval = ceil(32 / spacePerPoint) - 1
```

## Usage in TrendView

The function is applied dynamically based on zoom level:

### Day View
- **High density**: 1,096 daily data points (2023-2025)
- **Calculation**: `calcGridSpace(1096, 800)` → interval ≈ 43
- **Result**: Shows every 44th day to maintain 32px spacing

### Week View
- **Medium density**: ~157 weekly data points
- **Calculation**: `calcGridSpace(157, 800)` → interval ≈ 5
- **Result**: Shows every 6th week

### Month View
- **Low density**: 36 monthly data points
- **Calculation**: `calcGridSpace(36, 800)` → interval = 1
- **Result**: Shows every 2nd month

### Quarter View
- **Very low density**: 12 quarterly data points
- **Fixed**: interval = 0
- **Result**: Shows all quarters (sufficient space)

### Year View
- **Minimal density**: 3 yearly data points
- **Fixed**: interval = 0
- **Result**: Shows all years

## Examples

```typescript
import { calcGridSpace } from './gridSpaceUtils'

// Example 1: 100 data points, 800px chart
calcGridSpace(100, 800)
// spacePerPoint = 800/99 ≈ 8px < 32px
// interval = ceil(32/8) - 1 = 3
// Returns: 3 (show indices: 0, 4, 8, 12, ...)

// Example 2: 20 data points, 800px chart
calcGridSpace(20, 800)
// spacePerPoint = 800/19 ≈ 42px > 32px
// Returns: 0 (show all points)

// Example 3: 200 data points, 1200px chart
calcGridSpace(200, 1200)
// spacePerPoint = 1200/199 ≈ 6px < 32px
// interval = ceil(32/6) - 1 = 5
// Returns: 5 (show every 6th point)
```

## Benefits

✅ **Responsive**: Adapts to different data densities automatically  
✅ **Readable**: Ensures labels never overlap  
✅ **Consistent**: Maintains uniform spacing across all zoom levels  
✅ **Reusable**: Exported function can be used in other chart components  
✅ **Configurable**: Minimum spacing (32px) can be easily adjusted

