// Today's Plan Table Data
import type { ReactNode } from 'react'
import type { MultiSeriesChartData } from '../../../../components/ui/forDashboard/TrendChart'

const USD_TO_CNY_RATE = 7.0865;
const PRODUCT_PRICE_CONVERSION_RATE = 15.5; // More realistic pricing for products

const convertToCNY = (value: number | string): number => {
  if (typeof value === 'string') {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g,""));
    return Math.round(numberValue * USD_TO_CNY_RATE);
  }
  return Math.round(value * USD_TO_CNY_RATE);
};

const formatToCNY = (value: number | string): string => {
  const cnyValue = convertToCNY(value);
  return `¥${cnyValue.toLocaleString('zh-CN')}`;
};

const formatToCNYWithoutSymbol = (value: number | string): number => {
    return convertToCNY(value)
}

const convertProductPriceToCNY = (value: string): string => {
  const numberValue = parseFloat(value.replace(/[^0-9.-]+/g,""));
  const cnyValue = Math.round(numberValue * PRODUCT_PRICE_CONVERSION_RATE);
  return `¥${cnyValue.toLocaleString('zh-CN')}`;
};

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
    netSales: { achieve: formatToCNYWithoutSymbol(2800), goal: formatToCNYWithoutSymbol(4200) },
    plan: { achieve: formatToCNYWithoutSymbol(3200), goal: formatToCNYWithoutSymbol(3400) },
    status: "warning",
  },
  {
    id: "h12-14",
    time: "12:00 ~ 14:00",
    netSales: { achieve: formatToCNYWithoutSymbol(5200), goal: formatToCNYWithoutSymbol(6800) },
    plan: { achieve: formatToCNYWithoutSymbol(4800), goal: formatToCNYWithoutSymbol(4500) },
    status: "success",
  },
  {
    id: "h14-16",
    time: "14:00 ~ 16:00",
    netSales: { achieve: formatToCNYWithoutSymbol(3500), goal: formatToCNYWithoutSymbol(4200) },
    plan: { achieve: formatToCNYWithoutSymbol(4200), goal: formatToCNYWithoutSymbol(4000) },
    status: "error",
  },
  {
    id: "h16-18",
    time: "16:00 ~ 18:00",
    netSales: { achieve: formatToCNYWithoutSymbol(6100), goal: formatToCNYWithoutSymbol(6000) },
    plan: { achieve: formatToCNYWithoutSymbol(6000), goal: formatToCNYWithoutSymbol(5800) },
    status: "success",
  },
  {
    id: "h18-20",
    time: "18:00 ~ 20:00",
    netSales: { achieve: formatToCNYWithoutSymbol(4800), goal: formatToCNYWithoutSymbol(5300) },
    plan: { achieve: formatToCNYWithoutSymbol(5300), goal: formatToCNYWithoutSymbol(5500) },
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

// Dashboard Types
export interface MetricData {
  label: string
  value: string
  status: 'success' | 'danger' | 'warning' | 'info'
  statusLabel: string
  sparklineData: number[]
}

export interface PerformanceBreakdown {
  xstore: string
  omni: string
}

export interface PerformanceMetric {
  value: string
  subtitle: string
  breakdown: PerformanceBreakdown
  sparklineData: number[]
}

export interface TodayTargetPeriod {
  plan: string
  actual: string
  toPlanPercent: string
}

export interface TodayTargetDetail {
  total: string
  currentProgress: string
  morning: TodayTargetPeriod
  evening: TodayTargetPeriod
  sparklineData: {
    morning: number[]
    evening: number[]
  }
  /** Multi-series chart configuration supporting mixed chart types */
  chartMultiSeries: MultiSeriesChartData
}

export interface DashboardData {
  performanceSnapshot: {
    yesterday: PerformanceMetric
    todayTarget: PerformanceMetric
    wtd: PerformanceMetric
  }
  metrics: {
    txn: MetricData
    upt: MetricData
    aur: MetricData
    transaction: MetricData
    cr: MetricData
  }
  todayTargetDetail: TodayTargetDetail
}

// Dashboard mock data
export const mockDashboardData: DashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: formatToCNY("$24,580"),
      subtitle: "103% of plan",
      breakdown: {
        xstore: formatToCNY("$18,200"),
        omni: formatToCNY("$6,380")
      },
      sparklineData: [
        formatToCNYWithoutSymbol("$20,800"),
        formatToCNYWithoutSymbol("$21,900"),
        formatToCNYWithoutSymbol("$22,750"),
        formatToCNYWithoutSymbol("$23,600"),
        formatToCNYWithoutSymbol("$24,200"),
        formatToCNYWithoutSymbol("$24,580")
      ]
    },
    todayTarget: {
      value: "¥131,100",
      subtitle: "+2.5% vs yesterday",
      breakdown: {
        xstore: "¥98,825",
        omni: "¥32,275"
      },
      sparklineData: [118200, 121450, 124900, 127800, 129600, 131100]
    },
    wtd: {
      value: "¥656,200",
      subtitle: "102% to Plan",
      breakdown: {
        xstore: "¥492,000",
        omni: "¥164,200"
      },
      sparklineData: [402300, 612800, 305500, 623900, 442100, 756200]
    }
  },
  metrics: {
    txn: {
      label: "TXN",
      value: "342",
      status: "success" as const,
      statusLabel: "↑ 6%",
      sparklineData: [280, 290, 305, 315, 325, 335, 340, 342],
    },
    upt: {
      label: "UPT",
      value: "2.3",
      status: "success" as const,
      statusLabel: "↑ 7%",
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.3],
    },
    aur: {
      label: "AUR",
      value: convertProductPriceToCNY("$105"),
      status: "danger" as const,
      statusLabel: "↓ 5%",
      sparklineData: [115, 112, 110, 108, 107, 105, 103, 105].map(formatToCNYWithoutSymbol),
    },
    transaction: {
      label: "Traffic",
      value: "234",
      status: "success" as const,
      statusLabel: "↑ 10%",
      sparklineData: [190, 200, 210, 215, 220, 228, 232, 234],
    },
    cr: {
      label: "CR",
      value: "68%",
      status: "success" as const,
      statusLabel: "↑ 2%",
      sparklineData: [62, 64, 65, 67, 66, 68, 69, 68],
    },
  },
  todayTargetDetail: {
    total: formatToCNY("$25,200"),
    currentProgress: formatToCNY("$18,500"),
    morning: {
      plan: formatToCNY("$11,340"),
      actual: formatToCNY("$10,500"),
      toPlanPercent: "93%"
    },
    evening: {
      plan: formatToCNY("$13,860"),
      actual: formatToCNY("$8,000"),
      toPlanPercent: "58%"
    },
    sparklineData: {
      morning: [8200, 8800, 9500, 10200, 10800, 11100, 11340].map(formatToCNYWithoutSymbol),
      evening: [9800, 10400, 11000, 11600, 12300, 13100, 13860].map(formatToCNYWithoutSymbol),
    },
    // Today's plan multi-series chart - supports mixing line, column, and area
    chartMultiSeries: {
      // Shared data for all series
      data: mockTargetTableData.map((row) => ({
        id: row.id,
        name: row.time,
        netSalesAchieved: row.netSales.achieve,
        netSalesGoal: row.netSales.goal,
      })),
      // Multiple series with different display modes
      series: [
        {
          defaultShowAs: 'line' as const,
          lines: [
            {
              dataKey: "netSalesAchieved",
              name: "Net Sales (Achieved)",
              color: "var(--hot-heat-4)",
              opacity: 0.7,
            },
          ],
        },
        {
          defaultShowAs: 'line' as const,
          lines: [
            {
              dataKey: "netSalesGoal",
              name: "Net Sales (Goal)",
              color: "var(--purple-4)",
              strokeDasharray: "5 5",
              opacity: 0.7,
            },
          ],
        },
      ],
    },
  },
};

