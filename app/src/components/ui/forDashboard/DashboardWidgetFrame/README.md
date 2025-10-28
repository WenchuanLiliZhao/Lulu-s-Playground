# DashboardWidgetFrame

A common frame component that provides consistent container, alert light, and header rendering for all dashboard widgets.

## Purpose

`DashboardWidgetFrame` eliminates code duplication across dashboard widgets by centralizing:
- Container rendering with consistent styling
- Alert light indicator (top-right corner)
- Dashboard header (icon, title, summary)
- Loading and error states
- Flexible content placement via slots

## Architecture

This component uses the **Composition Pattern** with **Slots** for maximum flexibility:
- **Children**: Main widget content
- **Slots**: Optional render functions for before/after header and footer
- **Props**: All common dashboard props (`DashboardCommonProps`)

## Usage

### Basic Usage

```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'

<DashboardWidgetFrame
  showHeader={true}
  headerTitle="My Widget"
  showAlertLight={true}
  alertLightColor="#10b981"
>
  <YourWidgetContent />
</DashboardWidgetFrame>
```

### With Dashboard Header

```tsx
<DashboardWidgetFrame
  showHeader={true}
  headerIcon="analytics"
  headerTitle="Sales Metrics"
  headerSummary="Last 30 days performance"
  headerTitleSize="large"
  showAlertLight={true}
>
  <MetricContent value="$45K" />
</DashboardWidgetFrame>
```

### With Slots (Advanced)

```tsx
<DashboardWidgetFrame
  showHeader={true}
  headerTitle="Trend Analysis"
  renderAfterHeader={() => (
    <DateFilter 
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
    />
  )}
  renderFooter={() => (
    <ChartLegend items={legendItems} />
  )}
>
  <TrendChartContent data={data} />
</DashboardWidgetFrame>
```

### With Loading State

```tsx
<DashboardWidgetFrame
  showHeader={true}
  headerTitle="Loading Data"
  loading={isLoading}
>
  <YourWidgetContent />
</DashboardWidgetFrame>
```

### With Error State

```tsx
<DashboardWidgetFrame
  showHeader={true}
  headerTitle="Failed to Load"
  error={error}
>
  <YourWidgetContent />
</DashboardWidgetFrame>
```

### With Custom Content Styling

```tsx
<DashboardWidgetFrame
  showHeader={true}
  headerTitle="Custom Widget"
  contentClassName={styles.customContent}
>
  <YourWidgetContent />
</DashboardWidgetFrame>
```

## Props

### Dashboard Common Props (from `DashboardCommonProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `false` | Whether to show the dashboard header |
| `headerIcon` | `string` | - | Material Symbol icon name |
| `headerTitle` | `string` | - | Header title text |
| `headerSummary` | `string` | - | Header summary/description |
| `headerTitleSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Title font size |
| `headerIconSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Icon size |
| `headerSummarySize` | `'small' \| 'medium' \| 'large'` | - | Summary font size (follows titleSize if not set) |
| `headerColor` | `DashboardColorType` | `'secondary'` | Header text color |
| `showAlertLight` | `boolean` | `false` | Whether to show alert light indicator |
| `alertLightColor` | `string` | `'#10b981'` | Alert light color (CSS color value) |
| `className` | `string` | `''` | Additional className for container |

### Frame-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Main widget content |
| `renderBeforeHeader` | `() => ReactNode` | - | Optional content before header |
| `renderAfterHeader` | `() => ReactNode` | - | Optional content after header (e.g., date filters) |
| `renderFooter` | `() => ReactNode` | - | Optional content at bottom (e.g., legends) |
| `contentClassName` | `string` | `''` | Additional className for content wrapper |
| `loading` | `boolean` | `false` | Show loading state (hides content) |
| `error` | `Error \| null` | `null` | Show error state (hides content) |

## Slots Explained

### `renderBeforeHeader`
Renders content **before** the dashboard header.

**Use cases**:
- Custom banners
- Top-level alerts

### `renderAfterHeader`
Renders content **after** the dashboard header.

**Use cases**:
- Date filters
- Action buttons
- Tabs/navigation

**Example**:
```tsx
renderAfterHeader={() => (
  <div style={{ marginTop: '12px' }}>
    <DateFilter {...dateFilterProps} />
  </div>
)}
```

### `renderFooter`
Renders content at the **bottom** of the widget.

**Use cases**:
- Chart legends
- Pagination
- Summary rows
- Action links

