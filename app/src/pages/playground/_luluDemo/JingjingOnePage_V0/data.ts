// Today's Target Table Data
export interface TargetTableRow {
  id: string;
  time: string;
  sales: number;
  target: number;
  progress: number;
  status: 'success' | 'warning' | 'error';
}

export const mockTargetTableData: TargetTableRow[] = [
  { id: 'h10', time: '10:00 AM', sales: 1200, target: 1500, progress: 80, status: 'warning' },
  { id: 'h11', time: '11:00 AM', sales: 1850, target: 1800, progress: 103, status: 'success' },
  { id: 'h12', time: '12:00 PM', sales: 2400, target: 2200, progress: 109, status: 'success' },
];


// Navigation mock data
export interface NavigationData {
  storeName: string;
  date: string;
  dayOfWeek: string;
  weather: {
    condition: string;
    temperature: number;
  };
}

export const mockNavigationData: NavigationData = {
  storeName: "Jing An Kerry Centre (Shanghai)",
  date: "Oct 29, 2025",
  dayOfWeek: "Wednesday",
  weather: {
    condition: "Sunny",
    temperature: 18,
  },
};

// Dashboard mock data
export const mockDashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$24,580",
      subtitle: "103% of target",
      breakdown: {
        xstore: "$18,200",
        omini: "$6,380"
      }
    },
    todayTarget: {
      value: "$25,200",
      subtitle: "+2.5% vs yesterday",
      breakdown: {
        xstore: "$19,000",
        omini: "$6,200"
      }
    },
  },
  metrics: {
    txn: {
      label: "TXN",
      value: "342",
      status: "success" as const,
      statusLabel: "↑ Above",
      sparklineData: [280, 290, 305, 315, 325, 335, 340, 342],
    },
    upt: {
      label: "UPT",
      value: "2.3",
      status: "success" as const,
      statusLabel: "↑ Above",
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.3],
    },
    aur: {
      label: "AUR",
      value: "$105",
      status: "danger" as const,
      statusLabel: "↓ Below",
      sparklineData: [115, 112, 110, 108, 107, 105, 103, 105],
    },
    transaction: {
      label: "Transaction",
      value: "234",
      status: "info" as const,
      statusLabel: "On Track",
      sparklineData: [190, 200, 210, 215, 220, 228, 232, 234],
    },
    cr: {
      label: "CR",
      value: "68%",
      status: "info" as const,
      statusLabel: "On Track",
      sparklineData: [62, 64, 65, 67, 66, 68, 69, 68],
    },
  },
  peakHours: {
    bestCR: { time: "2-4PM", rate: "78%" },
    lowCR: { time: "10-12PM", rate: "52%" },
    rush: "5-7PM",
  },
  categoryMix: {
    mens: { percentage: "58%", trend: "↑5%" },
    womens: { percentage: "42%" },
    traffic: { count: 342, change: 12 },
  },
  todayTargetDetail: {
    total: "$25,200",
    currentProgress: "$18,500",
    morning: "$11,340",
    evening: "$13,860",
    sparklineData: {
      morning: [8200, 8800, 9500, 10200, 10800, 11100, 11340],
      evening: [9800, 10400, 11000, 11600, 12300, 13100, 13860],
    },
    // Today's hourly sales data (10 AM - 6 PM so far)
    trendData: [
      { id: "h10", name: "10 AM", sales: 1200 },
      { id: "h11", name: "11 AM", sales: 1850 },
      { id: "h12", name: "12 PM", sales: 2400 },
      { id: "h13", name: "1 PM", sales: 2100 },
      { id: "h14", name: "2 PM", sales: 2800 },
      { id: "h15", name: "3 PM", sales: 3200 },
      { id: "h16", name: "4 PM", sales: 2900 },
      { id: "h17", name: "5 PM", sales: 3500 },
      { id: "h18", name: "6 PM", sales: 2550 },
    ],
  },
} as const;

// Sales Summary mock data
export interface SalesSummaryData {
  summary: string;
}

export const mockSalesSummaryData: SalesSummaryData = {
  summary: "Your store achieved 103% of yesterday's target with $24,580 in sales. Today's performance is tracking well with strong conversion rates in the afternoon. The team has completed 68% of the daily target so far, with Men's category showing particularly strong momentum at 58% of mix. Peak traffic is expected between 5-7 PM based on historical patterns."
};

// Tips mock data (only keeping Critical Out-of-Stock and Overstock)
export const mockTipsData = [
  {
    id: "out-of-stock-001",
    category: "danger" as const,
    label: "🔴 Critical Out-of-Stock (High Demand)",
    variant: "danger",
    items: [
      { product: "Slim Fit Chino - Navy (32x32)", detail: "Reorder!" },
      { product: "Oxford Shirt - White (M)", detail: "2 days lead" },
      { product: "Leather Sneakers - White (9.5)", detail: "Popular size" },
    ],
  },
  {
    id: "overstock-001",
    category: "warning" as const,
    label: "🟡 Overstock Opportunities",
    variant: "warning",
    items: [
      { product: "Winter Jacket - Black (XL)", detail: "18 pcs" },
      { product: "Wool Scarf - Grey", detail: "25 pcs" },
      { product: "Flannel Shirt - Red (S)", detail: "12 pcs" },
    ],
  },
];

