// Today's Target Table Data
export interface TargetTableRow {
  id: string;
  time: string;
  netSales: {
    achieve: number;
    goal: number;
  };
  plan: {
    achieve: number;
    goal: number;
  };
  status: "success" | "warning" | "error";
}

export const mockTargetTableData: TargetTableRow[] = [
  {
    id: "h10-12",
    time: "10:00 ~ 12:00",
    netSales: { achieve: 2800, goal: 4200 },
    plan: { achieve: 3200, goal: 3400 },
    status: "warning",
  },
  {
    id: "h12-14",
    time: "12:00 ~ 14:00",
    netSales: { achieve: 5200, goal: 6800 },
    plan: { achieve: 4800, goal: 4500 },
    status: "success",
  },
  {
    id: "h14-16",
    time: "14:00 ~ 16:00",
    netSales: { achieve: 3500, goal: 4200 },
    plan: { achieve: 4200, goal: 4000 },
    status: "error",
  },
  {
    id: "h16-18",
    time: "16:00 ~ 18:00",
    netSales: { achieve: 6100, goal: 6000 },
    plan: { achieve: 6000, goal: 5800 },
    status: "success",
  },
  {
    id: "h18-20",
    time: "18:00 ~ 20:00",
    netSales: { achieve: 4800, goal: 5300 },
    plan: { achieve: 5300, goal: 5500 },
    status: "warning",
  },
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
        omni: "$6,380"
      }
    },
    todayTarget: {
      value: "$25,200",
      subtitle: "+2.5% vs yesterday",
      breakdown: {
        xstore: "$19,000",
        omni: "$6,200"
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
      label: "Traffic",
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
    bestCR: { time: "2-4PM", rate: "16.1%" },
    lowCR: { time: "10-12PM", rate: "5%" },
    rushHours: { time: "2-4PM", rate: "500" },
  },
  categoryMix: {
    mens: { percentage: "60%", trend: "+3%" },
    womens: { percentage: "28%", trend: "-2%" },
    // ace: { percentage: "10%", trend: "-6%" },
    // ftw: { percentage: "2%", trend: "+2%" },
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
    // Today's target trend data (converted from table data)
    // Each data point contains: netSalesAchieved, netSalesGoal, planAchieved, planGoal
    trendData: mockTargetTableData.map((row) => ({
      id: row.id,
      name: row.time,
      netSalesAchieved: row.netSales.achieve,
      netSalesTarget: row.netSales.goal,
      planAchieved: row.plan.achieve,
      planTarget: row.plan.goal,
    })),
    // Four lines with paired colors
    // Net Sales: wilderness (green) - achieved (dark), goal (light)
    // Plan: daydream (blue) - achieved (dark), goal (light)
    trendChartLines: [
      {
        dataKey: "netSalesAchieved",
        name: "Net Sales (Achieved)",
        color: "var(--hot-heat-4)",  // Deep green
      },
      {
        dataKey: "netSalesTarget",
        name: "Net Sales (Goal)",
        color: "var(--hot-heat-4)",  // Light green
        strokeDasharray: "5 5",
        opacity: 0.4,
      },
      {
        dataKey: "planAchieved",
        name: "Plan (Achieved)",
        color: "var(--daydream-3)",  // Deep blue
      },
      {
        dataKey: "planTarget",
        name: "Plan (Goal)",
        color: "var(--daydream-3)",  // Light blue
        strokeDasharray: "5 5",
        opacity: 0.4,
      },
    ],
  },
};

// Sales Summary mock data
export interface SalesSummaryData {
  summary: string;
}

