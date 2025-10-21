import type { ViewportMode, WindowSize } from '../types';

/**
 * Calculate container styles for scaled viewport mode
 * Centers the scaled content within the window
 */
export const calculateScaledStyle = (
  viewportMode: ViewportMode,
  scale: number,
  windowSize: WindowSize
): React.CSSProperties => {
  if (viewportMode === "default") {
    return {};
  }

  const baseWidth = viewportMode[1];
  const baseHeight = viewportMode[2];

  // Calculate the scaled dimensions
  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  // Calculate the offset to center the content
  const offsetX = (windowSize.width - scaledWidth) / 2;
  const offsetY = (windowSize.height - scaledHeight) / 2;

  return {
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
  };
};

