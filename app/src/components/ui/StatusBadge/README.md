# StatusBadge Component

A versatile badge component for displaying status indicators with appropriate colors, optional icons, and multiple style variants.

## Features

- **Five status types**: Success, warning, danger, info, neutral
- **Three variants**: Light (default), filled, outlined
- **Three sizes**: Small, medium, large
- **Icon support**: Optional icon before label
- **Semantic colors**: Automatic color mapping based on status
- **Accessible**: Good color contrast ratios
- **Design system compliant**: Uses CSS variables

## Usage

### Basic Usage

```tsx
import { StatusBadge } from '@/components/ui/StatusBadge';

<StatusBadge label="Active" status="success" />
```

### With Icons

```tsx
<StatusBadge 
  label="↑ Above" 
  status="success"
/>

<StatusBadge 
  label="On Track" 
  status="info"
/>

<StatusBadge 
  label="↓ Below" 
  status="danger"
/>
```

### Dashboard Metrics Example (from JingJing)

```tsx
// UPT - Above target
<StatusBadge 
  label="↑ Above" 
  status="success"
  variant="light"
/>

// Conversion Rate - On track
<StatusBadge 
  label="On Track" 
  status="info"
  variant="light"
/>

// AUR - Below target
<StatusBadge 
  label="↓ Below" 
  status="danger"
  variant="light"
/>
```

### Size Variants

```tsx
<StatusBadge label="Small" status="success" size="small" />
<StatusBadge label="Medium" status="info" size="medium" />
<StatusBadge label="Large" status="warning" size="large" />
```

### Style Variants

#### Light (Default)
```tsx
<StatusBadge 
  label="Light Style" 
  status="success"
  variant="light"
/>
```

#### Filled
```tsx
<StatusBadge 
  label="Filled Style" 
  status="info"
  variant="filled"
/>
```

#### Outlined
```tsx
<StatusBadge 
  label="Outlined Style" 
  status="warning"
  variant="outlined"
/>
```

### All Status Types

```tsx
<StatusBadge label="Success" status="success" />
<StatusBadge label="Warning" status="warning" />
<StatusBadge label="Danger" status="danger" />
<StatusBadge label="Info" status="info" />
<StatusBadge label="Neutral" status="neutral" />
```

### With Custom Icons

```tsx
<StatusBadge 
  label="Processing" 
  status="info"
  icon={<SpinnerIcon />}
/>

<StatusBadge 
  label="Verified" 
  status="success"
  icon={<CheckIcon />}
/>

<StatusBadge 
  label="Error" 
  status="danger"
  icon={<AlertIcon />}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Badge text label |
| `status` | `'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | Yes | - | Status type |
| `icon` | `React.ReactNode` | No | - | Optional icon element |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | Badge size |
| `variant` | `'filled' \| 'outlined' \| 'light'` | No | `'light'` | Visual style |
| `className` | `string` | No | - | Additional CSS class |

## Status Types

### Success
- **Use for**: Positive states, above target, completed
- **Color**: Green (`--wilderness-4`)
- **Examples**: "✓ Completed", "↑ Above", "+15%"

### Warning
- **Use for**: Caution states, attention needed
- **Color**: Amber/Orange (`--amber-4`)
- **Examples**: "⚠ Review", "Action Required", "Overstock"

### Danger
- **Use for**: Error states, below target, critical
- **Color**: Red (`--hot-heat-4`)
- **Examples**: "✗ Error", "↓ Below", "Critical"

### Info
- **Use for**: Informational states, on track, active
- **Color**: Indigo (`--indigo-5`)
- **Examples**: "ℹ Info", "On Track", "Processing"

### Neutral
- **Use for**: Default states, inactive, pending
- **Color**: Gray (neutral)
- **Examples**: "Pending", "Inactive", "N/A"

## Variants

### Light (Default)
- Colored background with opacity
- Darker text color
- Best for: Most use cases, readability

### Filled
- Solid background color
- White text
- Best for: High emphasis, primary actions

### Outlined
- Transparent background
- Colored border and text
- Best for: Minimal style, secondary information

## Examples

### Metric Status Indicators

```tsx
<div className={styles.metric}>
  <div className={styles.value}>2.3</div>
  <StatusBadge label="↑ Above" status="success" variant="light" />
</div>

<div className={styles.metric}>
  <div className={styles.value}>68%</div>
  <StatusBadge label="On Track" status="info" variant="light" />
</div>

<div className={styles.metric}>
  <div className={styles.value}>$105</div>
  <StatusBadge label="↓ Below" status="danger" variant="light" />
</div>
```

### Order Status

```tsx
<StatusBadge 
  label="Shipped" 
  status="success" 
  variant="filled"
  icon="📦"
/>

<StatusBadge 
  label="Processing" 
  status="info" 
  variant="light"
  icon="⏳"
/>

<StatusBadge 
  label="Delayed" 
  status="warning" 
  variant="outlined"
  icon="⚠️"
/>
```

### Inventory Status

```tsx
<StatusBadge label="In Stock" status="success" size="small" />
<StatusBadge label="Low Stock" status="warning" size="small" />
<StatusBadge label="Out of Stock" status="danger" size="small" />
```

### Task Status

```tsx
<StatusBadge label="Completed" status="success" variant="filled" />
<StatusBadge label="In Progress" status="info" variant="light" />
<StatusBadge label="Pending" status="neutral" variant="outlined" />
<StatusBadge label="Blocked" status="danger" variant="light" />
```

## Accessibility

- Good color contrast ratios maintained in all variants
- Status meaning not solely conveyed by color (includes text)
- Appropriate sizing for readability
- Works in both light and dark modes

## Design System

Uses the following design system variables:

**Success:**
- Light: rgba(120, 182, 100, 0.15) background, `--wilderness-4` text
- Filled: `--wilderness-4` background, white text

**Warning:**
- Light: rgba(245, 158, 11, 0.15) background, `--amber-4` text
- Filled: `--amber-4` background, white text

**Danger:**
- Light: rgba(255, 70, 70, 0.15) background, `--hot-heat-4` text
- Filled: `--hot-heat-4` background, white text

**Info:**
- Light: rgba(79, 70, 229, 0.15) background, `--indigo-5` text
- Filled: `--indigo-5` background, white text

**Neutral:**
- Light: `--color-bg-sec-2` background, `--color-sec` text
- Filled: `--color-sec` background, white text

## Notes

- Badge is inline-friendly (`inline-flex`)
- White-space is preserved with `nowrap`
- Icon and label are vertically centered
- Border radius: `4px` for subtle rounding
- Font weight: `600` for emphasis
- Gap between icon and label: `4px`
- All variants maintain proper text contrast

