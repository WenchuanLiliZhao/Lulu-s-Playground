# PathwayVisualization3D

A 3D visualization widget for displaying network paths with nodes (flags) and connections in a dashboard.

## Features

- **3D Scene**: Interactive 3D environment with perspective and camera controls
- **Flag Nodes**: Visual nodes represented as flags with icons and labels
- **Path Connections**: Lines connecting nodes with support for:
  - Animated flowing dashed lines (indicating direction)
  - Custom colors
  - Adjustable line width
- **Grid Floor**: Visual reference grid aligned with the scene
- **Camera Distance Scaling**: Node sizes automatically adjust based on camera distance to maintain consistent visual size
- **Interactive Controls**: Orbit controls for rotating, panning, and zooming
- **Auto-rotation**: Optional automatic scene rotation

## Usage

```tsx
import { PathwayVisualization3D } from '@/components/ui/forDashboard/PathwayVisualization3D'

const nodes = [
  {
    id: 'node1',
    position: [0, 0, 0] as [number, number, number],
    label: 'Start',
    icon: 'flag',
    color: '#E92C3A',
  },
  {
    id: 'node2',
    position: [5, 0, 5] as [number, number, number],
    label: 'Middle',
    icon: 'location_on',
    color: '#3B82F6',
  },
  {
    id: 'node3',
    position: [10, 0, 0] as [number, number, number],
    label: 'End',
    icon: 'check_circle',
    color: '#10B981',
  },
]

const connections = [
  {
    from: 'node1',
    to: 'node2',
    color: '#3B82F6',
  },
  {
    from: 'node2',
    to: 'node3',
    color: '#10B981',
  },
]

<PathwayVisualization3D
  nodes={nodes}
  connections={connections}
  showHeader
  headerIcon="route"
  headerTitle="Network Pathways"
  gridSize={20}
  cameraDistance={15}
  autoRotate
/>
```

## Props

### Node Configuration

- `nodes`: Array of node objects with:
  - `id`: Unique identifier
  - `position`: [x, y, z] coordinates in 3D space
  - `label`: Display text
  - `icon`: Material Symbol icon name (optional)
  - `color`: CSS color for the flag (optional)

### Connection Configuration

- `connections`: Array of connection objects with:
  - `from`: Source node ID
  - `to`: Target node ID
  - `color`: Line color (optional)
  - `width`: Line width multiplier (optional, default: 1)

### Scene Configuration

- `gridSize`: Number of grid cells (default: 20)
- `gridCellSize`: Size of each grid cell in 3D units (default: 1)
- `flagHeight`: Height of flag poles (default: 2)
- `flagSize`: Size of flag banners (default: 0.8)
- `cameraDistance`: Initial camera distance from origin (default: 15)
- `autoRotate`: Enable automatic scene rotation (default: false)
- `autoRotateSpeed`: Rotation speed multiplier (default: 0.5)

### Dashboard Props

Supports all standard dashboard widget props from `DashboardCommonProps`:
- `showHeader`, `headerIcon`, `headerTitle`, `headerSummary`
- `showAlertLight`, `alertLightColor`
- `className`

## Styling

Key SCSS variables in `_styles.module.scss`:

```scss
$scene-min-height: 400px;
$scene-default-height: 500px;
$flag-pole-thickness: 0.02;
```

## Camera Controls

- **Left Click + Drag**: Rotate view
- **Right Click + Drag**: Pan view
- **Scroll Wheel**: Zoom in/out
- **Auto-rotation**: Optional automatic rotation around the scene

## Implementation Notes

### Camera Distance Scaling

Node sizes (flags, icons, labels) automatically scale based on camera distance to maintain consistent visual appearance regardless of zoom level. This is calculated in `updateNodeScales()`:

```typescript
const scale = distance * 0.08
nodeGroup.scale.set(scale, scale, scale)
```

### 2D Ground-Based Paths with Flow Animation

All connection lines are rendered as animated dashed lines on the ground plane (XZ plane at y=0), giving the appearance of being drawn directly on the grid surface with flowing movement:

- **Lines**: Created using `THREE.LineDashedMaterial` with points at y=0.01
- **Animation**: The `dashOffset` is continuously updated in the animation loop, creating a flowing effect that indicates the direction from source to target
- **Flow Speed**: Dashes move at 0.01 units per frame towards the endpoint
- This design ensures paths look painted on the ground while clearly showing direction through movement

### Path Alignment

Connections follow grid-aligned paths (orthogonal turns) to maintain visual consistency with the ground grid. Paths use L-shaped routing by default.

### Theme Integration

The component automatically adapts to the current theme (light/dark) by reading CSS variables for colors and background.

## Performance

- Uses `requestAnimationFrame` for smooth 60fps rendering
- Efficient node scaling updates
- Proper cleanup on unmount
- Responsive to window resize events

