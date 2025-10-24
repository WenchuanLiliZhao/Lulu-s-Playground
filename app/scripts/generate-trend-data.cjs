#!/usr/bin/env node

/**
 * Script to generate static trend data for 2023-2025
 * 
 * Usage: node scripts/generate-trend-data.cjs
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../src/pages/playground/_luluDemo/SalesEventTrend_V1/data');
const SALES_OUTPUT_FILE = path.join(OUTPUT_DIR, 'staticSalesData.ts');
const USER_GROWTH_OUTPUT_FILE = path.join(OUTPUT_DIR, 'staticUserGrowthData.ts');

/**
 * Generates GMV value for a specific date with GMV-specific patterns
 */
function generateGMVValue(date, baseValue, seedOffset = 0) {
  const month = date.getMonth();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  
  // Year growth factor (2023 baseline, 2024 +15%, 2025 +30%)
  const yearMultiplier = 1 + ((year - 2023) * 0.15);
  
  // Seasonal multiplier (higher in Q4, lower in Q1)
  const seasonalMultiplier = 1 + (month / 12) * 0.5;
  
  // Weekend boost (Saturday and Sunday)
  const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1.0;
  
  // Monthly pattern (peaks mid-month and end of month)
  const monthlyPattern = 1 + Math.sin((dayOfMonth / 30) * Math.PI) * 0.15;
  
  // Add some randomness (seeded by date for consistency)
  const randomFactor = 0.85 + seededRandom(year, month, dayOfMonth, seedOffset) * 0.3;
  
  const totalMultiplier = yearMultiplier * seasonalMultiplier * weekendMultiplier * monthlyPattern * randomFactor;
  
  return Math.round(baseValue * totalMultiplier);
}

/**
 * Generates NetSales value for a specific date with NetSales-specific patterns
 */
function generateNetSalesValue(date, baseValue, seedOffset = 1000) {
  const month = date.getMonth();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  
  // Year growth factor (different from GMV - slower growth)
  const yearMultiplier = 1 + ((year - 2023) * 0.12);
  
  // Seasonal multiplier (different pattern - peaks in Q2 and Q4)
  const seasonalMultiplier = 1 + Math.sin((month / 12) * Math.PI * 2) * 0.3;
  
  // Weekday pattern (different from GMV - stronger weekday performance)
  const weekdayMultiplier = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 1.2 : 0.8;
  
  // Monthly pattern (different cycle - peaks at beginning and end)
  const monthlyPattern = 1 + Math.sin((dayOfMonth / 15) * Math.PI) * 0.2;
  
  // Add some randomness with different seed
  const randomFactor = 0.8 + seededRandom(year, month, dayOfMonth, seedOffset) * 0.4;
  
  const totalMultiplier = yearMultiplier * seasonalMultiplier * weekdayMultiplier * monthlyPattern * randomFactor;
  
  return Math.round(baseValue * totalMultiplier);
}

/**
 * Generates daily sales data for 2023-2025
 */
function generateDailySalesData() {
  const data = [];
  const startDate = new Date(2023, 0, 1); // Jan 1, 2023
  const endDate = new Date(2025, 11, 31); // Dec 31, 2025
  
  // Base values with seasonal trends
  const baseRevenue = 400;
  const baseOrders = 28;
  const baseNetSales = 340; // Different base for NetSales
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth();
    const dayOfMonth = d.getDate();
    const year = d.getFullYear();
    
    // Generate GMV with one pattern
    const gmv = generateGMVValue(d, baseRevenue, 0);
    
    // Generate NetSales with different pattern
    const netSales = generateNetSalesValue(d, baseNetSales, 1000);
    
    // Transaction follows GMV pattern
    const transactionMultiplier = (gmv / baseRevenue);
    const transaction = Math.round(baseOrders * transactionMultiplier);
    
    data.push({
      id: `${year}-${String(month + 1).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`,
      name: `${String(year).slice(-2)}/${month + 1}/${dayOfMonth}`,
      date: d.toISOString(),
      gmv,
      transaction,
      netSales,
    });
  }
  
  return data;
}

/**
 * Generates daily user growth data for 2023-2025
 */
