# Phase 3: Playground Layout Components PRD

## Overview

**Phase**: 3 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 2 days  
**Dependencies**: Phase 1 (Universal Components), Phase 2 (Mock Data)

## Objective

Build the main layout structure for the JingJing One Page dashboard, including the three-section layout, navigation bar, and container components for dashboard and tips sections.

---

## Components to Build

### 3.1 PageLayout Component

**Location**: `JingjingOnePage_V0/components/PageLayout/`

#### Requirements

**Purpose**: Main layout container with three sections - fixed navigation bar, scrollable dashboard section (left), and scrollable tips section (right).

**Visual Structure**:
```
┌────────────────────────────────────────────────────────────┐
│  Navigation Bar (Fixed, Full Width)                       │
├──────────────────────────┬─────────────────────────────────┤
│                          │                                 │
│  Dashboard Section       │  Tips Section                   │
│  (Scrollable)            │  (Scrollable)                  │
│  ~60-65% width           │  ~35-40% width                 │
│                          │                                 │
└──────────────────────────┴─────────────────────────────────┘
```

#### Critical Layout Rules

1. **HTML Body**: `overflow: hidden` (no body scroll)
2. **Navigation**: Fixed at top, spans full width
3. **Main Content**: Below navigation, split into two columns
4. **Dashboard Section**: Left side, internal vertical scroll only
5. **Tips Section**: Right side, internal vertical scroll only

#### API Specification

```typescript
interface PageLayoutProps {
  navigation: React.ReactNode;
  dashboard: React.ReactNode;
  tips: React.ReactNode;
  dashboardWidth?: string;  // Default: "60%"
  tipsWidth?: string;       // Default: "40%"
}
```

#### Files to Create

```
components/PageLayout/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import styles from './_styles.module.scss';

interface PageLayoutProps {
  navigation: React.ReactNode;
  dashboard: React.ReactNode;
  tips: React.ReactNode;
  dashboardWidth?: string;
  tipsWidth?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  navigation,
  dashboard,
  tips,
  dashboardWidth = '60%',
  tipsWidth = '40%'
}) => {
  return (
    <div className={styles.pageLayout}>
      {/* Fixed Navigation */}
      <header className={styles.navigation}>
        {navigation}
      </header>
      
      {/* Main Content: Two Column Layout */}
      <main className={styles.mainContent}>
        {/* Left: Dashboard Section (Scrollable) */}
        <section 
          className={styles.dashboardSection}
          style={{ width: dashboardWidth }}
        >
          <div className={styles.scrollContainer}>
            {dashboard}
          </div>
        </section>
        
        {/* Right: Tips Section (Scrollable) */}
        <aside 
          className={styles.tipsSection}
          style={{ width: tipsWidth }}
        >
          <div className={styles.scrollContainer}>
            {tips}
          </div>
        </aside>
      </main>
    </div>
  );
};
```

#### SCSS Implementation

```scss
// _styles.module.scss

.pageLayout {
  width: 100%;
  height: 100vh;
  overflow: hidden;  // Critical: prevent body scroll
  display: flex;
  flex-direction: column;
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;  // Fixed navigation height
  z-index: 100;
  background: var(--color-background-primary, #FFFFFF);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mainContent {
  display: flex;
  margin-top: 64px;  // Space for fixed navigation
  height: calc(100vh - 64px);  // Full height minus nav
  overflow: hidden;  // Prevent overflow
}

.dashboardSection,
.tipsSection {
  height: 100%;
  overflow: hidden;  // Container doesn't scroll
}

.scrollContainer {
  height: 100%;
  overflow-y: auto;  // Only internal content scrolls
  overflow-x: hidden;
  padding: 24px;
  
  // Custom scrollbar styling
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F5F5F5;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 4px;
    
    &:hover {
      background: #9E9E9E;
    }
  }
}

.dashboardSection {
  background: #F9FAFB;  // Light background
  border-right: 1px solid #E0E0E0;
}

.tipsSection {
  background: #FFFFFF;
}

// Responsive design
@media (max-width: 1024px) {
  .mainContent {
    flex-direction: column;
  }
  
  .dashboardSection,
  .tipsSection {
    width: 100% !important;
    height: auto;
    min-height: 50vh;
  }
}
```