// Sales Summary mock data
export interface SalesSummaryData {
  summary: ReactNode;
}

export const mockSalesSummaryData: SalesSummaryData = {
  summary: (
    <p>
      Your store achieved <span style={{ fontWeight: "bold", color: "var(--color-semantic-success)" }}>103%</span> of yesterday's plan with <span style={{ fontWeight: "bold", color: "var(--color-semantic-success)" }}>¥174,225</span> in sales. Today's performance is tracking well with strong conversion rates in the afternoon.
    </p>
  )
};

// Tips mock data (removed Critical Out-of-Stock and Overstock as requested)
export const mockTipsData: never[] = [];

// Hot Sellers mock data
export interface LinkedProduct {
  id: string;
  image: string;
  name: string;
  percentage: number;
}

export interface HotSellerProduct {
  id: string;
  productName: string;
  image: string;
  unitsSold: number;
  inventory: number;
  linkedSales?: LinkedProduct[];
}

const DEFAULT_PRODUCT_IMAGE = 'https://i.pinimg.com/1200x/4a/98/d4/4a98d46259a02433b2715d411eda4fe8.jpg';

if (DEFAULT_PRODUCT_IMAGE) {
  console.log('DEFAULT_PRODUCT_IMAGE Testing');
}

export const mockHotSellersData = {
  xstore: [
    { 
      id: 'prod1', 
      productName: 'Align High-Rise Pant 25"', 
      image: "https://i.pinimg.com/1200x/dd/18/4b/dd184bfd9d8bf57a68024d67d8d7b72b.jpg", 
      unitsSold: 45, 
      inventory: 58,
      linkedSales: [
        { id: 'link1', image: "https://i.pinimg.com/1200x/19/41/5b/19415b02885d39a111c7b99c338aa10f.jpg", name: "Swiftly Tech SS 2.0", percentage: 23 },
        { id: 'link2', image: "https://i.pinimg.com/736x/cc/76/f6/cc76f6b967a8ba0fa9c6d19b82849357.jpg", name: "Running Shoe", percentage: 18 }
      ]
    },
    { 
      id: 'prod2', 
      productName: 'Define Jacket', 
      image: "https://i.pinimg.com/736x/dd/f6/20/ddf62093da84fdb8b1c482a3d4f0d240.jpg", 
      unitsSold: 28, 
      inventory: 35,
      linkedSales: [
        { id: 'link3', image: "https://i.pinimg.com/1200x/dd/18/4b/dd184bfd9d8bf57a68024d67d8d7b72b.jpg", name: "Align Pant 25\"", percentage: 27 },
        { id: 'link4', image: "https://i.pinimg.com/1200x/18/76/7a/18767aee1d050a6d4724b2adbd841414.jpg", name: "Belt Bag", percentage: 15 }
      ]
    },
    { 
      id: 'prod3', 
      productName: 'Scuba Oversized Hoodie', 
      image: "https://i.pinimg.com/1200x/5d/31/ec/5d31ec1add2b2e902ea79c491d47ff4f.jpg", 
      unitsSold: 35, 
      inventory: 52,
      linkedSales: [
        { id: 'link5', image: "https://i.pinimg.com/736x/89/aa/5b/89aa5b59eca424ca4c471b154c9e62f3.jpg", name: "Wunder Train", percentage: 21 }
      ]
    },
  ],
  omni: [
    { 
      id: 'omni1', 
      productName: 'Everywhere Belt Bag', 
      image: "https://i.pinimg.com/1200x/06/30/88/0630885e2e9a23a779e9db8afca1b54b.jpg", 
      unitsSold: 28, 
      inventory: 51,
      linkedSales: [
        { id: 'olink1', image: "https://i.pinimg.com/1200x/5d/31/ec/5d31ec1add2b2e902ea79c491d47ff4f.jpg", name: "Scuba Hoodie", percentage: 19 },
        { id: 'olink2', image: "https://i.pinimg.com/1200x/a7/12/7c/a7127cdb4a49ab6f7182b0a003cca76c.jpg", name: "All Yours Tee", percentage: 16 }
      ]
    },
    { 
      id: 'omni2', 
      productName: 'Align High-Rise Pant 28"', 
      image: "https://i.pinimg.com/736x/e7/ac/98/e7ac98956174907395fbf25efd14c66a.jpg", 
      unitsSold: 62, 
      inventory: 18,
      linkedSales: [
        { id: 'olink3', image: "https://i.pinimg.com/1200x/19/41/5b/19415b02885d39a111c7b99c338aa10f.jpg", name: "Swiftly Tech SS", percentage: 25 }
      ]
    },
    { 
      id: 'omni3', 
      productName: 'Swiftly Tech SS 2.0', 
      image: "https://i.pinimg.com/1200x/19/41/5b/19415b02885d39a111c7b99c338aa10f.jpg", 
      unitsSold: 55, 
      inventory: 30,
      linkedSales: [
        { id: 'olink4', image: "https://i.pinimg.com/736x/e7/ac/98/e7ac98956174907395fbf25efd14c66a.jpg", name: "Align Pant 28\"", percentage: 22 },
        { id: 'olink5', image: "https://i.pinimg.com/736x/cc/76/f6/cc76f6b967a8ba0fa9c6d19b82849357.jpg", name: "Running Shoe", percentage: 14 }
      ]
    },
  ]
};

