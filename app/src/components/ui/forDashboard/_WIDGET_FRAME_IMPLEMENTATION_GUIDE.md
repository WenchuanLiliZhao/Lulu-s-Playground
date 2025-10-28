# DashboardWidgetFrame Implementation Guide

**Purpose**: Refactor dashboard widgets to use a common `DashboardWidgetFrame` component, reducing code duplication and improving maintainability.

**Strategy**: Composition Pattern with Slots for maximum flexibility and long-term maintainability.

---

## 📋 Implementation TODO List

### Phase 1: Create Frame Component
- [ ] 1.1 Create `DashboardWidgetFrame/_component.tsx`
- [ ] 1.2 Create `DashboardWidgetFrame/_styles.module.scss`
- [ ] 1.3 Create `DashboardWidgetFrame/index.ts`
- [ ] 1.4 Export from `forDashboard/index.ts`

### Phase 2: Refactor Components (Gradual Migration)
- [ ] 2.1 Refactor `MetricWidget` to use `DashboardWidgetFrame`
- [ ] 2.2 Test `MetricWidget` in debug pages
- [ ] 2.3 Refactor `ProgressBarChart` to use `DashboardWidgetFrame`
- [ ] 2.4 Test `ProgressBarChart` in debug pages
- [ ] 2.5 Refactor `MiniTrendChart` to use `DashboardWidgetFrame`
- [ ] 2.6 Test `MiniTrendChart` in debug pages
- [ ] 2.7 Refactor `TrendChart` to use `DashboardWidgetFrame`
- [ ] 2.8 Test `TrendChart` in debug pages

### Phase 3: Verification & Documentation
- [ ] 3.1 Check all debug pages (`/debug-*`)
- [ ] 3.2 Check all playground pages (`/playground/*`)
- [ ] 3.3 Verify no visual regressions
- [ ] 3.4 Update component README files
- [ ] 3.5 Remove old frame code from components

### Phase 4: Cleanup & Optimization
- [ ] 4.1 Check for linter errors
- [ ] 4.2 Optimize imports
- [ ] 4.3 Update exports in index files
- [ ] 4.4 Final review and testing

---

## 📖 Detailed Implementation Steps

---

## Phase 1: Create DashboardWidgetFrame Component

### Step 1.1: Create `DashboardWidgetFrame/_component.tsx`

**Location**: `/app/src/components/ui/forDashboard/DashboardWidgetFrame/_component.tsx`

**What to do**: Create a new component that handles:
- Container rendering with className support
- Alert light rendering (when enabled)
- Dashboard header rendering (when enabled)
- Content area (via children)
- Optional slots for flexible content placement

**Code to write**:

```tsx
import { type ReactNode } from 'react'
import styles from './_styles.module.scss'
import {
  DashboardHeaderElement,
  DashboardAlertLightElement,
} from '../_shared-elements'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

export interface DashboardWidgetFrameProps extends DashboardCommonProps {
  /**
   * Main content of the widget
   */
  children: ReactNode

  /**
   * Optional content to render before the dashboard header
   * Use case: Custom banners, alerts
   */
  renderBeforeHeader?: () => ReactNode

  /**
   * Optional content to render after the dashboard header
   * Use case: Date filters, action buttons
   */
  renderAfterHeader?: () => ReactNode

  /**
   * Optional content to render at the bottom of the widget
   * Use case: Legends, footers, summaries
   */
  renderFooter?: () => ReactNode

  /**
   * Additional className for the content wrapper
   * Use case: Custom spacing, styling for specific widgets
   */
  contentClassName?: string

  /**
   * Loading state
   * @default false
   */
  loading?: boolean

  /**
   * Error state
   */
  error?: Error | null
}

export const DashboardWidgetFrame = ({
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

  // Frame-specific props
  children,
  renderBeforeHeader,
  renderAfterHeader,
  renderFooter,
  contentClassName = '',
  loading = false,
  error = null,
}: DashboardWidgetFrameProps) => {
  const containerClasses = [styles['frame-container'], className]
    .filter(Boolean)
    .join(' ')

  const contentClasses = [styles['frame-content'], contentClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {/* Alert Light Indicator */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}

      {/* Before Header Slot */}
      {renderBeforeHeader && renderBeforeHeader()}

      {/* Dashboard Header */}
      {showHeader && (
        <DashboardHeaderElement
          icon={headerIcon}
          title={headerTitle}
          summary={headerSummary}
          titleSize={headerTitleSize}
          iconSize={headerIconSize}
          summarySize={headerSummarySize}
          color={headerColor}
          className={styles['dashboard-header']}
          topClassName={styles['dashboard-header-top']}
          iconClassName={styles['dashboard-header-icon']}
          titleClassName={styles['dashboard-header-title']}
          summaryClassName={styles['dashboard-header-summary']}
        />
      )}

      {/* After Header Slot */}
      {renderAfterHeader && renderAfterHeader()}

      {/* Loading State */}
      {loading && (
        <div className={styles['loading-state']}>
          <div className={styles['loading-spinner']} />
          <p className={styles['loading-text']}>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles['error-state']}>
          <span className="material-symbols-outlined">error</span>
          <p className={styles['error-text']}>{error.message}</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && <div className={contentClasses}>{children}</div>}

      {/* Footer Slot */}
      {renderFooter && renderFooter()}
    </div>
  )
}
```

