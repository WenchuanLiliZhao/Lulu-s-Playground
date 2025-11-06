# Framed Viewport Feature

## Overview

The Framed Viewport feature adds a design-focused presentation mode to the `AppLayout` component. When enabled, it displays the scaled viewport with a rounded border, padding, and measurement rulers on all four sides - perfect for design presentations and mockups.

## Features

- **24px Border Radius**: Smooth rounded corners on the viewport
- **24px Padding**: Outer padding creating a frame effect
- **Centered Layout**: Always centered in the browser window
- **Internal Scrolling**: All scrolling happens within the framed viewport
- **Measurement Rulers**: Display dimensions on all four sides with tick marks

## Usage

### Basic Example

```tsx
import AppLayout from 'lululemon-ui';

<AppLayout 
  viewportMode={["scaled-from", 1920, 1080]}
  enableFrame={true}
>
  <YourContent />
</AppLayout>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `viewportMode` | `ViewportMode` | `"default"` | Must be set to `["scaled-from", width, height]` for frame to work |
| `enableFrame` | `boolean` | `false` | Enable the framed viewport with rounded corners and rulers |

### Requirements

⚠️ **Important**: The `enableFrame` option only works when `viewportMode` is set to `["scaled-from", width, height]`. It has no effect in default mode.

## Visual Specifications

- **Border Radius**: 24px
- **Outer Padding**: 24px on all sides
- **Ruler Height/Width**: 24px
- **Background**: Uses `var(--color-bg-sec)` for the outer frame area
- **Shadow**: `0 8px 32px rgba(0, 0, 0, 0.12)` on the viewport

## Example: JingjingOnePage_V0

The feature is currently implemented in the JingjingOnePage_V0 demo:

```tsx
const JingjingOnePage_V0: PageProps = {
  title: "JingJing One Page V0",
  slug: "jingjing-one-page-v0",
  content: (
    <AppLayout 
      isTesting={true} 
      viewportMode={["scaled-from", 1920, 1080]}
      enableFrame={true}
    >
      <JingjingOnePageV0 />
    </AppLayout>
  ),
};
```

## Technical Implementation

### Component Structure

1. **AppLayout Component**: Added `enableFrame` prop
2. **Viewport Scaling**: Modified to account for frame padding
3. **Ruler Rendering**: Dynamically positioned based on scaled viewport dimensions
4. **Styling**: Added frame-specific styles with rulers and rounded corners

### Files Modified

- `AppLayout/_component.tsx` - Added frame logic and ruler rendering
- `AppLayout/_styles.module.scss` - Added frame and ruler styles
- `AppLayout/features/viewportScaling/useViewportScaling.ts` - Updated to handle frame padding
- `AppLayout/features/viewportScaling/calculateScaledStyle.ts` - Updated to calculate offsets with frame

## Design Considerations

The framed viewport is designed for:
- **Design Presentations**: Show exact pixel dimensions in presentations
- **Mockups**: Present designs with clear boundaries
- **Fixed-Size Layouts**: Display content at specific dimensions
- **Design Review**: Make it clear what the target viewport size is

## Browser Compatibility

Works in all modern browsers that support:
- CSS `border-radius`
- CSS `transform` and `scale`
- CSS custom properties (CSS variables)

## Performance Notes

- Rulers are rendered as CSS pseudo-elements (`:before`, `:after`) for optimal performance
- Transform-based scaling is hardware-accelerated
- No JavaScript-based animations or calculations after initial render