export interface ProductCard {
  id: string;
  category: "top" | "bottom" | "shoes" | "accessories";
  name: string;
  price: string;
  image: string;
  color: string;
  tag?: "New" | "Replen";
}

// 1. Guest are buying those items in other stores
export interface GuestBuyingOtherStoresData {
  introduction: string;
  products: ProductCard[];
}

export const mockGuestBuyingOtherStoresData: GuestBuyingOtherStoresData = {
  introduction: "Guests are purchasing these popular items from other nearby locations. We have an opportunity to capture this demand.",
  products: [
    { id: 'opp1', category: 'top', name: 'Define Jacket', price: convertProductPriceToCNY('$118'), image: "https://i.pinimg.com/1200x/47/0e/a9/470ea92e55a90a618d3229fe05a96bd6.jpg", color: 'Black' },
    { id: 'opp2', category: 'bottom', name: 'Align High-Rise Pant 28"', price: convertProductPriceToCNY('$98'), image: "https://i.pinimg.com/1200x/7b/aa/77/7baa7728cb321612720793c86318da82.jpg", color: 'Navy' },
    { id: 'opp3', category: 'top', name: 'Scuba Hoodie', price: convertProductPriceToCNY('$118'), image: "https://i.pinimg.com/736x/0e/92/67/0e9267cd8c4c97fecf02cdea091f2302.jpg", color: 'Heathered Grey' },
  ]
};

