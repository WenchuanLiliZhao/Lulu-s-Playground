import React from 'react';
import styles from '../../_styles.module.scss';

interface DebugButtonProps {
  onClick: () => void;
}

/**
 * Floating Debug Button
 * Toggles the debug panel visibility
 */
export const DebugButton: React.FC<DebugButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles["debug-button"]}
      onClick={onClick}
      aria-label="Debug Panel"
    >
      🛠️
    </button>
  );
};

