# Multi-Series Chart Quick Start (混合图表快速开始)

## 快速示例 (Quick Example)

### 需求 (Requirement)

在同一个图表中：
- 用**柱状图**显示实际销售额
- 用**虚线**显示目标值

### 实现 (Implementation)

```typescript
import { TrendChart } from '@lululemon-ui'
import type { MultiSeriesChartData } from '@lululemon-ui'

// 1. 定义数据结构
const chartData: MultiSeriesChartData = {
  // 共享的数据点（x 轴相同）
  data: [
    { id: 'h1', name: '10:00-12:00', actual: 19834, target: 29765 },
    { id: 'h2', name: '12:00-14:00', actual: 36848, target: 48186 },
    { id: 'h3', name: '14:00-16:00', actual: 24801, target: 29765 },
    { id: 'h4', name: '16:00-18:00', actual: 43234, target: 42519 },
    { id: 'h5', name: '18:00-20:00', actual: 34012, target: 37563 },
  ],
  
  // 定义多个系列，每个系列可以有不同的显示模式
  series: [
    // 系列 1：柱状图显示实际值
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'actual',
          name: 'Actual Sales',
          color: 'var(--hot-heat-4)',
        },
      ],
    },
    // 系列 2：线图显示目标值
    {
      defaultShowAs: 'line',
      lines: [
        {
          dataKey: 'target',
          name: 'Target',
          color: 'var(--hot-heat-4)',
          strokeDasharray: '5 5',  // 虚线
          opacity: 0.4,
        },
      ],
    },
  ],
}

// 2. 使用组件
function MyComponent() {
  return (
    <TrendChart
      title="Today's Performance"
      multiSeries={chartData}
      showGrid={true}
      showLegend={true}
    />
  )
}
```

## 数据格式 (Data Format)

```typescript
{
  data: [
    // 所有系列共享的数据点
    { id, name, value1, value2, ... }
  ],
  series: [
    // 系列 1
    {
      defaultShowAs: 'column',  // 或 'line', 'area'
      lines: [{ dataKey, name, color }]
    },
    // 系列 2
    {
      defaultShowAs: 'line',
      lines: [{ dataKey, name, color }]
    }
  ]
}
```

## 三个关键点 (3 Key Points)

### 1️⃣ 共享数据 (Shared Data)

所有系列使用**同一个 data 数组**：

```typescript
data: [
  { name: 'Jan', sales: 100, target: 120, trend: 110 }
  // ↑ 这一条数据可以被多个系列使用
]
```

### 2️⃣ 独立显示 (Independent Display)

每个系列可以有**不同的显示模式**：

```typescript
series: [
  { defaultShowAs: 'column', ... },  // 柱状图
  { defaultShowAs: 'line', ... },    // 线图
  { defaultShowAs: 'area', ... },    // 面积图
]
```

### 3️⃣ dataKey 关联 (dataKey Mapping)

通过 `dataKey` 关联数据：

```typescript
data: [
  { name: 'Jan', actual: 100, target: 120 }
  //            ^^^^^^        ^^^^^^
]

series: [
  {
    lines: [{ dataKey: 'actual', ... }]
    //                  ^^^^^^ 对应 data 中的字段
  },
  {
    lines: [{ dataKey: 'target', ... }]
    //                  ^^^^^^ 对应 data 中的字段
  }
]
```

## 常见组合 (Common Combinations)

### 📊 柱状图 + 线图 (Column + Line)

```typescript
series: [
  { defaultShowAs: 'column', lines: [/* actual values */] },
  { defaultShowAs: 'line', lines: [/* targets */] }
]
```

**用途**: 实际值 vs 目标值

### 📈 面积图 + 线图 (Area + Line)

```typescript
series: [
  { defaultShowAs: 'area', lines: [/* range */] },
  { defaultShowAs: 'line', lines: [/* average */] }
]
```

**用途**: 范围 + 平均值

### 🎯 柱状图 + 柱状图 + 线图 (Column + Column + Line)

```typescript
series: [
  { defaultShowAs: 'column', lines: [/* actual */] },
  { defaultShowAs: 'column', lines: [/* plan */] },
  { defaultShowAs: 'line', lines: [/* target */] }
]
```

**用途**: 多维度对比

## TypeScript 类型 (Types)

```typescript
import type { 
  MultiSeriesChartData,
  ChartSeriesConfig,
  TrendChartLine,
  TrendChartDataPoint 
} from '@lululemon-ui'

// 完整类型定义
const data: MultiSeriesChartData = {
  data: TrendChartDataPoint[],
  series: ChartSeriesConfig[]
}
```

## 在 SwitchableDataWidget 中使用

```typescript
<SwitchableDataWidget
  widgetId="my-widget"
  showHeader={true}
  headerTitle="My Chart"
  tableConfig={{
    columns: [...],
    data: [...],
  }}
  chartConfig={{
    multiSeries: chartData,  // ← 使用 multiSeries
    height: 300,
    showGrid: true,
    showLegend: true,
  }}
/>
```

## 完整示例：Today's Plan

参考 JingjingOnePage_V0 的实现：

**数据定义** (`data.ts`):

```typescript
chartMultiSeries: {
  data: mockTargetTableData.map((row) => ({
    id: row.id,
    name: row.time,
    netSalesAchieved: row.netSales.achieve,
    netSalesGoal: row.netSales.goal,
  })),
  series: [
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: "netSalesAchieved",
          name: "Net Sales (Achieved)",
          color: "var(--hot-heat-4)",
        },
      ],
    },
    {
      defaultShowAs: 'line',
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
}
```

**使用** (`index.tsx`):

```typescript
chartConfig={{
  multiSeries: mockDashboardData.todayTargetDetail.chartMultiSeries,
  height: 300,
  showGrid: true,
  showLegend: true,
}}
```

## 调试提示 (Debug Tips)

### ❌ 常见错误 1：数据不匹配

```typescript
// 错误：dataKey 不存在于 data 中
data: [{ name: 'Jan', sales: 100 }],
series: [{ 
  lines: [{ dataKey: 'revenue' }]  // ❌ 'revenue' 不存在
}]

// 正确：
data: [{ name: 'Jan', revenue: 100 }],
series: [{ 
  lines: [{ dataKey: 'revenue' }]  // ✅ 匹配
}]
```

### ❌ 常见错误 2：x 轴不一致

```typescript
// 错误：每个数据点必须有 'name' 字段
data: [
  { id: '1', label: 'Jan', value: 100 }  // ❌ 没有 'name'
]

// 正确：
data: [
  { id: '1', name: 'Jan', value: 100 }  // ✅ 有 'name'
]
```

## 总结 (Summary)

混合图表的核心是：

1. **一份数据** - 所有系列共享
2. **多种显示** - 每个系列可以不同
3. **灵活组合** - line, column, area 任意搭配

```typescript
multiSeries={{
  data: [...],      // 共享数据
  series: [         // 不同显示
    { defaultShowAs: 'column', lines: [...] },
    { defaultShowAs: 'line', lines: [...] },
  ]
}}
```

就这么简单！🎉