function generateDailyUserGrowthData() {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2025, 11, 31);
  
  let cumulativeUsers = 2000;
  const baseNewSignups = 15;
  const baseGMV = 30000; // Different base for GMV in user growth
  const baseNetSales = 25000; // Different base for NetSales in user growth
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth();
    const dayOfWeek = d.getDay();
    const year = d.getFullYear();
    const dayOfMonth = d.getDate();
    
    // Year growth factor
    const yearMultiplier = 1 + ((year - 2023) * 0.15);
    
    // Growth trend throughout the year
    const growthMultiplier = 1 + (month / 12) * 0.8;
    
    // Weekday pattern (more signups on Mon-Wed)
    const weekdayMultiplier = (dayOfWeek >= 1 && dayOfWeek <= 3) ? 1.2 : 0.9;
    
    const randomFactor = 0.7 + seededRandom(year, month, dayOfMonth) * 0.6;
    
    const transaction = Math.round(baseNewSignups * yearMultiplier * growthMultiplier * weekdayMultiplier * randomFactor);
    cumulativeUsers += transaction * 0.9; // Net growth (accounting for churn)
    
    // Generate GMV with user growth specific pattern (seed offset 2000)
    const gmv = generateGMVValue(d, baseGMV, 2000);
    
    // Generate NetSales with user growth specific pattern (seed offset 3000)
    const netSales = generateNetSalesValue(d, baseNetSales, 3000);
    
    data.push({
      id: `${year}-${String(month + 1).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`,
      name: `${String(year).slice(-2)}/${month + 1}/${dayOfMonth}`,
      date: d.toISOString(),
      gmv,
      transaction,
      netSales,
    });
  }
  
  return data;
}

/**
 * Seeded random number generator for consistent results
 */
function seededRandom(year, month, day, seedOffset = 0) {
  const seed = year * 10000 + month * 100 + day + seedOffset;
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Format data point for TypeScript output
 */
function formatDataPoint(point, indent = '  ') {
  return `${indent}{
${indent}  id: '${point.id}',
${indent}  name: '${point.name}',
${indent}  date: new Date('${point.date}'),
${indent}  gmv: ${point.gmv},
${indent}  transaction: ${point.transaction},
${indent}  netSales: ${point.netSales},
${indent}}`;
}

/**
 * Generate TypeScript file content
 */
function generateTsFileContent(data, exportName, description) {
  const formattedData = data.map(point => formatDataPoint(point)).join(',\n');
  
  return `import type { TrendChartDataPoint } from '../../../../../components/ui/forDashboard/TrendChart'

/**
 * ${description}
 * Generated by scripts/generate-trend-data.cjs
 * 
 * @generated
 * Do not edit this file directly. Run 'npm run generate:trend-data' to regenerate.
 */
export const ${exportName}: TrendChartDataPoint[] = [
${formattedData},
]
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Generating static trend data for 2023-2025...\n');
  
  // Generate sales data
  console.log('📊 Generating sales data...');
  const salesData = generateDailySalesData();
  const salesContent = generateTsFileContent(
    salesData,
    'dailySalesData',
    'Static daily sales data for 2023-2025'
  );
  
  fs.writeFileSync(SALES_OUTPUT_FILE, salesContent, 'utf8');
  console.log(`✅ Generated ${SALES_OUTPUT_FILE}`);
  console.log(`   - ${salesData.length} data points\n`);
  
  // Generate user growth data
  console.log('📈 Generating user growth data...');
  const userGrowthData = generateDailyUserGrowthData();
  const userGrowthContent = generateTsFileContent(
    userGrowthData,
    'dailyUserGrowthData',
    'Static daily user growth data for 2023-2025'
  );
  
  fs.writeFileSync(USER_GROWTH_OUTPUT_FILE, userGrowthContent, 'utf8');
  console.log(`✅ Generated ${USER_GROWTH_OUTPUT_FILE}`);
  console.log(`   - ${userGrowthData.length} data points\n`);
  
  console.log('🎉 Done! Static trend data generated successfully.');
  console.log('\n📝 Next steps:');
  console.log('   1. Update salesData.ts to import from static files');
  console.log('   2. Test the trend chart with new data');
}

// Run the script
try {
  main();
} catch (error) {
  console.error('❌ Error generating trend data:', error);
  process.exit(1);
}