// 2. Guest are trying on those items in our store
export interface GuestTryingOnData {
  introduction: string;
  products: ProductCard[];
}
export const mockGuestTryingOnData: GuestTryingOnData = {
    introduction: "High try-on rates for these items indicate strong interest, but conversion is low. Let's focus on closing the sale.",
    products: [
      { id: 'try1', category: 'bottom', name: 'Wunder Train 25"', price: convertProductPriceToCNY('$98'), image: "https://i.pinimg.com/736x/89/aa/5b/89aa5b59eca424ca4c471b154c9e62f3.jpg", color: 'Dark Olive' },
      { id: 'try2', category: 'accessories', name: 'Light Locks Scrunchie', price: convertProductPriceToCNY('$18'), image: "https://i.pinimg.com/736x/b0/c7/c3/b0c7c3e0518e74ca500850a62313248d.jpg", color: 'Assorted' },
      { id: 'try3', category: 'top', name: 'All Yours Tee', price: convertProductPriceToCNY('$58'), image: "https://i.pinimg.com/1200x/a7/12/7c/a7127cdb4a49ab6f7182b0a003cca76c.jpg", color: 'White' },
    ]
}

// 3. Wecom Recommendations
export interface WecomRecommendationsData {
  introduction: string;
  products: ProductCard[];
}

