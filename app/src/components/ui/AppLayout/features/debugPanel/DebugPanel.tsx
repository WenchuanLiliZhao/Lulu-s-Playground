import React from 'react';
import { type ThemeMode, getResolvedTheme } from '../../../../utils';
import styles from '../../_styles.module.scss';

interface DebugPanelProps {
  isOpen: boolean;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onClose: () => void;
}

/**
 * Debug Panel Component
 * Provides theme switching and other debugging utilities
 */
export const DebugPanel: React.FC<DebugPanelProps> = ({
  isOpen,
  currentTheme,
  onThemeChange,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["debug-panel"]}>
      <div className={styles["debug-panel-header"]}>
        <h3>Debug Settings</h3>
        <button
          className={styles["close-button"]}
          onClick={onClose}
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
              onClick={() => onThemeChange('light')}
            >
              ☀️ Light
            </button>
            <button
              className={`${styles["theme-option"]} ${
                currentTheme === 'dark' ? styles["active"] : ''
              }`}
              onClick={() => onThemeChange('dark')}
            >
              🌙 Dark
            </button>
            <button
              className={`${styles["theme-option"]} ${
                currentTheme === 'system' ? styles["active"] : ''
              }`}
              onClick={() => onThemeChange('system')}
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
  );
};