**Why this approach**:
- ✅ Pure composition pattern - maximum flexibility
- ✅ Slots (renderBeforeHeader, renderAfterHeader, renderFooter) handle edge cases
- ✅ Loading and error states built-in for future use
- ✅ contentClassName allows per-widget styling customization
- ✅ All common props from `DashboardCommonProps` supported

---

### Step 1.2: Create `DashboardWidgetFrame/_styles.module.scss`

**Location**: `/app/src/components/ui/forDashboard/DashboardWidgetFrame/_styles.module.scss`

**What to do**: Create styles for the frame container, ensuring it doesn't interfere with widget-specific styles.

**Code to write**:

```scss
@use '../../_shared-styles.scss' as shared;

// Frame Container
// This is the outermost wrapper for all dashboard widgets
.frame-container {
  position: relative;
  background-color: var(--color-bg-main);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

// Alert Light
.alert-light {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

// Dashboard Header
.dashboard-header {
  margin-bottom: 16px;
}

.dashboard-header-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.dashboard-header-icon {
  display: flex;
  align-items: center;
}

.dashboard-header-title {
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
}

.dashboard-header-summary {
  margin: 0;
  color: var(--color-sec);
  line-height: 1.4;
}

// Content Area
// Minimal styling - let child components control their own layout
.frame-content {
  // Add minimal spacing if needed
  // Most styling should come from child components
}

// Loading State
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border-main);
  border-top-color: var(--color-semantic-active);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin: 0;
  color: var(--color-sec);
  font-size: 14px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Error State
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 12px;
  color: var(--color-semantic-error);

  .material-symbols-outlined {
    font-size: 48px;
  }
}

.error-text {
  margin: 0;
  font-size: 14px;
  text-align: center;
}
```

**Why this approach**:
- ✅ Minimal, non-invasive styles
- ✅ Alert light positioning consistent across all widgets
- ✅ Dashboard header spacing consistent
- ✅ Built-in loading and error states
- ✅ Allows child components to control their own layout

---

### Step 1.3: Create `DashboardWidgetFrame/index.ts`

**Location**: `/app/src/components/ui/forDashboard/DashboardWidgetFrame/index.ts`

**What to do**: Export the component.

**Code to write**:

```typescript
export { DashboardWidgetFrame } from './_component'
export { DashboardWidgetFrame as default } from './_component'
export type { DashboardWidgetFrameProps } from './_component'
```

---

### Step 1.4: Export from `forDashboard/index.ts`

**Location**: `/app/src/components/ui/forDashboard/index.ts`

**What to do**: Add exports for the new `DashboardWidgetFrame` component.

**Code to add** (after line 39):

```typescript
export { DashboardWidgetFrame } from './DashboardWidgetFrame'
export type { DashboardWidgetFrameProps } from './DashboardWidgetFrame'
```

---

## Phase 2: Refactor Components

### General Refactoring Pattern

For each component, follow this pattern:

