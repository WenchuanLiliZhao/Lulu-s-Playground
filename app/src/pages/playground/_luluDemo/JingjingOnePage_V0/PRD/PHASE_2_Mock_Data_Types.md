# Phase 2: Mock Data & Types PRD

## Overview

**Phase**: 2 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 1 day  
**Dependencies**: None (can run in parallel with Phase 1)

## Objective

Create TypeScript type definitions and realistic mock data for all sections of the JingJing One Page dashboard. This provides the data structure foundation for all components.

---

## Files to Create

```
JingjingOnePage_V0/
└── data/
    ├── types.ts              # All TypeScript interfaces
    ├── navigationData.ts     # Mock navigation data
    ├── dashboardData.ts      # Mock dashboard metrics
    ├── tipsData.ts           # Mock tips content
    └── index.ts              # Data exports
```

---

## 2.1 Type Definitions

**File**: `data/types.ts`

### Complete TypeScript Interfaces

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
  rush: string;           // "5-7PM"
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

### Type Export

```typescript
// Export all types for use in components
export type {
  StorePageData,
  NavigationData,
  WeatherData,
  DashboardData,
  PerformanceSnapshot,
  MetricValue,
  MetricsRow,
  MetricWidget,
  PeakHoursData,
  TimeSlot,
  CategoryMixData,
  CategoryData,
  TrafficData,
  TodayTargetDetail,
  TipCard,
  TipCategory,
  ContentBlock,
  ParagraphBlock,
  RichTextContent,
  ProductCardBlock,
  ListBlock,
  ListItem
};
```

---

## 2.2 Navigation Mock Data

**File**: `data/navigationData.ts`

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

// Additional mock data for testing
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

## 2.3 Dashboard Mock Data

**File**: `data/dashboardData.ts`

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

// Alternate scenario: Poor performance day
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
  
  peakHours: {
    bestCR: {
      time: "3-5PM",
      rate: "65%"
    },
    lowCR: {
      time: "9-11AM",
      rate: "38%"
    },
    rush: "12-2PM"
  },
  
  categoryMix: {
    mens: {
      percentage: "45%",
      trend: "↓8%"
    },
    womens: {
      percentage: "55%",
      trend: "↑8%"
    },
    traffic: {
      count: 278,
      change: -24
    }
  },
  
  todayTargetDetail: {
    total: "$21,200",
    morning: "$9,540",
    evening: "$11,660"
  }
};
```

---

## 2.4 Tips Mock Data

**File**: `data/tipsData.ts`

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
          { text: " compared to last week. " }
        ]
      },
      {
        type: "paragraph",
        content: [
          { text: "Suggestion:", styles: { bold: true } },
          { text: " Focus on cross-selling accessories with main products. Train staff on the " },
          { text: "'Complete the Look'", styles: { italic: true } },
          { text: " technique." }
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
          { text: " today based on historical patterns." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { text: "Action:", styles: { bold: true, color: "blue" } },
          { text: " Ensure at least " },
          { text: "3-4 sales associates", styles: { bold: true } },
          { text: " are scheduled during this period." }
        ]
      }
    ]
  },

  // VM Tips
  {
    id: "vm-001",
    category: "vm",
    label: "VM Tips",
    body: [
      {
        type: "paragraph",
        content: [
          { text: "The following products need attention:" }
        ]
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
      },
      {
        type: "productCard",
        title: "Leather Sneakers - White (9.5)",
        summary: "Popular size - ensure prominent display",
        urgency: "medium"
      }
    ]
  },

  // Season/Weather Tips
  {
    id: "season-001",
    category: "season-weather",
    label: "Season/Weather Tips",
    body: [
      {
        type: "paragraph",
        content: [
          { text: "Sunny weather", styles: { bold: true, color: "orange" } },
          { text: " expected today with temperatures reaching " },
          { text: "18°C", styles: { bold: true } },
          { text: "." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { text: "Recommendations:", styles: { bold: true } },
          { text: " Feature lightweight jackets and spring accessories at front displays. Move winter coats to secondary locations." }
        ]
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

// Alternate scenario with different tips
export const mockTipsDataAlternate: TipCard[] = [
  {
    id: "sales-002",
    category: "sales",
    label: "Sales Tips",
    body: [
      {
        type: "paragraph",
        content: [
          { text: "Great job! Your " },
          { text: "conversion rate", styles: { bold: true } },
          { text: " is " },
          { text: "up 12%", styles: { bold: true, color: "green" } },
          { text: " from yesterday." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { text: "Keep it up:", styles: { bold: true } },
          { text: " Continue the momentum by maintaining excellent customer service during peak hours." }
        ]
      }
    ]
  }
];
```

