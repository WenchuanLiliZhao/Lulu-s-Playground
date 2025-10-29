# Card Component

A versatile card container component with support for header, body, and footer sections. Includes multiple visual variants and customizable border styling.

## Features

- **Flexible structure**: Optional header, required body, optional footer
- **Multiple variants**: Default, outlined, elevated, danger, warning, success, info
- **Custom borders**: Configurable border color and position
- **Clickable**: Optional onClick handler with hover effects
- **Semantic colors**: Built-in color schemes for different use cases
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Design system compliant**: Uses CSS variables throughout

## Usage

### Basic Usage

```tsx
import { Card } from '@/components/ui/Card';

<Card 
  header={<h3>Card Title</h3>}
  body={<p>Card content goes here</p>}
/>
```

### With All Sections

```tsx
<Card 
  header={<h3>Complete Card</h3>}
  body={<div>Main content area</div>}
  footer={<button>Action</button>}
/>
```

### Variant Examples

#### Default
```tsx
<Card 
  header="Default Card"
  body="Standard card with border"
  variant="default"
/>
```

#### Outlined
```tsx
<Card 
  header="Outlined Card"
  body="Transparent background with border"
  variant="outlined"
/>
```

#### Elevated
```tsx
<Card 
  header="Elevated Card"
  body="Card with shadow elevation"
  variant="elevated"
/>
```

### Semantic Variants

#### Danger
```tsx
<Card 
  header="🔴 Critical Alert"
  body="Important warning or critical information"
  variant="danger"
/>
```

#### Warning
```tsx
<Card 
  header="🟡 Warning"
  body="Cautionary information"
  variant="warning"
/>
```

#### Success
```tsx
<Card 
  header="✅ Success"
  body="Positive confirmation or success message"
  variant="success"
/>
```

#### Info
```tsx
<Card 
  header="ℹ️ Information"
  body="Informational content"
  variant="info"
/>
```

### Custom Border Color

```tsx
<Card 
  header="Custom Border"
  body="Card with custom purple border"
  borderColor="--purple-4"
  borderPosition="left"
/>
```

### Border Positions

```tsx
// Left border (common for status cards)
<Card 
  body="Content"
  borderColor="--hot-heat-4"
  borderPosition="left"
/>

// Top border
<Card 
  body="Content"
  borderColor="--indigo-5"
  borderPosition="top"
/>

// All borders (default)
<Card 
  body="Content"
  borderPosition="all"
/>
```

### Clickable Card

```tsx
<Card 
  header="Click Me"
  body="This card is interactive"
  onClick={() => console.log('Card clicked!')}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `body` | `React.ReactNode` | Yes | - | Main content of the card |
| `header` | `React.ReactNode` | No | - | Header content (usually title) |
| `footer` | `React.ReactNode` | No | - | Footer content (usually actions) |
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'danger' \| 'warning' \| 'success' \| 'info'` | No | `'default'` | Visual style variant |
| `borderColor` | `string` | No | - | Custom border color (CSS variable or hex) |
| `borderPosition` | `'left' \| 'top' \| 'right' \| 'bottom' \| 'all'` | No | `'all'` | Which side(s) to apply border |
| `className` | `string` | No | - | Additional CSS class |
| `onClick` | `() => void` | No | - | Click handler (makes card interactive) |

## Variants

### Default
Standard card with light border and white background.

### Outlined
Transparent background with visible border, good for layered designs.

### Elevated
Card with shadow for prominence, no visible border.

### Danger
Red left border (4px), indicates critical or error states.

### Warning
Orange/amber left border (4px), indicates caution or warnings.

### Success
Green left border (4px), indicates success or positive states.

### Info
Blue left border (4px), indicates information or active states.

## Examples

### Tip Card (from JingJing Dashboard)

```tsx
<Card 
  header="Sales Tips"
  body={
    <div>
      <p>Your UPT has decreased by 15%.</p>
      <p>Suggestion: Focus on cross-selling accessories.</p>
    </div>
  }
  variant="info"
  borderPosition="left"
/>
```

### Out-of-Stock Alert

```tsx
<Card 
  header="🔴 Critical Out-of-Stock"
  body={
    <ul>
      <li>Slim Fit Chino - Navy (32x32)</li>
      <li>Oxford Shirt - White (M)</li>
      <li>Leather Sneakers - White (9.5)</li>
    </ul>
  }
  variant="danger"
  borderPosition="left"
/>
```

### Overstock Card

```tsx
<Card 
  header="🟡 Overstock Opportunities"
  body={
    <table>
      <tbody>
        <tr><td>Winter Jacket - Black (XL)</td><td>18 pcs</td></tr>
        <tr><td>Wool Scarf - Grey</td><td>25 pcs</td></tr>
      </tbody>
    </table>
  }
  variant="warning"
  borderPosition="left"
/>
```

### Interactive Card

```tsx
<Card 
  header="View Details"
  body="Click to see more information"
  footer={<span>→</span>}
  variant="elevated"
  onClick={() => navigate('/details')}
/>
```

### Complex Content

```tsx
<Card 
  header={
    <div className={styles.cardHeader}>
      <h3>Performance Snapshot</h3>
      <Badge>Updated</Badge>
    </div>
  }
  body={
    <div className={styles.metrics}>
      <MetricRow label="Sales" value="$24,580" />
      <MetricRow label="Orders" value="142" />
    </div>
  }
  footer={
    <div className={styles.actions}>
      <Button variant="secondary">Dismiss</Button>
      <Button variant="primary">View Report</Button>
    </div>
  }
  variant="elevated"
/>
```

## Accessibility

- Interactive cards have proper `role="button"` attribute
- Clickable cards have `tabIndex={0}` for keyboard navigation
- Focus outline visible for keyboard users
- Semantic structure with header/body/footer
- Proper color contrast maintained

## Design System

Uses the following design system variables:

- `--color-bg-main` - Card background
- `--color-border-main` - Default border
- `--color-border-darken-trans` - Outlined variant border
- `--pop-shadow` - Elevated variant shadow
- `--hot-heat-4` - Danger border
- `--amber-4` - Warning border
- `--wilderness-4` - Success border
- `--indigo-5` - Info border
- Border radius: `8px`

## Notes

- Header and footer are automatically styled with separators
- Clickable cards have hover animation (translateY)
- Custom border colors support both CSS variables and hex values
- Semantic variants automatically apply appropriate border colors
- Border position only affects emphasized borders (4px width)
- All variants maintain consistent internal spacing