1. **Import `DashboardWidgetFrame`**
2. **Remove frame-related code** (alert light, dashboard header rendering)
3. **Wrap content in `DashboardWidgetFrame`**
4. **Move frame props to `DashboardWidgetFrame`**
5. **Keep component-specific logic intact**
6. **Update styles** (remove container, alert light, dashboard header styles)

---

### Step 2.1: Refactor `MetricWidget`

**Location**: `/app/src/components/ui/forDashboard/MetricWidget/_component.tsx`

**What to change**:

#### Before (lines 50-179):
```tsx
export const MetricWidget = ({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  // ... many dashboard props
  
  // MetricWidget specific props
  icon,
  title,
  value,
  // ...
}: MetricWidgetProps) => {
  const containerClasses = [styles['card-container'], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {/* Dashboard Alert Light */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}
      
      {/* Dashboard Header (optional) */}
      {showHeader && (
        <DashboardHeaderElement
          icon={headerIcon}
          title={headerTitle}
          // ... many props
        />
      )}
      
      {/* Metric header with icon and title */}
      <div className={styles['metric-header']}>
        {/* ... metric content ... */}
      </div>
      {/* ... rest of metric content ... */}
    </div>
  )
}
```

#### After:
```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'

export const MetricWidget = ({
  // Dashboard common props (will be passed to frame)
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
  
  // MetricWidget specific props
  icon,
  title,
  value,
  changeText,
  changeType = 'neutral',
  statusText,
  statusColor = 'neutral',
  sparklineData,
  sparklineColor = 'var(--color-semantic-active)',
  sparklineSmooth = true,
}: MetricWidgetProps) => {
  // ... keep all the sparkline logic ...

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
    >
      {/* Metric header with icon and title */}
      <div className={styles['metric-header']}>
        {icon && (
          <span className={`material-symbols-outlined ${styles['metric-icon']}`}>
            {icon}
          </span>
        )}
        <div className={styles['metric-title']}>{title}</div>
      </div>

      {/* Main metric value */}
      <div className={styles['metric-value']}>{value}</div>

      {/* Change indicator or status */}
      <div className={styles['metric-footer']}>
        {changeText && (
          <div className={`${styles['metric-change']} ${changeTypeClassName}`}>
            {changeType === 'positive' && (
              <Icon icon="arrow_upward" className={styles['icon']} />
            )}
            {changeType === 'negative' && (
              <Icon icon="arrow_downward" className={styles['icon']} />
            )}
            {changeText}
          </div>
        )}
        {statusText && (
          <div className={`${styles['metric-status']} ${statusColorClassName}`}>
            {statusText}
          </div>
        )}
      </div>

      {/* Sparkline in bottom right corner */}
      {sparklineData && sparklineData.length > 1 && (
        <div className={styles.sparkline}>
          {/* ... keep sparkline SVG code ... */}
        </div>
      )}
    </DashboardWidgetFrame>
  )
}
```

**Update styles** (`_styles.module.scss`):

