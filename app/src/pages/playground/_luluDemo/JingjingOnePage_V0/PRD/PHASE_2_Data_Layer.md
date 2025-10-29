# Phase 2: Data Layer Extraction PRD

## Overview

**Phase**: 2 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 1 day  
**Dependencies**: Phase 1 complete  
**Output**: Clean data layer, zero UI changes

---

## 🎯 Objective

Extract all TypeScript types and mock data from Phase 1 into a clean, organized data layer.

**Critical Rule**: **ZERO visual or functional changes**. If the page looks or behaves different after Phase 2, something is wrong.

---

## 📋 What to Extract

### From Phase 1 `index.tsx`

All inline data and types should move to dedicated files:

```typescript
// Phase 1: Everything inline
const JingjingOnePage = () => {
  const mockNavigationData = { ... }  // ← Extract this
  const mockDashboardData = { ... }   // ← Extract this
  const mockTipsData = [ ... ]        // ← Extract this
  
  interface NavigationData { ... }     // ← Extract this
  interface DashboardData { ... }      // ← Extract this
  interface TipCard { ... }            // ← Extract this
  
  return <div>...</div>
}

// Phase 2: Clean imports
import { mockStorePageData } from './data'
import type { StorePageData } from './data/types'

const JingjingOnePage = () => {
  const { navigation, dashboard, tips } = mockStorePageData
  
  return <div>...</div>  // Exact same JSX
}
```

---

## 📁 File Structure to Create

```
JingjingOnePage_V0/
├── index.tsx                    # Main component (Phase 1 code, now cleaner)
├── styles.module.scss           # Styles (unchanged)
├── README.md                    # Usage doc
│
└── data/                        # NEW - Phase 2 creates this
    ├── types.ts                 # All TypeScript interfaces
    ├── navigationData.ts        # Navigation mock data
    ├── dashboardData.ts         # Dashboard mock data
    ├── tipsData.ts              # Tips mock data
    └── index.ts                 # Exports everything
```

---

## 📄 File 1: `data/types.ts`

### All TypeScript Interfaces

Extract ALL type definitions from Phase 1. Organize logically.

### Type Organization

```typescript
// ============================================
// PAGE LEVEL TYPES
// ============================================
export interface StorePageData {
  navigation: NavigationData;
  dashboard: DashboardData;
  tips: TipCard[];
}

// ============================================
// NAVIGATION TYPES
// ============================================
export interface NavigationData {
  storeName: string;
  date: string;           // ISO format: "2025-10-29"
  dayOfWeek: string;      // "Monday", "Tuesday", etc.
  weather: WeatherData;
}

export interface WeatherData {
  condition: string;      // "Sunny", "Cloudy", "Rainy", etc.
  temperature?: number;   // In celsius
  icon?: string;          // Icon identifier
}

// ============================================
// DASHBOARD TYPES
// ============================================
export interface DashboardData {
  performanceSnapshot: PerformanceSnapshot;
  metrics: MetricsRow;
  peakHours: PeakHoursData;
  categoryMix: CategoryMixData;
  todayTargetDetail: TodayTargetDetail;
}

export interface PerformanceSnapshot {
  yesterday: MetricValue;
  todayTarget: MetricValue;
}

export interface MetricValue {
  value: string;          // Formatted: "$24,580"
  subtitle: string;       // "103% of target", "+2.5% vs yesterday"
}

export interface MetricsRow {
  upt: MetricWidget;
  conversionRate: MetricWidget;
  aur: MetricWidget;
}

export interface MetricWidget {
  label: string;
  value: string;
  status: 'above' | 'on-track' | 'below';
  statusLabel: string;    // "↑ Above", "On Track", "↓ Below"
}

export interface PeakHoursData {
  bestCR: TimeSlot;
  lowCR: TimeSlot;
  rush: string;
}

export interface TimeSlot {
  time: string;           // "2-4PM"
  rate: string;           // "78%"
}

export interface CategoryMixData {
  mens: CategoryData;
  womens: CategoryData;
  traffic: TrafficData;
}

export interface CategoryData {
  percentage: string;     // "58%"
  trend?: string;         // "↑5%", "↓3%"
}

export interface TrafficData {
  count: number;          // 342
  change: number;         // +12 or -5
}

export interface TodayTargetDetail {
  total: string;          // "$25,200"
  morning: string;        // "$11,340"
  evening: string;        // "$13,860"
}

// ============================================
// TIPS SECTION TYPES
// ============================================
export interface TipCard {
  id: string;
  category: TipCategory;
  label: string;
  body: ContentBlock[];
}

export type TipCategory = 
  | 'sales'
  | 'labour'
  | 'vm'
  | 'season-weather'
  | 'out-of-stock'
  | 'overstock'
  | 'inventory-actions';

// ============================================
// CONTENT BLOCK TYPES
// ============================================
export type ContentBlock = 
  | ParagraphBlock 
  | ProductCardBlock 
  | ListBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  content: RichTextContent[];
}

export interface RichTextContent {
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string;       // Predefined color or hex
  };
}

export interface ProductCardBlock {
  type: 'productCard';
  image?: string;         // Image URL
  title: string;          // "Slim Fit Chino - Navy (32x32)"
  summary: string;        // "High demand - reorder immediately"
  urgency?: 'low' | 'medium' | 'high';
}

export interface ListBlock {
  type: 'list';
  variant: 'out-of-stock' | 'overstock' | 'actions';
  items: ListItem[];
}

export interface ListItem {
  product: string;        // Product name or action type
  detail?: string;        // Additional info
  action?: string;        // Action label: "Reorder!", "2 days lead"
  quantity?: string;      // "18 pcs", "25 pcs"
}
```