#### Acceptance Criteria

- [ ] Three-section layout renders correctly
- [ ] Navigation bar is fixed at top
- [ ] Dashboard and tips sections are side-by-side
- [ ] Each section has independent scroll
- [ ] Body scroll is disabled
- [ ] Custom scrollbar styles applied
- [ ] Width ratio configurable via props
- [ ] Responsive layout on smaller screens
- [ ] Clean visual separation between sections

---

### 3.2 NavigationBar Component

**Location**: `JingjingOnePage_V0/components/NavigationBar/`

#### Requirements

**Purpose**: Display store information, date, and weather in the top navigation bar.

**Visual Reference**: From screenshot - Left side has calendar icon + "Performance Snapshot", right side has date info and weather

**Layout**:
```
┌────────────────────────────────────────────────────────────┐
│ [Logo] Store Name              Date | Day | [Weather]     │
└────────────────────────────────────────────────────────────┘
```

#### API Specification

```typescript
interface NavigationBarProps {
  storeName: string;
  date: string;           // ISO format
  dayOfWeek: string;
  weather: WeatherData;
  logo?: React.ReactNode;
}
```

#### Files to Create

```
components/NavigationBar/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import { WeatherWidget } from '@/components/ui/WeatherWidget';
import type { WeatherData } from '../../data/types';
import styles from './_styles.module.scss';

interface NavigationBarProps {
  storeName: string;
  date: string;
  dayOfWeek: string;
  weather: WeatherData;
  logo?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  storeName,
  date,
  dayOfWeek,
  weather,
  logo
}) => {
  // Format date for display
  const formatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <nav className={styles.navigationBar}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <h1 className={styles.storeName}>{storeName}</h1>
      </div>
      
      {/* Right Section */}
      <div className={styles.rightSection}>
        <span className={styles.date}>{formatDate(date)}</span>
        <span className={styles.separator}>|</span>
        <span className={styles.dayOfWeek}>{dayOfWeek}</span>
        <span className={styles.separator}>|</span>
        <WeatherWidget 
          condition={weather.condition}
          temperature={weather.temperature}
          icon={weather.icon}
          size="small"
        />
      </div>
    </nav>
  );
};
```

#### SCSS Implementation

```scss
.navigationBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 32px;
  background: var(--color-background-primary, #FFFFFF);
}

.leftSection {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  height: 40px;
  width: auto;
  
  img {
    height: 100%;
    width: auto;
  }
}

.storeName {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary, #212121);
  margin: 0;
}

.rightSection {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--color-text-secondary, #616161);
}

.date,
.dayOfWeek {
  font-weight: 500;
}

.dayOfWeek {
  color: var(--color-text-primary, #212121);
}

.separator {
  color: var(--color-border-light, #E0E0E0);
  user-select: none;
}

// Responsive
@media (max-width: 768px) {
  .navigationBar {
    padding: 0 16px;
  }
  
  .storeName {
    font-size: 16px;
  }
  
  .rightSection {
    font-size: 12px;
    gap: 8px;
  }
}
```

#### Acceptance Criteria

- [ ] Navigation bar spans full width
- [ ] Left section shows logo and store name
- [ ] Right section shows date, day, and weather
- [ ] Weather widget integrates correctly
- [ ] Proper spacing and alignment
- [ ] Responsive on smaller screens
- [ ] Clean typography hierarchy

---

### 3.3 DashboardSection Component

**Location**: `JingjingOnePage_V0/components/DashboardSection/`

#### Requirements