export const mockWecomRecommendationsData: WecomRecommendationsData = {
  introduction: "These popular items are out of stock in-store, but available through WeChat for customer orders. Great opportunity to connect digitally!",
  products: [
    { id: 'wecom1', category: 'top', name: 'All Yours Tee', price: convertProductPriceToCNY('$58'), image: "https://i.pinimg.com/1200x/a7/12/7c/a7127cdb4a49ab6f7182b0a003cca76c.jpg", color: 'White' },
    { id: 'wecom2', category: 'bottom', name: 'Fast and Free 23"', price: convertProductPriceToCNY('$128'), image: "https://i.pinimg.com/736x/89/aa/5b/89aa5b59eca424ca4c471b154c9e62f3.jpg", color: 'Black' },
    { id: 'wecom3', category: 'shoes', name: 'Chargefeel Running Shoe', price: convertProductPriceToCNY('$158'), image: "https://i.pinimg.com/736x/cc/76/f6/cc76f6b967a8ba0fa9c6d19b82849357.jpg", color: 'White/Silver' },
  ]
};

// 4. New Drop/Replen coming up next week
export interface NewDropData {
    introduction: string;
    products: ProductCard[];
}
export const mockNewDropData: NewDropData = {
    introduction: "Get ready for these exciting new arrivals and restocks coming next week. Prepare the floor and inform our guests!",
    products: [
      { id: 'new1', category: 'accessories', name: 'Everywhere Belt Bag', price: convertProductPriceToCNY('$38'), image: "https://i.pinimg.com/1200x/c2/73/9b/c2739bab7682ff375ec6d6180c735650.jpg", color: 'Pastel Blue', tag: "New" },
      { id: 'new2', category: 'bottom', name: 'Wunder Train 25"', price: convertProductPriceToCNY('$98'), image: "https://i.pinimg.com/736x/89/aa/5b/89aa5b59eca424ca4c471b154c9e62f3.jpg", color: 'Java', tag: "New" },
      { id: 'new3', category: 'accessories', name: 'The Reversible Mat 5mm', price: convertProductPriceToCNY('$78'), image: "https://i.pinimg.com/1200x/65/bc/f5/65bcf532a6ab142b881357a9b5dd7232.jpg", color: 'Deep Coal', tag: "Replen" },
  ]
}


export const mockWeeklyRhythmData = [
  { name: 'Mon', value: 11, plan: formatToCNYWithoutSymbol(20000), actual: formatToCNYWithoutSymbol(22200) },
  { name: 'Tue', value: 13, plan: formatToCNYWithoutSymbol(21000), actual: formatToCNYWithoutSymbol(23730) },
  { name: 'Wed', value: 12, plan: formatToCNYWithoutSymbol(22000), actual: formatToCNYWithoutSymbol(24640) },
  { name: 'Thu', value: 12, plan: formatToCNYWithoutSymbol(23000), actual: formatToCNYWithoutSymbol(25760) },
  { name: 'Fri', value: 13, plan: formatToCNYWithoutSymbol(24000), actual: formatToCNYWithoutSymbol(27120) },
  { name: 'Sat', value: 19, plan: formatToCNYWithoutSymbol(28000), actual: formatToCNYWithoutSymbol(33320) },
  { name: 'Sun', value: 18, plan: formatToCNYWithoutSymbol(27000), actual: formatToCNYWithoutSymbol(31860) },
];

// Weather forecast mock data (10 days)
export interface WeatherForecastDay {
  id: string;
  name: string;
  dateString: string; // Date as string for display
  value: number; // Temperature in Celsius
  weather: string; // Weather condition
  icon?: string; // Icon name for the weather condition
  humidity?: number;
  wind?: number;
  [key: string]: string | number | Date | undefined;
}

