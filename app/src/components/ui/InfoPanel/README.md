# InfoPanel Component

A versatile panel component for displaying key-value information pairs with optional icon and title. Perfect for showing metrics, statistics, or organized data.

## Features

- **Flexible content**: Display any number of key-value pairs
- **Icon support**: Optional icon next to title
- **Variants**: Default, compact, and highlighted styles
- **Layouts**: Vertical and horizontal arrangements
- **Highlighting**: Emphasize important items
- **Color customization**: Apply colors to specific values
- **Sublabels**: Additional context for items
- **Design system compliant**: Uses CSS variables

## Usage

### Basic Usage

```tsx
import { InfoPanel } from '@/components/ui/InfoPanel';

<InfoPanel
  title="Quick Stats"
  items={[
    { label: "Total Sales", value: "$12,500" },
    { label: "Orders", value: "45" },
    { label: "Average", value: "$278" }
  ]}
/>
```

### With Icon

```tsx
<InfoPanel
  icon={<ClockIcon />}
  title="Peak Hours"
  items={[
    { label: "Best CR", value: "2-4PM (78%)", highlight: true },
    { label: "Low CR", value: "10-12PM (52%)" },
    { label: "Rush", value: "5-7PM" }
  ]}
/>
```

### Peak Hours Example (from Dashboard)

```tsx
<InfoPanel
  icon="🕐"
  title="Peak Hours"
  items={[
    { label: "Best CR", value: "2-4PM (78%)", highlight: true },
    { label: "Low CR", value: "10-12PM (52%)" },
    { label: "Rush", value: "5-7PM" }
  ]}
/>
```

### Category Mix Example (from Dashboard)

```tsx
<InfoPanel
  icon="🛍️"
  title="Category Mix"
  items={[
    { label: "Men's", value: "58% (↑5%)", color: "wilderness-4" },
    { label: "Women's", value: "42%" },
    { label: "Traffic", value: "342 (+12)" }
  ]}
/>
```

### Compact Variant

```tsx
<InfoPanel
  title="Quick Stats"
  items={[
    { label: "Total", value: "$12,500" },
    { label: "Items", value: "45" }
  ]}
  variant="compact"
/>
```

### Highlighted Variant

```tsx
<InfoPanel
  title="Important Metrics"
  items={[
    { label: "Target", value: "$25,000" },
    { label: "Current", value: "$23,500" }
  ]}
  variant="highlighted"
/>
```

### Horizontal Layout

```tsx
<InfoPanel
  title="Daily Summary"
  layout="horizontal"
  items={[
    { label: "Sales", value: "$5,200" },
    { label: "Orders", value: "42" },
    { label: "Avg Order", value: "$124" }
  ]}
/>
```

### With Sublabels

```tsx
<InfoPanel
  title="Performance"
  items={[
    { 
      label: "Best Day", 
      value: "Monday", 
      sublabel: "Avg sales: $8,500" 
    },
    { 
      label: "Worst Day", 
      value: "Tuesday", 
      sublabel: "Avg sales: $4,200" 
    }
  ]}
/>
```

## Props

### `InfoPanelProps`

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Panel title |
| `items` | `InfoItem[]` | Yes | - | Array of information items |
| `icon` | `React.ReactNode` | No | - | Icon element or emoji |
| `variant` | `'default' \| 'compact' \| 'highlighted'` | No | `'default'` | Visual style variant |
| `layout` | `'vertical' \| 'horizontal'` | No | `'vertical'` | Item arrangement |
| `className` | `string` | No | - | Additional CSS class |

### `InfoItem`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Item label/key |
| `value` | `string \| React.ReactNode` | Yes | Item value |
| `highlight` | `boolean` | No | Emphasize this item |
| `color` | `string` | No | CSS variable name for value color |
| `sublabel` | `string` | No | Additional info below the item |

## Variants

### Default
Standard panel with normal spacing and styling.

### Compact
Reduced padding and font sizes for tighter displays.

### Highlighted
Emphasized background and border for important panels.

## Layouts

### Vertical (Default)
Items stacked vertically with labels on the left and values on the right.

### Horizontal
Items arranged horizontally in a row, each taking equal space.

## Examples

### Dashboard Metrics Panel

```tsx
<div className={styles.metricsRow}>
  <InfoPanel
    icon="🕐"
    title="Peak Hours"
    items={[
      { label: "Best CR", value: "2-4PM (78%)", highlight: true },
      { label: "Low CR", value: "10-12PM (52%)" },
      { label: "Rush", value: "5-7PM" }
    ]}
  />
  
  <InfoPanel
    icon="🛍️"
    title="Category Mix"
    items={[
      { label: "Men's", value: "58% (↑5%)" },
      { label: "Women's", value: "42%" },
      { label: "Traffic", value: "342 (+12)" }
    ]}
  />
</div>
```

### Compact Summary

```tsx
<InfoPanel
  title="Today's Summary"
  variant="compact"
  items={[
    { label: "Sales", value: "$5,200" },
    { label: "Transactions", value: "42" },
    { label: "Conversion", value: "68%" }
  ]}
/>
```

### Complex Values

```tsx
<InfoPanel
  title="Team Performance"
  items={[
    { 
      label: "Top Performer", 
      value: <><strong>John</strong> - $3,200</>,
      highlight: true 
    },
    { 
      label: "Team Average", 
      value: "$1,850" 
    }
  ]}
/>
```

## Accessibility

- Proper heading hierarchy with `<h3>` for title
- Clear label-value association
- Semantic HTML structure
- Good color contrast ratios

## Design System

Uses the following design system variables:

- `--color-bg-main` - Panel background
- `--color-border-main` - Panel border
- `--color-main` - Primary text
- `--color-sec` - Secondary text (labels)
- `--color-neg` - Sublabel text
- `--color-semantic-active` - Highlight color
- Border radius: `8px`

## Notes

- Items can accept React nodes as values for rich content
- Color prop expects CSS variable names (without `var()` wrapper)
- Horizontal layout works best with 2-5 items
- Compact variant is ideal for sidebars or tight spaces
- Highlighting automatically changes value color and weight

