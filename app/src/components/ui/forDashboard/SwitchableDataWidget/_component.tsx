import { useState } from 'react'
import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'
import { Table, type TableColumn } from '../../Table'
import { TrendChartCore, type TrendChartCoreProps } from '../TrendChart'
import { Switch, type SwitchOption } from '../../Switch'

/**
 * View mode for the widget
 */
export type DataWidgetViewMode = 'table' | 'chart'

/**
 * Props for the SwitchableDataWidget component
 */
export interface SwitchableDataWidgetProps<T = unknown> extends DashboardCommonProps {
  /**
   * A unique identifier for the widget.
   * This is required to persist the view mode in local storage.
   */
  widgetId: string;
  /**
   * Initial view mode
   * @default 'table'
   */
  initialMode?: DataWidgetViewMode
  
  /**
   * Whether to persist the view mode in browser storage.
   * @default true
   */
  persistState?: boolean;

  /**
   * Table configuration
   */
  tableConfig: {
    /**
     * Column definitions for the table
     */
    columns: TableColumn<T>[]
    /**
     * Data for the table
     */
    data: T[]
    /**
     * Whether to show striped rows
     * @default true
     */
    striped?: boolean
    /**
     * Whether to show hover effect on rows
     * @default true
     */
    hoverable?: boolean
    /**
     * Whether to show borders
     * @default true
     */
    bordered?: boolean
    /**
     * Table size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * Function to get unique key for each row
     */
    rowKey?: (row: T, index: number) => string | number
    /**
     * Callback when row is clicked
     */
    onRowClick?: (row: T, index: number) => void
    /**
     * Empty state message
     */
    emptyText?: string
    /**
     * Loading state
     */
    loading?: boolean
  }
  
  /**
   * Chart configuration (uses TrendChartCore props)
   */
  chartConfig: TrendChartCoreProps & {
    /**
     * Chart height in pixels
     * @default 300
     */
    height?: number
  }
  
  /**
   * Callback when view mode changes
   */
  onModeChange?: (mode: DataWidgetViewMode) => void
  /**
   * Custom toggle options for view switching
   * @default Table / Chart text options
   */
  toggleOptions?: [SwitchOption, SwitchOption] | SwitchOption[]
}

export const SwitchableDataWidget = <T,>({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerTitle,
  headerIcon,
  headerSummary,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  className = '',
  
  // Component-specific props
  widgetId,
  initialMode = 'table',
  persistState = true,
  tableConfig,
  chartConfig,
  toggleOptions,
  onModeChange,
}: SwitchableDataWidgetProps<T>) => {
  const getInitialMode = () => {
    if (persistState) {
      const savedMode = localStorage.getItem(`widget-${widgetId}-mode`) as DataWidgetViewMode;
      if (savedMode) {
        return savedMode;
      }
    }
    return initialMode;
  };

  const [viewMode, setViewMode] = useState<DataWidgetViewMode>(getInitialMode())

  const handleModeChange = (selectedIndex: number) => {
    const newMode: DataWidgetViewMode = selectedIndex === 0 ? 'table' : 'chart'
    setViewMode(newMode)
    if (persistState) {
      localStorage.setItem(`widget-${widgetId}-mode`, newMode);
    }
    onModeChange?.(newMode)
  }

  // Render header with mode toggle button
  const renderHeader = () => {
    if (!showHeader) return undefined
    const modeToggleOptions =
      toggleOptions ??
      ([
        { label: 'Table', value: 'table' },
        { label: 'Chart', value: 'chart' },
      ] as [SwitchOption, SwitchOption])
    
    return (
      <div className={styles.headerWithToggle}>
        <div className={styles.headerContent}>
          {typeof headerTitle === 'string' ? (
            <h3 className={styles.headerTitle}>{headerTitle}</h3>
          ) : (
            headerTitle
          )}
        </div>
        <div className={styles.toggleButton}>
          <Switch
            options={modeToggleOptions}
            selectedIndex={viewMode === 'table' ? 0 : 1}
            onChange={handleModeChange}
          />
        </div>
      </div>
    )
  }
  
  return (
    <DashboardWidgetFrame
      showHeader={showHeader}
      headerTitle={renderHeader()}
      headerIcon={headerIcon}
      headerSummary={headerSummary}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={`${styles.switchableDataWidget} ${className}`}
    >
      <div className={styles.contentContainer}>
        {viewMode === 'table' ? (
          <div className={styles.tableView}>
            <Table
              columns={tableConfig.columns}
              data={tableConfig.data}
              striped={tableConfig.striped ?? true}
              hoverable={tableConfig.hoverable ?? true}
              bordered={tableConfig.bordered ?? true}
              size={tableConfig.size ?? 'medium'}
              rowKey={tableConfig.rowKey}
              onRowClick={tableConfig.onRowClick}
              emptyText={tableConfig.emptyText}
              loading={tableConfig.loading}
            />
          </div>
        ) : (
          <div 
            className={styles.chartView}
            style={{ height: `${chartConfig.height ?? 300}px` }}
          >
            <TrendChartCore
              {...chartConfig}
              marginLeft={12}
              marginRight={32}
            />
          </div>
        )}
      </div>
    </DashboardWidgetFrame>
  )
}

