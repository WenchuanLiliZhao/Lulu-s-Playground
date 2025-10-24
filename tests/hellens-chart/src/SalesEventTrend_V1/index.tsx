import { useSearchParams } from 'react-router'
import { AppLayout } from 'lululemon-ui'
import type { PageProps } from '../../../_page-types'
import { Navigation, type ViewMode, type ZoomLevel } from './components'
import { CalendarView } from './views/CalendarView'
import { TrendView } from './views/TrendView'
import styles from './styles.module.scss'

const SalesEventTrend_V1 = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get initial values from URL or use defaults
  // Map URL parameter 'chart' to 'trend' view mode for consistency
  const urlView = searchParams.get('view')
  const viewMode: ViewMode = urlView === 'chart' ? 'trend' : (urlView as ViewMode) || 'calendar'
  const zoomLevel = (searchParams.get('zoom') as ZoomLevel) || 'month'

  // Handler functions that update URL parameters
  const handleViewModeChange = (mode: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams)
    // Map 'trend' to 'chart' in URL for user-friendly URLs
    const urlValue = mode === 'trend' ? 'chart' : mode
    newSearchParams.set('view', urlValue)
    setSearchParams(newSearchParams)
  }

  const handleZoomLevelChange = (level: ZoomLevel) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('zoom', level)
    setSearchParams(newSearchParams)
  }

  return (
    <div className={styles.container}>
      <Navigation
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        zoomLevel={zoomLevel}
        onZoomLevelChange={handleZoomLevelChange}
      />
      
      <main className={styles.mainContent}>
        {viewMode === 'calendar' ? (
          <CalendarView />
        ) : (
          <TrendView zoomLevel={zoomLevel} />
        )}
      </main>
    </div>
  )
}

const SalesEventTrendPage_V1: PageProps = {
  title: 'Sales Event Trend V1',
  slug: 'sales-event-trend-v1',
  content: (
    <AppLayout isTesting={true} viewportMode={["scaled-from", 1800, 1100]}>
      <SalesEventTrend_V1 />
    </AppLayout>
  ),
}

export default SalesEventTrendPage_V1

