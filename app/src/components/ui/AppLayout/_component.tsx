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
  /**
   * Enable framed viewport with rounded corners and measurement rulers
   * Only works when viewportMode is "scaled-from"
   * @default false
   */
  enableFrame?: boolean;
  /**
   * Custom ruler sizes [top, right, bottom, left] in pixels
   * Only works when enableFrame is true
   * @default [24, 24, 24, 24]
   */
  rulerSizes?: [number, number, number, number];
  /**
   * Background color/style for the frame area (ruler space)
   * Only works when enableFrame is true
   * @default "var(--color-bg-sec)"
   * @example "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
   * @example "#f0f0f0"
   */
  frameBackground?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  isTesting = false,
  viewportMode = "default",
  className = "",
  enableFrame = false,
  rulerSizes = [24, 24, 24, 24],
  frameBackground = "var(--color-bg-sec)",
}) => {
  // Viewport scaling feature
  const { state: scalingState, contentRef } = useViewportScaling(viewportMode, enableFrame, rulerSizes);
  const { scale, windowSize, isScaled } = scalingState;

  // Debug panel feature
  const {
    isDebugPanelOpen,
    currentTheme,
    handleThemeChange,
    toggleDebugPanel,
  } = useDebugPanel();

  // Calculate container styles for scaled mode
  const containerStyle = calculateScaledStyle(viewportMode, scale, windowSize, enableFrame, rulerSizes);
  
  const scaledViewportMode = isScaled ? (viewportMode as ["scaled-from", number, number]) : null;
  const shouldShowFrame = isScaled && enableFrame && scaledViewportMode;

  // Render measurement rulers
  const renderRulers = () => {
    if (!shouldShowFrame || !scaledViewportMode) return null;
    
    const baseWidth = scaledViewportMode[1];
    const baseHeight = scaledViewportMode[2];
    
    // Extract transform values from containerStyle
    const transformMatch = containerStyle.transform?.match(/translate\(([\d.]+)px,\s*([\d.]+)px\)\s*scale\(([\d.]+)\)/);
    const offsetX = transformMatch ? parseFloat(transformMatch[1]) : 0;
    const offsetY = transformMatch ? parseFloat(transformMatch[2]) : 0;
    
    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;
    
    const [topSize, rightSize, bottomSize, leftSize] = rulerSizes;
    
    // Calculate ruler positions - simplified, just empty divs filling space
    const rulerStyle = {
      top: {
        left: `${offsetX}px`,
        top: `${offsetY - topSize}px`,
        width: `${scaledWidth}px`,
        height: `${topSize}px`,
      },
      bottom: {
        left: `${offsetX}px`,
        top: `${offsetY + scaledHeight}px`,
        width: `${scaledWidth}px`,
        height: `${bottomSize}px`,
      },
      left: {
        left: `${offsetX - leftSize}px`,
        top: `${offsetY}px`,
        width: `${leftSize}px`,
        height: `${scaledHeight}px`,
      },
      right: {
        left: `${offsetX + scaledWidth}px`,
        top: `${offsetY}px`,
        width: `${rightSize}px`,
        height: `${scaledHeight}px`,
      },
    };
    
    return (
      <>
        <div className={styles["ruler-top"]} style={rulerStyle.top} />
        <div className={styles["ruler-right"]} style={rulerStyle.right} />
        <div className={styles["ruler-bottom"]} style={rulerStyle.bottom} />
        <div className={styles["ruler-left"]} style={rulerStyle.left} />
      </>
    );
  };

  return (
    <div 
      className={`${styles["lulu-layout"]} ${isScaled ? styles["scaled"] : ''} ${shouldShowFrame ? styles["framed"] : ''} ${className}`}
      style={shouldShowFrame ? { background: frameBackground } : undefined}
    >
      {isScaled && scaledViewportMode ? (
        <>
          {renderRulers()}
          <div 
            ref={contentRef} 
            className={`${styles["scaled-content"]} ${shouldShowFrame ? styles["scaled-content-framed"] : ''}`}
            style={containerStyle}
            data-scaled-viewport="true"
            data-base-width={scaledViewportMode[1]}
            data-base-height={scaledViewportMode[2]}
          >
            {children}
          </div>
        </>
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
