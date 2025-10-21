export interface TrendingDataPoint {
  date: string;
  value: number;
}

export interface BrandTrendingData {
  brand: string;
  color: string;
  data: TrendingDataPoint[];
}

// Mock data simulating brand trending index in Chinese market
// Data represents search/interest index (0-100 scale, similar to Baidu Index)
export const brandTrendingData: BrandTrendingData[] = [
  {
    brand: 'Lululemon',
    color: '#D31334', // Lululemon brand color
    data: [
      { date: '2025-01', value: 65 },
      { date: '2025-02', value: 72 },
      { date: '2025-03', value: 78 },
      { date: '2025-04', value: 82 },
      { date: '2025-05', value: 85 },
      { date: '2025-06', value: 88 },
      { date: '2025-07', value: 92 },
      { date: '2025-08', value: 89 },
      { date: '2025-09', value: 94 },
      { date: '2025-10', value: 96 },
    ],
  },
  {
    brand: 'Nike',
    color: '#111111',
    data: [
      { date: '2025-01', value: 88 },
      { date: '2025-02', value: 86 },
      { date: '2025-03', value: 85 },
      { date: '2025-04', value: 87 },
      { date: '2025-05', value: 84 },
      { date: '2025-06', value: 83 },
      { date: '2025-07', value: 85 },
      { date: '2025-08', value: 82 },
      { date: '2025-09', value: 84 },
      { date: '2025-10', value: 83 },
    ],
  },
  {
    brand: 'Adidas',
    color: '#000000',
    data: [
      { date: '2025-01', value: 76 },
      { date: '2025-02', value: 75 },
      { date: '2025-03', value: 74 },
      { date: '2025-04', value: 73 },
      { date: '2025-05', value: 72 },
      { date: '2025-06', value: 70 },
      { date: '2025-07', value: 71 },
      { date: '2025-08', value: 69 },
      { date: '2025-09', value: 70 },
      { date: '2025-10', value: 68 },
    ],
  },
  {
    brand: 'Alo Yoga',
    color: '#4A90E2',
    data: [
      { date: '2025-01', value: 42 },
      { date: '2025-02', value: 45 },
      { date: '2025-03', value: 48 },
      { date: '2025-04', value: 52 },
      { date: '2025-05', value: 55 },
      { date: '2025-06', value: 58 },
      { date: '2025-07', value: 62 },
      { date: '2025-08', value: 65 },
      { date: '2025-09', value: 68 },
      { date: '2025-10', value: 71 },
    ],
  },
  {
    brand: 'Athleta',
    color: '#FF6B35',
    data: [
      { date: '2025-01', value: 38 },
      { date: '2025-02', value: 40 },
      { date: '2025-03', value: 42 },
      { date: '2025-04', value: 43 },
      { date: '2025-05', value: 45 },
      { date: '2025-06', value: 47 },
      { date: '2025-07', value: 49 },
      { date: '2025-08', value: 51 },
      { date: '2025-09', value: 53 },
      { date: '2025-10', value: 55 },
    ],
  },
];

export const dataSourceInfo = {
  title: 'Brand Trending Index',
  description: 'Search and interest trends for athletic wear brands in Chinese market',
  sources: [
    'Baidu Index (百度指数)',
    'Weibo Social Media Analytics',
    'Tmall & JD.com E-commerce Data',
  ],
  metrics: 'Combined index (0-100) representing brand popularity and search volume',
  period: 'January 2025 - October 2025',
};