export const mockWeatherForecastData: WeatherForecastDay[] = [
  { id: 'day1', name: 'Today', dateString: '2025-11-05', value: 10, weather: 'Partly Cloudy', icon: 'partly_cloudy_day', humidity: 65, wind: 15 },
  { id: 'day2', name: 'Nov 6', dateString: '2025-11-06', value: 10, weather: 'Cloudy', icon: 'cloudy', humidity: 70, wind: 18 },
  { id: 'day3', name: 'Nov 7', dateString: '2025-11-07', value: 5, weather: 'Light Rain', icon: 'rainy_light', humidity: 85, wind: 22 },
  { id: 'day4', name: 'Nov 8', dateString: '2025-11-08', value: 9, weather: 'Rainy', icon: 'rainy', humidity: 90, wind: 20 },
  { id: 'day5', name: 'Nov 9', dateString: '2025-11-09', value: -1, weather: 'Cloudy', icon: 'cloudy', humidity: 80, wind: 16 },
  { id: 'day6', name: 'Nov 10', dateString: '2025-11-10', value: -3, weather: 'Partly Cloudy', icon: 'partly_cloudy_day', humidity: 70, wind: 14 },
  { id: 'day7', name: 'Nov 11', dateString: '2025-11-11', value: 3, weather: 'Sunny', icon: 'wb_sunny', humidity: 60, wind: 10 },
  { id: 'day8', name: 'Nov 12', dateString: '2025-11-12', value: 4, weather: 'Sunny', icon: 'wb_sunny', humidity: 55, wind: 8 },
  { id: 'day9', name: 'Nov 13', dateString: '2025-11-13', value: 5, weather: 'Partly Cloudy', icon: 'partly_cloudy_day', humidity: 65, wind: 12 },
  { id: 'day10', name: 'Nov 14', dateString: '2025-11-14', value: -3, weather: 'Cloudy', icon: 'cloudy', humidity: 75, wind: 15 },
];

// New version: Weekly Rhythm with TrendChart (MultiSeriesChartData)
export const mockWeeklyRhythmChartData: MultiSeriesChartData = {
  data: mockWeeklyRhythmData,
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Weekly Performance %',
          color: 'var(--wilderness-4)',  // Base color (will be overridden by positiveColor/negativeColor)
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--hot-heat-4)',
          showLabels: true,
          labelFormatter: (value: number) => `${value}%`,
          barWidth: 40,
        },
      ],
    },
  ],
};

// New version: Weather Forecast with TrendChart (MultiSeriesChartData)
export const mockWeatherForecastChartData: MultiSeriesChartData = {
  data: mockWeatherForecastData,
  series: [
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'value',
          name: 'Temperature (°C)',
          color: 'var(--daydream-4)',  // Will be overridden by color mapping based on temperature
          barOpacity: 0.9,
        },
      ],
    },
  ],
};

// Product Focus Module - Store-selected products to track
export interface ProductFocusVariant {
  styleOption: string;
  colors: Array<{
    colorName: string;
    colorHex?: string;
    sizes: Array<{
      size: string;
      onHand: number;
      soldToday: number;
      soldWeek: number;
    }>;
  }>;
}

export interface ProductFocusItem {
  id: string;
  productName: string;
  class: string; // Product classification
  bestSellingColor: {
    name: string;
    image: string;
    hex?: string;
  };
  todayUnits: number;
  onHand: number;
  sellThroughPercent: number; // ST% = (Units Sold / Initial Stock) × 100
  weekUnits: number; // Units sold this week
  // For drill-down details
  variants: ProductFocusVariant[];
}

export interface ProductFocusData {
  introduction: string;
  availableProducts: Array<{
    id: string;
    name: string;
    class: string;
  }>;
  selectedProducts: ProductFocusItem[];
}

