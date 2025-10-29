import { useState } from 'react'
import AppLayout from '../../../components/ui/AppLayout'
import { Table, type TableColumn } from '../../../components/ui/Table'
import { TableWidget } from '../../../components/ui/forDashboard'
import type { PageProps } from '../../_page-types'
import { usersData, productsData, salesData, type User, type Product, type SalesRecord } from './data/sampleData'
import { StatusBadge } from './components/StatusBadge'
import styles from './styles.module.scss'

const TableDemo_V1 = () => {
  // Sorting state for product table
  const [sortColumn, setSortColumn] = useState<string | undefined>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Sort product data
  const sortedProducts = [...productsData].sort((a, b) => {
    if (!sortColumn) return 0
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aValue = (a as any)[sortColumn]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bValue = (b as any)[sortColumn]
    
    if (aValue === bValue) return 0
    
    const direction = sortDirection === 'asc' ? 1 : -1
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction
    }
    
    return (aValue > bValue ? 1 : -1) * direction
  })
  // User table columns
  const userColumns: TableColumn<User>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (row) => row.id,
      width: '60px',
      align: 'center',
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      render: (row) => row.name,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      render: (row) => row.email,
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => row.role,
      width: '100px',
      align: 'center',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
      width: '120px',
      align: 'center',
      sortable: true,
    },
    {
      key: 'tasksCompleted',
      header: 'Tasks',
      render: (row) => row.tasksCompleted,
      width: '80px',
      align: 'center',
      sortable: true,
    },
  ]

  // Product table columns
  const productColumns: TableColumn<Product>[] = [
    {
      key: 'id',
      header: 'SKU',
      render: (row) => row.id,
      width: '100px',
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (row) => row.name,
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      render: (row) => row.category,
      sortable: true,
    },
    {
      key: 'price',
      header: 'Price',
      render: (row) => <span className={styles.priceCell}>${row.price.toFixed(2)}</span>,
      width: '100px',
      align: 'right',
      sortable: true,
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (row) => (
        <span
          className={
            row.stock === 0
              ? styles.stockOut
              : row.stock < 50
              ? styles.stockLow
              : ''
          }
        >
          {row.stock === 0 ? 'Out of Stock' : row.stock}
        </span>
      ),
      width: '120px',
      align: 'center',
      sortable: true,
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (row) => (
        <div className={styles.rating}>
          <span className={`material-symbols-outlined ${styles.star}`}>star</span>
          {row.rating.toFixed(1)}
        </div>
      ),
      width: '100px',
      align: 'center',
      sortable: true,
    },
  ]

  // Sales table columns
  const salesColumns: TableColumn<SalesRecord>[] = [
    {
      key: 'date',
      header: 'Date',
      render: (row) => row.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      width: '100px',
    },
    {
      key: 'product',
      header: 'Product',
      render: (row) => row.product,
      sortable: true,
    },
    {
      key: 'region',
      header: 'Region',
      render: (row) => row.region,
      sortable: true,
    },
    {
      key: 'revenue',
      header: 'Revenue',
      render: (row) => `$${row.revenue.toLocaleString()}`,
      width: '120px',
      align: 'right',
      sortable: true,
    },
    {
      key: 'units',
      header: 'Units',
      render: (row) => row.units.toLocaleString(),
      width: '100px',
      align: 'center',
      sortable: true,
    },
    {
      key: 'growth',
      header: 'Growth',
      render: (row) => (
        <div className={`${styles.growth} ${row.growth >= 0 ? styles.positive : styles.negative}`}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {row.growth >= 0 ? 'arrow_upward' : 'arrow_downward'}
          </span>
          {Math.abs(row.growth).toFixed(1)}%
        </div>
      ),
      width: '100px',
      align: 'center',
      sortable: true,
    },
  ]

  const handleRowClick = (row: User) => {
    console.log('Clicked user:', row)
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Table Component Demo</h1>
        <p className={styles.subtitle}>
          Showcasing Table and TableWidget components with various configurations
        </p>
      </div>

      {/* Section 1: Basic Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Basic Table Component</h2>
        <p className={styles.sectionDescription}>
          A simple table with striped rows and hover effects.
        </p>
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>User Management</h3>
          <Table
            columns={userColumns}
            data={usersData}
            striped
            hoverable
            bordered
            rowKey={(row) => row.id}
            onRowClick={handleRowClick}
          />
        </div>
      </section>

      {/* Section 2: Table with Sorting */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Sortable Table</h2>
        <p className={styles.sectionDescription}>
          Click on column headers to sort. Built-in sorting for strings and numbers.
        </p>
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Product Inventory</h3>
          <Table
            columns={productColumns}
            data={sortedProducts}
            striped
            hoverable
            bordered
            size="medium"
            rowKey={(row) => row.id}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </div>
      </section>

      {/* Section 3: TableWidget - Dashboard Integration */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. TableWidget - Dashboard Integration</h2>
        <p className={styles.sectionDescription}>
          Table wrapped in DashboardWidgetFrame with header, icon, and alert light.
        </p>
        <div className={styles.grid}>
          <TableWidget
            showHeader
            headerIcon="group"
            headerTitle="Active Users"
            headerSummary="All active users in the system"
            showAlertLight
            alertLightColor="var(--wilderness-4)"
            columns={userColumns}
            data={usersData.filter((u) => u.status === 'active')}
            enableSorting
            initialSortColumn="tasksCompleted"
            initialSortDirection="desc"
            striped
            hoverable
            size="small"
            rowKey={(row) => row.id}
          />

          <TableWidget
            showHeader
            headerIcon="trending_up"
            headerTitle="Sales Performance"
            headerSummary="Recent sales by region"
            showAlertLight
            alertLightColor="var(--indigo-5)"
            columns={salesColumns}
            data={salesData}
            enableSorting
            striped
            hoverable
            size="small"
            rowKey={(row) => row.id}
          />
        </div>
      </section>

      {/* Section 4: Different Sizes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Table Sizes</h2>
        <p className={styles.sectionDescription}>
          Tables available in three sizes: small, medium, and large.
        </p>
        
        <div style={{ marginBottom: '24px' }}>
          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Small Size</h3>
            <Table
              columns={userColumns.slice(0, 4)}
              data={usersData.slice(0, 3)}
              size="small"
              striped
              hoverable
              rowKey={(row) => row.id}
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Large Size</h3>
            <Table
              columns={userColumns.slice(0, 4)}
              data={usersData.slice(0, 3)}
              size="large"
              striped
              hoverable
              rowKey={(row) => row.id}
            />
          </div>
        </div>
      </section>

      {/* Section 5: Loading & Empty States */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. States</h2>
        <p className={styles.sectionDescription}>
          Tables with loading and empty states.
        </p>
        <div className={styles.grid}>
          <TableWidget
            showHeader
            headerIcon="hourglass_empty"
            headerTitle="Loading Data"
            columns={userColumns}
            data={[]}
            loading={true}
          />

          <TableWidget
            showHeader
            headerIcon="inbox"
            headerTitle="Empty Table"
            headerSummary="No data available"
            columns={userColumns}
            data={[]}
            emptyText="No users found. Try adjusting your filters."
          />
        </div>
      </section>
    </div>
  )
}

const TableDemoPage_V1: PageProps = {
  title: 'Table Demo V1',
  slug: 'table-demo-v1',
  content: (
    <AppLayout isTesting={true} viewportMode={['scaled-from', 1920, 1080]}>
      <TableDemo_V1 />
    </AppLayout>
  ),
}

export default TableDemoPage_V1

