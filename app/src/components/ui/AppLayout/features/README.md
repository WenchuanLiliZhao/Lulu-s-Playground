# AppLayout Features

This directory contains modular features for the `AppLayout` component. Each feature is self-contained and can be independently maintained and tested.

## Directory Structure

```
features/
├── types.ts                      # Common type definitions
├── viewportScaling/              # Viewport scaling feature
│   ├── useViewportScaling.ts     # Custom hook for scaling logic
│   ├── calculateScaledStyle.ts   # Style calculation utility
│   └── index.ts                  # Feature exports
├── debugPanel/                   # Debug panel feature
│   ├── useDebugPanel.ts          # Custom hook for debug panel state
│   ├── DebugPanel.tsx            # Debug panel component
│   ├── DebugButton.tsx           # Debug button component
│   └── index.ts                  # Feature exports
└── index.ts                      # Main feature exports
```

## Features

### 1. Viewport Scaling

Provides responsive scaling and centering of content based on fixed base dimensions.

**Key Components:**
- `useViewportScaling`: Custom hook that manages scaling state and window resize events
- `calculateScaledStyle`: Utility function to calculate transform styles for centering

**Usage Example:**
```tsx
import { useViewportScaling, calculateScaledStyle } from './features/viewportScaling';

const { state, contentRef } = useViewportScaling(["scaled-from", 1920, 1080]);
const { scale, windowSize, isScaled } = state;
const style = calculateScaledStyle(viewportMode, scale, windowSize);
```

**Features:**
- ✅ Fixed aspect ratio scaling
- ✅ Automatic window resize handling
- ✅ Content centering (both horizontal and vertical)
- ✅ CSS custom properties for base dimensions
- ✅ Prevents responsive behavior via `data-scaled-viewport` attribute

### 2. Debug Panel

Provides development and testing utilities, including theme switching.

**Key Components:**
- `useDebugPanel`: Custom hook for debug panel state and theme management
- `DebugPanel`: The main debug panel UI component
- `DebugButton`: Floating button to toggle the debug panel

**Usage Example:**
```tsx
import { useDebugPanel, DebugPanel, DebugButton } from './features/debugPanel';

const {
  isDebugPanelOpen,
  currentTheme,
  handleThemeChange,
  toggleDebugPanel,
} = useDebugPanel();
```

**Features:**
- ✅ Theme switching (light/dark/system)
- ✅ System theme change detection
- ✅ Theme persistence in localStorage
- ✅ Extensible for additional debug utilities

## Type Definitions

### `ViewportMode`
```typescript
type ViewportMode = "default" | ["scaled-from", number, number];
```
- `"default"`: Normal responsive layout
- `["scaled-from", width, height]`: Fixed aspect ratio scaling from base dimensions

### `WindowSize`
```typescript
interface WindowSize {
  width: number;
  height: number;
}
```

### `ViewportScalingState`
```typescript
interface ViewportScalingState {
  scale: number;
  windowSize: WindowSize;
  isScaled: boolean;
}
```

## Adding New Features

To add a new feature to AppLayout:

1. **Create a new directory** under `features/`
   ```
   features/newFeature/
   ```

2. **Implement the feature** with appropriate hooks/components/utilities
   ```tsx
   // useNewFeature.ts
   export const useNewFeature = () => {
     // Feature logic
   };
   ```

3. **Create an index file** to export the feature
   ```tsx
   // index.ts
   export { useNewFeature } from './useNewFeature';
   ```

4. **Add exports** to the main features index
   ```tsx
   // features/index.ts
   export { useNewFeature } from './newFeature';
   ```

5. **Use in AppLayout** component
   ```tsx
   // _component.tsx
   import { useNewFeature } from './features';
   
   const feature = useNewFeature();
   ```

## Best Practices

1. **Keep features independent**: Each feature should be self-contained and not depend on other features
2. **Use custom hooks**: Encapsulate stateful logic in custom hooks for reusability
3. **Type everything**: Use TypeScript interfaces and types for all feature APIs
4. **Document exports**: Add JSDoc comments to exported functions and components
5. **Test in isolation**: Features should be testable independently of the AppLayout component

## Benefits of This Structure

- ✅ **Modularity**: Each feature is independent and can be maintained separately
- ✅ **Reusability**: Features can potentially be reused in other components
- ✅ **Testability**: Easier to write unit tests for individual features
- ✅ **Readability**: Main component file is cleaner and easier to understand
- ✅ **Scalability**: New features can be added without cluttering the main component
- ✅ **Maintainability**: Changes to one feature don't affect others

