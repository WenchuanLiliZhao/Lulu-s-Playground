# Chart Styling Configuration Guide (图表样式配置指南)

## 概述 (Overview)

TrendChart 组件现在支持为每个数据系列单独配置样式属性，包括：
- **粗细**：线条粗细、边框粗细
- **透明度**：填充透明度、线条透明度
- **宽度**：柱子宽度

## 样式属性完整列表 (Complete Style Properties)

```typescript
export interface TrendChartLine {
  dataKey: string
  name: string
  color: string
  
  // === Line Chart 线图专用属性 ===
  strokeWidth?: number        // 线条粗细 (default: 2)
  strokeDasharray?: string    // 虚线样式 (e.g., "5 5")
  strokeOpacity?: number      // 线条透明度 (0-1, default: 1)
  
  // === Area Chart 面积图专用属性 ===
  fillOpacity?: number        // 填充透明度 (0-1, default: 0.6)
  // + strokeWidth, strokeOpacity (边框样式)
  
  // === Column Chart 柱状图专用属性 ===
  barWidth?: number          // 柱子宽度（像素）
  barOpacity?: number        // 柱子透明度 (0-1, default: 1)
  
  // === Legacy 向后兼容 ===
  opacity?: number           // 通用透明度（被上述专用属性覆盖）
}
```

## 使用示例 (Usage Examples)

### Example 1: 线图样式配置 (Line Chart Styling)

```typescript
const chartData: MultiSeriesChartData = {
  data: [
    { id: '1', name: 'Jan', value: 100 },
    { id: '2', name: 'Feb', value: 120 },
    { id: '3', name: 'Mar', value: 140 },
  ],
  series: [
    {
      defaultShowAs: 'line',
      lines: [
        {
          dataKey: 'value',
          name: 'Revenue',
          color: 'var(--indigo-4)',
          strokeWidth: 3,           // ← 粗线条
          strokeOpacity: 0.8,       // ← 80% 透明度
        },
      ],
    },
  ],
}
```

**效果**: 粗的、半透明的线条

### Example 2: 虚线样式 (Dashed Line)

```typescript
{
  dataKey: 'target',
  name: 'Target',
  color: 'var(--hot-heat-4)',
  strokeWidth: 2,
  strokeDasharray: '5 5',      // ← 虚线（5px 实线，5px 空白）
  strokeOpacity: 0.6,          // ← 60% 透明度
}
```

**常见虚线样式**:
- `"5 5"` - 标准虚线
- `"10 5"` - 长虚线
- `"2 3"` - 点状线
- `"10 5 2 5"` - 点划线

### Example 3: 柱状图样式配置 (Column Chart Styling)

```typescript
const chartData: MultiSeriesChartData = {
  data: [
    { id: '1', name: 'Product A', sales: 150, target: 120 },
    { id: '2', name: 'Product B', sales: 180, target: 160 },
  ],
  series: [
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'sales',
          name: 'Actual Sales',
          color: 'var(--wilderness-4)',
          barOpacity: 0.9,         // ← 90% 透明度
          barWidth: 40,            // ← 40px 宽的柱子
        },
        {
          dataKey: 'target',
          name: 'Target',
          color: 'var(--amber-4)',
          barOpacity: 0.5,         // ← 50% 透明度（更透明，显示对比）
          barWidth: 30,            // ← 30px 宽的柱子
        },
      ],
    },
  ],
}
```

### Example 4: 面积图样式配置 (Area Chart Styling)

```typescript
const chartData: MultiSeriesChartData = {
  data: [
    { id: '1', name: 'Q1', range: 100 },
    { id: '2', name: 'Q2', range: 120 },
  ],
  series: [
    {
      defaultShowAs: 'area',
      lines: [
        {
          dataKey: 'range',
          name: 'Historical Range',
          color: 'var(--cyan-4)',
          fillOpacity: 0.3,        // ← 30% 填充透明度（淡背景）
          strokeWidth: 2,          // ← 2px 边框
          strokeOpacity: 0.8,      // ← 80% 边框透明度
        },
      ],
    },
  ],
}
```

### Example 5: 混合样式 - 完整示例 (Mixed Styles - Complete Example)

