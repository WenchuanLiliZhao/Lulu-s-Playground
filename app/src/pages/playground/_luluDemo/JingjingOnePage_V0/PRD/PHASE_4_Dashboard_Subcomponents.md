# Phase 4: Dashboard Sub-components PRD

## Overview

**Phase**: 4 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 2-3 days  
**Dependencies**: Phase 1 (Universal Components), Phase 2 (Mock Data), Phase 3 (Layout Components)

## Objective

Build all dashboard sub-components that display performance metrics, peak hours, category mix, and today's target details. These components will replace the placeholders in the DashboardSection component.

---

## Components to Build

### 4.1 PerformanceSnapshot Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/PerformanceSnapshot/`

#### Requirements

**Purpose**: Display yesterday's performance and today's target in a highlighted card with gradient background.

**Visual Reference**: From screenshot - Blue gradient background card at the top showing "$24,580" and "$25,200"

**Layout**:
```
┌────────────────────────────────────────────────────────┐
│ 📅 Performance Snapshot                                │
│                                                        │
│  YESTERDAY                    TODAY'S TARGET          │
│  $24,580                      $25,200                 │
│  103% of target               +2.5% vs yesterday      │
└────────────────────────────────────────────────────────┘
```

#### API Specification

```typescript
interface PerformanceSnapshotProps {
  yesterday: MetricValue;
  todayTarget: MetricValue;
}

interface MetricValue {
  value: string;        // "$24,580"
  subtitle: string;     // "103% of target"
}
```

#### Files to Create

```
components/DashboardSection/PerformanceSnapshot/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import type { PerformanceSnapshot as PerformanceSnapshotData } from '../../../data/types';
import styles from './_styles.module.scss';

interface PerformanceSnapshotProps {
  data: PerformanceSnapshotData;
}

export const PerformanceSnapshot: React.FC<PerformanceSnapshotProps> = ({ data }) => {
  return (
    <div className={styles.performanceSnapshot}>
      <div className={styles.metricCard}>
        <div className={styles.label}>YESTERDAY</div>
        <div className={styles.value}>{data.yesterday.value}</div>
        <div className={styles.subtitle}>{data.yesterday.subtitle}</div>
      </div>
      
      <div className={styles.metricCard}>
        <div className={styles.label}>TODAY'S TARGET</div>
        <div className={styles.value}>{data.todayTarget.value}</div>
        <div className={styles.subtitle}>{data.todayTarget.subtitle}</div>
      </div>
    </div>
  );
};
```

#### SCSS Implementation

```scss
.performanceSnapshot {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(41, 182, 246, 0.2);
}

.metricCard {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
}

.value {
  font-size: 36px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.2;
}

.subtitle {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 768px) {
  .performanceSnapshot {
    grid-template-columns: 1fr;
  }
  
  .value {
    font-size: 28px;
  }
}
```

#### Acceptance Criteria

- [ ] Two-column layout on desktop
- [ ] Blue gradient background
- [ ] Large, bold value display
- [ ] Clean typography hierarchy
- [ ] Responsive single-column on mobile
- [ ] Proper spacing and padding

---

### 4.2 MetricsRow Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/MetricsRow/`

#### Requirements

**Purpose**: Display three key metrics (UPT, Conv. Rate, AUR) with status indicators.

**Visual Reference**: From screenshot - Three cards showing "UPT 2.3 ↑ Above", "Conv. Rate 68% On Track", "AUR $105 ↓ Below"

#### API Specification

```typescript
interface MetricsRowProps {
  metrics: MetricsRowData;
}

interface MetricsRowData {
  upt: MetricWidget;
  conversionRate: MetricWidget;
  aur: MetricWidget;
}

interface MetricWidget {
  label: string;
  value: string;
  status: 'above' | 'on-track' | 'below';
  statusLabel: string;
}
```

#### Files to Create