**Purpose**: Container component for all dashboard widgets and panels. Manages layout and spacing.

**Visual Reference**: From screenshot - Contains Performance Snapshot, metrics row, Peak Hours/Category Mix, and Today's Target

#### API Specification

```typescript
interface DashboardSectionProps {
  data: DashboardData;
}
```

#### Files to Create

```
components/DashboardSection/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import type { DashboardData } from '../../data/types';
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
        {/* Will be implemented in Phase 4 */}
        <div className={styles.placeholder}>Performance Snapshot Component</div>
      </section>
      
      {/* Three Metrics Row */}
      <section className={styles.metricsRow}>
        {/* Will be implemented in Phase 4 */}
        <div className={styles.placeholder}>Metrics Row Components</div>
      </section>
      
      {/* Peak Hours & Category Mix */}
      <section className={styles.infoRow}>
        <div className={styles.infoPanel}>
          {/* Peak Hours - Will be implemented in Phase 4 */}
          <div className={styles.placeholder}>Peak Hours Panel</div>
        </div>
        <div className={styles.infoPanel}>
          {/* Category Mix - Will be implemented in Phase 4 */}
          <div className={styles.placeholder}>Category Mix Panel</div>
        </div>
      </section>
      
      {/* Today's Target Detail */}
      <section className={styles.targetDetail}>
        {/* Will be implemented in Phase 4 */}
        <div className={styles.placeholder}>Today's Target Detail</div>
      </section>
    </div>
  );
};
```

#### SCSS Implementation

```scss
.dashboardSection {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;  // Limit width for readability
  margin: 0 auto;
}

.sectionTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary, #212121);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.performanceSnapshot {
  // Will be styled when component is added
}

.metricsRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.infoRow {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.infoPanel {
  // Panels will be styled by their own components
}

.targetDetail {
  // Will be styled when component is added
}

// Placeholder styles for Phase 3
.placeholder {
  padding: 40px;
  background: #F5F5F5;
  border: 2px dashed #BDBDBD;
  border-radius: 8px;
  text-align: center;
  color: #757575;
  font-style: italic;
}
```

#### Acceptance Criteria

- [ ] Container renders with proper spacing
- [ ] Grid layout for metrics row
- [ ] Grid layout for info panels row
- [ ] Sections are properly ordered
- [ ] Responsive grid on smaller screens
- [ ] Placeholder content shows structure
- [ ] Ready for Phase 4 components to be inserted

---

### 3.4 TipsSection Component

**Location**: `JingjingOnePage_V0/components/TipsSection/`

#### Requirements

**Purpose**: Container for tip cards. Renders list of tips with proper spacing.

**Visual Reference**: From screenshot - Right side shows multiple tip cards stacked vertically

#### API Specification

```typescript
interface TipsSectionProps {
  cards: TipCard[];
}
```

#### Files to Create

```
components/TipsSection/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import type { TipCard } from '../../data/types';
import styles from './_styles.module.scss';

interface TipsSectionProps {
  cards: TipCard[];
}

export const TipsSection: React.FC<TipsSectionProps> = ({ cards }) => {
  return (
    <div className={styles.tipsSection}>
      <h2 className={styles.sectionTitle}>💡 Tips & Actions</h2>
      
      <div className={styles.cardList}>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardWrapper}>
            {/* TipCard component will be implemented in Phase 5 */}
            <div className={styles.placeholder}>
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### SCSS Implementation

```scss
.tipsSection {
  max-width: 600px;  // Limit width for readability
}

.sectionTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary, #212121);
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  padding: 16px 0;
  z-index: 10;
  border-bottom: 1px solid #E0E0E0;
}

.cardList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;  // Space at bottom
}

.cardWrapper {
  // Individual card styling will come from TipCard component
}

