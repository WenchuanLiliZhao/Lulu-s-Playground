# Multi-Series Chart Implementation (混合图表实现)

## 概述 (Overview)

TrendChart 组件现在支持在同一个图表中混合显示不同类型的数据系列（线图、柱状图、面积图）。这使用 Recharts 的 `ComposedChart` 实现。

TrendChart component now supports mixing different chart types (line, column, area) in a single visualization using Recharts' `ComposedChart`.

## 新数据结构 (New Data Structure)

### MultiSeriesChartData 接口

```typescript
export interface MultiSeriesChartData {
  /**
   * Shared data points for all series
   * All series will use the same x-axis (name field)
   */
  data: TrendChartDataPoint[]
  
  /**
   * Array of series configurations
   * Each series can have a different display mode
   */
  series: ChartSeriesConfig[]
}

export interface ChartSeriesConfig {
  defaultShowAs: 'line' | 'column' | 'area'
  lines: TrendChartLine[]
}
```

### 关键特性 (Key Features)

1. **共享数据** - 所有系列共享相同的 x 轴数据点
2. **独立类型** - 每个系列可以有不同的显示模式
3. **灵活配置** - 可以混合任意数量的线图、柱状图和面积图

## 使用示例 (Usage Examples)

### Example 1: 混合柱状图和线图 (Column + Line)

```typescript
import type { MultiSeriesChartData } from '@lululemon-ui'

const chartData: MultiSeriesChartData = {
  // Shared data for both series
  data: [
    { id: 'h10-12', name: '10:00-12:00', achieved: 19834, goal: 29765 },
    { id: 'h12-14', name: '12:00-14:00', achieved: 36848, goal: 48186 },
    { id: 'h14-16', name: '14:00-16:00', achieved: 24801, goal: 29765 },
    { id: 'h16-18', name: '16:00-18:00', achieved: 43234, goal: 42519 },
    { id: 'h18-20', name: '18:00-20:00', achieved: 34012, goal: 37563 },
  ],
  // Different series with different display modes
  series: [
    {
      defaultShowAs: 'column',  // Show achieved as bars
      lines: [
        {
          dataKey: 'achieved',
          name: 'Sales Achieved',
          color: 'var(--hot-heat-4)',
        },
      ],
    },
    {
      defaultShowAs: 'line',  // Show goal as line
      lines: [
        {
          dataKey: 'goal',
          name: 'Sales Goal',
          color: 'var(--hot-heat-4)',
          strokeDasharray: '5 5',
          opacity: 0.4,
        },
      ],
    },
  ],
}

// Use in component
<TrendChart
  title="Today's Sales Performance"
  multiSeries={chartData}
  showGrid={true}
  showLegend={true}
/>
```

### Example 2: 混合三种图表类型 (Line + Column + Area)

```typescript
const chartData: MultiSeriesChartData = {
  data: [
    { id: 'jan', name: 'Jan', revenue: 45000, target: 40000, trend: 38000 },
    { id: 'feb', name: 'Feb', revenue: 48000, target: 42000, trend: 42000 },
    { id: 'mar', name: 'Mar', revenue: 52000, target: 45000, trend: 46000 },
  ],
  series: [
    {
      defaultShowAs: 'area',  // Background trend as area
      lines: [
        {
          dataKey: 'trend',
          name: 'Historical Trend',
          color: '#8884d8',
          opacity: 0.3,
        },
      ],
    },
    {
      defaultShowAs: 'column',  // Actual revenue as columns
      lines: [
        {
          dataKey: 'revenue',
          name: 'Actual Revenue',
          color: '#82ca9d',
        },
      ],
    },
    {
      defaultShowAs: 'line',  // Target as line
      lines: [
        {
          dataKey: 'target',
          name: 'Target',
          color: '#ffc658',
          strokeWidth: 3,
        },
      ],
    },
  ],
}

<TrendChart
  title="Monthly Performance Overview"
  multiSeries={chartData}
  barSize={60}
  barRadius={[8, 8, 0, 0]}
/>
```

### Example 3: 多条线图 + 柱状图 (Multiple Lines + Columns)

```typescript
const chartData: MultiSeriesChartData = {
  data: [
    { id: 'w1', name: 'Week 1', sales: 12000, target: 10000, uv: 3400, pv: 2400 },
    { id: 'w2', name: 'Week 2', sales: 13000, target: 11000, uv: 3000, pv: 2210 },
    { id: 'w3', name: 'Week 3', sales: 14500, target: 12000, uv: 2000, pv: 2290 },
  ],
  series: [
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'sales',
          name: 'Sales',
          color: 'var(--indigo-4)',
        },
        {
          dataKey: 'target',
          name: 'Target',
          color: 'var(--amber-4)',
        },
      ],
    },
    {
      defaultShowAs: 'line',
      lines: [
        {
          dataKey: 'uv',
          name: 'Unique Visitors',
          color: 'var(--wilderness-4)',
          strokeWidth: 2,
        },
        {
          dataKey: 'pv',
          name: 'Page Views',
          color: 'var(--hot-heat-4)',
          strokeWidth: 2,
          strokeDasharray: '5 5',
        },
      ],
    },
  ],
}
```

## JingjingOnePage_V0 实现 (Implementation in JingjingOnePage_V0)

### 数据结构 (Data Structure)

**File**: `app/src/pages/playground/_luluDemo/JingjingOnePage_V0/data.ts`