**Notes**:
- Keep all Phase 1 types
- Organize into logical sections
- Add clear comments
- Export everything

---

## 📄 File 2: `data/navigationData.ts`

### Navigation Mock Data

```typescript
import type { NavigationData } from './types';

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

// Optional: Additional scenarios for testing
export const mockNavigationDataCloudy: NavigationData = {
  storeName: "Toronto - Eaton Centre",
  date: "2025-10-30",
  dayOfWeek: "Thursday",
  weather: {
    condition: "Cloudy",
    temperature: 12,
    icon: "cloud"
  }
};

export const mockNavigationDataRainy: NavigationData = {
  storeName: "Montreal - Downtown",
  date: "2025-10-31",
  dayOfWeek: "Friday",
  weather: {
    condition: "Rainy",
    temperature: 8,
    icon: "rain"
  }
};
```

---

## 📄 File 3: `data/dashboardData.ts`

### Dashboard Mock Data

Extract all dashboard-related data from Phase 1:

```typescript
import type { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$24,580",
      subtitle: "103% of target"
    },
    todayTarget: {
      value: "$25,200",
      subtitle: "+2.5% vs yesterday"
    }
  },
  
  metrics: {
    upt: {
      label: "UPT",
      value: "2.3",
      status: "above",
      statusLabel: "↑ Above"
    },
    conversionRate: {
      label: "Conv. Rate",
      value: "68%",
      status: "on-track",
      statusLabel: "On Track"
    },
    aur: {
      label: "AUR",
      value: "$105",
      status: "below",
      statusLabel: "↓ Below"
    }
  },
  
  peakHours: {
    bestCR: {
      time: "2-4PM",
      rate: "78%"
    },
    lowCR: {
      time: "10-12PM",
      rate: "52%"
    },
    rush: "5-7PM"
  },
  
  categoryMix: {
    mens: {
      percentage: "58%",
      trend: "↑5%"
    },
    womens: {
      percentage: "42%"
    },
    traffic: {
      count: 342,
      change: 12
    }
  },
  
  todayTargetDetail: {
    total: "$25,200",
    morning: "$11,340",
    evening: "$13,860"
  }
};

// Optional: Poor performance scenario for testing
export const mockDashboardDataPoor: DashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$18,420",
      subtitle: "87% of target"
    },
    todayTarget: {
      value: "$21,200",
      subtitle: "-5.2% vs yesterday"
    }
  },
  metrics: {
    upt: {
      label: "UPT",
      value: "1.8",
      status: "below",
      statusLabel: "↓ Below"
    },
    conversionRate: {
      label: "Conv. Rate",
      value: "52%",
      status: "below",
      statusLabel: "↓ Below"
    },
    aur: {
      label: "AUR",
      value: "$98",
      status: "below",
      statusLabel: "↓ Below"
    }
  },
  // ... rest of poor performance data
};
```

