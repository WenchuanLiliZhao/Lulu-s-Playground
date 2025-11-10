import { useState } from 'react'
import AppLayout from '../../../components/ui/AppLayout'
import { PathwayVisualization3D, PATHWAY_VISUALIZATION_DEFAULTS } from '../../../components/ui/forDashboard/PathwayVisualization3D'
import type { PathNode, PathConnection } from '../../../components/ui/forDashboard/PathwayVisualization3D'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss'

// ===== Mock Data =====

const DEFAULT_NODES: PathNode[] = [
  {
    id: 'node1',
    position: [-4, 0, -4],
    label: 'Start',
    icon: 'flag',
    color: '#E92C3A',
  },
  {
    id: 'node2',
    position: [0, 0, -4],
    label: 'Checkpoint A',
    icon: 'location_on',
    color: '#3B82F6',
  },
  {
    id: 'node3',
    position: [4, 0, -4],
    label: 'Gateway',
    icon: 'router',
    color: '#8B5CF6',
  },
  {
    id: 'node4',
    position: [4, 0, 0],
    label: 'Hub',
    icon: 'hub',
    color: '#F59E0B',
  },
  {
    id: 'node5',
    position: [4, 0, 4],
    label: 'Checkpoint B',
    icon: 'location_on',
    color: '#3B82F6',
  },
  {
    id: 'node6',
    position: [0, 0, 4],
    label: 'End',
    icon: 'check_circle',
    color: '#10B981',
  },
  {
    id: 'node7',
    position: [-4, 0, 0],
    label: 'Alternative',
    icon: 'alt_route',
    color: '#EC4899',
  },
]

const DEFAULT_CONNECTIONS: PathConnection[] = [
  {
    from: 'node1',
    to: 'node2',
    color: '#3B82F6',
    width: 1,
  },
  {
    from: 'node2',
    to: 'node3',
    color: '#3B82F6',
    width: 1,
  },
  {
    from: 'node3',
    to: 'node4',
    color: '#8B5CF6',
    width: 1,
  },
  {
    from: 'node4',
    to: 'node5',
    color: '#F59E0B',
    width: 1,
  },
  {
    from: 'node5',
    to: 'node6',
    color: '#10B981',
    width: 1,
  },
  {
    from: 'node1',
    to: 'node7',
    color: '#EC4899',
    width: 1,
  },
  {
    from: 'node7',
    to: 'node6',
    color: '#EC4899',
    width: 1,
  },
]

// ===== Debug Page Component =====

