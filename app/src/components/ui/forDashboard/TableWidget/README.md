# TableWidget Component

A dashboard widget that wraps the Table component with DashboardWidgetFrame, providing consistent styling and features across the dashboard.

## Features

- ✅ All Table component features
- ✅ Dashboard header with icon and summary
- ✅ Alert light indicator
- ✅ Built-in sorting functionality
- ✅ Loading state
- ✅ Dark/light theme support
- ✅ Consistent dashboard styling

## Architecture

This component uses `DashboardWidgetFrame` for consistent container, alert light, and header rendering. The internal Table component handles all table-specific functionality.

## Usage

### Basic Example

```tsx
import { TableWidget, type TableColumn } from '@/components/ui/forDashboard'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: TableColumn<User>[] = [
  {
    key: 'id',
    header: 'ID',
    render: (row) => row.id,
    width: '80px',
    align: 'center',
  },
  {
    key: 'name',
    header: 'Name',
    render: (row) => row.name,
  },
  {
    key: 'email',
    header: 'Email',
    render: (row) => row.email,
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => <span className="badge">{row.role}</span>,
    align: 'center',
  },
]

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

function MyDashboard() {
  return (
    <TableWidget
      showHeader
      headerIcon="table_chart"
      headerTitle="User Management"
      headerSummary="Active users in the system"
      columns={columns}
      data={data}
      enableSorting
      striped
      hoverable
    />
  )
}
```

### With Alert Light

```tsx
<TableWidget
  showHeader
  headerIcon="table_chart"
  headerTitle="Critical Alerts"
  showAlertLight
  alertLightColor="var(--color-semantic-error)"
  columns={columns}
  data={alertData}
  enableSorting
/>
```

### With Row Click Handler

```tsx
function InteractiveDashboard() {
  const handleRowClick = (row: User, index: number) => {
    console.log('Selected user:', row)
    // Navigate to user detail page
  }

  return (
    <TableWidget
      showHeader
      headerIcon="people"
      headerTitle="Select User"
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
      hoverable
    />
  )
}
```

### With Custom Sorting

```tsx
function CustomSortDashboard() {
  const customSort = (
    columnKey: string,
    direction: 'asc' | 'desc',
    data: User[]
  ): User[] => {
    // Implement custom sorting logic
    return [...data].sort((a, b) => {
      // Custom comparison logic
      if (columnKey === 'role') {
        const roleOrder = { Admin: 1, User: 2, Guest: 3 }
        const aOrder = roleOrder[a.role as keyof typeof roleOrder] || 999
        const bOrder = roleOrder[b.role as keyof typeof roleOrder] || 999
        return direction === 'asc' ? aOrder - bOrder : bOrder - aOrder
      }
      // Default sorting for other columns
      return 0
    })
  }

  return (
    <TableWidget
      showHeader
      headerIcon="sort"
      headerTitle="Custom Sorted Table"
      columns={columns}
      data={data}
      enableSorting
      initialSortColumn="role"
      onSort={customSort}
    />
  )
}
```

### Loading State

```tsx
function LoadingDashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    fetchData().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return (
    <TableWidget
      showHeader
      headerIcon="download"
      headerTitle="Loading Data"
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}
```

### Different Sizes

```tsx
// Small
<TableWidget
  showHeader
  headerIcon="table_chart"
  headerTitle="Compact Table"
  columns={columns}
  data={data}
  size="small"
/>

// Medium (default)
<TableWidget
  columns={columns}
  data={data}
  size="medium"
/>

// Large
<TableWidget
  columns={columns}
  data={data}
  size="large"
/>
```

## Props

Extends all props from `DashboardCommonProps` and adds:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | *required* | Column definitions |
| `data` | `T[]` | *required* | Table data |
| `striped` | `boolean` | `true` | Show striped rows |
| `hoverable` | `boolean` | `true` | Show hover effect |
| `bordered` | `boolean` | `true` | Show borders |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `rowKey` | `(row: T, index: number) => string \| number` | `undefined` | Function to get unique row key |
| `onRowClick` | `(row: T, index: number) => void` | `undefined` | Row click handler |
| `emptyText` | `string` | `'No data available'` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |
| `enableSorting` | `boolean` | `false` | Enable sorting functionality |
| `initialSortColumn` | `string` | `undefined` | Initial sort column key |
| `initialSortDirection` | `'asc' \| 'desc'` | `'asc'` | Initial sort direction |
| `onSort` | `(columnKey: string, direction: 'asc' \| 'desc', data: T[]) => T[]` | `undefined` | Custom sort function |

### Dashboard Common Props

From `DashboardCommonProps`:
- `showHeader` - Show dashboard header
- `headerIcon` - Material Symbol icon name
- `headerTitle` - Header title text
- `headerSummary` - Header description
- `headerTitleSize` - Title font size
- `headerIconSize` - Icon size
- `headerSummarySize` - Summary font size
- `headerColor` - Header text color
- `showAlertLight` - Show alert light indicator
- `alertLightColor` - Alert light color
- `className` - Optional className

See `_shared-types.ts` for detailed `DashboardCommonProps` documentation.

## Sorting Behavior

When `enableSorting={true}`:
1. All columns become sortable by default
2. Clicking a column header toggles sort direction
3. Built-in sorting works for strings and numbers
4. Use `onSort` prop for custom sorting logic

To disable sorting for specific columns:
```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'actions',
    header: 'Actions',
    render: (row) => <Button>Edit</Button>,
    sortable: false, // This column won't be sortable
  },
]
```

## Best Practices

1. **Use Dashboard Header**: Always provide meaningful header information:
   ```tsx
   headerTitle="User List"
   headerSummary="All active users in the system"
   ```

2. **Alert Light**: Use for status indicators:
   ```tsx
   showAlertLight
   alertLightColor={hasErrors ? 'var(--color-semantic-error)' : 'var(--color-semantic-success)'}
   ```

3. **Row Keys**: Use unique identifiers:
   ```tsx
   rowKey={(row) => row.id}
   ```

4. **Loading State**: Show loading state during data fetching:
   ```tsx
   loading={isLoading}
   ```

5. **Empty State**: Provide helpful empty messages:
   ```tsx
   emptyText="No users found. Try adjusting your filters."
   ```

## Styling

The TableWidget inherits styles from both `DashboardWidgetFrame` and `Table`. All colors automatically adapt to light/dark theme.

## Related Components

- `Table` - Base table component
- `DashboardWidgetFrame` - Frame wrapper
- `MetricWidget` - For displaying single metrics
- `TrendChart` - For displaying trend data
- `ProgressBarChart` - For displaying progress data

## Examples

See the playground page at `/playground/table-demo` for interactive examples.

