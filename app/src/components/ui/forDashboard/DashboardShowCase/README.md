# DashboardShowCase Component

A flexible container component for dashboard widgets with optional header and status indicator.

## Features

- **Optional Header**: Display icon, title, and summary text with configurable sizes and colors
- **Alert Light Indicator**: Pulsing status indicator in top-right corner with customizable color
- **Flexible Children**: Place any dashboard content (charts, metrics, tables, etc.)
- **Design Parameters**: Extensive SCSS variables for fine-tuning layout and spacing
- **Theme Support**: Automatically adapts to light/dark themes using design system colors
- **Material Symbols**: Uses Material Symbols Outlined for header icon

## Usage

### Basic Example

```tsx
import { DashboardShowCase } from '@/components/ui/forDashboard/DashboardShowCase'

<DashboardShowCase>
  <MyChart />
</DashboardShowCase>
```

### With Header

```tsx
<DashboardShowCase
  showHeader={true}
  headerIcon="home"
  headerTitle="Sales Analytics"
  headerSummary="Track revenue and user growth over time"
>
  <MyChart />
</DashboardShowCase>
```

### Full Configuration

```tsx
<DashboardShowCase
  showHeader={true}
  headerIcon="star"
  headerTitle="Performance Metrics"
  headerSummary="Real-time monitoring of key performance indicators"
  headerTitleSize="large"
  headerIconSize="large"
  headerSummarySize="medium"
  headerColor="brand"
  showAlertLight={true}
  alertLightColor="#10b981"
>
  <MyChart />
</DashboardShowCase>
```

## Props

### Header Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `false` | Whether to show the header section |
| `headerIcon` | `string` | `undefined` | Material Symbol name (e.g., 'home', 'star', 'search') |
| `headerTitle` | `string` | `undefined` | Header title text |
| `headerSummary` | `string` | `undefined` | Header summary/description text |
| `headerTitleSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Title font size (summary follows this size) |
| `headerIconSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Icon size |
| `headerSummarySize` | `'small' \| 'medium' \| 'large'` | `undefined` | Summary font size (optional, defaults to follow headerTitleSize) |
| `headerColor` | `ColorType` | `'secondary'` | Header text color (primary, secondary, brand, active, success, warning, error) |

### Alert Light Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showAlertLight` | `boolean` | `true` | Whether to show the alert light indicator |
| `alertLightColor` | `string` | `'#10b981'` | Alert light color (any valid CSS color) |

### Other Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Child components to display |
| `className` | `string` | `''` | Optional className for custom styling |

## Design Configuration

### SCSS Variables (_styles.module.scss)

Adjust these variables at the top of the file to customize layout and spacing:

```scss
// Container padding (internal padding of the showcase)
$container-padding-top: 24px !default;
$container-padding-right: 24px !default;
$container-padding-bottom: 24px !default;
$container-padding-left: 24px !default;

// Alert light positioning (relative to top-right corner)
$alert-light-top: 16px !default;
$alert-light-right: 16px !default;

// Alert light sizing
$alert-light-size: 12px !default;
$alert-light-glow-size: 8px !default;

// Header spacing
$header-margin-bottom: 16px !default;
$header-icon-margin-right: 12px !default;
$header-title-margin-bottom: 4px !default;

// Container styling
$container-background: var(--color-bg-main) !default;
$container-border: 1px solid var(--color-border-main) !default;
$container-border-radius: 8px !default;
```

### TypeScript Configuration (_defaults.ts)

Adjust default values and size/color configurations:

```typescript
// Default prop values
export const DASHBOARD_SHOWCASE_DEFAULTS = {
  headerTitleSize: 'medium' as const,
  headerIconSize: 'medium' as const,
  headerSummarySize: 'medium' as const,
  headerColor: 'secondary' as const,
  alertLightColor: '#10b981',
  showAlertLight: true,
}

// Size mappings
export const SIZE_CONFIG = {
  small: { title: '14px', icon: '18px', summary: '12px' },
  medium: { title: '18px', icon: '24px', summary: '14px' },
  large: { title: '24px', icon: '32px', summary: '16px' },
}

// Color mappings
export const COLOR_CONFIG = {
  primary: 'var(--color-main)',
  secondary: 'var(--color-sec)',
  brand: 'var(--brand-color)',
  active: 'var(--color-semantic-active)',
  success: 'var(--color-semantic-success)',
  warning: 'var(--color-semantic-warning)',
  error: 'var(--color-semantic-error)',
}
```

## Examples

### Dashboard with Multiple Showcases

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
  <DashboardShowCase
    showHeader={true}
    headerIcon="star"
    headerTitle="Revenue"
    showAlertLight={true}
    alertLightColor="#10b981"
  >
    <RevenueChart />
  </DashboardShowCase>

  <DashboardShowCase
    showHeader={true}
    headerIcon="favorite"
    headerTitle="Active Users"
    showAlertLight={true}
    alertLightColor="#f59e0b"
  >
    <UsersChart />
  </DashboardShowCase>

  <DashboardShowCase
    showHeader={true}
    headerIcon="add"
    headerTitle="Conversions"
    showAlertLight={true}
    alertLightColor="#ef4444"
  >
    <ConversionsChart />
  </DashboardShowCase>

  <DashboardShowCase
    showHeader={true}
    headerIcon="search"
    headerTitle="Insights"
    showAlertLight={true}
    alertLightColor="#3b82f6"
  >
    <InsightsTable />
  </DashboardShowCase>
</div>
```

## Material Symbols

The component uses Material Symbols Outlined for the header icon. The project includes the necessary font files.

Common available symbols:
- `home` - Home icon
- `search` - Search icon  
- `settings` - Settings icon
- `favorite` - Heart icon
- `star` - Star icon
- `add` - Plus icon
- `remove` - Minus icon
- `edit` - Edit/pencil icon
- `delete` - Delete/trash icon
- `share` - Share icon
- `menu` - Menu icon
- `close` - Close/X icon
- `arrow_back` - Back arrow
- `arrow_forward` - Forward arrow
- `open_in_full` - Maximize icon
- `expand_content` - Expand icon

Browse available symbols at [Google Fonts - Material Symbols](https://fonts.google.com/icons).

## Debug Page

A comprehensive debug page is available at `/debug-dashboard-showcase` to test all component features and configurations interactively.

## File Structure

```
DashboardShowCase/
├── index.ts              # Public exports
├── _component.tsx        # Component implementation
├── _styles.module.scss   # Component styles
├── _defaults.ts          # Default values and configurations
└── README.md            # This file
```