```typescript
import type { MultiSeriesChartData } from '@lululemon-ui'

const chartData: MultiSeriesChartData = {
  // Shared data
  data: [
    { 
      id: 'h1', 
      name: '10:00-12:00', 
      achieved: 19834, 
      target: 29765,
      trend: 25000
    },
    { 
      id: 'h2', 
      name: '12:00-14:00', 
      achieved: 36848, 
      target: 48186,
      trend: 40000
    },
    { 
      id: 'h3', 
      name: '14:00-16:00', 
      achieved: 24801, 
      target: 29765,
      trend: 28000
    },
  ],
  
  series: [
    // 系列 1: 面积图 - 趋势背景
    {
      defaultShowAs: 'area',
      lines: [
        {
          dataKey: 'trend',
          name: 'Historical Trend',
          color: '#8884d8',
          fillOpacity: 0.2,        // 非常淡的背景
          strokeWidth: 1,          // 细边框
          strokeOpacity: 0.5,      // 半透明边框
        },
      ],
    },
    
    // 系列 2: 柱状图 - 实际值
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'achieved',
          name: 'Achieved',
          color: 'var(--hot-heat-4)',
          barOpacity: 0.85,        // 略微透明，显示背景
          barWidth: 50,            // 50px 宽的柱子
        },
      ],
    },
    
    // 系列 3: 线图 - 目标线
    {
      defaultShowAs: 'line',
      lines: [
        {
          dataKey: 'target',
          name: 'Target',
          color: 'var(--hot-heat-4)',
          strokeWidth: 3,          // 粗线强调
          strokeDasharray: '8 4',  // 长虚线
          strokeOpacity: 0.7,      // 70% 透明度
        },
      ],
    },
  ],
}

// 使用
<TrendChart
  title="Sales Performance"
  multiSeries={chartData}
  showGrid={true}
  showLegend={true}
/>
```

## 属性优先级 (Property Priority)

### 透明度优先级 (Opacity Priority)

```typescript
// Line Chart
strokeOpacity ?? opacity ?? 1

// Area Chart
fillOpacity ?? opacity ?? 0.6    // 填充
strokeOpacity ?? 1                // 边框

// Column Chart
barOpacity ?? opacity ?? 1
```

### 宽度优先级 (Width Priority)

```typescript
// Column Chart
line.barWidth ?? global.barSize ?? auto

// Line Chart
line.strokeWidth ?? 2
```

## JingjingOnePage_V0 更新示例

更新您的数据配置：

```typescript
// File: data.ts
chartMultiSeries: {
  data: mockTargetTableData.map((row) => ({
    id: row.id,
    name: row.time,
    netSalesAchieved: row.netSales.achieve,
    netSalesGoal: row.netSales.goal,
  })),
  series: [
    {
      defaultShowAs: 'area',
      lines: [
        {
          dataKey: "netSalesAchieved",
          name: "Net Sales (Achieved)",
          color: "var(--hot-heat-4)",
          fillOpacity: 0.7,          // ← 70% 填充透明度
          strokeWidth: 2,            // ← 2px 边框
          strokeOpacity: 0.9,        // ← 90% 边框透明度
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
          strokeWidth: 3,            // ← 3px 粗线
          strokeDasharray: "5 5",
          strokeOpacity: 0.6,        // ← 60% 透明度
        },
      ],
    },
  ],
}
```

## 样式最佳实践 (Styling Best Practices)

### 1. 主次关系 (Primary vs Secondary)

```typescript
// ✅ Good: 主数据实色，次数据透明
series: [
  {
    defaultShowAs: 'column',
    lines: [{
      dataKey: 'actual',
      color: 'var(--indigo-4)',
      barOpacity: 1,              // 主数据：完全不透明
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: 'target',
      color: 'var(--indigo-4)',
      strokeOpacity: 0.5,         // 次数据：半透明
      strokeDasharray: '5 5',
    }]
  }
]
```

### 2. 层次感 (Layering)

```typescript
// ✅ Good: 背景最淡，前景最实
series: [
  { // 背景层
    defaultShowAs: 'area',
    lines: [{
      fillOpacity: 0.2,           // 很淡
      strokeOpacity: 0.3,
    }]
  },
  { // 中间层
    defaultShowAs: 'column',
    lines: [{
      barOpacity: 0.7,            // 中等
    }]
  },
  { // 前景层
    defaultShowAs: 'line',
    lines: [{
      strokeWidth: 3,
      strokeOpacity: 1,           // 完全不透明
    }]
  }
]
```

