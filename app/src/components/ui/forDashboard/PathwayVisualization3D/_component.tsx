import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'
import { PATHWAY_VISUALIZATION_DEFAULTS } from './_config'

// ===== Types =====

export interface PathNode {
  /** Unique node identifier */
  id: string
  /** Node position in 3D space */
  position: [number, number, number]
  /** Node label/title */
  label: string
  /** Material icon name */
  icon?: string
  /** Node color (CSS color) */
  color?: string
}

export interface PathConnection {
  /** Source node ID */
  from: string
  /** Target node ID */
  to: string
  /** Line color (CSS color) */
  color?: string
  /** Line width multiplier */
  width?: number
}

export interface PathwayVisualization3DProps extends DashboardCommonProps {
  /** Array of nodes to display */
  nodes: PathNode[]
  /** Array of connections between nodes */
  connections: PathConnection[]
  /** Grid size (number of cells) */
  gridSize?: number
  /** Grid cell size in 3D units */
  gridCellSize?: number
  /** Flag height above ground */
  flagHeight?: number
  /** Flag size (width/height) */
  flagSize?: number
  /** Camera initial distance */
  cameraDistance?: number
  /** Camera elevation factor (0-1), multiplied by cameraDistance for Y position */
  cameraElevation?: number
  /** Enable camera auto-rotation */
  autoRotate?: boolean
  /** Auto-rotation speed */
  autoRotateSpeed?: number
  /** Label text size multiplier (relative to flag size) */
  labelSize?: number
  /** Distance from flag to label text (in 3D units, added to flagHeight) */
  labelDistance?: number
  /** Icon size multiplier (0-1, relative to flag height in canvas) */
  iconSize?: number
  /** Line width (note: WebGL has limitations, may not work on all systems) */
  lineWidth?: number
  /** Dash animation speed (units per frame) */
  dashAnimationSpeed?: number
  /** Show XY-plane axes */
  showAxes?: boolean
  /** Show ground grid */
  showGrid?: boolean
}

// ===== Component =====

