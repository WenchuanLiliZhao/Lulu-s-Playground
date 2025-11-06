import { useState, useEffect, useRef } from 'react';
import type { ViewportMode, ViewportScalingState } from '../types';

/**
 * Custom hook for viewport scaling functionality
 * Handles responsive scaling and centering of content based on base dimensions
 */
export const useViewportScaling = (
  viewportMode: ViewportMode, 
  enableFrame: boolean = false,
  rulerSizes: [number, number, number, number] = [24, 24, 24, 24]
) => {
  const [scale, setScale] = useState(1);
  const [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportMode === "default") {
      setScale(1);
      return;
    }

    const baseWidth = viewportMode[1];
    const baseHeight = viewportMode[2];

    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Update window size state
      setWindowSize({ width: windowWidth, height: windowHeight });

      // Account for ruler sizes if frame is enabled
      const [topSize, rightSize, bottomSize, leftSize] = rulerSizes;
      const horizontalPadding = enableFrame ? (leftSize + rightSize) : 0;
      const verticalPadding = enableFrame ? (topSize + bottomSize) : 0;

      const availableWidth = windowWidth - horizontalPadding;
      const availableHeight = windowHeight - verticalPadding;

      // Calculate scale based on the smaller ratio to maintain aspect ratio
      const scaleX = availableWidth / baseWidth;
      const scaleY = availableHeight / baseHeight;
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
    };

    // Initial scale calculation
    updateScale();

    // Add resize listener
    window.addEventListener('resize', updateScale);

    // Set a CSS custom property for the base dimensions
    // This allows child components to use these values if needed
    if (contentRef.current) {
      contentRef.current.style.setProperty('--base-width', `${baseWidth}px`);
      contentRef.current.style.setProperty('--base-height', `${baseHeight}px`);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [viewportMode, enableFrame, rulerSizes]);

  const isScaled = viewportMode !== "default";

  const state: ViewportScalingState = {
    scale,
    windowSize,
    isScaled,
  };

  return {
    state,
    contentRef,
  };
};

