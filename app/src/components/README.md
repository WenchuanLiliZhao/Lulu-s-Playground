# Components Directory Structure

This directory is organized into three main subdirectories:

## 📁 Directory Structure

```
components/
├── ui/              # Pure UI components
├── utils/           # Utility functions
├── enhanced/        # Enhanced/extended components
└── index.ts         # Main export file
```

## 📦 Subdirectories

### 1. `ui/` - Pure UI Components
Contains presentational components that focus solely on visual rendering.

**Example:**
- `Button` - Basic button component with various variants and sizes

### 2. `utils/` - Utility Functions
Contains reusable utility functions and helper classes that provide business logic.

**Example:**
- `ClickCounter` - Class for tracking and logging click events
- `createClickCounterHandler` - Factory function for creating click handlers

### 3. `enhanced/` - Enhanced Components
Contains components that extend pure UI components with additional functionality by utilizing utilities.

**Example:**
- `ClickCounterButton` - Button component that automatically tracks and logs clicks to console

## 🚀 Usage

```typescript
// Import pure UI components
import { Button } from './components'

// Import enhanced components
import { ClickCounterButton } from './components'

// Import utilities
import { ClickCounter, createClickCounterHandler } from './components'
```

## 📝 Guidelines

- **UI Components**: Should be stateless or have minimal internal state, focused on presentation
- **Utilities**: Should be pure functions or classes that can be reused across components
- **Enhanced Components**: Should leverage UI components and utilities to provide additional functionality

## 🔧 Example

The `ClickCounterButton` demonstrates the pattern:
1. Uses `Button` from `ui/` for the visual component
2. Uses `ClickCounter` from `utils/` for the click tracking logic
3. Combines them to create an enhanced button with logging capabilities