export const PathwayVisualization3D = ({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  className = '',

  // Component specific props
  nodes = [],
  connections = [],
  gridSize = PATHWAY_VISUALIZATION_DEFAULTS.gridSize,
  gridCellSize = PATHWAY_VISUALIZATION_DEFAULTS.gridCellSize,
  flagHeight = PATHWAY_VISUALIZATION_DEFAULTS.flagHeight,
  flagSize = PATHWAY_VISUALIZATION_DEFAULTS.flagSize,
  cameraDistance = PATHWAY_VISUALIZATION_DEFAULTS.cameraDistance,
  cameraElevation = PATHWAY_VISUALIZATION_DEFAULTS.cameraElevation,
  autoRotate = PATHWAY_VISUALIZATION_DEFAULTS.autoRotate,
  autoRotateSpeed = PATHWAY_VISUALIZATION_DEFAULTS.autoRotateSpeed,
  labelSize = PATHWAY_VISUALIZATION_DEFAULTS.labelSize,
  labelDistance = PATHWAY_VISUALIZATION_DEFAULTS.labelDistance,
  iconSize = PATHWAY_VISUALIZATION_DEFAULTS.iconSize,
  lineWidth = PATHWAY_VISUALIZATION_DEFAULTS.lineWidth,
  dashAnimationSpeed = PATHWAY_VISUALIZATION_DEFAULTS.dashAnimationSpeed,
  showAxes = PATHWAY_VISUALIZATION_DEFAULTS.showAxes,
  showGrid = PATHWAY_VISUALIZATION_DEFAULTS.showGrid,
}: PathwayVisualization3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const nodeObjectsRef = useRef<Map<string, THREE.Group>>(new Map())
  const animationFrameIdRef = useRef<number | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)
  const axesRef = useRef<THREE.AxesHelper | null>(null)
  const connectionLinesRef = useRef<THREE.Line[]>([])
  const dashAnimationSpeedRef = useRef<number>(dashAnimationSpeed)
  const [error, setError] = useState<Error | null>(null)

  // Keep dashAnimationSpeed ref updated
  dashAnimationSpeedRef.current = dashAnimationSpeed

  // Initialize Three.js scene (only once)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    try {
      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-bg-main')
          .trim() || '#ffffff'
      )
      sceneRef.current = scene

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      )
      camera.position.set(cameraDistance * 0.7, cameraDistance * cameraElevation, cameraDistance * 0.7)
      camera.lookAt(0, 0, 0)
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 5
      controls.maxDistance = 50
      controls.maxPolarAngle = Math.PI / 2 - 0.1 // Prevent going below ground
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = autoRotateSpeed
      controlsRef.current = controls

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(10, 20, 10)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // Add ground grid if showGrid is true
      if (showGrid) {
        const grid = createGroundGrid(scene, gridSize, gridCellSize)
        gridRef.current = grid
      }

      // Add axes helper if showAxes is true
      if (showAxes) {
        const axes = createAxesHelper(scene, gridSize * gridCellSize)
        axesRef.current = axes
      }

      // Animation loop
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate)
        controls.update()
        
        // Calculate unified flag direction (camera to scene center direction)
        // All flags will face the same direction parallel to camera-to-center line
        const dx = camera.position.x - 0 // 0 is scene center x
        const dz = camera.position.z - 0 // 0 is scene center z
        const unifiedFlagAngle = Math.atan2(dx, dz)
        
        // Update node sizes and rotation based on camera
        nodeObjectsRef.current.forEach((nodeGroup) => {
          const distance = camera.position.distanceTo(nodeGroup.position)
          const scale = distance * 0.08
          nodeGroup.scale.set(scale, scale, scale)
          
          // Make all flags face the same direction (parallel to camera-to-center line)
          if (nodeGroup.userData.flag) {
            const flag = nodeGroup.userData.flag as THREE.Mesh
            // All flags use the same angle
            flag.rotation.y = unifiedFlagAngle
          }
        })
        
        // Animate dashed lines (flow effect)
        connectionLinesRef.current.forEach((line) => {
          if (line && line.material) {
            const material = line.material as THREE.ShaderMaterial
            if (material.uniforms && material.uniforms.dashOffset) {
              // Update the dashOffset uniform for smooth animation
              material.uniforms.dashOffset.value += dashAnimationSpeedRef.current
            }
          }
        })
        
        renderer.render(scene, camera)
      }
      animate()

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !camera || !renderer) return
        
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      }
      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        // Cancel animation loop
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current)
        }
        
        window.removeEventListener('resize', handleResize)
        if (container && renderer.domElement) {
          try {
            container.removeChild(renderer.domElement)
          } catch {
            // Ignore if already removed
          }
        }
        renderer.dispose()
        controls.dispose()
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize 3D scene'))
      console.error('Error initializing 3D scene:', err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount - other params updated via separate effects

  // Update camera position when cameraDistance or cameraElevation changes
  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return
    
    camera.position.set(
      cameraDistance * 0.7,
      cameraDistance * cameraElevation,
      cameraDistance * 0.7
    )
  }, [cameraDistance, cameraElevation])

  // Update controls when autoRotate settings change
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = autoRotateSpeed
  }, [autoRotate, autoRotateSpeed])

  // Update grid when gridSize, gridCellSize, or showGrid changes
  useEffect(() => {
    const scene = sceneRef.current
    const oldGrid = gridRef.current
    if (!scene) return
    
    // Remove old grid
    if (oldGrid) {
      scene.remove(oldGrid)
      oldGrid.geometry.dispose()
      if (Array.isArray(oldGrid.material)) {
        oldGrid.material.forEach(mat => mat.dispose())
      } else {
        oldGrid.material.dispose()
      }
      gridRef.current = null
    }
    
    // Add new grid only if showGrid is true
    if (showGrid) {
      const newGrid = createGroundGrid(scene, gridSize, gridCellSize)
      gridRef.current = newGrid
    }
  }, [gridSize, gridCellSize, showGrid])

  // Update axes when showAxes changes
  useEffect(() => {
    const scene = sceneRef.current
    const oldAxes = axesRef.current
    if (!scene) return
    
    // Remove old axes
    if (oldAxes) {
      scene.remove(oldAxes)
      oldAxes.dispose()
      axesRef.current = null
    }
    
    // Add new axes if enabled
    if (showAxes) {
      const newAxes = createAxesHelper(scene, gridSize * gridCellSize)
      axesRef.current = newAxes
    }
  }, [showAxes, gridSize, gridCellSize])

  // Listen for theme changes and update colors
  useEffect(() => {
    const updateThemeColors = () => {
      const scene = sceneRef.current
      const grid = gridRef.current
      if (!scene) return

      // Update scene background
      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg-main')
        .trim() || '#ffffff'
      scene.background = new THREE.Color(bgColor)

      // Update grid colors
      if (grid) {
        const gridColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--color-border-main')
          .trim() || '#e5e7eb'

        // Update grid materials (use same color for all lines)
        if (Array.isArray(grid.material)) {
          grid.material[0].color.setStyle(gridColor)
          grid.material[1].color.setStyle(gridColor)
        }
      }

      // Update pole colors and label textures for all nodes
      nodeObjectsRef.current.forEach((nodeGroup) => {
        nodeGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
            // This is the pole
            const poleColor = getComputedStyle(document.documentElement)
              .getPropertyValue('--color-main')
              .trim() || '#1a1a1a'
            
            const material = child.material as THREE.MeshBasicMaterial
            material.color.setStyle(poleColor)
          } else if (child instanceof THREE.Sprite) {
            // This is the label sprite - update its texture with new theme colors
            const spriteMaterial = child.material as THREE.SpriteMaterial
            if (spriteMaterial.map && nodeGroup.userData.labelText) {
              // Dispose old texture
              spriteMaterial.map.dispose()
              
              // Create new texture with updated theme colors
              const newLabelCanvas = createTextCanvas(nodeGroup.userData.labelText)
              const newLabelTexture = new THREE.CanvasTexture(newLabelCanvas)
              spriteMaterial.map = newLabelTexture
              spriteMaterial.needsUpdate = true
              
              // Update sprite scale to match new canvas aspect ratio
              const canvasAspectRatio = newLabelCanvas.width / newLabelCanvas.height
              const currentHeight = child.scale.y
              child.scale.x = currentHeight * canvasAspectRatio
            }
          }
        })
      })
    }

    // Listen for theme changes (data-theme attribute changes)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateThemeColors()
        }
      })
    })

    // Observe the documentElement for theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  // Update scene when nodes/connections change
  useEffect(() => {
    if (!sceneRef.current) return

    // Clear existing nodes and connections
    nodeObjectsRef.current.forEach((obj) => {
      sceneRef.current?.remove(obj)
    })
    nodeObjectsRef.current.clear()

    // Remove existing connection lines
    const linesToRemove = sceneRef.current.children.filter(
      (child) => child.userData.type === 'connection'
    )
    linesToRemove.forEach((line) => sceneRef.current?.remove(line))
    
    // Clear connection lines array
    connectionLinesRef.current = []

    // Create nodes
    nodes.forEach((node) => {
      const nodeGroup = createFlagNode(node, flagHeight, flagSize, labelSize, labelDistance, iconSize)
      sceneRef.current?.add(nodeGroup)
      nodeObjectsRef.current.set(node.id, nodeGroup)
    })

    // Create connections
    connections.forEach((connection) => {
      const fromNode = nodes.find((n) => n.id === connection.from)
      const toNode = nodes.find((n) => n.id === connection.to)
      
      if (fromNode && toNode) {
        const line = createConnection(
          sceneRef.current!,
          fromNode.position,
          toNode.position,
          connection,
          lineWidth
        )
        if (line) {
          connectionLinesRef.current.push(line)
        }
      }
    })
  }, [nodes, connections, flagHeight, flagSize, labelSize, labelDistance, iconSize, lineWidth])

  return (
    <DashboardWidgetFrame
      showHeader={showHeader}
      headerIcon={headerIcon}
      headerTitle={headerTitle}
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
      contentClassName={styles['visualization-content']}
      error={error}
    >
      <div ref={containerRef} className={styles['scene-container']} />
    </DashboardWidgetFrame>
  )
}

