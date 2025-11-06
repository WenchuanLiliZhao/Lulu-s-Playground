import React from 'react';
import styles from "./_styles.module.scss";
import {
  type ViewportMode,
  useViewportScaling,
  calculateScaledStyle,
  useDebugPanel,
  DebugPanel,
  DebugButton,
} from './features';

export interface AppLayoutProps {
  children: React.ReactNode;
  isTesting?: boolean;
  viewportMode?: ViewportMode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  isTesting = false,
  viewportMode = "default",
  className = "",
}) => {
  // Viewport scaling feature
  const { state: scalingState, contentRef } = useViewportScaling(viewportMode);
  const { scale, windowSize, isScaled } = scalingState;

  // Debug panel feature
  const {
    isDebugPanelOpen,
    currentTheme,
    handleThemeChange,
    toggleDebugPanel,
  } = useDebugPanel();

  // Calculate container styles for scaled mode
  const containerStyle = calculateScaledStyle(viewportMode, scale, windowSize);
  
  const scaledViewportMode = isScaled ? (viewportMode as ["scaled-from", number, number]) : null;

  return (
    <div className={`${styles["lulu-layout"]} ${isScaled ? styles["scaled"] : ''} ${className}`}>
      {isScaled && scaledViewportMode ? (
        <div 
          ref={contentRef} 
          className={styles["scaled-content"]}
          style={containerStyle}
          data-scaled-viewport="true"
          data-base-width={scaledViewportMode[1]}
          data-base-height={scaledViewportMode[2]}
        >
          {children}
        </div>
      ) : (
        children
      )}
      
      {isTesting && (
        <>
          <DebugButton onClick={toggleDebugPanel} />
          <DebugPanel
            isOpen={isDebugPanelOpen}
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            onClose={toggleDebugPanel}
          />
        </>
      )}
    </div>
  );
};