### 3. 对比度 (Contrast)

```typescript
// ✅ Good: 实际值用实色，目标用虚线
{
  dataKey: 'actual',
  strokeWidth: 3,
  strokeOpacity: 1,              // 实
}
{
  dataKey: 'target',
  strokeWidth: 2,
  strokeDasharray: '5 5',
  strokeOpacity: 0.6,            // 虚 + 淡
}
```

### 4. 柱子宽度 (Bar Width)

```typescript
// ✅ Good: 多个柱子时，设置不同宽度避免完全重叠
series: [
  {
    defaultShowAs: 'column',
    lines: [
      { barWidth: 50, ... },     // 宽柱子在后
      { barWidth: 30, ... },     // 窄柱子在前
    ]
  }
]
```

## 常见场景配置 (Common Scenarios)

### 场景 1: 实际 vs 目标 (Actual vs Target)

```typescript
series: [
  {
    defaultShowAs: 'column',
    lines: [{
      dataKey: 'actual',
      name: 'Actual',
      color: 'var(--wilderness-4)',
      barOpacity: 0.9,
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: 'target',
      name: 'Target',
      color: 'var(--hot-heat-4)',
      strokeWidth: 2,
      strokeDasharray: '5 5',
      strokeOpacity: 0.7,
    }]
  }
]
```

### 场景 2: 范围 + 平均值 (Range + Average)

```typescript
series: [
  {
    defaultShowAs: 'area',
    lines: [{
      dataKey: 'range',
      name: 'Range',
      color: '#8884d8',
      fillOpacity: 0.3,
      strokeWidth: 1,
      strokeOpacity: 0.5,
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: 'average',
      name: 'Average',
      color: '#8884d8',
      strokeWidth: 3,
      strokeOpacity: 1,
    }]
  }
]
```

### 场景 3: 多维度对比 (Multi-dimensional Comparison)

```typescript
series: [
  {
    defaultShowAs: 'column',
    lines: [
      {
        dataKey: 'thisYear',
        name: '2025',
        color: 'var(--indigo-4)',
        barWidth: 40,
        barOpacity: 0.9,
      },
      {
        dataKey: 'lastYear',
        name: '2024',
        color: 'var(--amber-4)',
        barWidth: 40,
        barOpacity: 0.6,
      }
    ]
  }
]
```

## TypeScript 类型支持 (TypeScript Type Support)

完整的类型定义：

```typescript
import type { 
  TrendChartLine,
  MultiSeriesChartData 
} from '@lululemon-ui'

// 所有属性都有完整的类型提示
const line: TrendChartLine = {
  dataKey: 'sales',
  name: 'Sales',
  color: '#8884d8',
  
  // Line properties (IDE will show documentation)
  strokeWidth: 2,
  strokeOpacity: 0.8,
  strokeDasharray: '5 5',
  
  // Area properties
  fillOpacity: 0.6,
  
  // Column properties
  barWidth: 40,
  barOpacity: 0.9,
}
```

## 调试技巧 (Debugging Tips)

### 1. 检查属性是否生效

```typescript
// 添加 console.log 查看实际使用的值
fillOpacity={line.fillOpacity ?? line.opacity ?? 0.6}
```

### 2. 测试不同透明度

```typescript
// 快速测试：从 0.2 到 1.0
fillOpacity: 0.2,  // 非常淡
fillOpacity: 0.4,  // 淡
fillOpacity: 0.6,  // 中等
fillOpacity: 0.8,  // 较实
fillOpacity: 1.0,  // 完全不透明
```

### 3. 柱子宽度调整

```typescript
// 数据点少：用宽柱子
barWidth: 60,

// 数据点多：用窄柱子
barWidth: 20,

// 多系列：错开宽度
barWidth: 40,  // 第一系列
barWidth: 30,  // 第二系列
```

## 总结 (Summary)

现在您可以精细控制每个数据系列的样式：

| 图表类型 | 粗细控制 | 透明度控制 | 宽度控制 |
|---------|---------|----------|---------|
| **Line** | `strokeWidth` | `strokeOpacity` | - |
| **Area** | `strokeWidth` (边框) | `fillOpacity` (填充)<br>`strokeOpacity` (边框) | - |
| **Column** | - | `barOpacity` | `barWidth` |

所有属性都是可选的，有合理的默认值，并且向后兼容！✨