```typescript
import type { MultiSeriesChartData } from '../../../../components/ui/forDashboard/TrendChart'

export interface TodayTargetDetail {
  // ... other properties
  chartMultiSeries: MultiSeriesChartData
}

export const mockDashboardData: DashboardData = {
  // ... other data
  todayTargetDetail: {
    // ... other properties
    chartMultiSeries: {
      data: mockTargetTableData.map((row) => ({
        id: row.id,
        name: row.time,
        netSalesAchieved: row.netSales.achieve,
        netSalesGoal: row.netSales.goal,
      })),
      series: [
        {
          defaultShowAs: 'column',  // Achieved sales as columns
          lines: [
            {
              dataKey: "netSalesAchieved",
              name: "Net Sales (Achieved)",
              color: "var(--hot-heat-4)",
            },
          ],
        },
        {
          defaultShowAs: 'line',  // Goal as dashed line
          lines: [
            {
              dataKey: "netSalesGoal",
              name: "Net Sales (Goal)",
              color: "var(--hot-heat-4)",
              strokeDasharray: "5 5",
              opacity: 0.4,
            },
          ],
        },
      ],
    },
  },
}
```

### 使用方法 (Usage)

**File**: `app/src/pages/playground/_luluDemo/JingjingOnePage_V0/index.tsx`

```typescript
<SwitchableDataWidget
  widgetId="today-plan"
  showHeader={true}
  headerTitle="Today's Plan"
  tableConfig={{
    columns: columns,
    data: mockTargetTableData,
    // ... other table config
  }}
  chartConfig={{
    multiSeries: mockDashboardData.todayTargetDetail.chartMultiSeries,
    height: 300,
    showGrid: true,
    showLegend: true,
    showXAxis: true,
    showYAxis: true,
  }}
/>
```

## 与旧格式对比 (Comparison with Legacy Format)

### 旧格式 (Legacy Format) - 单一图表类型

```typescript
// ❌ 只能使用一种图表类型
{
  series: [
    {
      defaultShowAs: 'line',  // 所有数据只能是线图
      lines: [...]
    }
  ]
}
```

### 新格式 (New Format) - 混合图表类型

```typescript
// ✅ 可以混合多种图表类型
{
  data: [...],  // 共享的数据
  series: [
    {
      defaultShowAs: 'column',  // 这部分数据显示为柱状图
      lines: [...]
    },
    {
      defaultShowAs: 'line',  // 这部分数据显示为线图
      lines: [...]
    },
    {
      defaultShowAs: 'area',  // 这部分数据显示为面积图
      lines: [...]
    }
  ]
}
```

## Props 优先级 (Props Priority)

TrendChart 组件按以下优先级处理数据：

1. **`multiSeries`** (highest priority) - 混合图表模式
2. **`series`** - 单一图表类型模式（已弃用，用于向后兼容）
3. **`data` + `lines`** (lowest priority) - 传统模式

## 技术实现 (Technical Implementation)

### 使用 ComposedChart

```typescript
import { ComposedChart, Line, Bar, Area } from 'recharts'

// Multi-series rendering
<ComposedChart data={filteredData}>
  <CartesianGrid />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  
  {/* Dynamically render different chart types */}
  {series.map((seriesItem) => {
    switch (seriesItem.defaultShowAs) {
      case 'column':
        return <Bar dataKey={...} ... />
      case 'area':
        return <Area dataKey={...} ... />
      case 'line':
        return <Line dataKey={...} ... />
    }
  })}
</ComposedChart>
```

## 优势 (Advantages)

1. **更强的表现力** - 在一个图表中展示不同类型的数据
2. **更好的对比** - 柱状图显示实际值，线图显示目标
3. **灵活配置** - 每个系列独立配置
4. **类型安全** - 完整的 TypeScript 支持
5. **向后兼容** - 不影响现有代码

## 最佳实践 (Best Practices)

### 1. 数据一致性

确保所有系列使用相同的 x 轴字段（`name`）：

```typescript
✅ Good:
data: [
  { id: 'h1', name: '10:00-12:00', sales: 100, target: 120 },
  { id: 'h2', name: '12:00-14:00', sales: 150, target: 140 },
]

❌ Bad: 
// Don't put different data arrays in different series
```

### 2. 颜色搭配

使用设计系统的颜色，确保视觉清晰：

```typescript
✅ Good:
series: [
  {
    defaultShowAs: 'column',
    lines: [{ color: 'var(--hot-heat-4)' }]  // 主要数据用实色
  },
  {
    defaultShowAs: 'line',
    lines: [{ 
      color: 'var(--hot-heat-4)',
      strokeDasharray: '5 5',  // 次要数据用虚线
      opacity: 0.4 
    }]
  },
]
```

### 3. 图表类型选择

- **柱状图 (Column)**: 实际值、完成值
- **线图 (Line)**: 目标、趋势、预测
- **面积图 (Area)**: 背景趋势、范围

## 类型定义 (Type Definitions)

完整的类型导出：

```typescript
import type {
  MultiSeriesChartData,
  ChartSeriesConfig,
  ChartDisplayMode,
  TrendChartLine,
  TrendChartDataPoint,
} from '@lululemon-ui'
```

## 验证 (Verification)

✅ TypeScript 编译通过  
✅ 无 Lint 错误  
✅ 类型安全检查通过  
✅ 向后兼容性保持  

## 总结 (Summary)

新的 `multiSeries` 格式提供了：

- 🎨 **混合可视化** - 在一个图表中组合多种图表类型
- 📊 **更好的数据表达** - 用不同的视觉形式展示不同的数据意义
- 🔧 **灵活配置** - 每个系列独立控制显示方式
- 💪 **类型安全** - 完整的 TypeScript 支持
- ♻️ **向后兼容** - 不破坏现有代码

这使得 TrendChart 成为一个真正的通用 XY 轴图表组件！

