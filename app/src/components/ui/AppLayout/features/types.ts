/**
 * Types for AppLayout features
 */

/**
 * Viewport mode configuration
 * - "default": Normal responsive layout
 * - ["scaled-from", width, height]: Fixed aspect ratio scaling from base dimensions
 */
export type ViewportMode = "default" | ["scaled-from", number, number];

/**
 * Window size dimensions
 */
export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Viewport scaling state
 */
export interface ViewportScalingState {
  scale: number;
  windowSize: WindowSize;
  isScaled: boolean;
}