Remove these styles (they're now in DashboardWidgetFrame):
- `.card-container`
- `.alert-light`
- `.dashboard-header*` classes

Keep all metric-specific styles:
- `.metric-header`
- `.metric-value`
- `.metric-footer`
- `.sparkline`
- etc.

---

### Step 2.2: Test MetricWidget

**What to do**:
1. Run the dev server: `npm run dev`
2. Navigate to debug pages that use `MetricWidget`
3. Check for visual regressions:
   - Alert light positioning
   - Header rendering
   - Spacing and padding
   - Hover effects
4. Check browser console for errors
5. Verify responsive behavior

**Where to check**:
- `/debug-dashboard-widgets` (if exists)
- Any playground pages using `MetricWidget`
- Search codebase: `grep -r "MetricWidget" app/src/pages/`

---

### Step 2.3: Refactor `ProgressBarChart`

**Location**: `/app/src/components/ui/forDashboard/ProgressBarChart/_component.tsx`

**Special consideration**: `ProgressBarChart` has BOTH dashboard header AND internal header (title/subtitle when `showHeader=false`).

**What to change**:

#### Key changes:
1. Wrap everything in `DashboardWidgetFrame`
2. Keep internal header logic (lines 126-134)
3. Use `renderFooter` slot for the legend

```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'

export const ProgressBarChart = ({
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

  // ProgressBarChart specific props
  title,
  subtitle,
  items,
  showPercentage = true,
  showInfo = true,
}: ProgressBarChartProps) => {
  const maxValue = Math.max(...items.map((item) => item.value))

  const getStatusClass = (status: ProgressBarItem['status']) => {
    // ... keep existing logic ...
  }

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
      renderFooter={() => (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.healthy}`}></span>
            <span className={styles.legendLabel}>Healthy</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.warning}`}></span>
            <span className={styles.legendLabel}>Warning</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.critical}`}></span>
            <span className={styles.legendLabel}>Critical</span>
          </div>
        </div>
      )}
    >
      {/* Internal Header (alternative to dashboard header) */}
      {!showHeader && (title || subtitle) && (
        <div className={styles['internal-header']}>
          {title && <h3 className={styles['internal-title']}>{title}</h3>}
          {subtitle && (
            <p className={styles['internal-subtitle']}>{subtitle}</p>
          )}
        </div>
      )}

      {/* Chart container */}
      <div className={styles.chartContainer}>
        {/* Chart */}
        <div className={styles.chart}>
          {items.map((item) => {
            // ... keep existing map logic ...
          })}
        </div>
      </div>
    </DashboardWidgetFrame>
  )
}
```

**Update styles**: Remove container, alert-light, and dashboard-header classes.

---

### Step 2.4: Test ProgressBarChart

**Same testing process as Step 2.2**.

---

### Step 2.5: Refactor `MiniTrendChart`

**Location**: `/app/src/components/ui/forDashboard/MiniTrendChart/_component.tsx`

**Special consideration**: `MiniTrendChart` has internal header + optional date filter.

**What to change**:

Use `renderAfterHeader` slot for date filter when `showHeader=true`, or keep it in internal header when `showHeader=false`.

```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'

export const MiniTrendChart = ({
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
  
  // ... rest of props
}: MiniTrendChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  
  // ... keep all existing logic ...

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
      renderAfterHeader={
        showHeader && enableDateFilter
          ? () => (
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                size="small"
              />
            )
          : undefined
      }
    >
      {/* Internal Header (alternative to dashboard header) */}
      {!showHeader && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          
          {enableDateFilter && (
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              size="small"
            />
          )}
        </div>
      )}

      <div ref={refCallback} className={styles.chartWrapper} style={{ 
        height: `${height}px`,
      }}>
        {/* ... keep all chart rendering code ... */}
      </div>
    </DashboardWidgetFrame>
  )
}
```

**Update styles**: Remove container, alert-light, and dashboard-header classes.

---

### Step 2.6: Test MiniTrendChart

**Same testing process as Step 2.2**.

---

### Step 2.7: Refactor `TrendChart`

**Location**: `/app/src/components/ui/forDashboard/TrendChart/_component.tsx`

**Special consideration**: `TrendChart` has legacy header for date filter (line 230-239).

**What to change**:

```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'