function PathwayVisualization3DDebug() {
  // Scene parameters (using component defaults)
  const [gridSize, setGridSize] = useState(PATHWAY_VISUALIZATION_DEFAULTS.gridSize)
  const [gridCellSize, setGridCellSize] = useState(PATHWAY_VISUALIZATION_DEFAULTS.gridCellSize)
  const [flagHeight, setFlagHeight] = useState(PATHWAY_VISUALIZATION_DEFAULTS.flagHeight)
  const [flagSize, setFlagSize] = useState(PATHWAY_VISUALIZATION_DEFAULTS.flagSize)
  const [cameraDistance, setCameraDistance] = useState(PATHWAY_VISUALIZATION_DEFAULTS.cameraDistance)
  const [cameraElevation, setCameraElevation] = useState(PATHWAY_VISUALIZATION_DEFAULTS.cameraElevation)
  const [autoRotate, setAutoRotate] = useState(true) // Debug default: true for better demo
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(PATHWAY_VISUALIZATION_DEFAULTS.autoRotateSpeed)

  // New adjustable parameters (using component defaults)
  const [labelSize, setLabelSize] = useState(PATHWAY_VISUALIZATION_DEFAULTS.labelSize)
  const [labelDistance, setLabelDistance] = useState(PATHWAY_VISUALIZATION_DEFAULTS.labelDistance)
  const [iconSize, setIconSize] = useState(PATHWAY_VISUALIZATION_DEFAULTS.iconSize)
  const [lineWidth, setLineWidth] = useState(PATHWAY_VISUALIZATION_DEFAULTS.lineWidth)
  const [dashAnimationSpeed, setDashAnimationSpeed] = useState(PATHWAY_VISUALIZATION_DEFAULTS.dashAnimationSpeed)
  const [showAxes, setShowAxes] = useState(PATHWAY_VISUALIZATION_DEFAULTS.showAxes)
  const [showGrid, setShowGrid] = useState(PATHWAY_VISUALIZATION_DEFAULTS.showGrid)

  // Widget parameters
  const [showHeader, setShowHeader] = useState(true)
  const [showAlertLight, setShowAlertLight] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>PathwayVisualization3D Debug</h1>
        <p>
          Test and configure the 3D pathway visualization widget with interactive controls
        </p>
      </div>

      <div className={styles.layout}>
        {/* Controls Panel */}
        <div className={styles.controls}>
          <h2>Scene Parameters</h2>

          <div className={styles.controlGroup}>
            <label>
              <span>Grid Size: {gridSize}</span>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Grid Cell Size: {gridCellSize.toFixed(1)}</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={gridCellSize}
                onChange={(e) => setGridCellSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Flag Height: {flagHeight.toFixed(1)}</span>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={flagHeight}
                onChange={(e) => setFlagHeight(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Flag Size: {flagSize.toFixed(2)}</span>
              <input
                type="range"
                min="0.3"
                max="2"
                step="0.1"
                value={flagSize}
                onChange={(e) => setFlagSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Camera Distance: {cameraDistance}</span>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={cameraDistance}
                onChange={(e) => setCameraDistance(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Camera Elevation (Height): {cameraElevation.toFixed(2)}</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={cameraElevation}
                onChange={(e) => setCameraElevation(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
              />
              <span>Auto Rotate</span>
            </label>
          </div>

          {autoRotate && (
            <div className={styles.controlGroup}>
              <label>
                <span>Rotation Speed: {autoRotateSpeed.toFixed(1)}</span>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={autoRotateSpeed}
                  onChange={(e) => setAutoRotateSpeed(Number(e.target.value))}
                />
              </label>
            </div>
          )}

          <h2>Visual Parameters</h2>

          <div className={styles.controlGroup}>
            <label>
              <span>Label Text Size: {labelSize.toFixed(1)}</span>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={labelSize}
                onChange={(e) => setLabelSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Label Distance: {labelDistance.toFixed(2)}</span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.05"
                value={labelDistance}
                onChange={(e) => setLabelDistance(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Icon Size: {iconSize.toFixed(2)}</span>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Line Width: {lineWidth.toFixed(1)}</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label>
              <span>Dash Animation Speed: {dashAnimationSpeed.toFixed(3)}</span>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.005"
                value={dashAnimationSpeed}
                onChange={(e) => setDashAnimationSpeed(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showAxes}
                onChange={(e) => setShowAxes(e.target.checked)}
              />
              <span>Show XY-Plane Axes</span>
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span>Show Ground Grid</span>
            </label>
          </div>

          <h2>Widget Parameters</h2>

          <div className={styles.controlGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showHeader}
                onChange={(e) => setShowHeader(e.target.checked)}
              />
              <span>Show Header</span>
            </label>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showAlertLight}
                onChange={(e) => setShowAlertLight(e.target.checked)}
              />
              <span>Show Alert Light</span>
            </label>
          </div>

          <div className={styles.info}>
            <h3>Interactive Controls</h3>
            <ul>
              <li key="control-rotate">
                <strong>Left Click + Drag:</strong> Rotate view
              </li>
              <li key="control-pan">
                <strong>Right Click + Drag:</strong> Pan view
              </li>
              <li key="control-zoom">
                <strong>Scroll Wheel:</strong> Zoom in/out
              </li>
            </ul>
          </div>

          <div className={styles.info}>
            <h3>Features Demonstrated</h3>
            <ul>
              <li key="feature-flags">Multiple flag nodes with icons</li>
              <li key="feature-animation">Animated flowing dashed lines (showing direction)</li>
              <li key="feature-colors">Custom colors for nodes and paths</li>
              <li key="feature-scaling">Camera distance scaling</li>
              <li key="feature-pathways">Grid-aligned pathways</li>
              <li key="feature-visual">Adjustable visual parameters (labels, icons, lines)</li>
              <li key="feature-axes">Optional coordinate axes display</li>
              <li key="feature-dark-mode">Dark mode support</li>
            </ul>
          </div>
        </div>

        {/* Visualization Widget */}
        <div className={styles.visualization}>
          <PathwayVisualization3D
            nodes={DEFAULT_NODES}
            connections={DEFAULT_CONNECTIONS}
            gridSize={gridSize}
            gridCellSize={gridCellSize}
            flagHeight={flagHeight}
            flagSize={flagSize}
            cameraDistance={cameraDistance}
            cameraElevation={cameraElevation}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            labelSize={labelSize}
            labelDistance={labelDistance}
            iconSize={iconSize}
            lineWidth={lineWidth}
            dashAnimationSpeed={dashAnimationSpeed}
            showAxes={showAxes}
            showGrid={showGrid}
            showHeader={showHeader}
            headerIcon="route"
            headerTitle="Network Pathway Visualization"
            headerSummary="Interactive 3D scene showing nodes and connections"
            showAlertLight={showAlertLight}
            alertLightColor="#10B981"
          />

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Nodes:</span>
              <span className={styles.statValue}>{DEFAULT_NODES.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Connections:</span>
              <span className={styles.statValue}>{DEFAULT_CONNECTIONS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PathwayVisualization3DDebugPage: PageProps = {
  title: 'PathwayVisualization3D Debug',
  slug: 'debug-pathway-visualization-3d',
  content: (
    <AppLayout isTesting={true}>
      <PathwayVisualization3DDebug />
    </AppLayout>
  ),
}

export default PathwayVisualization3DDebugPage

