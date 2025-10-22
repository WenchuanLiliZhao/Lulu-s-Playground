# Sales Event Calendar V1

## Overview

This demo showcases a sales event calendar with interactive hover functionality that highlights date ranges when hovering over events and holidays.

## Features

### Interactive Date Highlighting

When you hover over:
- **All Events table rows**: Both the event label AND the corresponding date range in the calendar will be highlighted
- **Holiday labels**: Both the holiday label AND the holiday date in the calendar will be highlighted

**Highlighting Effect (synchronized across label and calendar dates):**
- Background opacity becomes `0` (invisible)
- Text color changes to `white`
- Smooth transitions for visual feedback

### Implementation Details

#### Approach

The hover functionality is implemented without modifying the `Calendar` component by:

1. **State Management**: Using React state (`hoveredDateRange`) to track the currently hovered date range
2. **DOM Manipulation**: Using `useEffect` to dynamically add/remove CSS classes to calendar day cells
3. **Event Handlers**: Adding `onMouseEnter` and `onMouseLeave` handlers to table rows and holiday labels
4. **CSS Styling**: Using global CSS classes to override Calendar's internal styles

#### Key Components

- **hoveredDateRange state**: Stores the current hovered date range as `[Date, Date]` or `null`
- **calendarWrapperRef**: Reference to the calendar wrapper for DOM manipulation
- **useEffect hook**: Monitors `hoveredDateRange` and applies/removes the `highlightedDate` class to matching date cells
- **Event handlers**:
  - `handleEventHover`: Triggered when hovering over an event row
  - `handleHolidayHover`: Triggered when hovering over a holiday label
  - `handleMouseLeave`: Triggered when mouse leaves, resets the hover state

#### CSS Implementation

The highlighting effect uses global CSS classes:

```scss
:global {
  .highlightedDate {
    [class*="_rangeBackground_"] {
      opacity: 0 !important;
    }
    [class*="_dayNumber_"] {
      color: white !important;
    }
  }
}
```

This approach leverages CSS attribute selectors to target Calendar's CSS module classes without hardcoding exact class names.

## Technical Constraints

✅ **No Calendar Component Modifications**: The `Calendar` component remains unchanged
✅ **Encapsulated in Demo**: All logic is contained within the demo folder
✅ **Maintainable**: Uses React best practices and doesn't rely on fragile DOM assumptions

## Usage

1. Navigate to the Sales Event Calendar V1 page
2. Hover over any row in the "All Events" table
3. Hover over any label in the "Holiday" section
4. Observe the corresponding dates in the calendar change appearance

