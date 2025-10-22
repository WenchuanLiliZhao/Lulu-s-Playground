# Label Component

A flexible label component with an absolutely positioned background layer that allows for opacity control.

## Features

- **Absolute Background Layer**: The background color is rendered using an absolutely positioned div that fills the entire label container
- **Opacity Control**: Adjust the background opacity independently from the text content
- **Flexible Styling**: Support for custom colors, full-width mode, and additional CSS classes

## Usage

### Basic Usage

```tsx
import { Label } from '@/components/ui'

function Example() {
  return (
    <Label 
      backgroundColor="#ff0000" 
      color="#ffffff"
    >
      Event Name
    </Label>
  )
}
```

### With Custom Opacity

```tsx
<Label 
  backgroundColor="#0066cc" 
  color="#ffffff"
  backgroundOpacity={0.3}
>
  Semi-transparent Background
</Label>
```

### Full Width Mode

```tsx
<Label 
  backgroundColor="#00cc66" 
  color="#ffffff"
  fullWidth
>
  Full Width Label
</Label>
```

### With Custom Class

```tsx
<Label 
  backgroundColor="#cc00cc" 
  color="#ffffff"
  className={styles.customLabel}
>
  Custom Styled Label
</Label>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Text content to display in the label |
| `backgroundColor` | `string` | - | Background color for the label (CSS color value) |
| `color` | `string` | - | Text color for the label (CSS color value) |
| `backgroundOpacity` | `number` | `1` | Opacity of the background layer (0-1) |
| `className` | `string` | `''` | Additional CSS class name |
| `fullWidth` | `boolean` | `false` | Whether the label should take full width |

## Technical Details

### Component Structure

The component uses a three-layer structure:

1. **Container Layer**: Relative positioned, holds the shape and padding
2. **Background Layer**: Absolutely positioned div that fills the container, handles the background color and opacity
3. **Content Layer**: Relative positioned span with z-index to appear above the background

This structure allows the background opacity to be controlled independently without affecting the text opacity.

### SCSS Structure

```scss
.container {
  position: relative;
  // container styles...
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background layer styles...
}

.content {
  position: relative;
  z-index: 1;
  // content layer styles...
}
```

## Examples

### Color Scale Labels

```tsx
import { COLOR_SCALES } from '@/styles/color-chart'

function ColorLabels() {
  return (
    <div>
      <Label 
        backgroundColor={COLOR_SCALES.sequoia.colors[2]}
        color="#ffffff"
      >
        Sequoia
      </Label>
      <Label 
        backgroundColor={COLOR_SCALES.indigo.colors[4]}
        color="#ffffff"
        backgroundOpacity={0.5}
      >
        Indigo (50% opacity)
      </Label>
    </div>
  )
}
```

### Status Labels with Different Opacities

```tsx
function StatusLabels() {
  return (
    <div>
      <Label 
        backgroundColor="#00cc66"
        color="#ffffff"
        backgroundOpacity={1}
      >
        Active
      </Label>
      <Label 
        backgroundColor="#cc0000"
        color="#ffffff"
        backgroundOpacity={0.2}
      >
        Inactive (subtle)
      </Label>
    </div>
  )
}
```

