/**
 * Utilities Index
 * Central export point for all utility functions
 * 
 * Category structure:
 * - theme/    : Theme management (light/dark mode, system theme detection)
 * - state/    : State management utilities (counters, handlers)
 */

// Theme utilities
export {
  type ThemeMode,
  getSystemTheme,
  getStoredTheme,
  getResolvedTheme,
  applyTheme,
  setTheme,
  initializeTheme,
  watchSystemTheme,
} from './theme/themeManager';

// State management utilities
export { ClickCounter, createClickCounterHandler } from './state/clickCounter';
