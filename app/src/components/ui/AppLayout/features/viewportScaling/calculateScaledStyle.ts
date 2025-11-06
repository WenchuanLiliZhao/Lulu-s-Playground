import type { ViewportMode, WindowSize } from '../types';

/**
 * Calculate container styles for scaled viewport mode
 * Centers the scaled content within the window
 */
export const calculateScaledStyle = (
  viewportMode: ViewportMode,
  scale: number,
  windowSize: WindowSize,
  enableFrame: boolean = false,
  rulerSizes: [number, number, number, number] = [24, 24, 24, 24]
): React.CSSProperties => {
  if (viewportMode === "default") {
    return {};
  }

  const baseWidth = viewportMode[1];
  const baseHeight = viewportMode[2];

  // Account for ruler sizes if frame is enabled
  const [topSize, rightSize, bottomSize, leftSize] = rulerSizes;
  const horizontalPadding = enableFrame ? (leftSize + rightSize) : 0;
  const verticalPadding = enableFrame ? (topSize + bottomSize) : 0;

  const availableWidth = windowSize.width - horizontalPadding;
  const availableHeight = windowSize.height - verticalPadding;

  // Calculate the scaled dimensions
  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  // Calculate the offset to center the content
  const offsetX = (availableWidth - scaledWidth) / 2 + (enableFrame ? leftSize : 0);
  const offsetY = (availableHeight - scaledHeight) / 2 + (enableFrame ? topSize : 0);

  return {
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
  };
};

