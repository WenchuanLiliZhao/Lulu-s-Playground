import { type ReactNode } from 'react'
import styles from './_styles.module.scss'

export interface TableColumn<T = unknown> {
  /**
   * Unique key for the column
   */
  key: string
  /**
   * Column header text
   */
  header: ReactNode
  /**
   * Function to render cell content
   * @param row - Current row data
   * @param index - Row index
   */
  render: (row: T, index: number) => ReactNode
  /**
   * Column width (CSS value)
   */
  width?: string
  /**
   * Column alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right'
  /**
   * Whether this column is sortable
   * @default false
   */
  sortable?: boolean
}

export interface TableProps<T = unknown> {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[]
  /**
   * Table data
   */
  data: T[]
  /**
   * Optional className for the table container
   */
  className?: string
  /**
   * Whether to show striped rows
   * @default false
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
   * @default (row, index) => index
   */
  rowKey?: (row: T, index: number) => string | number
  /**
   * Callback when row is clicked
   */
  onRowClick?: (row: T, index: number) => void
  /**
   * Callback when column header is clicked (for sorting)
   */
  onSort?: (columnKey: string) => void
  /**
   * Current sort column key
   */
  sortColumn?: string
  /**
   * Current sort direction
   */
  sortDirection?: 'asc' | 'desc'
  /**
   * Empty state message
   */
  emptyText?: string
  /**
   * Loading state
   */
  loading?: boolean
}

export const Table = <T,>({
  columns,
  data,
  className = '',
  striped = false,
  hoverable = true,
  bordered = true,
  size = 'medium',
  rowKey = (_row, index) => index,
  onRowClick,
  onSort,
  sortColumn,
  sortDirection,
  emptyText = 'No data available',
  loading = false,
}: TableProps<T>) => {
  const containerClasses = [
    styles['table-container'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const tableClasses = [
    styles['table'],
    styles[`size-${size}`],
    striped ? styles['striped'] : '',
    hoverable ? styles['hoverable'] : '',
    bordered ? styles['bordered'] : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleHeaderClick = (column: TableColumn<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key)
    }
  }

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return 'unfold_more'
    }
    return sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'
  }

  return (
    <div className={containerClasses}>
      {loading ? (
        <div className={styles['loading-state']}>
          <div className={styles['loading-spinner']} />
          <p className={styles['loading-text']}>Loading...</p>
        </div>
      ) : (
        <table className={tableClasses}>
          <thead className={styles['thead']}>
            <tr className={styles['thead-row']}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${styles['th']} ${styles[`align-${column.align || 'left'}`]} ${
                    column.sortable ? styles['sortable'] : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleHeaderClick(column)}
                >
                  <div className={styles['th-content']}>
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className={`material-symbols-outlined ${styles['sort-icon']}`}>
                        {getSortIcon(column.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles['tbody']}>
            {data.length === 0 ? (
              <tr className={styles['empty-row']}>
                <td colSpan={columns.length} className={styles['empty-cell']}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={rowKey(row, index)}
                  className={`${styles['tbody-row']} ${onRowClick ? styles['clickable'] : ''}`}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`${styles['td']} ${styles[`align-${column.align || 'left'}`]}`}
                    >
                      {column.render(row, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

