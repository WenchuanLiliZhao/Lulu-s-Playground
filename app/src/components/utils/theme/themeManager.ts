/**
 * Theme Manager Utility
 * Handles theme switching and persistence
 */

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'lulu-theme-preference';

/**
 * Get the system's preferred color scheme
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Get the current theme preference from localStorage
 */
export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
};

/**
 * Get the actual theme to apply (resolves 'system' to 'light' or 'dark')
 */
export const getResolvedTheme = (themeMode: ThemeMode): 'light' | 'dark' => {
  if (themeMode === 'system') {
    return getSystemTheme();
  }
  return themeMode;
};

/**
 * Apply theme to the document
 */
export const applyTheme = (themeMode: ThemeMode): void => {
  if (typeof document === 'undefined') return;
  
  const resolvedTheme = getResolvedTheme(themeMode);
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  
  // Also add a class for easier CSS targeting
  document.documentElement.classList.remove('theme-light', 'theme-dark');
  document.documentElement.classList.add(`theme-${resolvedTheme}`);
};

/**
 * Save theme preference and apply it
 */
export const setTheme = (themeMode: ThemeMode): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  applyTheme(themeMode);
};

/**
 * Initialize theme on app load
 */
export const initializeTheme = (): ThemeMode => {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  return storedTheme;
};

/**
 * Listen for system theme changes
 */
export const watchSystemTheme = (callback: (theme: 'light' | 'dark') => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
};

