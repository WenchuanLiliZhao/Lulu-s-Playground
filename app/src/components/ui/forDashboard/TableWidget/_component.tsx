import { useState } from 'react'
import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'
import { Table, type TableColumn } from '../../Table'

export interface TableWidgetProps<T = any> extends DashboardCommonProps {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[]
  /**
   * Table data
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
  /**
   * Whether to enable sorting
   * @default false
   */
  enableSorting?: boolean
  /**
   * Initial sort column key
   */
  initialSortColumn?: string
  /**
   * Initial sort direction
   * @default 'asc'
   */
  initialSortDirection?: 'asc' | 'desc'
  /**
   * Custom sort function
   */
  onSort?: (columnKey: string, direction: 'asc' | 'desc', data: T[]) => T[]
}

export const TableWidget = <T,>({
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
  
  // TableWidget specific props
  columns,
  data,
  striped = true,
  hoverable = true,
  bordered = true,
  size = 'medium',
  rowKey,
  onRowClick,
  emptyText,
  loading = false,
  enableSorting = false,
  initialSortColumn,
  initialSortDirection = 'asc',
  onSort,
}: TableWidgetProps<T>) => {
  const [sortColumn, setSortColumn] = useState<string | undefined>(initialSortColumn)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection)

  const handleSort = (columnKey: string) => {
    let newDirection: 'asc' | 'desc' = 'asc'
    
    if (sortColumn === columnKey) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    }
    
    setSortColumn(columnKey)
    setSortDirection(newDirection)
  }

  // Sort data if sorting is enabled
  const sortedData = enableSorting && sortColumn
    ? onSort
      ? onSort(sortColumn, sortDirection, data)
      : [...data].sort((a, b) => {
          const aValue = (a as any)[sortColumn]
          const bValue = (b as any)[sortColumn]
          
          if (aValue === bValue) return 0
          
          const direction = sortDirection === 'asc' ? 1 : -1
          
          // Handle different types
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue) * direction
          }
          
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (aValue - bValue) * direction
          }
          
          // Default comparison
          return (aValue > bValue ? 1 : -1) * direction
        })
    : data

  // Update columns to make them sortable if sorting is enabled
  const enhancedColumns = enableSorting
    ? columns.map(col => ({
        ...col,
        sortable: col.sortable !== false,
      }))
    : columns

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
      contentClassName={styles['table-content']}
      loading={loading}
    >
      <Table
        columns={enhancedColumns}
        data={sortedData}
        striped={striped}
        hoverable={hoverable}
        bordered={bordered}
        size={size}
        rowKey={rowKey}
        onRowClick={onRowClick}
        onSort={enableSorting ? handleSort : undefined}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        emptyText={emptyText}
      />
    </DashboardWidgetFrame>
  )
}