export const mockProductFocusData: ProductFocusData = {
  introduction: "Select and track products that are important for your store. Monitor their performance and inventory levels in real-time.",
  availableProducts: [
    { id: 'pf-available-1', name: 'Align High-Rise Pant 25"', class: 'Bottom' },
    { id: 'pf-available-2', name: 'Define Jacket', class: 'Top' },
    { id: 'pf-available-3', name: 'Scuba Oversized Hoodie', class: 'Top' },
    { id: 'pf-available-4', name: 'Everywhere Belt Bag', class: 'Accessories' },
    { id: 'pf-available-5', name: 'Wunder Train 25"', class: 'Bottom' },
    { id: 'pf-available-6', name: 'Swiftly Tech SS 2.0', class: 'Top' },
    { id: 'pf-available-7', name: 'Fast and Free 23"', class: 'Bottom' },
    { id: 'pf-available-8', name: 'All Yours Tee', class: 'Top' },
  ],
  selectedProducts: [
    {
      id: 'pf-1',
      productName: 'Align High-Rise Pant 25"',
      class: 'Bottom',
      bestSellingColor: {
        name: 'Black',
        image: 'https://i.pinimg.com/1200x/dd/18/4b/dd184bfd9d8bf57a68024d67d8d7b72b.jpg',
        hex: '#1a1a1a',
      },
      todayUnits: 12,
      onHand: 45,
      sellThroughPercent: 73,
      weekUnits: 68,
      variants: [
        {
          styleOption: 'Regular',
          colors: [
            {
              colorName: 'Black',
              colorHex: '#1a1a1a',
              sizes: [
                { size: '0', onHand: 2, soldToday: 0, soldWeek: 3 },
                { size: '2', onHand: 5, soldToday: 2, soldWeek: 8 },
                { size: '4', onHand: 8, soldToday: 3, soldWeek: 12 },
                { size: '6', onHand: 10, soldToday: 4, soldWeek: 15 },
                { size: '8', onHand: 12, soldToday: 2, soldWeek: 18 },
                { size: '10', onHand: 8, soldToday: 1, soldWeek: 12 },
              ],
            },
            {
              colorName: 'Navy',
              colorHex: '#1e3a5f',
              sizes: [
                { size: '2', onHand: 3, soldToday: 1, soldWeek: 5 },
                { size: '4', onHand: 4, soldToday: 1, soldWeek: 6 },
                { size: '6', onHand: 6, soldToday: 2, soldWeek: 8 },
                { size: '8', onHand: 5, soldToday: 1, soldWeek: 7 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'pf-2',
      productName: 'Define Jacket',
      class: 'Top',
      bestSellingColor: {
        name: 'Black',
        image: 'https://i.pinimg.com/736x/dd/f6/20/ddf62093da84fdb8b1c482a3d4f0d240.jpg',
        hex: '#1a1a1a',
      },
      todayUnits: 8,
      onHand: 28,
      sellThroughPercent: 65,
      weekUnits: 42,
      variants: [
        {
          styleOption: 'Hooded',
          colors: [
            {
              colorName: 'Black',
              colorHex: '#1a1a1a',
              sizes: [
                { size: 'XS', onHand: 3, soldToday: 1, soldWeek: 6 },
                { size: 'S', onHand: 6, soldToday: 2, soldWeek: 10 },
                { size: 'M', onHand: 8, soldToday: 3, soldWeek: 14 },
                { size: 'L', onHand: 7, soldToday: 2, soldWeek: 8 },
                { size: 'XL', onHand: 4, soldToday: 0, soldWeek: 4 },
              ],
            },
            {
              colorName: 'Heathered Grey',
              colorHex: '#9e9e9e',
              sizes: [
                { size: 'S', onHand: 2, soldToday: 0, soldWeek: 3 },
                { size: 'M', onHand: 4, soldToday: 1, soldWeek: 5 },
                { size: 'L', onHand: 3, soldToday: 0, soldWeek: 4 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'pf-3',
      productName: 'Scuba Oversized Hoodie',
      class: 'Top',
      bestSellingColor: {
        name: 'Heathered Grey',
        image: 'https://i.pinimg.com/1200x/5d/31/ec/5d31ec1add2b2e902ea79c491d47ff4f.jpg',
        hex: '#9e9e9e',
      },
      todayUnits: 6,
      onHand: 32,
      sellThroughPercent: 58,
      weekUnits: 35,
      variants: [
        {
          styleOption: 'Full Zip',
          colors: [
            {
              colorName: 'Heathered Grey',
              colorHex: '#9e9e9e',
              sizes: [
                { size: 'XS/S', onHand: 8, soldToday: 2, soldWeek: 12 },
                { size: 'M/L', onHand: 12, soldToday: 3, soldWeek: 15 },
                { size: 'XL/XXL', onHand: 12, soldToday: 1, soldWeek: 8 },
              ],
            },
            {
              colorName: 'Pink',
              colorHex: '#ffb6c1',
              sizes: [
                { size: 'XS/S', onHand: 4, soldToday: 0, soldWeek: 5 },
                { size: 'M/L', onHand: 6, soldToday: 2, soldWeek: 8 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

