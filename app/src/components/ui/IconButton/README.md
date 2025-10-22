# IconButton Component

A button component that displays a Material Icon, built using the existing Icon component.

## Features

- **Material Icons**: Uses Google Material Symbols for icons
- **Multiple Sizes**: Small (24px), Medium (32px), Large (40px)
- **Multiple Variants**: Default, Primary, Ghost, Outline
- **Hover Effects**: Scale animation and background color change
- **Focus States**: Visible focus outline for keyboard navigation
- **Disabled State**: Reduced opacity and disabled cursor
- **Accessible**: Proper button semantics and focus states

## Usage

```tsx
import { IconButton } from '@/components/ui/IconButton'

// Basic usage
<IconButton icon="expand_content" />

// With size
<IconButton icon="close" size="small" />

// With variant
<IconButton icon="add" variant="primary" />

// With click handler
<IconButton 
  icon="open_in_full" 
  onClick={() => console.log('Clicked!')}
/>

// Disabled
<IconButton icon="delete" disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | *required* | Material icon name |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `variant` | `'default' \| 'primary' \| 'ghost' \| 'outline'` | `'default'` | Button style variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Optional additional CSS class |
| `...rest` | `ButtonHTMLAttributes` | - | All standard button HTML attributes |

## Variants

### Default
- Transparent background
- Hover: light gray background + scale 1.05
- Active: scale 0.98

### Primary
- Primary color background
- White icon
- Hover: reduced opacity + scale 1.05
- Active: scale 0.98

### Ghost
- Transparent background
- Hover: very light gray background + scale 1.05
- Active: scale 0.98
- Minimal visual presence

### Outline
- Transparent background with border
- Border color: default border
- Hover: light gray background + primary color border + scale 1.05
- Active: scale 0.98
- Perfect for subtle actions

## Sizes

- **Small**: 24x24px, icon size 18px
- **Medium**: 32x32px, icon size 20px
- **Large**: 40x40px, icon size 24px

## Material Icons

This component uses [Google Material Symbols](https://fonts.google.com/icons). You can use any icon name from their library.

Common examples:
- `close` - Close/X icon
- `expand_content` - Expand icon
- `open_in_full` - Maximize icon
- `add` - Plus icon
- `delete` - Delete/trash icon
- `edit` - Edit/pencil icon
- `search` - Search icon
- `menu` - Hamburger menu icon

## Examples

```tsx
// Close button
<IconButton icon="close" size="small" onClick={handleClose} />

// Expand button
<IconButton icon="open_in_full" variant="ghost" />

// Primary action button
<IconButton icon="add" variant="primary" size="large" />

// Outline button
<IconButton icon="open_in_full" variant="outline" />

// With custom class
<IconButton icon="menu" className="my-custom-class" />
```

