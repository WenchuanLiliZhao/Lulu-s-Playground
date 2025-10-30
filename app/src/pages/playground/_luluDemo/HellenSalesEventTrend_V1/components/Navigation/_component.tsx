import styles from './_styles.module.scss'

export type ViewMode = 'calendar' | 'trend'
export type ZoomLevel = 'day' | 'week' | 'month' | 'quarter' | 'year'

export interface NavigationProps {
  /**
   * Current view mode
   */
  viewMode: ViewMode
  /**
   * Callback when view mode changes
   */
  onViewModeChange: (mode: ViewMode) => void
  /**
   * Current zoom level (for trend view)
   */
  zoomLevel?: ZoomLevel
  /**
   * Callback when zoom level changes
   */
  onZoomLevelChange?: (level: ZoomLevel) => void
}

export const Navigation = ({
  viewMode,
  onViewModeChange,
  zoomLevel = 'month',
  onZoomLevelChange,
}: NavigationProps) => {
  const viewModes: ViewMode[] = ['calendar', 'trend']
  const zoomLevels: ZoomLevel[] = ['day', 'week', 'month', 'quarter', 'year']

  return (
    <nav className={styles.navigation}>
      {/* Left side: Logo + Title */}
      <div className={styles.leftSection}>
        <img 
          src="/logo/BlackWhite.svg" 
          alt="Logo" 
          className={styles.logo}
        />
        <h1 className={styles.title}>Sales Event Trend</h1>
      </div>

      {/* Right side: Switches */}
      <div className={styles.rightSection}>
        {/* Zoom Level Switch - Only visible in trend view */}
        {viewMode === 'trend' && (
          <div className={styles.switchGroup}>
            {zoomLevels.map((level) => (
              <button
                key={level}
                className={`${styles.switchButton} ${
                  zoomLevel === level ? styles.active : ''
                }`}
                onClick={() => onZoomLevelChange?.(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* View Mode Switch */}
        <div className={styles.switchGroup}>
          {viewModes.map((mode) => (
            <button
              key={mode}
              className={`${styles.switchButton} ${
                viewMode === mode ? styles.active : ''
              }`}
              onClick={() => onViewModeChange(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

