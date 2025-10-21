/**
 * AppLayout Features
 * 
 * This directory contains modular features for the AppLayout component.
 * Each feature is self-contained and can be independently maintained.
 */

// Types
export type { ViewportMode, WindowSize, ViewportScalingState } from './types';

// Viewport Scaling
export { 
  useViewportScaling, 
  calculateScaledStyle 
} from './viewportScaling';

// Debug Panel
export { 
  useDebugPanel, 
  DebugPanel, 
  DebugButton 
} from './debugPanel';

