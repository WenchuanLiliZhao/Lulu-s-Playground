import { useState } from 'react'
import AppLayout from '../../../../components/ui/AppLayout'
import type { PageProps } from '../../../_page-types'
import { Navigation, type ViewMode, type ZoomLevel } from './components'
import { CalendarView } from './views/CalendarView'
import { TrendView } from './views/TrendView'
import styles from './styles.module.scss'

const SalesEventTrend_V1 = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('month')

  return (
    <div className={styles.container}>
      <Navigation
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        zoomLevel={zoomLevel}
        onZoomLevelChange={setZoomLevel}
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