```
components/DashboardSection/MetricsRow/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { MetricsRow as MetricsRowData } from '../../../data/types';
import styles from './_styles.module.scss';

interface MetricsRowProps {
  data: MetricsRowData;
}

const statusMap = {
  'above': 'success',
  'on-track': 'info',
  'below': 'danger'
} as const;

export const MetricsRow: React.FC<MetricsRowProps> = ({ data }) => {
  const renderMetric = (metric: MetricsRowData[keyof MetricsRowData]) => (
    <div className={styles.metricCard}>
      <div className={styles.label}>{metric.label}</div>
      <div className={styles.value}>{metric.value}</div>
      <StatusBadge 
        label={metric.statusLabel}
        status={statusMap[metric.status]}
        variant="light"
      />
    </div>
  );

  return (
    <div className={styles.metricsRow}>
      {renderMetric(data.upt)}
      {renderMetric(data.conversionRate)}
      {renderMetric(data.aur)}
    </div>
  );
};
```

#### SCSS Implementation

```scss
.metricsRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.metricCard {
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary, #757575);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-primary, #212121);
  line-height: 1;
}

@media (max-width: 768px) {
  .metricsRow {
    grid-template-columns: 1fr;
  }
}
```

#### Acceptance Criteria

- [ ] Three-column grid layout
- [ ] Each metric card displays label, value, status
- [ ] StatusBadge component integrated
- [ ] Hover effect on cards
- [ ] Responsive single-column on mobile
- [ ] Clean, centered alignment

---

### 4.3 PeakHoursPanel Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/PeakHoursPanel/`

#### Requirements

**Purpose**: Display peak hours information using InfoPanel component.

**Visual Reference**: From screenshot - Clock icon with "Best CR: 2-4PM (78%)", "Low CR: 10-12PM (52%)", "Rush: 5-7PM"

#### API Specification

```typescript
interface PeakHoursPanelProps {
  data: PeakHoursData;
}

interface PeakHoursData {
  bestCR: TimeSlot;
  lowCR: TimeSlot;
  rush: string;
}
```

#### Files to Create

```
components/DashboardSection/PeakHoursPanel/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import { InfoPanel } from '@/components/ui/InfoPanel';
import type { PeakHoursData } from '../../../data/types';
import styles from './_styles.module.scss';

interface PeakHoursPanelProps {
  data: PeakHoursData;
}

export const PeakHoursPanel: React.FC<PeakHoursPanelProps> = ({ data }) => {
  // Clock icon (can use Icon component or emoji)
  const ClockIcon = () => <span className={styles.icon}>🕐</span>;

  return (
    <div className={styles.panel}>
      <InfoPanel
        icon={<ClockIcon />}
        title="Peak Hours"
        items={[
          {
            label: "Best CR",
            value: `${data.bestCR.time} (${data.bestCR.rate})`,
            highlight: true
          },
          {
            label: "Low CR",
            value: `${data.lowCR.time} (${data.lowCR.rate})`
          },
          {
            label: "Rush",
            value: data.rush
          }
        ]}
      />
    </div>
  );
};
```

#### SCSS Implementation

```scss
.panel {
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.icon {
  font-size: 20px;
}
```

#### Acceptance Criteria

- [ ] Uses InfoPanel universal component
- [ ] Clock icon displays
- [ ] Three time slots shown
- [ ] Best CR highlighted
- [ ] Clean, readable layout

---

### 4.4 CategoryMixPanel Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/CategoryMixPanel/`

#### Requirements

**Purpose**: Display category mix and traffic information using InfoPanel component.

**Visual Reference**: From screenshot - Shopping bag icon with "Men's: 58% (↑5%)", "Women's: 42%", "Traffic: 342 (+12)"

#### API Specification

```typescript
interface CategoryMixPanelProps {
  data: CategoryMixData;
}

interface CategoryMixData {
  mens: CategoryData;
  womens: CategoryData;
  traffic: TrafficData;
}
```

#### Files to Create