export const TrendChart = ({
  title,
  data,
  lines,
  className = '',
  // Dashboard header props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  // Dashboard alert light props
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  // ... rest of props
}: TrendChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  
  // ... keep all existing logic ...

  return (
    <DashboardWidgetFrame
      showHeader={showHeader || !!title} // Auto-enable if title provided
      headerIcon={headerIcon}
      headerTitle={headerTitle || title} // Use title as fallback
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
      renderAfterHeader={
        enableDateFilter
          ? () => (
              <div className={styles.header}>
                <DateFilter
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  size="small"
                />
              </div>
            )
          : undefined
      }
    >
      <div ref={refCallback} className={styles.chartWrapper}>
        {/* ... keep all chart rendering code ... */}
      </div>
    </DashboardWidgetFrame>
  )
}
```

**Update styles**: 
- Remove `.container`, `.alert-light`, `.dashboardHeader` classes
- Keep `.header` (for date filter wrapper)
- Keep `.chartWrapper`

---

### Step 2.8: Test TrendChart

**Same testing process as Step 2.2**.

---

## Phase 3: Verification & Documentation

### Step 3.1: Check All Debug Pages

**What to do**:
1. List all debug pages: `ls app/src/pages/debug/`
2. For each page, check if it uses any refactored widgets
3. Test in browser for visual regressions

**Command to find usages**:
```bash
cd app/src/pages/debug
grep -r "MetricWidget\|ProgressBarChart\|MiniTrendChart\|TrendChart" .
```

**Pages to check**:
- `/debug-dashboard-widgets`
- `/debug-dashboard-showcase`
- `/debug-trend-chart`
- Any other debug pages

---

### Step 3.2: Check All Playground Pages

**What to do**:
1. List playground pages: `ls app/src/pages/playground/`
2. For each page, check if it uses any refactored widgets
3. Test in browser for visual regressions

**Command to find usages**:
```bash
cd app/src/pages/playground
grep -r "MetricWidget\|ProgressBarChart\|MiniTrendChart\|TrendChart" .
```

**Special attention to**:
- `_luluDemo/SalesEventTrend_V1/` (uses TrendChart)
- `_luluDemo/TrendChartDemo_V1/` (uses TrendChart)
- `CDD/` (may use widgets)

---

### Step 3.3: Verify No Visual Regressions

**What to check**:
- [ ] Alert lights appear in correct position (top-right)
- [ ] Alert lights have correct color and glow effect
- [ ] Dashboard headers render correctly
- [ ] Header icons align properly with titles
- [ ] Header summaries have correct spacing
- [ ] Container padding and spacing unchanged
- [ ] Widget-specific content (metrics, charts, bars) unchanged
- [ ] Hover effects work
- [ ] Responsive behavior works (test different screen sizes)

**Tip**: Take screenshots before refactoring for comparison.

---

### Step 3.4: Update Component README Files

**What to do**:
For each refactored component, update its README.md:

**MetricWidget/README.md**:
Add note about using `DashboardWidgetFrame`:
```markdown
## Architecture

This component uses `DashboardWidgetFrame` for consistent container, alert light, 
and header rendering. See `DashboardWidgetFrame/README.md` for frame-level props.

### Frame Props
All dashboard common props (`showHeader`, `showAlertLight`, etc.) are passed to 
`DashboardWidgetFrame`. See `_shared-types.ts` for `DashboardCommonProps`.
```

**Repeat for**:
- `ProgressBarChart/README.md`
- `MiniTrendChart/README.md`
- `TrendChart/README.md`

---

### Step 3.5: Remove Old Frame Code

**What to do**:
Verify that old frame-related code has been removed from each component:

**In `_component.tsx` files**:
- [ ] No `DashboardAlertLightElement` rendering (except via frame)
- [ ] No `DashboardHeaderElement` rendering (except via frame)
- [ ] No container class combining logic (moved to frame)

**In `_styles.module.scss` files**:
- [ ] No `.card-container` or `.container` with frame styling
- [ ] No `.alert-light` positioning
- [ ] No `.dashboard-header*` classes (unless internal headers)

---

## Phase 4: Cleanup & Optimization

### Step 4.1: Check for Linter Errors

**What to do**:
```bash
cd app
npm run lint
```

**Fix any**:
- Unused imports
- Type errors
- ESLint warnings

---

### Step 4.2: Optimize Imports

**What to do**:
For each refactored component, ensure imports are clean:

**Remove** (no longer needed):
```tsx
import { DashboardAlertLightElement } from '../_shared-elements'
// (if not used elsewhere)
```

**Add** (new dependency):
```tsx
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
```

---

### Step 4.3: Update Exports in Index Files

**What to do**:
Verify that `forDashboard/index.ts` exports `DashboardWidgetFrame`:

```typescript
// ===== Shared Dashboard Infrastructure =====
export type { 
  DashboardHeaderProps, 
  DashboardAlertLightProps, 
  DashboardCardProps, 
  DashboardCommonProps,
  DashboardSizeType,
  DashboardColorType
} from './_shared-types'

// ... other exports ...

export { 
  DashboardCardElement, 
  DashboardHeaderElement, 
  DashboardAlertLightElement 
} from './_shared-elements'

// ===== NEW: Dashboard Widget Frame =====
export { DashboardWidgetFrame } from './DashboardWidgetFrame'
export type { DashboardWidgetFrameProps } from './DashboardWidgetFrame'

