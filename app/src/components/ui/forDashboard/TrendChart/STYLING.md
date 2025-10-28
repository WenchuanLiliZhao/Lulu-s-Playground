# TrendChart Styling Configuration

## Configurable SCSS Variables

The TrendChart component provides SCSS variables that can be customized to adjust the visual appearance of the chart.

### Y-Axis Configuration

#### `$y-axis-label-font-size`
- **Default**: `12px`
- **Purpose**: Controls the font size of Y-axis tick labels (numbers)
- **Usage**: Adjust this to make Y-axis values larger or smaller

### Complete Variable List

```scss
// Y-axis specific
$y-axis-label-font-size: 12px !default;

// X-axis
$x-axis-label-font-size: 12px !default;

// Chart layout
$chart-title-font-size: 18px !default;
$chart-padding: 0 !default;
$chart-background-color: transparent !default;
$chart-border: none !default;
```

## Y-Axis Configuration (TypeScript Props)

Y-axis spacing and layout are controlled via TypeScript props:

```tsx
<TrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={60}          // Space allocated for Y-axis (default: 60px)
  yAxisTickMargin={8}      // Distance between labels and axis line (default: 8px)
/>
```

**Defaults for TrendChart**:
- `yAxisWidth`: `60px` - Space allocated for Y-axis area
- `yAxisTickMargin`: `8px` - Gap between tick labels and axis line

## Comparison: TrendChart vs MiniTrendChart

| Setting | TrendChart | MiniTrendChart | Reason |
|---------|------------|----------------|--------|
| `yAxisWidth` (TS) | `60px` | `40px` | Full chart needs more space |
| `yAxisTickMargin` (TS) | `8px` | `5px` | More compact spacing in mini version |
| `$y-axis-label-font-size` (SCSS) | `12px` | `10px` | Compact chart uses smaller text |

## How to Customize

### Option 1: Override SCSS Variables (For font size)

```scss
@use 'path/to/TrendChart/_styles.module.scss' with (
  $y-axis-label-font-size: 14px
);
```

### Option 2: Component Props (For spacing and layout)

```tsx
<TrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={70}          // Wider Y-axis area
  yAxisTickMargin={10}     // More spacing between labels and axis
/>
```

## Visual Impact

### `yAxisTickMargin` Effect

```
Small margin (5px):          Large margin (12px):
10k|                         10k    |
 8k|                          8k    |
 6k|                          6k    |
 4k|                          4k    |
    └─────                           └─────
```

### `yAxisWidth` Effect

```
Narrow width (40px):         Wide width (80px):
10k|                         10,000|
 8k|                          8,000|
 6k|                          6,000|
```

## Best Practices

1. **Keep spacing proportional**: Larger font sizes typically need larger `yAxisTickMargin`
2. **Test with actual data**: Make sure the widest Y-axis label fits within `yAxisWidth`
3. **Maintain consistency**: Use the same settings across similar charts in your dashboard
4. **Consider responsiveness**: Smaller screens may need smaller fonts and tighter spacing
5. **Adjust spacing via props**: Use `yAxisTickMargin` prop for instance-specific adjustments

## Examples

### Compact Style
```tsx
<TrendChart
  yAxisWidth={50}
  yAxisTickMargin={6}
  // SCSS: $y-axis-label-font-size: 11px
/>
```

### Spacious Style
```tsx
<TrendChart
  yAxisWidth={70}
  yAxisTickMargin={10}
  // SCSS: $y-axis-label-font-size: 13px
/>
```

