# TextInput Component

A styled text input component with support for error states, disabled states, and full customization.

## Features

- **Consistent Styling**: Follows the Lulu Design System color and spacing guidelines
- **Error States**: Built-in error styling and message display
- **Disabled States**: Proper disabled styling with cursor feedback
- **Responsive**: Font size adjusts on mobile to prevent zoom
- **Accessible**: Proper ARIA attributes and keyboard support
- **Ref Support**: Uses `forwardRef` for ref access

## Basic Usage

```tsx
import { TextInput } from '@lululemon/ui';
import { useState } from 'react';

function MyForm() {
  const [value, setValue] = useState("");

  return (
    <TextInput
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Props

### TextInputProps

Extends all standard HTML input attributes except `size`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `""` | Optional className for custom styling |
| `placeholder` | `string` | No | - | Placeholder text |
| `value` | `string` | No | - | Input value (controlled) |
| `onChange` | `(e: ChangeEvent) => void` | No | - | Change handler |
| `error` | `boolean` | No | `false` | Whether to show error state |
| `errorMessage` | `string` | No | - | Error message to display below input |
| `disabled` | `boolean` | No | `false` | Whether the input is disabled |

Plus all standard HTML input attributes: `type`, `name`, `id`, `required`, `pattern`, `maxLength`, etc.

## Examples

### Basic Input

```tsx
<TextInput
  placeholder="Enter text..."
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

### With Error State

```tsx
<TextInput
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail(email)}
  errorMessage="Please enter a valid email address"
/>
```

### Disabled Input

```tsx
<TextInput
  placeholder="Read only"
  value={data}
  disabled={true}
/>
```

### With Ref

```tsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <TextInput
      ref={inputRef}
      placeholder="Click button to focus"
    />
  );
}
```

### Password Input

```tsx
<TextInput
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### With Enter Key Handler

```tsx
<TextInput
  placeholder="Press Enter to submit"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }}
/>
```

### In a Chat Interface

```tsx
import { TextInput, Button } from '@lululemon/ui';

function ChatInput() {
  const [message, setMessage] = useState("");

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ flex: 1 }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
```

## Styling

The component uses CSS modules and follows the Lulu Design System:

### CSS Variables Used

- `--color-bg-sec-2`: Input background
- `--color-main`: Text color
- `--color-border-main`: Default border
- `--color-border-darken-trans`: Hover border
- `--color-semantic-active`: Focus border
- `--color-semantic-error`: Error border
- `--color-neg`: Disabled text color
- `--color-neg-trans`: Placeholder color
- `--ff-sans`: Font family

### Custom Styling

You can add custom styles via:
1. The `className` prop on the wrapper
2. The `style` prop on the input element
3. CSS modules targeting the component classes

```tsx
<TextInput
  className="my-custom-input"
  style={{ fontSize: '16px' }}
/>
```

## States

### Default State
- Light background (`--color-bg-sec-2`)
- Subtle border (`--color-border-main`)
- Regular text color

### Hover State
- Darker border (`--color-border-darken-trans`)

### Focus State
- Active color border (`--color-semantic-active`)
- No outline (custom border styling)

### Error State
- Red border (`--color-semantic-error`)
- Error message displayed below
- Error message in red text

### Disabled State
- Gray background (`--color-bg-sec`)
- Gray text (`--color-neg`)
- Not-allowed cursor
- No hover effects

## Responsive Behavior

On mobile devices (≤768px), the font size increases to 16px to prevent iOS from zooming in when the input is focused.

## Accessibility

- Supports all standard HTML input attributes
- Proper focus states with visible borders
- Error messages are associated with the input
- Disabled state prevents interaction
- Placeholder uses appropriate contrast

## Best Practices

1. **Controlled Components**: Use with `value` and `onChange` for controlled behavior
2. **Error Handling**: Show error states and messages for validation feedback
3. **Placeholder Text**: Use clear, concise placeholder text
4. **Type Attribute**: Set appropriate `type` for different input types (text, email, password, etc.)
5. **Keyboard Support**: Handle Enter key for form submission when appropriate
6. **Refs**: Use refs when you need direct access to the input element

## Notes

- The component is wrapped in a div (`.input-wrapper`) that contains both the input and error message
- Error messages only appear when both `error` and `errorMessage` props are provided
- The input uses `box-sizing: border-box` for consistent sizing
- Text selection is enabled by default (unlike buttons)