```
components/DashboardSection/CategoryMixPanel/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import { InfoPanel } from '@/components/ui/InfoPanel';
import type { CategoryMixData } from '../../../data/types';
import styles from './_styles.module.scss';

interface CategoryMixPanelProps {
  data: CategoryMixData;
}

export const CategoryMixPanel: React.FC<CategoryMixPanelProps> = ({ data }) => {
  const ShoppingBagIcon = () => <span className={styles.icon}>🛍️</span>;

  // Format trend if exists
  const formatCategory = (percentage: string, trend?: string) => {
    return trend ? `${percentage} (${trend})` : percentage;
  };

  // Format traffic change
  const formatTraffic = (count: number, change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${count} (${sign}${change})`;
  };

  return (
    <div className={styles.panel}>
      <InfoPanel
        icon={<ShoppingBagIcon />}
        title="Category Mix"
        items={[
          {
            label: "Men's",
            value: formatCategory(data.mens.percentage, data.mens.trend),
            color: data.mens.trend?.startsWith('↑') ? 'green' : undefined
          },
          {
            label: "Women's",
            value: formatCategory(data.womens.percentage, data.womens.trend),
            color: data.womens.trend?.startsWith('↑') ? 'green' : 
                   data.womens.trend?.startsWith('↓') ? 'red' : undefined
          },
          {
            label: "Traffic",
            value: formatTraffic(data.traffic.count, data.traffic.change),
            color: data.traffic.change > 0 ? 'green' : 
                   data.traffic.change < 0 ? 'red' : undefined
          }
        ]}
      />
    </div>
  );
};
```

#### SCSS Implementation

```scss
.panel {
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.icon {
  font-size: 20px;
}
```

#### Acceptance Criteria

- [ ] Uses InfoPanel universal component
- [ ] Shopping bag icon displays
- [ ] Men's, Women's, Traffic shown
- [ ] Trends display with arrows
- [ ] Color coding for positive/negative
- [ ] Clean, readable layout

---

### 4.5 TodayTargetDetail Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/TodayTargetDetail/`

#### Requirements

**Purpose**: Display today's target breakdown with morning and evening splits.

**Visual Reference**: From screenshot - Green card with target icon, showing total "$25,200" and breakdown "Morning $11,340" and "Evening $13,860"

#### API Specification

```typescript
interface TodayTargetDetailProps {
  data: TodayTargetDetail;
}

interface TodayTargetDetail {
  total: string;
  morning: string;
  evening: string;
}
```

#### Files to Create

```
components/DashboardSection/TodayTargetDetail/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import type { TodayTargetDetail as TodayTargetDetailData } from '../../../data/types';
import styles from './_styles.module.scss';

interface TodayTargetDetailProps {
  data: TodayTargetDetailData;
}

export const TodayTargetDetail: React.FC<TodayTargetDetailProps> = ({ data }) => {
  return (
    <div className={styles.targetDetail}>
      <div className={styles.header}>
        <span className={styles.icon}>🎯</span>
        <h3 className={styles.title}>Today's Target</h3>
      </div>
      
      <div className={styles.totalValue}>{data.total}</div>
      
      <div className={styles.breakdown}>
        <div className={styles.timeSlot}>
          <span className={styles.timeIcon}>🌅</span>
          <div className={styles.timeInfo}>
            <div className={styles.timeLabel}>Morning</div>
            <div className={styles.timeValue}>{data.morning}</div>
          </div>
        </div>
        
        <div className={styles.timeSlot}>
          <span className={styles.timeIcon}>🌙</span>
          <div className={styles.timeInfo}>
            <div className={styles.timeLabel}>Evening</div>
            <div className={styles.timeValue}>{data.evening}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### SCSS Implementation

```scss
.targetDetail {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
  color: #FFFFFF;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #FFFFFF;
}

.totalValue {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1;
}

.breakdown {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.timeSlot {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.timeIcon {
  font-size: 24px;
}

.timeInfo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeLabel {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeValue {
  font-size: 18px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .breakdown {
    grid-template-columns: 1fr;
  }
  
  .totalValue {
    font-size: 32px;
  }
}
```

#### Acceptance Criteria

- [ ] Green gradient background
- [ ] Target icon and title
- [ ] Large total value display
- [ ] Morning and evening breakdown
- [ ] Time icons (sunrise/moon)
- [ ] Two-column layout on desktop
- [ ] Responsive single-column on mobile

---

### 4.6 Update DashboardSection

Now update the `DashboardSection` component to use real sub-components instead of placeholders.

**File**: `components/DashboardSection/_component.tsx`

```typescript
import React from 'react';
import type { DashboardData } from '../../data/types';
import { PerformanceSnapshot } from './PerformanceSnapshot';
import { MetricsRow } from './MetricsRow';
import { PeakHoursPanel } from './PeakHoursPanel';
import { CategoryMixPanel } from './CategoryMixPanel';
import { TodayTargetDetail } from './TodayTargetDetail';
import styles from './_styles.module.scss';

interface DashboardSectionProps {
  data: DashboardData;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ data }) => {
  return (
    <div className={styles.dashboardSection}>
      {/* Performance Snapshot */}
      <section className={styles.performanceSnapshot}>
        <h2 className={styles.sectionTitle}>
          📅 Performance Snapshot
        </h2>
        <PerformanceSnapshot data={data.performanceSnapshot} />
      </section>
      
      {/* Three Metrics Row */}
      <section className={styles.metricsRow}>
        <MetricsRow data={data.metrics} />
      </section>
      
      {/* Peak Hours & Category Mix */}
      <section className={styles.infoRow}>
        <PeakHoursPanel data={data.peakHours} />
        <CategoryMixPanel data={data.categoryMix} />
      </section>
      
      {/* Today's Target Detail */}
      <section className={styles.targetDetail}>
        <TodayTargetDetail data={data.todayTargetDetail} />
      </section>
    </div>
  );
};
```

**Update exports in** `components/DashboardSection/index.ts`:

```typescript
export { DashboardSection } from './_component';
export { PerformanceSnapshot } from './PerformanceSnapshot';
export { MetricsRow } from './MetricsRow';
export { PeakHoursPanel } from './PeakHoursPanel';
export { CategoryMixPanel } from './CategoryMixPanel';
export { TodayTargetDetail } from './TodayTargetDetail';

export type { DashboardSectionProps } from './_component';
```

---

## Testing Strategy

### Visual Verification Checklist

- [ ] Performance Snapshot: Blue gradient, large numbers, proper spacing
- [ ] Metrics Row: Three equal-width cards, status badges correct colors
- [ ] Peak Hours: Clock icon, three time slots, best CR highlighted
- [ ] Category Mix: Shopping bag icon, trend arrows, traffic count
- [ ] Today's Target: Green gradient, morning/evening icons, breakdown

### Data Testing

Test with different mock data scenarios:
```typescript
// Good performance
<DashboardSection data={mockDashboardData} />

// Poor performance
<DashboardSection data={mockDashboardDataPoor} />

// Edge cases: very high numbers, negative trends, etc.
```

### Responsive Testing

Test at breakpoints:
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

---

## Success Criteria

Phase 4 is complete when:

- [ ] All 5 sub-components built and styled
- [ ] DashboardSection updated to use real components
- [ ] All components match visual design from screenshots
- [ ] Universal components (StatusBadge, InfoPanel) integrated correctly
- [ ] Responsive design works on all screen sizes
- [ ] Color gradients match design (blue for snapshot, green for target)
- [ ] Typography hierarchy clear and readable
- [ ] No TypeScript errors
- [ ] Clean, professional appearance
- [ ] Smooth hover effects where appropriate

---

## Next Phase

After completing Phase 4, proceed to **Phase 5: Tips Section Components** to build the tip cards and content block renderers for the right side of the dashboard.