// ===== Dashboard Components =====
export { TrendChart } from './TrendChart'
// ... rest of exports
```

---

### Step 4.4: Final Review and Testing

**What to do**:

1. **Visual Review**:
   - [ ] Open each debug page
   - [ ] Open each playground page
   - [ ] Compare to screenshots (if taken)
   - [ ] Test on mobile/tablet sizes

2. **Functional Review**:
   - [ ] Alert lights toggle correctly
   - [ ] Dashboard headers show/hide correctly
   - [ ] Widget interactions work (hover, click, etc.)
   - [ ] Charts render and animate correctly
   - [ ] Date filters work (if applicable)

3. **Code Review**:
   - [ ] No code duplication
   - [ ] Consistent patterns across all widgets
   - [ ] Types are correct
   - [ ] No linter errors
   - [ ] Comments are accurate

4. **Performance Check**:
   - [ ] No console errors
   - [ ] No console warnings
   - [ ] Page loads quickly
   - [ ] No unnecessary re-renders (use React DevTools)

---

## 🎯 Success Criteria

After completing all steps, you should have:

✅ **New Component**:
- `DashboardWidgetFrame` component created
- Exported from `forDashboard/index.ts`
- Properly styled and functional

✅ **Refactored Components**:
- All 4 widgets use `DashboardWidgetFrame`
- No duplicate frame code
- All functionality preserved

✅ **Testing**:
- All debug pages work
- All playground pages work
- No visual regressions
- No console errors

✅ **Documentation**:
- README files updated
- Code comments accurate
- This guide followed completely

✅ **Code Quality**:
- No linter errors
- Clean imports
- Consistent patterns

---

## 🚨 Common Issues & Solutions

### Issue 1: Alert Light Positioning Off
**Symptom**: Alert light not in top-right corner
**Solution**: Check that `position: relative` is on frame-container, `position: absolute` on alert-light

### Issue 2: Spacing Looks Different
**Symptom**: Widgets have different padding than before
**Solution**: 
- Check frame-container padding matches old container padding
- Use `contentClassName` prop to add widget-specific spacing

### Issue 3: Dashboard Header Not Showing
**Symptom**: Header doesn't render even with `showHeader={true}`
**Solution**: 
- Verify `headerTitle` is provided
- Check that `DashboardHeaderElement` receives all props correctly

### Issue 4: Type Errors
**Symptom**: TypeScript errors about missing props
**Solution**: 
- Ensure component extends `DashboardCommonProps`
- Verify all frame props are destructured and passed to frame

### Issue 5: Styles Not Applied
**Symptom**: Widget looks unstyled
**Solution**: 
- Check that SCSS module is imported correctly
- Verify class names match between TSX and SCSS
- Check that frame styles don't override widget styles

---

## 📚 Additional Resources

- `_shared-types.ts` - See `DashboardCommonProps` interface
- `_shared-elements.tsx` - See `DashboardHeaderElement` and `DashboardAlertLightElement`
- `_shared-config.ts` - See `DASHBOARD_DEFAULTS` configuration
- `_CHART_REFACTORING.md` - Previous refactoring for reference
- `_IMPLEMENTATION_SUMMARY.md` - Y-axis enhancement example

---

## 🎓 Tips for AI Assistants

If you're an AI implementing this guide:

1. **Work step-by-step**: Complete each TODO item before moving to the next
2. **Test after each component**: Don't refactor all 4 components without testing
3. **Keep backups**: Save original files before modifying
4. **Use search**: Use `grep` to find all usages before refactoring
5. **Check types**: Run TypeScript compiler frequently
6. **Preserve functionality**: Focus on structural changes, not behavioral changes
7. **Ask for clarification**: If a step is unclear, ask the user before proceeding

---

## 📝 Notes

- This refactoring is **non-breaking** - existing code continues to work
- Migration is **gradual** - components can be refactored one at a time
- The pattern is **extensible** - easy to add new frame features in the future
- The approach is **composition-based** - maximum flexibility for special cases

---

**Last Updated**: 2025-10-28
**Status**: Ready for Implementation
**Estimated Time**: 3-5 hours for complete implementation

