# Features Directory

This directory contains modular, reusable feature implementations for the Sales Event Calendar demo.

## Philosophy

Each feature in this directory follows these principles:

1. **Self-Contained**: Complete logic, styles, and documentation in one place
2. **Reusable**: Can be easily extracted and used in other projects
3. **Well-Documented**: Includes usage examples and API documentation
4. **Type-Safe**: Full TypeScript support
5. **Tested**: Easy to test in isolation

## Available Features

### 📍 calendarHighlight

Interactive hover synchronization between event/holiday labels and calendar dates.

**Files:**
- `useCalendarHighlight.ts` - Custom React hook
- `_styles.module.scss` - Feature-specific styles
- `README.md` - Detailed documentation

**Usage:**
```typescript
import { useCalendarHighlight, highlightStyles } from './features'
```

See [calendarHighlight/README.md](./calendarHighlight/README.md) for details.

## Adding New Features

To add a new feature:

1. Create a new directory under `features/`
2. Include at minimum:
   - Main implementation file (`.ts` or `.tsx`)
   - Styles file (`_styles.module.scss`)
   - Documentation (`README.md`)
   - Export file (`index.ts`)
3. Export from `features/index.ts`
4. Document in this README

### Example Structure

```
features/
└── myNewFeature/
    ├── useMyFeature.ts          # Main logic
    ├── _styles.module.scss      # Styles
    ├── index.ts                 # Exports
    └── README.md                # Documentation
```

## Import Patterns

```typescript
// Import specific features
import { useCalendarHighlight } from './features/calendarHighlight'

// Import from features index (recommended)
import { useCalendarHighlight, highlightStyles } from './features'
```

