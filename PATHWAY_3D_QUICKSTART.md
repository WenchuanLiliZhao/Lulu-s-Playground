# PathwayVisualization3D - Quick Start Guide

## 🎯 Overview

A 3D interactive visualization widget for displaying network pathways with flag nodes and connecting lines in a dashboard.

## 🚀 Features

- ✅ **3D Scene** with perspective and interactive camera controls
- ✅ **Flag Nodes** with customizable icons and labels
- ✅ **Grid Floor** for spatial reference
- ✅ **2D Ground-Based Paths** painted on the grid surface:
  - Animated flowing dashed lines (showing direction)
  - Custom colors
  - Grid-aligned routing
- ✅ **Camera Distance Scaling** - maintains consistent visual size
- ✅ **Auto-rotation** support
- ✅ **Theme-aware** (light/dark mode)

## 📦 Installation

The component is part of the `lululemon-ui` package. Three.js is included as a dependency.

```bash
npm install lululemon-ui three @types/three
```

## 🎨 Basic Usage

```tsx
import { PathwayVisualization3D } from 'lululemon-ui'

const nodes = [
  {
    id: 'start',
    position: [0, 0, 0] as [number, number, number],
    label: 'Start',
    icon: 'flag',
    color: '#E92C3A',
  },
  {
    id: 'end',
    position: [5, 0, 5] as [number, number, number],
    label: 'End',
    icon: 'check_circle',
    color: '#10B981',
  },
]

const connections = [
  {
    from: 'start',
    to: 'end',
    color: '#3B82F6',
    style: 'solid' as const,
  },
]

function MyComponent() {
  return (
    <PathwayVisualization3D
      nodes={nodes}
      connections={connections}
      showHeader
      headerIcon="route"
      headerTitle="Network Pathways"
    />
  )
}
```

## 🎮 Interactive Controls

- **Left Click + Drag** - Rotate the view
- **Right Click + Drag** - Pan the view
- **Scroll Wheel** - Zoom in/out

## ⚙️ Configuration

### Scene Parameters

```tsx
<PathwayVisualization3D
  gridSize={20}           // Number of grid cells
  gridCellSize={1}        // Size of each cell
  flagHeight={2}          // Height of flag poles
  flagSize={0.8}          // Size of flag banners
  cameraDistance={15}     // Initial camera distance
  autoRotate={true}       // Enable auto-rotation
  autoRotateSpeed={0.5}   // Rotation speed
/>
```

### Node Structure

```typescript
{
  id: string              // Unique identifier
  position: [x, y, z]     // 3D coordinates
  label: string           // Display text
  icon?: string           // Material Symbol name
  color?: string          // CSS color
}
```

### Connection Structure

```typescript
{
  from: string            // Source node ID
  to: string              // Target node ID
  color?: string          // Line color
  width?: number          // Line width multiplier
}
```

## 🎯 Complete Example

```tsx
import { PathwayVisualization3D } from 'lululemon-ui'

const networkData = {
  nodes: [
    {
      id: 'node1',
      position: [-4, 0, -4] as [number, number, number],
      label: 'Entry Point',
      icon: 'input',
      color: '#E92C3A',
    },
    {
      id: 'node2',
      position: [0, 0, 0] as [number, number, number],
      label: 'Router',
      icon: 'router',
      color: '#3B82F6',
    },
    {
      id: 'node3',
      position: [4, 0, 4] as [number, number, number],
      label: 'Destination',
      icon: 'check_circle',
      color: '#10B981',
    },
  ],
  connections: [
    {
      from: 'node1',
      to: 'node2',
      color: '#3B82F6',
      style: 'solid' as const,
    },
    {
      from: 'node2',
      to: 'node3',
      color: '#10B981',
      style: 'solid' as const,
    },
  ],
}

function NetworkVisualization() {
  return (
    <PathwayVisualization3D
      nodes={networkData.nodes}
      connections={networkData.connections}
      showHeader
      headerIcon="hub"
      headerTitle="Network Topology"
      headerSummary="Interactive 3D visualization of network paths"
      cameraDistance={15}
      autoRotate
      autoRotateSpeed={0.5}
    />
  )
}
```

## 🎨 Styling

The component uses CSS variables from the design system. You can customize colors through your theme:

```css
:root {
  --color-bg-main: #ffffff;
  --color-border-main: #e5e7eb;
  --brand-color: #E92C3A;
}
```

## 🧪 Testing

To test the component with the debug page:

1. Start the dev server:
   ```bash
   cd app && npm run dev
   ```

2. Navigate to the PathwayVisualization3D debug page

3. Use the control panel to adjust parameters in real-time

## 💡 Tips

1. **Coordinate System**: Position `[x, y, z]` where:
   - `x` is left-right
   - `y` is up-down (typically 0 for ground level)
   - `z` is forward-backward

2. **Grid Alignment**: Keep node positions at integer coordinates for better visual alignment with the grid

3. **Animated Paths**: All connection lines are animated dashed lines that flow towards the endpoint, clearly showing direction without needing arrows

4. **Camera Distance Scaling**: The component automatically scales nodes based on camera distance, so they appear the same size when zooming

5. **Performance**: For large networks (100+ nodes), consider reducing `gridSize` and disabling `autoRotate`

6. **Material Icons**: Use any icon from [Material Symbols](https://fonts.google.com/icons)

## 📚 API Reference

See the [full README](app/src/components/ui/forDashboard/PathwayVisualization3D/README.md) for detailed API documentation.

## 🐛 Troubleshooting

**Issue**: 3D scene not rendering
- Ensure Three.js is installed: `npm install three @types/three`
- Check browser console for WebGL errors

**Issue**: Icons not showing
- Verify Material Symbols font is loaded
- Check icon names at [fonts.google.com/icons](https://fonts.google.com/icons)

**Issue**: Lines not connecting properly
- Verify node IDs match in connections
- Check that node positions are valid numbers

## 📝 License

MIT License - Part of the Lululemon UI Design System

