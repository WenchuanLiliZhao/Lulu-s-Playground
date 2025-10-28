# Y-Axis Configuration Examples

Quick reference guide for using Y-axis features in MiniTrendChart and TrendChart.

## Basic Examples

### Enable Y-Axis in MiniTrendChart

```tsx
import { MiniTrendChart } from '@/components/ui/forDashboard'

// MiniTrendChart with Y-axis enabled
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}  // ⭐ Enable Y-axis (default: false)
/>
```

### Format Currency Values

```tsx
<MiniTrendChart
  data={salesData}
  lines={[
    { dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' }
  ]}
  showYAxis={true}
  yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
  // Example: 45000 → "$45.0k"
/>
```

### Format Percentage Values

```tsx
<TrendChart
  data={performanceData}
  lines={lines}
  yAxisTickFormatter={(value) => `${value}%`}
  yAxisDomain={[0, 100]}  // Fixed range 0-100%
  // Example: 85 → "85%"
/>
```

### Large Numbers with K/M Formatting

```tsx
const formatLargeNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisTickFormatter={formatLargeNumber}
  // Example: 1500000 → "1.5M", 45000 → "45.0K"
/>
```

## Advanced Examples

### Y-Axis with Label

```tsx
<TrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisLabel="Revenue (USD)"  // ⭐ Add axis label
  yAxisLabelAngle={-90}       // Vertical text (default)
  yAxisTickFormatter={(value) => `$${value}`}
/>
```

### Right-Side Y-Axis

```tsx
<TrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisOrientation="right"  // ⭐ Move to right side (default: 'left')
  yAxisWidth={60}
/>
```

### Custom Y-Axis Range

```tsx
<TrendChart
  data={data}
  lines={lines}
  yAxisDomain={[0, 'auto']}  // ⭐ Start from 0, auto-calculate max
/>

// Or fixed range:
<TrendChart
  data={data}
  lines={lines}
  yAxisDomain={[0, 100]}  // Fixed range 0-100
/>
```

### Compact Y-Axis

```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisWidth={35}  // ⭐ Narrow Y-axis (default: 40)
  yAxisTickFormatter={(value) => `${value}`}
/>
```

## Dashboard Widget Example

```tsx
import { MiniTrendChart } from '@/components/ui/forDashboard'

const SalesWidget = () => {
  const data = [
    { name: 'Jan', revenue: 45000, orders: 234 },
    { name: 'Feb', revenue: 52000, orders: 289 },
    { name: 'Mar', revenue: 48000, orders: 267 },
    // ...
  ]

  const lines = [
    { dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' },
  ]

  return (
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
      yAxisWidth={50}
      yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      
      // Chart styling
      height={200}
      showGrid={true}
      showDots={true}
    />
  )
}
```

## Comparison: Before vs After

### Before (No Y-Axis)

```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  // Y-axis is hidden - users see lines but no scale reference
/>
```

### After (With Y-Axis)

```tsx
<MiniTrendChart
  data={data}
  lines={lines}
  showYAxis={true}
  yAxisTickFormatter={(value) => `$${value}`}
  // ✅ Users can now see the actual values on Y-axis
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showYAxis` | `boolean` | TrendChart: `true`<br>MiniTrendChart: `false` | Show/hide Y-axis |
| `yAxisWidth` | `number` | TrendChart: `60`<br>MiniTrendChart: `40` | Y-axis width in pixels |
| `yAxisOrientation` | `'left' \| 'right'` | `'left'` | Y-axis position |
| `yAxisTickFormatter` | `(value: number) => string` | `undefined` | Custom tick formatter |
| `yAxisDomain` | `[number \| 'auto' \| 'dataMin', number \| 'auto' \| 'dataMax']` | `undefined` | Y-axis range |
| `yAxisLabel` | `string` | `undefined` | Y-axis label text |
| `yAxisLabelAngle` | `number` | `-90` | Y-axis label angle |

## Tips

1. **Keep it Simple**: For most cases, just enable `showYAxis` and optionally add a formatter
2. **Formatting**: Use `yAxisTickFormatter` to make numbers readable (K/M suffixes, currency symbols)
3. **Fixed Domains**: Use `yAxisDomain` when you need consistent scales across multiple charts
4. **Width**: Adjust `yAxisWidth` if your formatted values are being cut off
5. **Compact View**: MiniTrendChart defaults to `showYAxis={false}` for a cleaner dashboard widget

## Common Patterns

### Pattern 1: Currency Chart

```tsx
showYAxis={true}
yAxisTickFormatter={(v) => `$${v}`}
```

### Pattern 2: Percentage Chart

```tsx
showYAxis={true}
yAxisDomain={[0, 100]}
yAxisTickFormatter={(v) => `${v}%`}
```

### Pattern 3: Large Numbers

```tsx
showYAxis={true}
yAxisTickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : v}
```

### Pattern 4: Scientific/Technical

```tsx
showYAxis={true}
yAxisLabel="Temperature (°C)"
yAxisTickFormatter={(v) => v.toFixed(1)}
```