// ===== Helper Functions =====

function createGroundGrid(
  scene: THREE.Scene,
  gridSize: number,
  cellSize: number
): THREE.GridHelper {
  const size = gridSize * cellSize
  const divisions = gridSize

  // Get grid color from CSS variables (use same color for all lines)
  const gridColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-border-main')
    .trim() || '#e5e7eb'

  // Use same color for both center lines and grid lines for consistency
  const gridHelper = new THREE.GridHelper(size, divisions, gridColor, gridColor)
  gridHelper.position.y = 0
  scene.add(gridHelper)
  
  return gridHelper
}

function createAxesHelper(
  scene: THREE.Scene,
  size: number
): THREE.AxesHelper {
  // Create axes helper for XY-plane visualization
  // Red = X axis, Green = Y axis, Blue = Z axis
  const axesHelper = new THREE.AxesHelper(size / 2)
  axesHelper.position.y = 0.02 // Slightly above ground
  scene.add(axesHelper)
  
  return axesHelper
}

function createFlagNode(
  node: PathNode,
  flagHeight: number,
  flagSize: number,
  labelSize: number,
  labelDistance: number,
  iconSize: number
): THREE.Group {
  const group = new THREE.Group()
  group.position.set(node.position[0], node.position[1], node.position[2])

  // Flag pole
  const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, flagHeight, 8)
  
  // Get pole color from CSS variable (adapts to theme)
  const poleColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-main')
    .trim() || '#1a1a1a'
  
  // Use MeshBasicMaterial to ensure color is not affected by lighting
  const poleMaterial = new THREE.MeshBasicMaterial({
    color: poleColor,
  })
  const pole = new THREE.Mesh(poleGeometry, poleMaterial)
  pole.position.y = flagHeight / 2
  group.add(pole)

  // Flag (rectangular banner)
  // Create geometry with pivot at left edge for proper rotation
  const flagWidth = flagSize * 1.2
  const flagHeight_banner = flagSize * 0.8
  const flagGeometry = new THREE.PlaneGeometry(flagWidth, flagHeight_banner)
  
  // Shift geometry so that left edge is at origin (pivot point)
  // This allows rotation around the left edge (where it connects to pole)
  flagGeometry.translate(flagWidth / 2, 0, 0)
  
  const flagColor = node.color || '#E92C3A' // Default red color
  
  // Create flag material with icon texture if provided
  let flagMaterial: THREE.MeshBasicMaterial
  if (node.icon) {
    // Create combined texture with background color and icon
    const flagCanvas = createFlagCanvas(node.icon, flagColor, iconSize)
    const flagTexture = new THREE.CanvasTexture(flagCanvas)
    flagMaterial = new THREE.MeshBasicMaterial({
      map: flagTexture,
      side: THREE.DoubleSide,
      transparent: false,
    })
  } else {
    flagMaterial = new THREE.MeshBasicMaterial({
      color: flagColor,
      side: THREE.DoubleSide,
    })
  }
  
  const flag = new THREE.Mesh(flagGeometry, flagMaterial)
  // Position flag at pole top, left edge aligned with pole center
  flag.position.set(0, flagHeight - flagSize * 0.4, 0)
  
  // Store flag reference for billboard rotation
  group.userData.flag = flag
  group.add(flag)

  // Label sprite (above the flag)
  const labelCanvas = createTextCanvas(node.label)
  const labelTexture = new THREE.CanvasTexture(labelCanvas)
  const labelMaterial = new THREE.SpriteMaterial({
    map: labelTexture,
    transparent: true,
  })
  const labelSprite = new THREE.Sprite(labelMaterial)
  labelSprite.position.set(0, flagHeight + labelDistance, 0)
  
  // Calculate sprite size based on canvas aspect ratio
  const canvasAspectRatio = labelCanvas.width / labelCanvas.height
  const spriteHeight = flagSize * labelSize * 0.25
  const spriteWidth = spriteHeight * canvasAspectRatio
  labelSprite.scale.set(spriteWidth, spriteHeight, 1)
  group.add(labelSprite)

  // Store label text in userData for theme updates
  group.userData.labelText = node.label

  // Base disc on the ground
  const discRadius = flagSize * 0.4
  const discGeometry = new THREE.CircleGeometry(discRadius, 32)
  const discMaterial = new THREE.MeshBasicMaterial({
    color: flagColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  })
  const disc = new THREE.Mesh(discGeometry, discMaterial)
  // Rotate to lie flat on XZ plane
  disc.rotation.x = -Math.PI / 2
  // Position slightly above ground to avoid z-fighting
  disc.position.y = 0.01
  group.add(disc)

  return group
}

