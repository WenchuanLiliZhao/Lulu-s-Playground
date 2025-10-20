import { useState, useEffect } from 'react';
import styles from "./_styles.module.scss";
import { type ThemeMode, initializeTheme, setTheme, watchSystemTheme, getResolvedTheme } from '../../utils';

export interface AppLayoutProps {
  children: React.ReactNode;
  isTesting?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  isTesting = false,
}) => {
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

  return (
    <div className={styles["lulu-layout"]}>
      {children}
      
      {isTesting && (
        <>
          {/* Floating Debug Button */}
          <button
            className={styles["debug-button"]}
            onClick={toggleDebugPanel}
            aria-label="Debug Panel"
          >
            🛠️
          </button>

          {/* Debug Panel */}
          {isDebugPanelOpen && (
            <div className={styles["debug-panel"]}>
              <div className={styles["debug-panel-header"]}>
                <h3>Debug Settings</h3>
                <button
                  className={styles["close-button"]}
                  onClick={toggleDebugPanel}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className={styles["debug-panel-content"]}>
                {/* Theme Switcher */}
                <div className={styles["debug-section"]}>
                  <label className={styles["debug-label"]}>Theme</label>
                  <div className={styles["theme-options"]}>
                    <button
                      className={`${styles["theme-option"]} ${
                        currentTheme === 'light' ? styles["active"] : ''
                      }`}
                      onClick={() => handleThemeChange('light')}
                    >
                      ☀️ Light
                    </button>
                    <button
                      className={`${styles["theme-option"]} ${
                        currentTheme === 'dark' ? styles["active"] : ''
                      }`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      🌙 Dark
                    </button>
                    <button
                      className={`${styles["theme-option"]} ${
                        currentTheme === 'system' ? styles["active"] : ''
                      }`}
                      onClick={() => handleThemeChange('system')}
                    >
                      💻 System
                    </button>
                  </div>
                  <div className={styles["theme-info"]}>
                    Current: {getResolvedTheme(currentTheme)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
