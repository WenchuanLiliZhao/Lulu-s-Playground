# Utilities

This folder contains reusable utility functions organized by category.

## 📁 Folder Structure

```
utils/
├── index.ts           # Central export point for all utilities
├── theme/             # Theme management utilities
│   └── themeManager.ts
└── state/             # State management utilities
    └── clickCounter.ts
```

## 📚 Categories

### 🎨 Theme (`theme/`)
Theme-related utilities for managing light/dark mode and system theme detection.

**Exports:**
- `ThemeMode` - Type definition for theme modes (`'light' | 'dark' | 'system'`)
- `getSystemTheme()` - Get the system's preferred color scheme
- `getStoredTheme()` - Get the saved theme preference from localStorage
- `getResolvedTheme()` - Resolve 'system' theme to actual light/dark
- `applyTheme()` - Apply theme to the document
- `setTheme()` - Save and apply theme preference
- `initializeTheme()` - Initialize theme on app load
- `watchSystemTheme()` - Listen for system theme changes

**Usage:**
```typescript
import { setTheme, getStoredTheme } from '@/components/utils';

// Set theme
setTheme('dark');

// Get current theme
const currentTheme = getStoredTheme();
```

### 📊 State (`state/`)
State management utilities including counters and event handlers.

**Exports:**
- `ClickCounter` - Class for tracking button clicks
- `createClickCounterHandler()` - Factory function for click counter handlers

**Usage:**
```typescript
import { ClickCounter, createClickCounterHandler } from '@/components/utils';

// Using the class
const counter = new ClickCounter('MyButton');
counter.increment(); // Logs: "MyButton clicked: 1 times"

// Using the factory function
const { handleClick, getCount } = createClickCounterHandler('MyButton');
handleClick(); // Logs: "MyButton clicked: 1 times"
```

## 🔧 Adding New Utilities

When adding new utilities:

1. **Identify the category** - Determine if it fits into an existing category or needs a new one
2. **Create in appropriate folder** - Add your utility file in the correct subfolder
3. **Export from main index** - Update the main `utils/index.ts` to export your utilities

### Example: Adding a new category

```
utils/
├── index.ts
├── theme/
├── state/
└── validation/        # New category
    └── formValidators.ts
```

Update `utils/index.ts`:
```typescript
// Validation utilities
export { validateEmail, validatePassword } from './validation/formValidators';
```

## 📝 Naming Conventions

- **Files**: Use camelCase (e.g., `themeManager.ts`, `formValidators.ts`)
- **Folders**: Use lowercase (e.g., `theme/`, `state/`, `validation/`)
- **Functions**: Use camelCase (e.g., `getSystemTheme()`, `createHandler()`)
- **Classes**: Use PascalCase (e.g., `ClickCounter`, `EventEmitter`)
- **Types**: Use PascalCase (e.g., `ThemeMode`, `ValidationResult`)

## 🎯 Best Practices

1. **Keep utilities pure** - Functions should be deterministic when possible
2. **Document thoroughly** - Add JSDoc comments for all exported functions
3. **Single responsibility** - Each utility should do one thing well
4. **Avoid dependencies** - Minimize external dependencies within utilities
5. **Export types** - Always export relevant TypeScript types
6. **Test coverage** - Consider adding tests for complex utilities