// Placeholder styles for Phase 3
.placeholder {
  padding: 24px;
  background: #F5F5F5;
  border: 2px dashed #BDBDBD;
  border-radius: 8px;
  text-align: center;
  color: #757575;
  font-weight: 500;
}
```

#### Acceptance Criteria

- [ ] Renders all tip cards in order
- [ ] Proper spacing between cards
- [ ] Section title is sticky on scroll
- [ ] Card list scrolls smoothly
- [ ] Placeholder cards show card labels
- [ ] Ready for Phase 5 TipCard components

---

### 3.5 Component Index

**File**: `components/index.ts`

```typescript
export { PageLayout } from './PageLayout';
export { NavigationBar } from './NavigationBar';
export { DashboardSection } from './DashboardSection';
export { TipsSection } from './TipsSection';

export type { PageLayoutProps } from './PageLayout';
export type { NavigationBarProps } from './NavigationBar';
export type { DashboardSectionProps } from './DashboardSection';
export type { TipsSectionProps } from './TipsSection';
```

---

## Testing Strategy

### Integration Test Page

Create a temporary test page to verify layout:

**File**: `JingjingOnePage_V0/test-layout.tsx` (temporary)

```typescript
import React from 'react';
import { PageLayout, NavigationBar, DashboardSection, TipsSection } from './components';
import { mockNavigationData, mockDashboardData, mockTipsData } from './data';

export const TestLayout = () => {
  return (
    <PageLayout
      navigation={
        <NavigationBar 
          storeName={mockNavigationData.storeName}
          date={mockNavigationData.date}
          dayOfWeek={mockNavigationData.dayOfWeek}
          weather={mockNavigationData.weather}
        />
      }
      dashboard={
        <DashboardSection data={mockDashboardData} />
      }
      tips={
        <TipsSection cards={mockTipsData} />
      }
    />
  );
};
```

### Manual Testing Checklist

- [ ] Navigation bar stays fixed on scroll
- [ ] Dashboard section scrolls independently
- [ ] Tips section scrolls independently
- [ ] Body doesn't scroll
- [ ] Layout doesn't break with long content
- [ ] Responsive layout works on tablet size
- [ ] Scrollbars styled correctly
- [ ] No horizontal scroll
- [ ] Clean visual separation between sections

---

## Development Guidelines

### Layout Best Practices

1. **Use Flexbox/Grid**:
   - Flexbox for one-dimensional layouts
   - Grid for two-dimensional layouts
   - Avoid absolute positioning unless necessary

2. **Responsive Design**:
   - Mobile-first approach
   - Use media queries for breakpoints
   - Test at: 375px, 768px, 1024px, 1440px

3. **Scroll Behavior**:
   - Only scrollable content should overflow
   - Use `overflow-y: auto` (not scroll)
   - Hide horizontal overflow

4. **Spacing**:
   - Consistent gap values (8px, 16px, 24px, 32px)
   - Use CSS variables for spacing
   - Maintain visual hierarchy

### Performance Considerations

1. **Avoid Layout Thrashing**:
   - Minimize style recalculations
   - Use `will-change` for animated elements
   - Avoid inline styles where possible

2. **Scroll Performance**:
   - Use `contain` CSS property for scroll containers
   - Consider virtual scrolling for very long lists
   - Optimize scroll event handlers

---

## Success Criteria

Phase 3 is complete when:

- [ ] PageLayout component built and working
- [ ] NavigationBar component built and styled
- [ ] DashboardSection container built
- [ ] TipsSection container built
- [ ] All components exported from index
- [ ] Three-section layout works correctly
- [ ] Independent scroll in each section
- [ ] Body scroll disabled
- [ ] Navigation bar fixed at top
- [ ] Responsive layout implemented
- [ ] Test page demonstrates working layout
- [ ] No TypeScript errors
- [ ] Clean, professional appearance

---

## Next Phase

After completing Phase 3, proceed to **Phase 4: Dashboard Sub-components** to build all the dashboard widgets and panels that will populate the dashboard section.

