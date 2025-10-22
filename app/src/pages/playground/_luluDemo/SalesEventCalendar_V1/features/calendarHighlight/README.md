# Calendar Highlight Feature

## Overview

This module provides a reusable hover interaction feature that synchronizes highlighting between event/holiday labels and their corresponding dates in a calendar component.

## Structure

```
calendarHighlight/
├── useCalendarHighlight.ts    # Custom React hook for highlight logic
├── _styles.module.scss         # Isolated styles for the feature
├── index.ts                    # Module exports
└── README.md                   # Documentation
```

## Usage

### 1. Import the hook and styles

```typescript
import { useCalendarHighlight, highlightStyles } from './features/calendarHighlight'
```

### 2. Use the hook in your component

```typescript
const YourComponent = () => {
  const {
    calendarWrapperRef,
    handleEventHover,
    handleHolidayHover,
    handleMouseLeave,
  } = useCalendarHighlight(currentYear)

  // ...
}
```

### 3. Apply the ref to calendar wrapper

```tsx
<div ref={calendarWrapperRef}>
  <Calendar {...props} />
</div>
```

### 4. Add event handlers to interactive elements

```tsx
// For event rows
<tr
  onMouseEnter={() => handleEventHover(event.interval)}
  onMouseLeave={handleMouseLeave}
  className={highlightStyles.eventRow}
>
  {/* ... */}
</tr>

// For holiday labels
<div
  onMouseEnter={() => handleHolidayHover(holiday.date)}
  onMouseLeave={handleMouseLeave}
  className={highlightStyles.holidayLabelWrapper}
>
  {/* ... */}
</div>
```

## API

### `useCalendarHighlight(currentYear: number)`

**Parameters:**
- `currentYear` (number): The current year being displayed in the calendar

**Returns:**
- `calendarWrapperRef` (React.RefObject): Ref to attach to the calendar wrapper element
- `handleEventHover` (function): Handler for event hover - `(interval: [Date, Date]) => void`
- `handleHolidayHover` (function): Handler for holiday hover - `(date: Date) => void`
- `handleMouseLeave` (function): Handler for mouse leave - `() => void`

## How It Works

1. **State Management**: The hook maintains a `hoveredDateRange` state that tracks the currently hovered date range
2. **DOM Manipulation**: When a date range is hovered, the hook queries the calendar DOM to find matching date cells
3. **Class Application**: Adds the `highlightedDate` class to matching cells
4. **Style Synchronization**: CSS styles defined in `_styles.module.scss` handle the visual changes
5. **Cleanup**: Removes highlight classes when hover ends

## Styling

The module provides three main style classes:

- **`.eventRow`**: Applies to table rows in the events list
- **`.holidayLabelWrapper`**: Applies to holiday label containers
- **Global `.highlightedDate`**: Applied dynamically to calendar date cells

All styles use the `:global` selector to target nested Label and Calendar component internals without modifying those components.

## Customization

To modify the highlight effect, edit `_styles.module.scss`:

```scss
// Change opacity values
:global([class*="_background_"]) {
  opacity: 0 !important;  // Change this value
}

// Change text color
:global([class*="_content_"]) {
  color: white !important;  // Change this value
}
```

## Debugging

The hook includes console logs for debugging:
- Event/holiday hover events
- Number of day cells found
- Number of dates highlighted

To disable logs, remove or comment out the `console.log` statements in `useCalendarHighlight.ts`.

