# Dropdown Component

A dropdown component with active/inactive state support and automatic click-outside detection.

## Features

- **Active State**: Visual distinction when filters are applied
- **Click Outside**: Automatically closes when clicking outside
- **Animated**: Smooth fade-in animation
- **Flexible Content**: Accepts any React children
- **Icon Integration**: Uses Material Icons for expand/collapse indicators

## Usage

```tsx
import { Dropdown, Checkbox } from '@/components/ui'

function MyComponent() {
  const [isActive, setIsActive] = useState(false)
  
  return (
    <Dropdown 
      trigger="Filter Options" 
      isActive={isActive}
    >
      <div className={styles.filterOptions}>
        <Checkbox label="Option 1" checked={true} onChange={() => {}} />
        <Checkbox label="Option 2" checked={false} onChange={() => {}} />
      </div>
    </Dropdown>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | - | Trigger content (text or element) |
| `children` | `ReactNode` | - | Dropdown content |
| `isActive` | `boolean` | `false` | Whether the dropdown is in active state |
| `className` | `string` | `''` | Optional className |

## States

- **Default**: Gray border and background
- **Open**: Blue border with expanded icon
- **Active**: Blue background with white text (indicates applied filters)
- **Hover**: Darker background

## Styling

The component uses CSS modules and follows the Lululemon design system:
- Uses semantic color variables
- Includes drop shadow for elevation
- Smooth transitions and animations

