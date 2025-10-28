# MiniTrendChart Styling Configuration

## Configurable SCSS Variables

The MiniTrendChart component provides SCSS variables that can be customized to adjust the visual appearance of the chart.

### Y-Axis Configuration

#### `$y-axis-label-font-size`
- **Default**: `10px`
- **Purpose**: Controls the font size of Y-axis tick labels (numbers)
- **Usage**: Adjust this to make Y-axis values larger or smaller
- **Note**: Smaller than TrendChart for compact dashboard widgets

### Complete Variable List

```scss
// Y-axis specific
$y-axis-label-font-size: 10px !default;

// X-axis
$x-axis-label-font-size: 10px !default;

// Chart layout
$chart-title-font-size: 15px !default;
$chart-subtitle-font-size: 13px !default;
$header-margin-bottom: 12px !default;
```

## Y-Axis Configuration (TypeScript Props)

Y-axis spacing and layout are controlled via TypeScript props:

```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={40}          // Space allocated for Y-axis (default: 40px)
  yAxisTickMargin={5}      // Distance between labels and axis line (default: 5px)
/>
```

**Defaults for MiniTrendChart**:
- `yAxisWidth`: `40px` - Space allocated for Y-axis area (compact)
- `yAxisTickMargin`: `5px` - Gap between tick labels and axis line (compact)

## Comparison: TrendChart vs MiniTrendChart

| Setting | TrendChart | MiniTrendChart | Reason |
|---------|------------|----------------|--------|
| `yAxisWidth` (TS) | `60px` | `40px` | Compact widget needs less space |
| `yAxisTickMargin` (TS) | `8px` | `5px` | Tighter spacing for compact view |
| `$y-axis-label-font-size` (SCSS) | `12px` | `10px` | Smaller font for compact view |

## How to Customize

### Option 1: Override SCSS Variables (For font size)

```scss
@use 'path/to/MiniTrendChart/_styles.module.scss' with (
  $y-axis-label-font-size: 11px
);
```

### Option 2: Component Props (For spacing and layout)

```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={45}          // Slightly wider than default
  yAxisTickMargin={6}      // More spacing between labels and axis
/>
```

## Visual Impact

### Compact Dashboard Widget

```
MiniTrendChart (default):
┌─────────────────────────┐
│ Revenue Trend           │
│ 10k|                    │
│  8k|      ╱─────╲       │
│  6k|   ╱─╯      ╲      │
│  4k|─╯─           ╲─   │
│     └──────────────     │
└─────────────────────────┘
     Compact & Clear
```

## Best Practices for Dashboard Widgets

1. **Optimize for space**: Keep Y-axis width minimal but readable
2. **Use formatting**: Apply `yAxisTickFormatter` to show shorter labels (e.g., "10k" instead of "10000")
3. **Test at target size**: Verify readability at actual widget dimensions
4. **Maintain hierarchy**: Ensure Y-axis labels don't overshadow the data

## Examples

### Standard Dashboard Widget (Recommended)
```tsx
<MiniTrendChart
  data={revenueData}
  lines={lines}
  showYAxis={true}
  yAxisWidth={40}  // Default
  yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
  // SCSS: Uses defaults
/>
```

### Compact Mobile Widget
```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={35}          // Even more compact
  yAxisTickMargin={4}      // Tighter spacing
  // SCSS: $y-axis-label-font-size: 9px
/>
```

### Spacious Widget (More Breathing Room)
```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={50}          // Wider
  yAxisTickMargin={6}      // More spacing
  // SCSS: $y-axis-label-font-size: 11px
/>
```

## Formatter Examples

Format large numbers compactly to fit in narrow Y-axis:

```tsx
// Currency (compact)
yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
// 45000 → "$45k"

// Percentage
yAxisTickFormatter={(value) => `${value}%`}
// 85 → "85%"

// Large numbers with M/K
yAxisTickFormatter={(value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}}
// 1500000 → "1.5M", 45000 → "45K"
```

## Integration with Dashboard

```tsx
// Dashboard widget with Y-axis
<MiniTrendChart
  // Dashboard header
  showHeader={true}
  headerIcon="trending_up"
  headerTitle="Monthly Revenue"
  headerSummary="Last 12 months"
  
  // Chart data
  data={data}
  lines={lines}
  
  // Y-axis configuration
  showYAxis={true}
  yAxisWidth={45}
  yAxisTickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
  
  // Styling
  height={180}
  showGrid={true}
/>
```

