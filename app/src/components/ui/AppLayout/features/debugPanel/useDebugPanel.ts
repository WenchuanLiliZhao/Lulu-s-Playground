import { useState, useEffect } from 'react';
import { type ThemeMode, initializeTheme, setTheme, watchSystemTheme } from '../../../../utils';

/**
 * Custom hook for debug panel functionality
 * Manages theme switching and debug panel visibility
 */
export const useDebugPanel = () => {
  const [isDebugPanelOpen, setIsDebugPanelOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('system');

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = initializeTheme();
    setCurrentTheme(storedTheme);
  }, []);

  // Watch for system theme changes when in system mode
  useEffect(() => {
    if (currentTheme === 'system') {
      const cleanup = watchSystemTheme(() => {
        // Force re-apply theme when system theme changes
        setTheme('system');
      });
      return cleanup;
    }
  }, [currentTheme]);

  const handleThemeChange = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    setTheme(theme);
  };

  const toggleDebugPanel = () => {
    setIsDebugPanelOpen(!isDebugPanelOpen);
  };

  return {
    isDebugPanelOpen,
    currentTheme,
    handleThemeChange,
    toggleDebugPanel,
  };
};

