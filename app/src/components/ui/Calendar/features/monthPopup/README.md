# Month Popup Feature

An interactive feature that allows users to expand any month in the calendar to display it in a larger popup view with a smooth zoom animation.

## Features

- **Hover-to-Reveal**: Expand button appears in the top-right corner when hovering over a month card
- **Icon Button**: Click the expand icon button to open the popup
- **Zoom Animation**: Smooth scale and fade animation originating from the clicked month
- **Full Month View**: Display a single month in a larger, more detailed view
- **Event Highlighting**: All time ranges and events are preserved in the popup
- **Keyboard Support**: Press `ESC` to close the popup
- **Click Outside**: Click outside the popup to close it
- **Responsive Design**: Adapts to different screen sizes
- **Contained Within Calendar**: Popup is positioned absolutely within the Calendar component bounds

## Components

### `MonthPopup`

The main popup component that displays an expanded view of a single month.

**Props:**
- `month` (number): The month to display (0-11)
- `year` (number): The year to display
- `timeRanges` (TimeRange[]): Optional time ranges to highlight
- `sourceElement` (HTMLElement | null): The source element for animation origin
- `onClose` (() => void): Callback when the popup is closed

### `useMonthPopup`

A hook for managing the popup state.

**Returns:**
- `popupState` (MonthPopupState): Current state of the popup
  - `isOpen` (boolean): Whether the popup is open
  - `month` (number | null): The currently displayed month
  - `year` (number | null): The currently displayed year
  - `sourceElement` (HTMLElement | null): The source element for animation
- `openPopup` ((month, year, sourceElement) => void): Function to open the popup
- `closePopup` (() => void): Function to close the popup

## Usage

This feature is automatically integrated into the `Calendar` component:
1. Hover over any month card
2. An expand button (⤢) will appear in the top-right corner
3. Click the expand button to open the popup view

## Animation Details

The popup uses a custom zoom animation that:
1. Starts from the position of the clicked month card (relative to the calendar container)
2. Scales from 0.3 to 1.0 with a spring-like easing
3. Fades in simultaneously
4. Duration: 300ms with cubic-bezier(0.34, 1.56, 0.64, 1)

## Positioning

The popup is positioned absolutely within the Calendar component using `position: absolute`. This means:
- The popup stays contained within the Calendar component's boundaries
- It overlays the calendar content without affecting the page layout
- The animation origin is calculated relative to the Calendar container, not the viewport

## Styling

All styles are contained in `_styles.module.scss` and use CSS custom properties for theming:
- `--color-bg`: Background color
- `--color-bg-secondary`: Secondary background color
- `--color-main`: Primary text color
- `--color-secondary`: Secondary text color
- `--color-border`: Border color
- `--color-primary`: Primary accent color

## Accessibility

- Keyboard navigation support (ESC to close)
- Focus management
- ARIA labels for interactive elements
- Proper semantic HTML structure

