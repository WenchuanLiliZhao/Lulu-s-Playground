import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

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
  /** Enable camera auto-rotation */
  autoRotate?: boolean
  /** Auto-rotation speed */
  autoRotateSpeed?: number
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
  gridSize = 20,
  gridCellSize = 1,
  flagHeight = 2,
  flagSize = 0.8,
  cameraDistance = 15,
  autoRotate = false,
  autoRotateSpeed = 0.5,
}: PathwayVisualization3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const nodeObjectsRef = useRef<Map<string, THREE.Group>>(new Map())
  const animationFrameIdRef = useRef<number | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)
  const connectionLinesRef = useRef<THREE.Line[]>([])
  const [error, setError] = useState<Error | null>(null)

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
      camera.position.set(cameraDistance * 0.7, cameraDistance * 0.5, cameraDistance * 0.7)
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

      // Add ground grid
      const grid = createGroundGrid(scene, gridSize, gridCellSize)
      gridRef.current = grid

      // Animation loop
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate)
        controls.update()
        
        // Update node sizes based on camera distance
        nodeObjectsRef.current.forEach((nodeGroup) => {
          const distance = camera.position.distanceTo(nodeGroup.position)
          const scale = distance * 0.08
          nodeGroup.scale.set(scale, scale, scale)
        })
        
        // Animate dashed lines (flow effect)
        connectionLinesRef.current.forEach((line) => {
          if (line && line.material) {
            const material = line.material as THREE.ShaderMaterial
            if (material.uniforms && material.uniforms.dashOffset) {
              // Update the dashOffset uniform for smooth animation
              material.uniforms.dashOffset.value += 0.03
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
          } catch (e) {
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
  }, []) // Only run once on mount

  // Update camera position when cameraDistance changes
  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return
    
    camera.position.set(
      cameraDistance * 0.7,
      cameraDistance * 0.5,
      cameraDistance * 0.7
    )
  }, [cameraDistance])

  // Update controls when autoRotate settings change
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = autoRotateSpeed
  }, [autoRotate, autoRotateSpeed])

  // Update grid when gridSize or gridCellSize changes
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
    }
    
    // Add new grid
    const newGrid = createGroundGrid(scene, gridSize, gridCellSize)
    gridRef.current = newGrid
  }, [gridSize, gridCellSize])

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
      const nodeGroup = createFlagNode(node, flagHeight, flagSize)
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
          connection
        )
        if (line) {
          connectionLinesRef.current.push(line)
        }
      }
    })
  }, [nodes, connections, flagHeight, flagSize])

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

  // Get colors from CSS variables
  const colorMain = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-border-main')
    .trim() || '#e5e7eb'
  
  const colorCenter = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-border-darken-trans')
    .trim() || '#9ca3af'

  const gridHelper = new THREE.GridHelper(size, divisions, colorCenter, colorMain)
  gridHelper.position.y = 0
  scene.add(gridHelper)
  
  return gridHelper
}

function createFlagNode(
  node: PathNode,
  flagHeight: number,
  flagSize: number
): THREE.Group {
  const group = new THREE.Group()
  group.position.set(node.position[0], node.position[1], node.position[2])

  // Flag pole
  const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, flagHeight, 8)
  const poleMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.5,
    roughness: 0.5,
  })
  const pole = new THREE.Mesh(poleGeometry, poleMaterial)
  pole.position.y = flagHeight / 2
  group.add(pole)

  // Flag (rectangular banner)
  const flagGeometry = new THREE.PlaneGeometry(flagSize * 1.2, flagSize * 0.8)
  const flagColor = node.color || '#E92C3A' // Default red color
  const flagMaterial = new THREE.MeshStandardMaterial({
    color: flagColor,
    side: THREE.DoubleSide,
    emissive: flagColor,
    emissiveIntensity: 0.2,
  })
  const flag = new THREE.Mesh(flagGeometry, flagMaterial)
  flag.position.set(flagSize * 0.6, flagHeight - flagSize * 0.4, 0)
  group.add(flag)

  // Icon on flag (using sprite for billboarding)
  if (node.icon) {
    const canvas = createIconCanvas(node.icon)
    const texture = new THREE.CanvasTexture(canvas)
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(flagSize * 0.6, flagHeight - flagSize * 0.4, 0.01)
    sprite.scale.set(flagSize * 0.5, flagSize * 0.5, 1)
    group.add(sprite)
  }

  // Label sprite (below the flag)
  const labelCanvas = createTextCanvas(node.label)
  const labelTexture = new THREE.CanvasTexture(labelCanvas)
  const labelMaterial = new THREE.SpriteMaterial({
    map: labelTexture,
    transparent: true,
  })
  const labelSprite = new THREE.Sprite(labelMaterial)
  labelSprite.position.set(0, flagHeight + flagSize * 0.6, 0)
  labelSprite.scale.set(flagSize * 2, flagSize * 0.5, 1)
  group.add(labelSprite)

  return group
}

function createConnection(
  scene: THREE.Scene,
  fromPos: [number, number, number],
  toPos: [number, number, number],
  connection: PathConnection
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
  const lineWidth = connection.width || 1
  
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

  // Create animated dashed line using ShaderMaterial
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(lineColor) },
      dashOffset: { value: 0 },
      dashSize: { value: 0.5 },
      gapSize: { value: 0.3 },
    },
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

function createIconCanvas(icon: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const size = 128
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Use Material Symbols font
  ctx.fillStyle = 'white'
  ctx.font = `${size * 0.7}px "Material Symbols Outlined"`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(icon, size / 2, size / 2)

  return canvas
}

function createTextCanvas(text: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Get text color from CSS variable
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-main')
    .trim() || '#000000'

  ctx.fillStyle = textColor
  ctx.font = 'bold 48px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  return canvas
}

