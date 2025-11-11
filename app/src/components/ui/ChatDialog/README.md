# ChatDialog Component

A floating chat dialog component that appears in the bottom-right corner, typically used with a FloatingActionButton to create an AI assistant or chat interface.

## Features

- **Fixed Positioning**: Appears in the bottom-right corner above the FloatingActionButton
- **Click Outside to Close**: Automatically closes when clicking outside the dialog
- **Smooth Animation**: Slides up with fade-in animation when opened
- **Responsive Design**: Adapts to different screen sizes
- **Customizable**: Supports custom title, subtitle, and content
- **Scrollable Content**: Content area scrolls when necessary

## Basic Usage

```tsx
import { ChatDialog } from '@lululemon/ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatDialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="AI Assistant"
      subtitle="How can I help you today?"
    >
      <div>Your chat content here</div>
    </ChatDialog>
  );
}
```

## With FloatingActionButton

```tsx
import { ChatDialog, FloatingActionButton } from '@lululemon/ui';
import { useState } from 'react';

function MyPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <FloatingActionButton
        icon="smart_toy"
        onClick={() => setIsChatOpen(!isChatOpen)}
        tooltip="AI Assistant"
      />
      
      <ChatDialog
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        title="AI Assistant"
      >
        {/* Your chat interface */}
      </ChatDialog>
    </>
  );
}
```

## Props

### ChatDialogProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | Yes | - | Controls whether the dialog is visible |
| `onClose` | `() => void` | No | - | Callback fired when dialog requests to close (via close button or click outside) |
| `children` | `ReactNode` | Yes | - | Dialog content |
| `className` | `string` | No | `""` | Optional className for custom styling |
| `title` | `string` | No | `"AI Assistant"` | Dialog title shown in header |
| `subtitle` | `string` | No | - | Optional subtitle shown below title |

## Examples

### With Preset Buttons

```tsx
import { ChatDialog, Button } from '@lululemon/ui';

<ChatDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="AI Assistant"
  subtitle="Choose an option or type a message"
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Button
      variant="secondary"
      onClick={() => handlePreset("feedback")}
      style={{ width: '100%' }}
    >
      💬 I want to give feedback
    </Button>
    <Button
      variant="secondary"
      onClick={() => handlePreset("question")}
      style={{ width: '100%' }}
    >
      💡 I have a question
    </Button>
  </div>
</ChatDialog>
```

### With Text Input

```tsx
import { ChatDialog, TextInput, Button } from '@lululemon/ui';
import { useState } from 'react';

function ChatInterface() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // Send message to backend
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <ChatDialog isOpen={true}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <TextInput
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1 }}
        />
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </Button>
      </div>
    </ChatDialog>
  );
}
```

## Positioning

The ChatDialog is positioned:
- **Desktop**: `bottom: 100px`, `right: 32px` (above the 56px FAB + 44px gap)
- **Tablet (≤768px)**: `bottom: 84px`, `right: 24px`
- **Mobile (≤480px)**: `bottom: 72px`, `right: 16px`, full width minus padding

## Styling

The component uses CSS modules and can be customized via:
1. The `className` prop for additional styles
2. CSS variables for colors and spacing
3. Inline styles on the children content

### CSS Variables Used

- `--color-bg-main`: Dialog background
- `--color-border-main`: Border color
- `--color-main`: Title text color
- `--color-sec`: Subtitle text color
- `--color-semantic-active`: Icon background
- `--pop-shadow`: Shadow effect
- `--z-index-popup-main`: Z-index layering

## Behavior

### Click Outside to Close

The dialog automatically detects clicks outside its bounds and calls the `onClose` callback. This is implemented with a 100ms delay to prevent immediate closing when the dialog is opened via a button click.

### Scrolling

The content area (`.dialog-content`) is scrollable when content exceeds the available height. The dialog has a maximum height of `calc(100vh - 140px)` to ensure it never covers the entire viewport.

## Accessibility

- Uses semantic HTML with proper ARIA attributes
- Close button has descriptive `aria-label`
- Dialog header uses proper heading hierarchy (`h3`)
- Supports keyboard navigation

## Integration with AppLayout

The ChatDialog should be rendered inside `AppLayout` to ensure proper z-index stacking and theme support:

```tsx
import { AppLayout, ChatDialog, FloatingActionButton } from '@lululemon/ui';

function MyPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <AppLayout>
      {/* Your page content */}
      
      <FloatingActionButton onClick={() => setIsChatOpen(true)} />
      
      <ChatDialog
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      >
        {/* Chat content */}
      </ChatDialog>
    </AppLayout>
  );
}
```

## Best Practices

1. **State Management**: Use React state to control the `isOpen` prop
2. **Close Handler**: Always provide an `onClose` callback for better UX
3. **Content Structure**: Keep content well-organized with proper spacing
4. **Responsive**: Test on different screen sizes
5. **Accessibility**: Provide clear labels and keyboard support
6. **Performance**: Avoid heavy computations in the dialog content

## Notes

- The dialog uses `position: fixed` and will appear above most content
- Animation duration is 200ms for smooth opening
- The dialog is rendered in the DOM even when closed (for animation purposes)
- Custom scrollbar styling is applied for webkit browsers