**Example**:
```tsx
renderFooter={() => (
  <div className={styles.legend}>
    <span className={styles.legendItem}>● Healthy</span>
    <span className={styles.legendItem}>● Warning</span>
  </div>
)}
```

## Styling

### Container
The frame provides a consistent container with:
- Background color: `var(--color-bg-main)`
- Border radius: `12px`
- Padding: `20px`
- Box shadow with hover effect

### Alert Light
- Position: Absolute top-right (12px from top and right)
- Size: 8px circle
- Glow effect using box-shadow

### Dashboard Header
- Margin bottom: `16px`
- Icon and title horizontal layout
- Summary below title

### Content Area
Minimal styling - child components control their own layout.

Use `contentClassName` prop to add widget-specific spacing if needed.

## Examples in Codebase

See how existing widgets use `DashboardWidgetFrame`:

### MetricWidget
Simple usage with no slots:
```tsx
<DashboardWidgetFrame {...frameProps}>
  <MetricHeader />
  <MetricValue />
  <MetricFooter />
  <Sparkline />
</DashboardWidgetFrame>
```

### ProgressBarChart
Uses `renderFooter` slot for legend:
```tsx
<DashboardWidgetFrame
  {...frameProps}
  renderFooter={() => <Legend />}
>
  <InternalHeader />
  <ChartContent />
</DashboardWidgetFrame>
```

### MiniTrendChart
Uses `renderAfterHeader` for date filter when dashboard header is shown:
```tsx
<DashboardWidgetFrame
  {...frameProps}
  renderAfterHeader={
    showHeader && enableDateFilter 
      ? () => <DateFilter {...filterProps} />
      : undefined
  }
>
  <InternalHeader />
  <ChartWrapper />
</DashboardWidgetFrame>
```

### TrendChart
Uses `renderAfterHeader` for date filter:
```tsx
<DashboardWidgetFrame
  {...frameProps}
  renderAfterHeader={
    enableDateFilter 
      ? () => <DateFilter {...filterProps} />
      : undefined
  }
>
  <ChartWrapper />
</DashboardWidgetFrame>
```

## Best Practices

### DO ✅

1. **Use for all dashboard widgets** - Consistency is key
2. **Keep frame props at top level** - Pass all `DashboardCommonProps` to frame
3. **Use slots for optional content** - `renderAfterHeader`, `renderFooter`
4. **Let children control their layout** - Don't fight with frame styles
5. **Use `contentClassName` for spacing** - Add widget-specific spacing when needed

### DON'T ❌

1. **Don't put business logic in frame** - Frame is for presentation only
2. **Don't manage data in frame** - Data handling stays in widget components
3. **Don't override frame container styles** - Use `contentClassName` instead
4. **Don't render alert lights manually** - Use `showAlertLight` prop
5. **Don't render dashboard headers manually** - Use `showHeader` prop

## Migration Guide

See `_WIDGET_FRAME_IMPLEMENTATION_GUIDE.md` for detailed migration instructions.

### Quick Migration Checklist

For existing widgets:

1. Import `DashboardWidgetFrame`
2. Remove manual frame code:
   - Container rendering
   - Alert light rendering
   - Dashboard header rendering
3. Wrap content in `<DashboardWidgetFrame>`
4. Pass frame props to frame
5. Keep widget-specific content as children
6. Use slots for special content (date filters, legends)
7. Update styles (remove container, alert-light, dashboard-header classes)
8. Test thoroughly

## Type Definitions

```typescript
interface DashboardWidgetFrameProps extends DashboardCommonProps {
  children: ReactNode
  renderBeforeHeader?: () => ReactNode
  renderAfterHeader?: () => ReactNode
  renderFooter?: () => ReactNode
  contentClassName?: string
  loading?: boolean
  error?: Error | null
}
```

See `_shared-types.ts` for `DashboardCommonProps` definition.

## Related Components

- `DashboardHeaderElement` - Internal header renderer
- `DashboardAlertLightElement` - Internal alert light renderer
- `MetricWidget` - Example usage
- `ProgressBarChart` - Example with footer slot
- `MiniTrendChart` - Example with after-header slot
- `TrendChart` - Example with after-header slot

## Future Enhancements

Potential future features (not yet implemented):

- Collapse/expand functionality
- Export/download buttons
- Refresh button
- Tooltips on headers
- Keyboard navigation
- Accessibility improvements (ARIA labels)

---

**Component Type**: Frame/Container  
**Status**: Active  
**Created**: 2025-10-28  
**Last Updated**: 2025-10-28

