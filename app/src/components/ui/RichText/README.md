# RichText Component

A flexible text rendering component that supports inline formatting including bold, italic, highlight, and custom colors.

## Features

- **Bold text**: Apply font-weight emphasis
- **Italic text**: Apply font-style emphasis
- **Highlighted text**: Add background color for emphasis
- **Custom colors**: Support for predefined colors and hex values
- **Composable**: Combine multiple styles on the same text
- **Design system compliant**: Uses CSS variables throughout
- **Accessible**: Maintains proper color contrast

## Usage

### Basic Usage

```tsx
import { RichText } from '@/components/ui/RichText';

<RichText content={[
  { text: "This is plain text. " },
  { text: "This is bold text.", styles: { bold: true } }
]} />
```

### Multiple Styles

```tsx
<RichText content={[
  { text: "Your " },
  { text: "UPT", styles: { bold: true } },
  { text: " has " },
  { text: "decreased", styles: { highlight: true, color: "red" } },
  { text: " by " },
  { text: "15%", styles: { bold: true, highlight: true, color: "red" } }
]} />
```

### Predefined Colors

```tsx
<RichText content={[
  { text: "Success", styles: { bold: true, color: "green" } },
  { text: " | " },
  { text: "Warning", styles: { bold: true, color: "orange" } },
  { text: " | " },
  { text: "Error", styles: { bold: true, color: "red" } }
]} />
```

### Custom Colors

```tsx
// Using hex values
<RichText content={[
  { text: "Custom color", styles: { color: "#FF5733" } }
]} />

// Using CSS variables
<RichText content={[
  { text: "Design system color", styles: { color: "--daydream-5" } }
]} />
```

## Props

### `RichTextProps`

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `RichTextContent[]` | Yes | - | Array of text segments with styling |
| `className` | `string` | No | - | Additional CSS class for wrapper |

### `RichTextContent`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `text` | `string` | Yes | The text content to render |
| `styles` | `object` | No | Styling options |
| `styles.bold` | `boolean` | No | Apply bold font-weight |
| `styles.italic` | `boolean` | No | Apply italic font-style |
| `styles.highlight` | `boolean` | No | Apply highlight background |
| `styles.color` | `string` | No | Text color (predefined name, hex, or CSS variable) |

## Predefined Colors

The following color names are available:

- `red` - Error/warning states
- `green` - Success/positive states
- `blue` - Info/active states
- `orange` - Caution/attention
- `gray` - Secondary/muted
- `cyan` - Accent/highlight
- `teal` - Accent/action
- `purple` - Special/accent

## Examples

### Sales Tip Example

```tsx
<RichText content={[
  { text: "Your " },
  { text: "UPT", styles: { bold: true } },
  { text: " has decreased by " },
  { text: "15%", styles: { bold: true, highlight: true, color: "red" } },
  { text: " compared to last week." }
]} />
```

### Performance Indicator

```tsx
<RichText content={[
  { text: "Sales are " },
  { text: "up 8%", styles: { bold: true, color: "green" } },
  { text: " this week" }
]} />
```

### Multi-format Text

```tsx
<RichText content={[
  { text: "Important: ", styles: { bold: true } },
  { text: "Action required", styles: { italic: true, highlight: true } },
  { text: " within " },
  { text: "24 hours", styles: { bold: true, color: "orange" } }
]} />
```

## Accessibility

- Maintains WCAG AA color contrast ratios
- Does not rely solely on color to convey meaning
- Text remains readable even without color perception
- Works in both light and dark modes

## Design System

This component uses the following design system variables:

- `--color-main` - Default text color
- `--zest-7` - Highlight background
- Predefined color mappings use semantic color variables

## Notes

- Text segments are rendered as inline `<span>` elements
- Multiple styles can be applied to the same text segment
- Color values can be predefined names, hex codes, or CSS variable references
- The component preserves text flow and line wrapping

