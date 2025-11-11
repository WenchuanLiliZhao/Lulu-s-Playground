# TextWidget

A simple text display widget for dashboard layouts that follows the standard dashboard widget frame pattern.

## Usage

```tsx
import { TextWidget } from '@/components/ui/forDashboard/TextWidget'

<TextWidget
  text="Your store achieved 103% of yesterday's plan with ¥174,225 in sales."
  showHeader={true}
  headerTitle="Sales Summary"
  headerIcon="bar_chart"
  headerColor="primary"
/>
```

## Props

Inherits all `DashboardCommonProps` from the shared dashboard types.

### Specific Props

- `text` (required): The text content to display
- `centered` (optional): Whether to center align the text (default: false)

## Examples

### Basic Text Widget

```tsx
<TextWidget
  text="This is a simple text display in a dashboard widget."
/>
```

### With Header

```tsx
<TextWidget
  text="Important information about your dashboard metrics."
  showHeader={true}
  headerTitle="Info"
  headerIcon="info"
  headerColor="primary"
/>
```

### Centered Text

```tsx
<TextWidget
  text="This text is centered within the widget."
  centered={true}
  showHeader={true}
  headerTitle="Announcement"
/>
```