export const mockSalesSummaryData: SalesSummaryData = {
  summary: "Your store achieved 103% of yesterday's target with $24,580 in sales. Today's performance is tracking well with strong conversion rates in the afternoon."
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
  { id: 'prod1', productName: 'Align High-Rise Pant 25"', image: "https://i.pinimg.com/1200x/dd/18/4b/dd184bfd9d8bf57a68024d67d8d7b72b.jpg", unitsSold: 45, inventory: 28 },
  { id: 'prod2', productName: 'Define Jacket', image: "https://i.pinimg.com/736x/dd/f6/20/ddf62093da84fdb8b1c482a3d4f0d240.jpg", unitsSold: 38, inventory: 15 },
  { id: 'prod3', productName: 'Scuba Oversized Hoodie', image: "https://i.pinimg.com/1200x/5d/31/ec/5d31ec1add2b2e902ea79c491d47ff4f.jpg", unitsSold: 35, inventory: 22 },
  // { id: 'prod4', productName: 'Fast and Free Tight 25"', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 32, inventory: 18 },
  // { id: 'prod5', productName: 'Everywhere Belt Bag', image: DEFAULT_PRODUCT_IMAGE, unitsSold: 28, inventory: 12 },
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

export interface RecommendationSet {
  id: string;
  title: string;
  description: string;
  products: ProductCard[];
}

export const mockCrossSellingData: RecommendationSet[] = [
  {
    id: 'set1',
    title: 'Workout Ready',
    description: 'Complete athletic outfit for high-performance training sessions.',
    products: [
      { id: 'prod1', category: 'top', name: 'Swiftly Tech SS 2.0', price: '$68', image: "https://i.pinimg.com/1200x/19/41/5b/19415b02885d39a111c7b99c338aa10f.jpg", color: 'Black' },
      { id: 'prod2', category: 'bottom', name: 'Fast and Free 25"', price: '$128', image: "https://i.pinimg.com/1200x/ec/52/4e/ec524e67e67a7f39a0e081100ad5a1eb.jpg", color: 'Navy' },
      { id: 'prod3', category: 'shoes', name: 'Blissfeel Running Shoe', price: '$148', image: "https://i.pinimg.com/1200x/39/be/4b/39be4bdcfe074b073e98f4eb4ef62d53.jpg", color: 'White' },
    ]
  },
  {
    id: 'set2',
    title: 'Casual Comfort',
    description: 'Effortless everyday style with maximum comfort.',
    products: [
      { id: 'prod4', category: 'top', name: 'Scuba Hoodie', price: '$118', image: DEFAULT_PRODUCT_IMAGE, color: 'Heathered Grey' },
      { id: 'prod5', category: 'bottom', name: 'Align HR 28"', price: '$98', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
      { id: 'prod6', category: 'accessories', name: 'Everywhere Belt Bag', price: '$38', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
    ]
  },
  {
    id: 'set3',
    title: 'Yoga Essentials',
    description: 'Perfect combination for mindful movement and stretching.',
    products: [
      { id: 'prod7', category: 'top', name: 'Align Tank', price: '$58', image: DEFAULT_PRODUCT_IMAGE, color: 'White' },
      { id: 'prod8', category: 'bottom', name: 'Wunder Under 28"', price: '$98', image: DEFAULT_PRODUCT_IMAGE, color: 'Deep Coal' },
      { id: 'prod9', category: 'accessories', name: 'The Reversible Mat 5mm', price: '$78', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
    ]
  }
];

// Product Opportunities mock data
export interface ProductOpportunityData {
  introduction: string;
  products: ProductCard[];
}

export const mockProductOpportunitiesData: ProductOpportunityData = {
  introduction: "Trending now: Athleisure wear is in high demand this season. Focus on versatile pieces that transition from workout to casual wear.",
  products: [
    { id: 'opp1', category: 'top', name: 'Define Jacket', price: '$118', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
    { id: 'opp2', category: 'bottom', name: 'Align High-Rise Pant 28"', price: '$98', image: DEFAULT_PRODUCT_IMAGE, color: 'Navy' },
    { id: 'opp3', category: 'top', name: 'Scuba Hoodie', price: '$118', image: DEFAULT_PRODUCT_IMAGE, color: 'Heathered Grey' },
    { id: 'opp4', category: 'accessories', name: 'Everywhere Belt Bag', price: '$38', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
    { id: 'opp5', category: 'bottom', name: 'Wunder Train 25"', price: '$98', image: DEFAULT_PRODUCT_IMAGE, color: 'Dark Olive' },
    { id: 'opp6', category: 'accessories', name: 'Light Locks Scrunchie', price: '$18', image: DEFAULT_PRODUCT_IMAGE, color: 'Assorted' },
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
    { id: 'wecom1', category: 'top', name: 'All Yours Tee', price: '$58', image: DEFAULT_PRODUCT_IMAGE, color: 'White' },
    { id: 'wecom2', category: 'bottom', name: 'Fast and Free 23"', price: '$128', image: DEFAULT_PRODUCT_IMAGE, color: 'Black' },
    { id: 'wecom3', category: 'shoes', name: 'Chargefeel Running Shoe', price: '$158', image: DEFAULT_PRODUCT_IMAGE, color: 'White/Silver' },
    { id: 'wecom4', category: 'accessories', name: 'The Reversible Mat 5mm', price: '$78', image: DEFAULT_PRODUCT_IMAGE, color: 'Deep Coal' },
  ]
};

// Weather forecast mock data (10 days)
export interface WeatherForecastDay {
  id: string;
  name: string;
  dateString: string; // Date as string for display
  value: number; // Temperature in Celsius
  weather: string; // Weather condition
  humidity?: number;
  wind?: number;
  [key: string]: string | number | Date | undefined;
}

export const mockWeatherForecastData: WeatherForecastDay[] = [
  { id: 'day1', name: 'Today', dateString: '2025-11-05', value: 10, weather: 'Partly Cloudy', humidity: 65, wind: 15 },
  { id: 'day2', name: 'Nov 6', dateString: '2025-11-06', value: 10, weather: 'Cloudy', humidity: 70, wind: 18 },
  { id: 'day3', name: 'Nov 7', dateString: '2025-11-07', value: 5, weather: 'Light Rain', humidity: 85, wind: 22 },
  { id: 'day4', name: 'Nov 8', dateString: '2025-11-08', value: 9, weather: 'Rainy', humidity: 90, wind: 20 },
  { id: 'day5', name: 'Nov 9', dateString: '2025-11-09', value: -1, weather: 'Cloudy', humidity: 80, wind: 16 },
  { id: 'day6', name: 'Nov 10', dateString: '2025-11-10', value: -3, weather: 'Partly Cloudy', humidity: 70, wind: 14 },
  { id: 'day7', name: 'Nov 11', dateString: '2025-11-11', value: 3, weather: 'Sunny', humidity: 60, wind: 10 },
  { id: 'day8', name: 'Nov 12', dateString: '2025-11-12', value: 4, weather: 'Sunny', humidity: 55, wind: 8 },
  { id: 'day9', name: 'Nov 13', dateString: '2025-11-13', value: 5, weather: 'Partly Cloudy', humidity: 65, wind: 12 },
  { id: 'day10', name: 'Nov 14', dateString: '2025-11-14', value: -3, weather: 'Cloudy', humidity: 75, wind: 15 },
];

