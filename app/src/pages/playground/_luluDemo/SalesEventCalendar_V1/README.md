# Sales Event Calendar V1

## Overview

This demo showcases a sales event calendar with interactive hover functionality that highlights date ranges when hovering over events and holidays.

## Project Structure

```
SalesEventCalendar_V1/
├── index.tsx                      # Main component
├── styles.module.scss             # Main component styles
├── README.md                      # This file
├── components/                    # Local components
│   └── EventLabel/
├── data/                          # Data and types
│   └── eventData.ts
└── features/                      # Feature modules
    └── calendarHighlight/         # ✨ Hover highlight feature
        ├── useCalendarHighlight.ts    # Custom hook
        ├── _styles.module.scss        # Feature styles
        ├── index.ts                   # Exports
        └── README.md                  # Feature docs
```

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

#### Modular Architecture

The hover functionality is **encapsulated in a separate feature module** (`features/calendarHighlight/`) for better maintainability and reusability:

```typescript
// Using the feature in the main component
import { useCalendarHighlight, highlightStyles } from './features/calendarHighlight'

const {
  calendarWrapperRef,
  handleEventHover,
  handleHolidayHover,
  handleMouseLeave,
} = useCalendarHighlight(currentYear)
```

#### Key Benefits

1. ✅ **Separation of Concerns**: Highlight logic is isolated from the main component
2. ✅ **Reusability**: Can be easily used in other calendar-based demos
3. ✅ **Maintainability**: Styles and logic are in dedicated files
4. ✅ **Type Safety**: Full TypeScript support
5. ✅ **No Calendar Modifications**: Works without changing the Calendar component

#### How It Works

1. **Custom Hook** (`useCalendarHighlight.ts`):
   - Manages hover state
   - Performs DOM queries to find calendar date cells
   - Dynamically adds/removes CSS classes
   - Provides event handlers for parent component

2. **Isolated Styles** (`_styles.module.scss`):
   - `.eventRow` - Styles for event table rows
   - `.holidayLabelWrapper` - Styles for holiday labels
   - Global `.highlightedDate` - Applied to calendar dates

3. **Clean Integration**:
   ```tsx
   <tr 
     onMouseEnter={() => handleEventHover(event.interval)}
     onMouseLeave={handleMouseLeave}
     className={highlightStyles.eventRow}
   >
   ```

For detailed API documentation, see [`features/calendarHighlight/README.md`](./features/calendarHighlight/README.md).

## Usage

1. Navigate to the Sales Event Calendar V1 page at http://localhost:5178
2. Hover over any row in the "All Events" table
3. Hover over any label in the "Holiday" section
4. Observe the synchronized highlighting:
   - Event/Holiday label background becomes transparent
   - Label text turns white
   - Corresponding calendar dates mirror the same effect

## Code Example

```tsx
// Main component usage
const SalesEventCalendar_V1 = () => {
  const [currentYear] = useState(2025)
  
  // Initialize the highlight feature
  const {
    calendarWrapperRef,
    handleEventHover,
    handleHolidayHover,
    handleMouseLeave,
  } = useCalendarHighlight(currentYear)

  return (
    <div>
      {/* Attach ref to calendar wrapper */}
      <div ref={calendarWrapperRef}>
        <Calendar {...props} />
      </div>

      {/* Add handlers to event rows */}
      <tr 
        onMouseEnter={() => handleEventHover(event.interval)}
        onMouseLeave={handleMouseLeave}
        className={highlightStyles.eventRow}
      >
        <td><Label>{event.name}</Label></td>
      </tr>

      {/* Add handlers to holiday labels */}
      <div 
        onMouseEnter={() => handleHolidayHover(holiday.date)}
        onMouseLeave={handleMouseLeave}
        className={highlightStyles.holidayLabelWrapper}
      >
        <Label>{holiday.name}</Label>
      </div>
    </div>
  )
}
```