// Hot Sellers mock data
export interface HotSellerProduct {
  id: string;
  productName: string;
  image: string;
  unitsSold: number;
  inventory: number;
}

const DEFAULT_PRODUCT_IMAGE = 'https://i.pinimg.com/1200x/4a/98/d4/4a98d46259a02433b2715d411eda4fe8.jpg';

export const mockHotSellersData: HotSellerProduct[] = [
  { id: 'prod1', productName: 'Align High-Rise Pant 25"', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 45, inventory: 28 },
  { id: 'prod2', productName: 'Define Jacket', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 38, inventory: 15 },
  { id: 'prod3', productName: 'Scuba Oversized Hoodie', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 35, inventory: 22 },
  { id: 'prod4', productName: 'Fast and Free Tight 25"', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 32, inventory: 18 },
  { id: 'prod5', productName: 'Everywhere Belt Bag', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 28, inventory: 12 },
];

// Cross Selling Opportunities mock data
export interface ProductCard {
  id: string;
  category: 'top' | 'bottom' | 'shoes' | 'accessories';
  name: string;
  price: string;
  image: string;
  color: string;
}

export const mockCrossSellingData: ProductCard[] = [
  { 
    id: 'prod1', 
    category: 'top', 
    name: 'Lightweight Training Tee', 
    price: '$48', 
    image: DEFAULT_PRODUCT_IMAGE,
    color: 'Navy Blue'
  },
  { 
    id: 'prod2', 
    category: 'bottom', 
    name: 'Swift Shorts 7"', 
    price: '$68', 
    image: DEFAULT_PRODUCT_IMAGE,
    color: 'Black'
  },
  { 
    id: 'prod3', 
    category: 'shoes', 
    name: 'Blissfeel Running Shoe', 
    price: '$148', 
    image: DEFAULT_PRODUCT_IMAGE,
    color: 'White/Grey'
  },
  { 
    id: 'prod4', 
    category: 'accessories', 
    name: 'Fast and Free Cap', 
    price: '$38', 
    image: DEFAULT_PRODUCT_IMAGE,
    color: 'Black'
  },
];

// Product Opportunities mock data
export interface ProductOpportunityData {
  introduction: string;
  products: ProductCard[];
}

export const mockProductOpportunitiesData: ProductOpportunityData = {
  introduction: "Trending now: Athleisure wear is in high demand this season. Focus on versatile pieces that transition from workout to casual wear.",
  products: [
    { 
      id: 'opp1', 
      category: 'top', 
      name: 'Define Jacket', 
      price: '$118', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Black'
    },
    { 
      id: 'opp2', 
      category: 'bottom', 
      name: 'Align High-Rise Pant 28"', 
      price: '$98', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Navy'
    },
    { 
      id: 'opp3', 
      category: 'top', 
      name: 'Scuba Hoodie', 
      price: '$118', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Heathered Grey'
    },
    { 
      id: 'opp4', 
      category: 'accessories', 
      name: 'Everywhere Belt Bag', 
      price: '$38', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Black'
    },
    { 
      id: 'opp5', 
      category: 'bottom', 
      name: 'Wunder Train 25"', 
      price: '$98', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Dark Olive'
    },
    { 
      id: 'opp6', 
      category: 'accessories', 
      name: 'Light Locks Scrunchie', 
      price: '$18', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Assorted'
    },
  ]
};

// Stockout but Wecom Opportunities mock data
export interface StockoutWecomData {
  introduction: string;
  products: ProductCard[];
}

export const mockStockoutWecomData: StockoutWecomData = {
  introduction: "These popular items are out of stock in-store, but available through WeChat for customer orders. Great opportunity to connect digitally!",
  products: [
    { 
      id: 'wecom1', 
      category: 'top', 
      name: 'All Yours Tee', 
      price: '$58', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'White'
    },
    { 
      id: 'wecom2', 
      category: 'bottom', 
      name: 'Fast and Free 23"', 
      price: '$128', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Black'
    },
    { 
      id: 'wecom3', 
      category: 'shoes', 
      name: 'Chargefeel Running Shoe', 
      price: '$158', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'White/Silver'
    },
    { 
      id: 'wecom4', 
      category: 'accessories', 
      name: 'The Reversible Mat 5mm', 
      price: '$78', 
      image: DEFAULT_PRODUCT_IMAGE,
      color: 'Deep Coal'
    },
  ]
};

