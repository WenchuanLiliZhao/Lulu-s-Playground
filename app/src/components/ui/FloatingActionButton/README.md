# FloatingActionButton

A floating action button (FAB) component that remains fixed in the bottom-right corner of the screen, inspired by Notion's floating button design.

## Features

- ✨ Fixed positioning in bottom-right corner
- 🎨 Uses brand color with automatic theme support
- 📱 Responsive design for mobile devices
- ♿ Full accessibility support (aria-label, keyboard navigation)
- 🎭 Smooth hover and click animations
- 🌟 Elevation shadow for depth
- 🔧 Customizable icon and click handler

## Usage

### Basic Usage

```tsx
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';

function App() {
  return (
    <FloatingActionButton
      icon="smart_toy"
      onClick={() => console.log('FAB clicked!')}
    />
  );
}
```

### With Custom Icon

```tsx
<FloatingActionButton
  icon="add"
  onClick={() => handleAddAction()}
  tooltip="Add New Item"
/>
```

### With Custom Accessibility Label

```tsx
<FloatingActionButton
  icon="chat"
  onClick={() => openChat()}
  ariaLabel="Open chat"
  tooltip="Chat with us"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `"smart_toy"` | Material Icon name to display |
| `onClick` | `() => void` | `undefined` | Click handler function |
| `className` | `string` | `undefined` | Optional className for custom styling |
| `ariaLabel` | `string` | `"AI Assistant"` | Accessibility label for screen readers |
| `tooltip` | `string` | `"AI Assistant"` | Tooltip text shown on hover |

## Styling

The component uses the following design system tokens:

- **Background**: `--brand-color` (primary brand color)
- **Shadow**: `--pop-shadow` (elevation shadow)
- **Z-Index**: `--z-index-popup-sec` (ensures proper layering)

### Responsive Breakpoints

- **Desktop (>768px)**: 56px × 56px, 32px from edges
- **Tablet (≤768px)**: 48px × 48px, 24px from edges
- **Mobile (≤480px)**: 44px × 44px, 16px from edges

## Positioning

The FAB is positioned using `position: fixed` at:
- `bottom: 32px`
- `right: 32px`
- `z-index: var(--z-index-popup-sec)`

This ensures it stays visible even when scrolling and floats above most content.

## Accessibility

- Uses semantic `<button>` element
- Includes `aria-label` for screen readers
- Supports keyboard navigation
- Has visible focus indicator (`outline` on `:focus-visible`)
- Provides tooltip via `title` attribute

## Animation

The component uses smooth transitions for:
- **Scale on hover**: Grows to 105% size
- **Shadow on hover**: Increased shadow for depth
- **Scale on click**: Shrinks to 95% for tactile feedback

Note: Following design system guidelines, only movement properties (`transform`, `box-shadow`) are animated. Color properties remain instant.

## Examples

### AI Assistant (Default)

```tsx
<FloatingActionButton
  icon="smart_toy"
  onClick={() => openAIAssistant()}
  tooltip="AI Assistant"
/>
```

### Quick Actions Menu

```tsx
<FloatingActionButton
  icon="menu"
  onClick={() => toggleQuickMenu()}
  tooltip="Quick Actions"
/>
```

### Create New Item

```tsx
<FloatingActionButton
  icon="add"
  onClick={() => createNewItem()}
  tooltip="Create New"
/>
```

### Chat Support

```tsx
<FloatingActionButton
  icon="chat"
  onClick={() => openSupportChat()}
  tooltip="Chat Support"
  ariaLabel="Open support chat"
/>
```

## Notes

- The FAB automatically adjusts its size and position on smaller screens
- It uses the brand color (`--brand-color`) which adapts to light/dark themes
- The component is always rendered on top of most content (z-index: 2000)
- Click events are captured without propagation to prevent interference with underlying content

## Related Components

- `IconButton` - For inline icon buttons
- `Button` - For standard buttons
- `Icon` - For standalone icons