function createConnection(
  scene: THREE.Scene,
  fromPos: [number, number, number],
  toPos: [number, number, number],
  connection: PathConnection,
  lineWidth: number
): THREE.Line | null {
  const points: THREE.Vector3[] = []
  
  // Create path points on the ground following grid lines
  const from = new THREE.Vector3(fromPos[0], 0, fromPos[2])
  const to = new THREE.Vector3(toPos[0], 0, toPos[2])
  
  // For now, create a simple L-shaped path (can be enhanced to follow grid better)
  points.push(from)
  
  // Add intermediate point for right-angle turn
  const midPoint = new THREE.Vector3(to.x, 0, from.z)
  if (Math.abs(to.x - from.x) > 0.1 && Math.abs(to.z - from.z) > 0.1) {
    points.push(midPoint)
  }
  
  points.push(to)

  // Create line geometry
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  const lineColor = connection.color || '#3B82F6' // Default blue
  
  // Add line distances attribute for dashed effect
  const distances = []
  let totalDistance = 0
  for (let i = 0; i < points.length; i++) {
    distances.push(totalDistance)
    if (i < points.length - 1) {
      totalDistance += points[i].distanceTo(points[i + 1])
    }
  }
  geometry.setAttribute('lineDistance', new THREE.Float32BufferAttribute(distances, 1))

  // Scale dash/gap size with lineWidth to simulate thicker lines
  const baseDashSize = 0.5 * lineWidth
  const baseGapSize = 0.3 * lineWidth

  // Create animated dashed line using ShaderMaterial
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(lineColor) },
      dashOffset: { value: 0 },
      dashSize: { value: baseDashSize },
      gapSize: { value: baseGapSize },
    },
    linewidth: lineWidth, // Note: WebGL limitation - may not work on all systems
    vertexShader: `
      attribute float lineDistance;
      varying float vLineDistance;
      
      void main() {
        vLineDistance = lineDistance;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float dashOffset;
      uniform float dashSize;
      uniform float gapSize;
      varying float vLineDistance;
      
      void main() {
        float totalSize = dashSize + gapSize;
        float modulo = mod(vLineDistance - dashOffset, totalSize);
        if (modulo > dashSize) discard;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  })

  const line = new THREE.Line(geometry, material)
  
  line.position.y = 0.01 // Slightly above ground to avoid z-fighting
  line.userData.type = 'connection'
  scene.add(line)
  
  return line
}

function createFlagCanvas(icon: string, backgroundColor: string, iconSize: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  // Make canvas size proportional to flag (1.2:0.8 ratio)
  // Use higher resolution for sharper rendering
  const width = 512
  const height = Math.floor(width * 0.8 / 1.2) // Maintain flag aspect ratio
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Fill background with flag color
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Draw icon in white at center with improved visibility
  ctx.fillStyle = 'white'
  // Use Material Symbols Outlined font with adjustable size
  const fontSize = height * iconSize // iconSize is a multiplier (0-1)
  ctx.font = `900 ${fontSize}px "Material Symbols Outlined"`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Draw icon with slight shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.fillText(icon, width / 2, height / 2)
  
  // Draw again without shadow for crisp edges
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.fillText(icon, width / 2, height / 2)

  return canvas
}

function createTextCanvas(text: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const height = 128
  
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.width = 512
    canvas.height = height
    return canvas
  }

  // Get text color from CSS variable
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-main')
    .trim() || '#000000'

  // Get background color for stroke from CSS variable
  const strokeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-abssy')
    .trim() || '#000000'

  // Set font first to measure text
  ctx.font = 'bold 48px sans-serif'
  
  // Measure text width and set canvas width accordingly
  const textMetrics = ctx.measureText(text)
  const textWidth = textMetrics.width
  const padding = 40 // Extra padding on both sides
  canvas.width = Math.max(512, textWidth + padding * 2)
  canvas.height = height
  
  // Re-set font after changing canvas size (canvas size change clears context)
  ctx.font = 'normal 48px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Draw stroke (outline) first
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 8
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2
  ctx.strokeText(text, canvas.width / 2, canvas.height / 2)

  // Draw fill text on top
  ctx.fillStyle = textColor
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  return canvas
}

