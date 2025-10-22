# Checkbox Component

A customizable checkbox component with Material Icons integration.

## Features

- **Material Icons Integration**: Uses the Icon component with Material Symbols
- **Accessible**: Implements ARIA attributes and keyboard navigation
- **Customizable**: Supports labels, disabled states, and custom styling
- **Keyboard Support**: Space and Enter keys to toggle

## Usage

```tsx
import { Checkbox } from '@/components/ui'

function MyComponent() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `onChange` | `(checked: boolean) => void` | - | Callback when checkbox state changes |
| `label` | `string` | - | Label text for the checkbox |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Optional className |

## Accessibility

- Uses `role="checkbox"` for screen readers
- Implements `aria-checked` attribute
- Keyboard navigable with Tab
- Space/Enter to toggle

## Styling

The component uses CSS modules and follows the Lululemon design system color variables.

