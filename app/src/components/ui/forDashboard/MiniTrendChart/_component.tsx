import styles from './_styles.module.scss'
import { DashboardHeaderElement, DashboardAlertLightElement } from '../_shared-elements'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

export interface MiniTrendChartLine {
  /**
   * Line identifier
   */
  id: string
  /**
   * Display name
   */
  name: string
  /**
   * Data points
   */
  data: number[]
  /**
   * Line color
   */
  color: string
  /**
   * Line stroke width
   * @default 2
   */
  strokeWidth?: number
}

export interface MiniTrendChartProps extends DashboardCommonProps {
  /**
   * Chart title (internal header, alternative to showHeader)
   */
  title?: string
  /**
   * Subtitle/additional info (internal header, alternative to showHeader)
   */
  subtitle?: string
  /**
   * X-axis labels (optional)
   */
  xLabels?: string[]
  /**
   * Lines to display
   */
  lines: MiniTrendChartLine[]
  /**
   * Chart height
   * @default 180
   */
  height?: number
  /**
   * Show grid
   * @default false
   */
  showGrid?: boolean
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean
}

export const MiniTrendChart = ({
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
  
  // MiniTrendChart specific props
  title,
  subtitle,
  xLabels,
  lines,
  height = 180,
  showGrid = false,
  showLegend = true,
}: MiniTrendChartProps) => {
  const containerClasses = [styles['card-container'], className].filter(Boolean).join(' ')

  // Calculate chart dimensions
  const chartWidth = 100 // percentage-based
  const chartHeight = height
  const padding = { top: 10, right: 10, bottom: 30, left: 10 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // Find global min/max across all lines
  const allValues = lines.flatMap((line) => line.data)
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const valueRange = maxValue - minValue || 1

  // Generate path for a line
  const generateLinePath = (data: number[]) => {
    if (data.length < 2) return ''

    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * innerWidth
      const y = padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight
      return { x, y }
    })

    return points
      .map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`
        return `L ${point.x} ${point.y}`
      })
      .join(' ')
  }

  // Generate area fill path
  const generateAreaPath = (data: number[]) => {
    if (data.length < 2) return ''

    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * innerWidth
      const y = padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight
      return { x, y }
    })

    const bottomY = padding.top + innerHeight

    return [
      `M ${points[0].x} ${bottomY}`,
      ...points.map((point) => `L ${point.x} ${point.y}`),
      `L ${points[points.length - 1].x} ${bottomY}`,
      'Z',
    ].join(' ')
  }

  // Generate grid lines
  const generateGridLines = () => {
    const gridLines = []
    const numLines = 5

    for (let i = 0; i <= numLines; i++) {
      const y = padding.top + (i / numLines) * innerHeight
      gridLines.push(
        <line
          key={`grid-${i}`}
          x1={padding.left}
          y1={y}
          x2={padding.left + innerWidth}
          y2={y}
          stroke="var(--color-border-main-trans)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      )
    }

    return gridLines
  }

  // Max data length for x-labels
  const maxDataLength = Math.max(...lines.map((line) => line.data.length))

  return (
    <div className={containerClasses}>
      {/* Alert Light */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}
      
      {/* Dashboard Header (alternative to internal title/subtitle) */}
      {showHeader && (
        <DashboardHeaderElement
          icon={headerIcon}
          title={headerTitle}
          summary={headerSummary}
          titleSize={headerTitleSize}
          iconSize={headerIconSize}
          summarySize={headerSummarySize}
          color={headerColor}
          className={styles['dashboard-header']}
          topClassName={styles['dashboard-header-top']}
          iconClassName={styles['dashboard-header-icon']}
          titleClassName={styles['dashboard-header-title']}
          summaryClassName={styles['dashboard-header-summary']}
        />
      )}
      
      {/* Internal Header (alternative to dashboard header) */}
      {!showHeader && (
        <div className={styles['internal-header']}>
          <div>
            {title && <h3 className={styles['internal-title']}>{title}</h3>}
            {subtitle && <p className={styles['internal-subtitle']}>{subtitle}</p>}
          </div>
          {/* Legend */}
          {showLegend && (
            <div className={styles.legend}>
              {lines.map((line) => (
                <div key={line.id} className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: line.color }}
                  ></span>
                  <span className={styles.legendLabel}>{line.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chart */}
      <div className={styles.chartWrapper} style={{ height: `${chartHeight}px` }}>
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className={styles.svg}
        >
          {/* Grid lines */}
          {showGrid && generateGridLines()}

          {/* Draw each line */}
          {lines.map((line, index) => (
            <g key={line.id}>
              {/* Area fill */}
              <path
                d={generateAreaPath(line.data)}
                fill={line.color}
                opacity="0.1"
              />
              {/* Line */}
              <path
                d={generateLinePath(line.data)}
                fill="none"
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {xLabels && xLabels.length > 0 && (
            <g>
              {xLabels.map((label, index) => {
                const x = padding.left + (index / (maxDataLength - 1)) * innerWidth
                const y = chartHeight - padding.bottom + 15
                return (
                  <text
                    key={`xlabel-${index}`}
                    x={x}
                    y={y}
                    fill="var(--color-sec)"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                )
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Y-axis percentage markers */}
      <div className={styles.yAxis}>
        <span className={styles.yAxisLabel}>0%</span>
        <span className={styles.yAxisLabel}>50%</span>
      </div>
    </div>
  )
}