---

## 📄 File 4: `data/tipsData.ts`

### Tips Mock Data

Extract all tip cards from Phase 1. This will be the largest data file.

```typescript
import type { TipCard } from './types';

export const mockTipsData: TipCard[] = [
  // Sales Tips
  {
    id: "sales-001",
    category: "sales",
    label: "Sales Tips",
    body: [
      {
        type: "paragraph",
        content: [
          { text: "Your " },
          { text: "UPT", styles: { bold: true } },
          { text: " has " },
          { text: "decreased", styles: { highlight: true, color: "red" } },
          { text: " by " },
          { text: "15%", styles: { bold: true, highlight: true, color: "red" } },
          { text: " compared to last week." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { text: "Suggestion:", styles: { bold: true } },
          { text: " Focus on cross-selling accessories with main products." }
        ]
      }
    ]
  },

  // Labour Tips
  {
    id: "labour-001",
    category: "labour",
    label: "Labour Tips",
    body: [
      {
        type: "paragraph",
        content: [
          { text: "Expected " },
          { text: "high traffic", styles: { bold: true, color: "orange" } },
          { text: " between " },
          { text: "3-4 PM", styles: { bold: true } },
          { text: " today." }
        ]
      }
    ]
  },

  // VM Tips with product cards
  {
    id: "vm-001",
    category: "vm",
    label: "VM Tips",
    body: [
      {
        type: "paragraph",
        content: [{ text: "The following products need attention:" }]
      },
      {
        type: "productCard",
        title: "Slim Fit Chino - Navy (32x32)",
        summary: "High demand - reorder immediately",
        urgency: "high"
      },
      {
        type: "productCard",
        title: "Oxford Shirt - White (M)",
        summary: "Low stock - 2 days lead time",
        urgency: "medium"
      }
    ]
  },

  // Critical Out-of-Stock
  {
    id: "out-of-stock-001",
    category: "out-of-stock",
    label: "🔴 Critical Out-of-Stock (High Demand)",
    body: [
      {
        type: "list",
        variant: "out-of-stock",
        items: [
          {
            product: "Slim Fit Chino - Navy (32x32)",
            action: "Reorder!"
          },
          {
            product: "Oxford Shirt - White (M)",
            action: "2 days lead"
          },
          {
            product: "Leather Sneakers - White (9.5)",
            action: "Popular size"
          }
        ]
      }
    ]
  },

  // Overstock Opportunities
  {
    id: "overstock-001",
    category: "overstock",
    label: "🟡 Overstock Opportunities",
    body: [
      {
        type: "list",
        variant: "overstock",
        items: [
          {
            product: "Winter Jacket - Black (XL)",
            quantity: "18 pcs"
          },
          {
            product: "Wool Scarf - Grey",
            quantity: "25 pcs"
          },
          {
            product: "Flannel Shirt - Red (S)",
            quantity: "12 pcs"
          }
        ]
      }
    ]
  },

  // Inventory Actions
  {
    id: "inventory-001",
    category: "inventory-actions",
    label: "📋 Inventory Actions",
    body: [
      {
        type: "list",
        variant: "actions",
        items: [
          {
            product: "Priority Reorder",
            detail: "Navy chinos 32x32"
          },
          {
            product: "Bundle Promo",
            detail: "Shirt + Belt"
          },
          {
            product: "Clearance Focus",
            detail: "Winter items"
          }
        ]
      }
    ]
  }
];
```

---

## 📄 File 5: `data/index.ts`

### Export Everything

Central export file for easy imports:

```typescript
// Export all types
export * from './types';

// Export mock data
export { 
  mockNavigationData, 
  mockNavigationDataCloudy, 
  mockNavigationDataRainy 
} from './navigationData';

export { 
  mockDashboardData, 
  mockDashboardDataPoor 
} from './dashboardData';

export { 
  mockTipsData 
} from './tipsData';

// Export combined page data
import type { StorePageData } from './types';
import { mockNavigationData } from './navigationData';
import { mockDashboardData } from './dashboardData';
import { mockTipsData } from './tipsData';

export const mockStorePageData: StorePageData = {
  navigation: mockNavigationData,
  dashboard: mockDashboardData,
  tips: mockTipsData
};
```

