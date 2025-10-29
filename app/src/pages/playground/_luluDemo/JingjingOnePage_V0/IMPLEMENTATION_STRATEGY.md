# JingJing One Page V0 - Implementation Strategy

## Document Purpose

This document defines the implementation approach for the JingJing One Page dashboard, clarifying:
1. Which components should be built as **reusable UI components** (in `src/components/ui/`)
2. Which components should be **playground-specific** (in `src/pages/playground/_luluDemo/JingjingOnePage_V0/`)
3. Which data is **mock/demo data** (no need for componentization)

This strategy ensures efficient development while maintaining code quality and reusability.

---

## Implementation Classification

### 🔷 Category Definitions

| Category | Location | Purpose | Examples |
|----------|----------|---------|----------|
| **Universal Components** | `src/components/ui/` | Reusable across multiple projects | Button, Calendar, RichText |
| **Playground Components** | `src/pages/playground/.../components/` | Specific to this demo only | DashboardLayout, TipCard |
| **Mock Data** | `src/pages/playground/.../data/` | Demo data only, not componentized | Sales metrics, store info |

---

## 1. Universal Components (Build in `src/components/ui/`)

These components have high reusability potential and should be built as general-purpose UI components.

### 1.1 RichText Component ⭐ **HIGH PRIORITY**

**Path**: `src/components/ui/RichText/`

**Purpose**: Render formatted text with inline styles (bold, italic, highlight, colors)

**Why Universal**: 
- Rich text rendering is needed in many contexts (tips, descriptions, notifications)
- Common pattern across multiple features
- Zero business logic, pure presentation

**API Design**:
```typescript
interface RichTextProps {
  content: RichTextContent[];
  className?: string;
}

interface RichTextContent {
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string;
  };
}

// Usage
<RichText content={[
  { text: "Sales ", styles: { bold: true } },
  { text: "increased", styles: { color: "green" } }
]} />
```

**Files**:
- `_component.tsx` - Main component
- `_styles.module.scss` - Styles
- `index.ts` - Exports
- `README.md` - Documentation with examples

---

### 1.2 WeatherWidget Component

**Path**: `src/components/ui/WeatherWidget/`

**Purpose**: Display weather information with icon, temperature, and condition

**Why Universal**: 
- Weather display is a common UI pattern
- Could be used in other dashboards or applications
- Self-contained, no business logic

**API Design**:
```typescript
interface WeatherWidgetProps {
  condition: string; // "Sunny", "Cloudy", "Rainy"
  temperature?: number;
  icon?: string;
  showTemperature?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Usage
<WeatherWidget 
  condition="Sunny" 
  temperature={18} 
  icon="sun" 
  size="medium"
/>
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `icons/` - Weather icon SVGs or icon mapping
- `index.ts`
- `README.md`

---

### 1.3 InfoPanel Component

**Path**: `src/components/ui/InfoPanel/`

**Purpose**: Display information in a panel with icon, title, and key-value pairs

**Why Universal**: 
- Generic panel layout useful for many contexts
- Peak Hours and Category Mix use similar patterns
- Can be configured for different data displays

**API Design**:
```typescript
interface InfoPanelProps {
  icon?: React.ReactNode;
  title: string;
  items: InfoItem[];
  variant?: 'default' | 'compact' | 'highlighted';
  className?: string;
}

interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  color?: string;
}

// Usage
<InfoPanel 
  icon={<ClockIcon />}
  title="Peak Hours"
  items={[
    { label: "Best CR", value: "2-4PM (78%)", highlight: true },
    { label: "Low CR", value: "10-12PM (52%)" }
  ]}
/>
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`
- `README.md`

---

### 1.4 Card Component (Enhanced)

**Path**: `src/components/ui/Card/` (if doesn't exist, create; if exists, enhance)

**Purpose**: Generic card container with header, body, and optional footer

**Why Universal**: 
- Cards are fundamental UI pattern
- Tips section heavily uses cards
- Useful across all applications

**API Design**:
```typescript
interface CardProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'danger' | 'warning' | 'success';
  borderColor?: string;
  className?: string;
}

// Usage
<Card 
  header={<h3>Sales Tips</h3>}
  body={<p>Your UPT has decreased...</p>}
  variant="outlined"
  borderColor="blue"
