# Event Filter Feature

This feature provides filtering functionality for events by channel (Retail/EC).

## Usage

```tsx
import { useEventFilter } from './features/eventFilter'

const { 
  filterState, 
  filteredEvents, 
  isFilterActive, 
  toggleChannel 
} = useEventFilter(events)

// Use filteredEvents instead of events
// Use isFilterActive to determine dropdown state
```

## Features

- Filter events by Retail/EC channel
- Track filter active state
- Reset filter functionality
- Memoized filtered results