---

## 🔄 Refactor Phase 1 Code

### Update `index.tsx`

Replace inline data with imports:

**Before (Phase 1)**:
```typescript
const JingjingOnePage = () => {
  // Inline data (100+ lines)
  const mockNavigationData = { ... }
  const mockDashboardData = { ... }
  const mockTipsData = [ ... ]
  
  // Inline types
  interface NavigationData { ... }
  interface DashboardData { ... }
  
  return <div>...</div>
}
```

**After (Phase 2)**:
```typescript
import { mockStorePageData } from './data'
import type { StorePageData } from './data/types'

const JingjingOnePage = () => {
  const { navigation, dashboard, tips } = mockStorePageData
  
  // Same rendering logic as Phase 1
  return <div>...</div>  // NO CHANGES to JSX!
}
```

---

## ✅ Testing & Verification

### Visual Testing
- [ ] Page looks identical to Phase 1
- [ ] All sections render correctly
- [ ] All data displays properly
- [ ] Colors unchanged
- [ ] Layout unchanged
- [ ] Scroll behavior unchanged

### Functional Testing
- [ ] Navigation bar works
- [ ] Dashboard scrolls
- [ ] Tips scroll
- [ ] No console errors
- [ ] TypeScript compiles without errors

### Code Quality
- [ ] All types in `data/types.ts`
- [ ] All mock data in `data/*.ts`
- [ ] Clean imports in main file
- [ ] No inline data remaining
- [ ] No type definitions in main file

### Verification Command
```bash
# Build should succeed with no errors
npm run build

# Type check should pass
npm run type-check  # or tsc --noEmit
```

---

## 📋 Acceptance Criteria

- [ ] `data/` folder created with 5 files
- [ ] All TypeScript interfaces extracted
- [ ] All mock data extracted
- [ ] Main component imports from `data/`
- [ ] Zero TypeScript errors
- [ ] Zero visual changes (pixel-perfect match)
- [ ] Zero functional changes
- [ ] Can switch between data scenarios easily
- [ ] Clean, organized code structure
- [ ] Ready for Phase 3 component extraction

---

## 🎯 Benefits of Phase 2

### Immediate Benefits
1. **Cleaner Code**: Main file is now 30-40% shorter
2. **Better Organization**: Data and logic separated
3. **Easier Testing**: Can swap mock data easily
4. **Type Safety**: All types in one place

### Future Benefits (Phases 3-7)
1. **Easy Component Props**: Types already defined
2. **Simple API Design**: Know exact data structure
3. **Test Scenarios**: Can create multiple data scenarios
4. **Real API Integration**: Easy to replace mock data later

---

## ⚠️ Common Mistakes to Avoid

### ❌ Don't Change Logic

```typescript
// ❌ BAD - Changing how data is used
const renderNavigation = () => {
  // DON'T restructure the logic
  const date = new Date(navigation.date)  // New logic!
  return <div>{date.toString()}</div>  // Different output!
}

// ✅ GOOD - Keep exact same logic
const renderNavigation = () => {
  // Same as Phase 1, just different data source
  return <div>{navigation.date}</div>
}
```

### ❌ Don't Rename Things

```typescript
// ❌ BAD - Renaming breaks the extraction pattern
export const storeData = { ... }  // Phase 1 called it mockDashboardData

// ✅ GOOD - Keep same names
export const mockDashboardData = { ... }
```

### ❌ Don't Add New Features

Phase 2 is ONLY about moving data. Don't:
- Add new tip cards
- Change visual styling
- Add new functionality
- Restructure components

---

## 💡 Tips for Success

1. **Copy-Paste Carefully**: Extract data exactly as-is from Phase 1
2. **Test Frequently**: After each file, verify page still works
3. **Use Git**: Commit after each successful extraction
4. **Type Check**: Run TypeScript compiler after each change
5. **Visual Compare**: Keep Phase 1 and Phase 2 side-by-side in browser

---

## 📚 Next Phase

After Phase 2 complete:
→ **[Phase 3: Universal Components](./PHASE_3_Universal_Components.md)**

Extract 5 reusable UI components that can be used across the application.