/>
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`
- `README.md`

---

### 1.5 StatusBadge Component (Enhanced)

**Path**: `src/components/ui/StatusBadge/` or enhance existing `Label` component

**Purpose**: Display status indicators with colors and icons

**Why Universal**: 
- Status indicators are common across all dashboards
- Used for metric statuses (Above, On Track, Below)
- Generic pattern

**API Design**:
```typescript
interface StatusBadgeProps {
  label: string;
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Usage
<StatusBadge label="↑ Above" status="success" />
<StatusBadge label="On Track" status="info" />
<StatusBadge label="↓ Below" status="danger" />
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`
- `README.md`

---

## 2. Playground-Specific Components (Build in `JingjingOnePage_V0/components/`)

These components contain business logic specific to this dashboard and should stay in the playground.

### 2.1 PageLayout Component

**Path**: `JingjingOnePage_V0/components/PageLayout/`

**Purpose**: Three-section layout (nav, dashboard, tips) with scroll management

**Why Playground**: 
- Highly specific to this page's layout requirements
- Contains business-specific structure
- Not reusable outside this context

**Structure**:
```typescript
interface PageLayoutProps {
  navigation: React.ReactNode;
  dashboard: React.ReactNode;
  tips: React.ReactNode;
}

// Usage
<PageLayout 
  navigation={<NavigationBar {...navData} />}
  dashboard={<DashboardSection {...dashboardData} />}
  tips={<TipsSection cards={tipsData} />}
/>
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.2 NavigationBar Component

**Path**: `JingjingOnePage_V0/components/NavigationBar/`

**Purpose**: Display logo, store name, date, and weather

**Why Playground**: 
- Specific to store management dashboard
- Contains business-specific elements (store name display)
- Layout is custom for this page

**Dependencies**: 
- Uses `WeatherWidget` (universal component)

**Structure**:
```typescript
interface NavigationBarProps {
  storeName: string;
  date: string;
  dayOfWeek: string;
  weather: WeatherData;
}
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.3 DashboardSection Component

**Path**: `JingjingOnePage_V0/components/DashboardSection/`

**Purpose**: Container for all dashboard widgets and panels

**Why Playground**: 
- Specific arrangement of business metrics
- Contains domain-specific logic
- Custom layout for store management

**Sub-components** (all in playground):
- `PerformanceSnapshot/` - Yesterday vs Today metrics
- `MetricsRow/` - UPT, Conv Rate, AUR display
- `PeakHoursPanel/` - Peak hours information
- `CategoryMixPanel/` - Category breakdown
- `TodayTargetDetail/` - Target breakdown

**Dependencies**:
- Uses existing `MetricWidget` from `src/components/ui/forDashboard/`
- Uses `InfoPanel` (universal component)

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.4 TipsSection Component

**Path**: `JingjingOnePage_V0/components/TipsSection/`

**Purpose**: Render scrollable list of tip cards

**Why Playground**: 
- Specific to tips functionality
- Business logic for tip categorization
- Custom layout

**Sub-components**:
- `TipCard/` - Individual tip card wrapper
- `BlockRenderer/` - Renders different block types

**Dependencies**:
- Uses `Card` (universal component)
- Uses `RichText` (universal component)

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.5 TipCard Component

**Path**: `JingjingOnePage_V0/components/TipsSection/TipCard/`

**Purpose**: Render individual tip card with category styling

**Why Playground**: 
- Specific to tips business logic
- Custom styling per category
- Not reusable outside this context

**Structure**:
```typescript
interface TipCardProps {
  category: TipCategory;
  label: string;
  body: ContentBlock[];
}

type TipCategory = 
  | 'sales' 
  | 'labour' 
  | 'vm' 
  | 'season-weather' 
  | 'out-of-stock' 
  | 'overstock' 
  | 'inventory-actions';
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.6 BlockRenderer Component

**Path**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/`

**Purpose**: Render different block types (paragraph, product card, list, table)

**Why Playground**: 
- Specific to this page's content structure
- Business-specific block types
- May evolve with business requirements

**Sub-components**:
- `ParagraphBlock/` - Wraps RichText
- `ProductCardBlock/` - Product display
- `ListBlock/` - List rendering
- `TableBlock/` - Table rendering (if needed)

**Dependencies**:
- Uses `RichText` (universal component)

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.7 ProductCardBlock Component

**Path**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/ProductCardBlock/`

**Purpose**: Display product information in card format

**Why Playground**: 
- Specific to store management context
- Custom layout for products in tips
- May not match product cards elsewhere

**Structure**:
```typescript
interface ProductCardBlockProps {
  image?: string;
  title: string;
  summary: string;
  urgency?: 'low' | 'medium' | 'high';
}
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

### 2.8 InventoryListBlock Component

**Path**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/InventoryListBlock/`

**Purpose**: Display inventory items in list format (out-of-stock, overstock)

**Why Playground**: 
- Highly specific to inventory management
- Custom formatting for product + action
- Business-specific logic

**Structure**:
```typescript
interface InventoryListBlockProps {
  items: InventoryItem[];
  variant: 'out-of-stock' | 'overstock' | 'actions';
}

interface InventoryItem {
  product: string;
  detail?: string;
  action?: string;
  quantity?: string;
}
```

**Files**:
- `_component.tsx`
- `_styles.module.scss`
- `index.ts`

---

## 3. Mock Data (No Componentization Needed)

These are example data files that simulate backend responses. They should be simple TypeScript/JSON files.

### 3.1 Navigation Mock Data

**Path**: `JingjingOnePage_V0/data/navigationData.ts`

**Purpose**: Mock data for navigation bar

**Content**:
```typescript
export const mockNavigationData: NavigationData = {
  storeName: "Vancouver - Robson Street",
  date: "2025-10-29",
  dayOfWeek: "Wednesday",
  weather: {
    condition: "Sunny",
    temperature: 18,
    icon: "sun"
  }
};
```

---

### 3.2 Dashboard Mock Data

**Path**: `JingjingOnePage_V0/data/dashboardData.ts`

**Purpose**: Mock data for all dashboard metrics

**Content**:
```typescript
export const mockDashboardData: DashboardData = {
  performanceSnapshot: {
    yesterday: { value: "$24,580", subtitle: "103% of target" },
    todayTarget: { value: "$25,200", subtitle: "+2.5% vs yesterday" }
  },
  metrics: {
    upt: { label: "UPT", value: "2.3", status: "above", statusLabel: "↑ Above" },
    conversionRate: { label: "Conv. Rate", value: "68%", status: "on-track", statusLabel: "On Track" },
    aur: { label: "AUR", value: "$105", status: "below", statusLabel: "↓ Below" }
  },
  peakHours: {
    bestCR: { time: "2-4PM", rate: "78%" },
    lowCR: { time: "10-12PM", rate: "52%" },
    rush: "5-7PM"
  },
  categoryMix: {
    mens: { percentage: "58%", trend: "↑5%" },
    womens: { percentage: "42%" },
    traffic: { count: 342, change: 12 }
  },
  todayTargetDetail: {
    total: "$25,200",
    morning: "$11,340",
    evening: "$13,860"
  }
};
```

---

### 3.3 Tips Mock Data

**Path**: `JingjingOnePage_V0/data/tipsData.ts`

**Purpose**: Mock data for all tip cards

**Content**:
```typescript
export const mockTipsData: TipCard[] = [
  {
    id: "sales-001",
    category: "sales",
    label: "Sales Tips",
    body: [ /* paragraph blocks */ ]
  },
  {
    id: "labour-001",
    category: "labour",
    label: "Labour Tips",
    body: [ /* paragraph blocks */ ]
  },
  // ... more tip cards
];
```

---

### 3.4 Type Definitions

**Path**: `JingjingOnePage_V0/data/types.ts`

**Purpose**: TypeScript interfaces for all data structures

**Content**: All interfaces from README.md section 5.4

---

## 4. Reuse Existing Components

These components already exist in the codebase and should be reused as-is.

### 4.1 From `src/components/ui/forDashboard/`

**Components to Reuse**:
- `MetricWidget` - For Performance Snapshot and three-column metrics
- Any other dashboard widgets that fit the design

**Usage Location**: 
- `DashboardSection` component
- `PerformanceSnapshot` sub-component
- `MetricsRow` sub-component

---

### 4.2 From `src/components/ui/Icon/`

**Components to Reuse**:
- `Icon` component for all icons (clock, shopping bag, target, etc.)

**Usage Location**: Throughout all components

---

### 4.3 From `src/components/ui/AppLayout/`

**Components to Evaluate**:
- Check if `LuluLayout` or other layout utilities can be used
- May need custom layout due to specific three-section design

---

## 5. Implementation Priority & Order

### Phase 1: Universal Components (Can be developed in parallel)
1. ✅ `RichText` component - **Start here, highest reusability**
2. ✅ `WeatherWidget` component
3. ✅ `InfoPanel` component
4. ✅ `Card` component (enhance if exists)
5. ✅ `StatusBadge` component (enhance if exists)

### Phase 2: Mock Data & Types
1. ✅ Create `data/types.ts` with all interfaces
2. ✅ Create `data/navigationData.ts`
3. ✅ Create `data/dashboardData.ts`
4. ✅ Create `data/tipsData.ts`

### Phase 3: Playground Layout Components
1. ✅ `PageLayout` - Main three-section layout
2. ✅ `NavigationBar` - Top navigation
3. ✅ `DashboardSection` - Left section container

### Phase 4: Dashboard Sub-components
1. ✅ `PerformanceSnapshot` - Yesterday vs Today
2. ✅ `MetricsRow` - Three metric widgets
3. ✅ `PeakHoursPanel` - Peak hours display
4. ✅ `CategoryMixPanel` - Category breakdown
5. ✅ `TodayTargetDetail` - Target detail card

### Phase 5: Tips Section Components
1. ✅ `TipsSection` - Tips container
2. ✅ `TipCard` - Individual card wrapper
3. ✅ `BlockRenderer` - Block type dispatcher
4. ✅ `ParagraphBlock` - Paragraph rendering
5. ✅ `ProductCardBlock` - Product card rendering
6. ✅ `InventoryListBlock` - Inventory list rendering

### Phase 6: Main Page Integration
1. ✅ `index.tsx` - Main page component
2. ✅ `styles.module.scss` - Page-level styles
3. ✅ Connect all components with mock data

### Phase 7: Polish & Testing
1. ✅ Scroll behavior refinement
2. ✅ Responsive design adjustments
3. ✅ Visual polish and alignment
4. ✅ Accessibility improvements

---

## 6. Component Dependency Graph

```
Main Page (index.tsx)
├── PageLayout
│   ├── NavigationBar
│   │   └── WeatherWidget [UNIVERSAL]
│   ├── DashboardSection
│   │   ├── PerformanceSnapshot
│   │   │   └── MetricWidget [EXISTING]
│   │   ├── MetricsRow
│   │   │   └── MetricWidget [EXISTING]
│   │   ├── PeakHoursPanel
│   │   │   └── InfoPanel [UNIVERSAL]
│   │   ├── CategoryMixPanel
│   │   │   └── InfoPanel [UNIVERSAL]
│   │   └── TodayTargetDetail
│   │       └── Card [UNIVERSAL]
│   └── TipsSection
│       └── TipCard (multiple)
│           ├── Card [UNIVERSAL]
│           └── BlockRenderer
│               ├── ParagraphBlock
│               │   └── RichText [UNIVERSAL]
│               ├── ProductCardBlock
│               └── InventoryListBlock
```

---

## 7. File Structure Summary

```
src/
├── components/
│   └── ui/                          # ✅ UNIVERSAL COMPONENTS
│       ├── RichText/                # NEW - Rich text renderer
│       ├── WeatherWidget/           # NEW - Weather display
│       ├── InfoPanel/               # NEW - Info panel
│       ├── Card/                    # ENHANCE - Generic card
│       ├── StatusBadge/             # ENHANCE - Status indicator
│       └── forDashboard/            # EXISTING - Reuse MetricWidget
│
└── pages/
    └── playground/
        └── _luluDemo/
            └── JingjingOnePage_V0/   # 🎯 PLAYGROUND COMPONENTS
                ├── index.tsx          # Main page
                ├── styles.module.scss # Page styles
                ├── README.md          # Requirements doc
                ├── IMPLEMENTATION_STRATEGY.md  # This file
                │
                ├── components/        # Playground-specific components
                │   ├── PageLayout/
                │   ├── NavigationBar/
                │   ├── DashboardSection/
                │   │   ├── PerformanceSnapshot/
                │   │   ├── MetricsRow/
                │   │   ├── PeakHoursPanel/
                │   │   ├── CategoryMixPanel/
                │   │   └── TodayTargetDetail/
                │   ├── TipsSection/
                │   │   ├── TipCard/
                │   │   └── BlockRenderer/
                │   │       ├── ParagraphBlock/
                │   │       ├── ProductCardBlock/
                │   │       └── InventoryListBlock/
                │   └── index.ts
                │
                └── data/              # 📊 MOCK DATA (no components)
                    ├── types.ts       # All TypeScript interfaces
                    ├── navigationData.ts
                    ├── dashboardData.ts
                    ├── tipsData.ts
                    └── index.ts
```

---

## 8. Decision Rationale

### Why Some Components are Universal

| Component | Rationale |
|-----------|-----------|
| **RichText** | Pure presentation, zero business logic, needed everywhere |
| **WeatherWidget** | Generic UI pattern, could be used in other dashboards |
| **InfoPanel** | Flexible panel layout applicable to many contexts |
| **Card** | Fundamental UI building block |
| **StatusBadge** | Common pattern across all applications |

### Why Some Components Stay in Playground

| Component | Rationale |
|-----------|-----------|
| **PageLayout** | Highly specific three-section layout |
| **NavigationBar** | Business-specific content and structure |
| **DashboardSection** | Domain-specific metric arrangement |
| **All Dashboard Panels** | Store management business logic |
| **TipsSection** | Specific to tips functionality |
| **BlockRenderer** | May evolve with business needs |

### Why Some Data is Just Mock Data

| Data | Rationale |
|------|-----------|
| **All metrics** | Backend will provide real data |
| **Store info** | Configuration data, not component logic |
| **Tips content** | Content management, not component logic |
| **Product lists** | Database/API data, not frontend logic |

---

## 9. Development Guidelines

### For Universal Components

1. ✅ **No business logic** - Only presentation logic
2. ✅ **Fully documented** - Include README.md with examples
3. ✅ **Type-safe** - Complete TypeScript interfaces
4. ✅ **Flexible API** - Support common use cases through props
5. ✅ **Well-styled** - Use design tokens from color system
6. ✅ **Accessible** - ARIA labels, keyboard navigation

### For Playground Components

1. ✅ **Business logic allowed** - Can contain domain-specific logic
2. ✅ **Composed from universal components** - Reuse when possible
3. ✅ **Clear structure** - One component per folder
4. ✅ **Type-safe** - Use types from `data/types.ts`
5. ✅ **Document complex logic** - Add comments for business rules

### For Mock Data

1. ✅ **Realistic data** - Should look like production data
2. ✅ **Well-typed** - Use TypeScript interfaces
3. ✅ **Comprehensive** - Cover all use cases
4. ✅ **Easy to modify** - Simple structure for quick iterations
5. ✅ **Separate files** - One file per data domain

---

## 10. Testing Strategy

### Universal Components
- Write component tests (if testing framework available)
- Test accessibility
- Test different prop combinations
- Document in README

### Playground Components
- Manual testing in playground
- Visual verification
- Test with different mock data variations
- Test scroll behavior

### Mock Data
- Validate data structure matches types
- Ensure data covers edge cases
- Test with missing optional fields

---

## 11. Future Considerations

### Potential Universal Component Promotions

If these patterns emerge in other projects, consider promoting to universal:

1. **BlockRenderer** - If other features need content block systems
2. **ProductCard** - If product displays become standardized
3. **TipCard** - If notification/tips pattern is reused

### Potential Refactoring

As the application grows:

1. Consider extracting business logic into hooks
2. May need state management for real-time updates
3. Could create a plugin system for tip card types

---

## 12. AI Implementation Checklist

When implementing this page, AI should:

### Phase 1: Universal Components
- [ ] Read color-guide and component-structure rules
- [ ] Create RichText component in `src/components/ui/RichText/`
- [ ] Create WeatherWidget component in `src/components/ui/WeatherWidget/`
- [ ] Create InfoPanel component in `src/components/ui/InfoPanel/`
- [ ] Create/enhance Card component in `src/components/ui/Card/`
- [ ] Create/enhance StatusBadge component

### Phase 2: Setup Playground Structure
- [ ] Create data types in `JingjingOnePage_V0/data/types.ts`
- [ ] Create mock data files (navigation, dashboard, tips)
- [ ] Export all data from `data/index.ts`

### Phase 3: Build Playground Components
- [ ] Create PageLayout component
- [ ] Create NavigationBar component
- [ ] Create DashboardSection with all sub-components
- [ ] Create TipsSection with all sub-components

### Phase 4: Integration
- [ ] Create main page `index.tsx`
- [ ] Create main page styles
- [ ] Connect all components with mock data
- [ ] Implement scroll behavior

### Phase 5: Polish
- [ ] Verify all styles match design
- [ ] Test responsiveness
- [ ] Check accessibility
- [ ] Update routing/navigation

---

## Summary

**Build 5 Universal Components** → **Create Mock Data** → **Build 15+ Playground Components** → **Integrate in Main Page**

This strategy ensures:
- ✅ Reusable components are properly abstracted
- ✅ Business-specific code stays in playground
- ✅ Clear separation of concerns
- ✅ Easy maintenance and testing
- ✅ Scalable architecture

The AI can now use this document along with README.md to create a complete PRD and implementation plan.

