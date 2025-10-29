# Table Component

A flexible and feature-rich table component for displaying tabular data with support for sorting, striped rows, hover effects, and responsive design.

## Features

- ✅ Flexible column configuration
- ✅ Custom cell rendering
- ✅ Row striping
- ✅ Hover effects
- ✅ Sortable columns
- ✅ Bordered/borderless modes
- ✅ Multiple sizes (small, medium, large)
- ✅ Row click handling
- ✅ Loading state
- ✅ Empty state
- ✅ Responsive design
- ✅ Dark/light theme support

## Usage

### Basic Example

```tsx
import { Table, TableColumn } from '@/components/ui/Table'

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
    sortable: true,
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

function MyComponent() {
  return (
    <Table
      columns={columns}
      data={data}
      striped
      hoverable
      bordered
    />
  )
}
```

### With Sorting

```tsx
import { useState } from 'react'
import { Table, TableColumn } from '@/components/ui/Table'

function SortableTable() {
  const [sortColumn, setSortColumn] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn as keyof User]
    const bValue = b[sortColumn as keyof User]
    const direction = sortDirection === 'asc' ? 1 : -1
    return aValue > bValue ? direction : -direction
  })

  return (
    <Table
      columns={columns}
      data={sortedData}
      onSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
    />
  )
}
```

### With Row Click

```tsx
function ClickableTable() {
  const handleRowClick = (row: User, index: number) => {
    console.log('Clicked row:', row, 'at index:', index)
  }

  return (
    <Table
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
      hoverable
    />
  )
}
```

### Custom Row Key

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
/>
```

### Different Sizes

```tsx
// Small
<Table columns={columns} data={data} size="small" />

// Medium (default)
<Table columns={columns} data={data} size="medium" />

// Large
<Table columns={columns} data={data} size="large" />
```

### Loading State

```tsx
<Table
  columns={columns}
  data={data}
  loading={isLoading}
/>
```

### Empty State

```tsx
<Table
  columns={columns}
  data={[]}
  emptyText="No users found"
/>
```

## Props

### TableProps<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | *required* | Column definitions |
| `data` | `T[]` | *required* | Table data |
| `className` | `string` | `''` | Optional className for container |
| `striped` | `boolean` | `false` | Show striped rows |
| `hoverable` | `boolean` | `true` | Show hover effect on rows |
| `bordered` | `boolean` | `true` | Show borders |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `rowKey` | `(row: T, index: number) => string \| number` | `(_, i) => i` | Function to get unique row key |
| `onRowClick` | `(row: T, index: number) => void` | `undefined` | Row click handler |
| `onSort` | `(columnKey: string) => void` | `undefined` | Sort handler |
| `sortColumn` | `string` | `undefined` | Current sort column |
| `sortDirection` | `'asc' \| 'desc'` | `undefined` | Current sort direction |
| `emptyText` | `string` | `'No data available'` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |

### TableColumn<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | *required* | Unique column key |
| `header` | `ReactNode` | *required* | Column header content |
| `render` | `(row: T, index: number) => ReactNode` | *required* | Cell render function |
| `width` | `string` | `undefined` | Column width (CSS value) |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Column alignment |
| `sortable` | `boolean` | `false` | Whether column is sortable |

## Styling

The Table component uses CSS variables from the Lululemon design system. All colors automatically adapt to light/dark theme.

### Custom Styling

```tsx
<Table
  columns={columns}
  data={data}
  className="my-custom-table"
/>
```

```scss
.my-custom-table {
  max-width: 800px;
  
  // Custom row hover color
  .tbody-row:hover {
    background-color: var(--color-bg-sec-2);
  }
}
```

## Accessibility

- Uses semantic HTML table elements
- Supports keyboard navigation (when rows are clickable)
- Screen reader friendly
- ARIA labels for sortable columns

## Best Practices

1. **Performance**: For large datasets (>1000 rows), consider:
   - Pagination
   - Virtual scrolling
   - Server-side sorting/filtering

2. **Column Width**: Set explicit widths for better control:
   ```tsx
   { key: 'id', header: 'ID', render: ..., width: '80px' }
   ```

3. **Row Keys**: Use unique IDs instead of indices:
   ```tsx
   rowKey={(row) => row.id}
   ```

4. **Empty State**: Provide meaningful empty messages:
   ```tsx
   emptyText="No results found. Try adjusting your filters."
   ```

5. **Responsive**: For small screens, consider horizontal scrolling or responsive table patterns.

## Related Components

- `TableWidget` - Dashboard widget version with DashboardWidgetFrame
- `Card` - For displaying single records
- `StatusBadge` - For status indicators in table cells

## Examples

See the playground page at `/playground/table-demo` for interactive examples.