---

## 2.5 Data Index File

**File**: `data/index.ts`

```typescript
// Export all types
export * from './types';

// Export mock data
export { mockNavigationData, mockNavigationDataCloudy, mockNavigationDataRainy } from './navigationData';
export { mockDashboardData, mockDashboardDataPoor } from './dashboardData';
export { mockTipsData, mockTipsDataAlternate } from './tipsData';

// Export complete page data
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

## Data Variation Strategy

### Purpose of Multiple Mock Data Sets

1. **Default Scenario** (`mockStorePageData`):
   - Normal business day
   - Good performance
   - Standard tips

2. **Poor Performance Scenario** (`mockDashboardDataPoor`):
   - Below target sales
   - Low metrics
   - More urgent tips

3. **Different Weather Scenarios**:
   - Sunny, Cloudy, Rainy
   - Different store locations

### Usage in Development

```typescript
// Easy switching between scenarios
const pageData = mockStorePageData;  // Default
// const pageData = { ...mockStorePageData, dashboard: mockDashboardDataPoor };  // Poor day
// const pageData = { ...mockStorePageData, navigation: mockNavigationDataCloudy };  // Different weather
```

---

## Data Quality Guidelines

### Realistic Data Requirements

1. **Numbers Should Make Sense**:
   - Sales values in realistic ranges ($15,000 - $35,000)
   - Percentages between 0-100%
   - Traffic counts realistic (200-500 daily)

2. **Consistency**:
   - UPT calculation: Total items / Total transactions
   - Conversion rate: Transactions / Traffic
   - AUR: Total sales / Units sold

3. **Formatting**:
   - Currency: "$24,580" (with comma, no decimals for large amounts)
   - Percentages: "68%" (no decimal unless needed)
   - Trends: "↑5%", "↓3%" (with arrow)

4. **Text Content**:
   - Professional tone
   - Actionable recommendations
   - Specific, not vague

---

## Testing Data

### Edge Cases to Cover

Create additional mock data for:

```typescript
// Long store name
export const mockLongStoreName: NavigationData = {
  storeName: "Vancouver - Robson Street - Premium Flagship Location",
  // ...
};

// Extreme negative performance
export const mockExtremeNegative: DashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$12,500",
      subtitle: "65% of target"
    },
    // ...
  }
};

// No trend data
export const mockNoTrends: CategoryMixData = {
  mens: { percentage: "50%" },  // No trend
  womens: { percentage: "50%" },  // No trend
  traffic: { count: 300, change: 0 }
};

// Many tips (test scrolling)
export const mockManyTips: TipCard[] = [
  // ... 15-20 tip cards for scroll testing
];
```

---

## Type Safety Validation

### Validation Checklist

- [ ] All interfaces exported correctly
- [ ] Mock data matches type definitions
- [ ] No TypeScript errors in data files
- [ ] Optional fields handled correctly
- [ ] Enums/unions used appropriately
- [ ] Data can be imported from index.ts

### Test Import

```typescript
// In a test file or component
import { 
  mockStorePageData,
  type StorePageData,
  type TipCard 
} from './data';

// Should compile without errors
const data: StorePageData = mockStorePageData;
```

---

## Success Criteria

Phase 2 is complete when:

- [ ] All TypeScript interfaces defined in `types.ts`
- [ ] Mock navigation data created
- [ ] Mock dashboard data created
- [ ] Mock tips data created with all tip types
- [ ] Data index file exports everything
- [ ] No TypeScript errors
- [ ] Data is realistic and well-formatted
- [ ] Multiple scenarios available for testing
- [ ] Edge case data available
- [ ] Data can be imported and used in components

---

## Next Phase

After completing Phase 2, proceed to **Phase 3: Playground Layout Components** to build the main layout structure that will use this data.

