# Waterfall Chart Quick Start (瀑布图快速入门)

## 🚀 快速使用

### 步骤 1: 导入

```typescript
import { TrendChart } from '../../../../components/ui/forDashboard/TrendChart'
import type { MultiSeriesChartData } from '../../../../components/ui/forDashboard/TrendChart'
```

### 步骤 2: 准备数据

```typescript
const data: MultiSeriesChartData = {
  data: [
    { id: 'mon', name: 'Mon', value: 11 },   // 正值：绿色
    { id: 'tue', name: 'Tue', value: 13 },
    { id: 'wed', name: 'Wed', value: -5 },   // 负值：红色
    { id: 'thu', name: 'Thu', value: 8 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Performance',
          color: 'var(--wilderness-4)',         // 基础颜色
          positiveColor: 'var(--wilderness-4)', // 正值颜色（绿）
          negativeColor: 'var(--hot-heat-4)',   // 负值颜色（红）
          showLabels: true,
          labelFormatter: (v) => `${v}%`,
          barWidth: 40,
        },
      ],
    },
  ],
}
```

### 步骤 3: 渲染

```typescript
<TrendChart
  title="Weekly Performance"
  showHeader={true}
  headerIcon="trending_up"
  headerColor="primary"
  multiSeries={data}
  showGrid={true}
  yAxisTickFormatter={(value) => `${value}%`}
  barSize={40}
/>
```

## 📊 配置选项

### Waterfall Line 配置

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `dataKey` | `string` | ✅ | - | 数据键名 |
| `name` | `string` | ✅ | - | 显示名称 |
| `color` | `string` | ✅ | - | 基础颜色 |
| `positiveColor` | `string` | ❌ | `var(--wilderness-4)` | 正值颜色 |
| `negativeColor` | `string` | ❌ | `var(--hot-heat-4)` | 负值颜色 |
| `showLabels` | `boolean` | ❌ | `true` | 显示标签 |
| `labelFormatter` | `(v: number) => string` | ❌ | - | 标签格式化 |
| `barWidth` | `number` | ❌ | - | 柱子宽度（覆盖全局） |
| `barOpacity` | `number` | ❌ | `1` | 柱子透明度 |

### TrendChart 配置

| 属性 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `multiSeries` | `MultiSeriesChartData` | ✅ | 多系列数据 |
| `title` | `string` | ❌ | 图表标题 |
| `showHeader` | `boolean` | ❌ | 显示头部 |
| `headerIcon` | `string` | ❌ | 头部图标 |
| `headerColor` | `string` | ❌ | 头部颜色 |
| `showGrid` | `boolean` | ❌ | 显示网格 |
| `showLegend` | `boolean` | ❌ | 显示图例 |
| `yAxisTickFormatter` | `(v: number) => string` | ❌ | Y轴格式化 |
| `barSize` | `number` | ❌ | 全局柱子宽度 |
| `barRadius` | `number \| number[]` | ❌ | 柱子圆角 |

## 🎨 颜色方案

### 内置颜色变量

```typescript
// 成功/增长 (绿色系)
'var(--wilderness-1)'  // 最浅
'var(--wilderness-2)'
'var(--wilderness-3)'
'var(--wilderness-4)'  // ✅ 推荐用于正值
'var(--wilderness-5)'  // 最深

// 警告/下降 (红色系)
'var(--hot-heat-1)'    // 最浅
'var(--hot-heat-2)'
'var(--hot-heat-3)'
'var(--hot-heat-4)'    // ✅ 推荐用于负值
'var(--hot-heat-5)'    // 最深

// 中性 (蓝色系)
'var(--daydream-1)'
'var(--daydream-2)'
'var(--daydream-3)'
'var(--daydream-4)'    // ✅ 推荐用于中性
'var(--daydream-5)'

// 警示 (橙色系)
'var(--amber-1)'
'var(--amber-2)'
'var(--amber-3)'
'var(--amber-4)'       // ✅ 推荐用于警示
'var(--amber-5)'
```

## 📝 常见用例

### 用例 1: 周销售增长

```typescript
const weeklySalesData: MultiSeriesChartData = {
  data: [
    { name: 'Mon', value: 12, plan: 10, actual: 11200 },
    { name: 'Tue', value: 15, plan: 12, actual: 13800 },
    { name: 'Wed', value: -3, plan: 14, actual: 13370 },
    { name: 'Thu', value: 8, plan: 15, actual: 14440 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Growth %',
          color: 'var(--wilderness-4)',
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--hot-heat-4)',
          showLabels: true,
          labelFormatter: (v) => `${v > 0 ? '+' : ''}${v}%`,
          barWidth: 40,
        },
      ],
    },
  ],
}
```

### 用例 2: 库存变化

```typescript
const inventoryData: MultiSeriesChartData = {
  data: [
    { name: 'Week 1', value: 50 },    // +50 (补货)
    { name: 'Week 2', value: -30 },   // -30 (销售)
    { name: 'Week 3', value: -20 },   // -20 (销售)
    { name: 'Week 4', value: 100 },   // +100 (补货)
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Inventory Change',
          color: 'var(--daydream-4)',
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--amber-4)',
          showLabels: true,
          labelFormatter: (v) => `${v > 0 ? '+' : ''}${v}`,
        },
      ],
    },
  ],
}
```

### 用例 3: Waterfall + 目标线（混合图表）

```typescript
const performanceData: MultiSeriesChartData = {
  data: [
    { name: 'Q1', change: 15, target: 20, cumulative: 15 },
    { name: 'Q2', change: -5, target: 15, cumulative: 10 },
    { name: 'Q3', change: 12, target: 18, cumulative: 22 },
    { name: 'Q4', change: 8, target: 20, cumulative: 30 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'change',
          name: 'Quarterly Change',
          color: 'var(--wilderness-4)',
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--hot-heat-4)',
          showLabels: true,
          labelFormatter: (v) => `${v}%`,
        },
      ],
    },
    {
      defaultShowAs: 'line',
      lines: [
        {
          dataKey: 'target',
          name: 'Target',
          color: 'var(--amber-4)',
          strokeWidth: 2,
          strokeDasharray: '5 5',
        },
        {
          dataKey: 'cumulative',
          name: 'Cumulative',
          color: 'var(--daydream-4)',
          strokeWidth: 2,
        },
      ],
    },
  ],
}
```

## 💡 最佳实践

### 1. 选择合适的颜色

- ✅ **正值用绿色**：表示增长、成功、达成
- ✅ **负值用红色**：表示下降、问题、未达成
- ✅ **特殊情况用橙色**：例如库存减少（可能是好事）

### 2. 标签格式化

```typescript
// 百分比
labelFormatter: (v) => `${v}%`

// 带正负号
labelFormatter: (v) => `${v > 0 ? '+' : ''}${v}%`

// 货币
labelFormatter: (v) => `¥${v.toLocaleString()}`

// 自定义单位
labelFormatter: (v) => `${v} units`
```

### 3. 合理的柱子宽度

- **小屏/移动端**: 20-30px
- **普通屏幕**: 40-50px
- **大屏幕**: 60-80px

### 4. Y轴格式化

```typescript
// 与标签保持一致
yAxisTickFormatter={(value) => `${value}%`}
```

## 🐛 常见问题

### Q1: 标签不显示？

确保设置了：
```typescript
showLabels: true,
labelFormatter: (v) => `${v}%`,  // 必须提供
```

### Q2: 所有柱子都是同一种颜色？

检查：
- `positiveColor` 和 `negativeColor` 是否设置
- 数据中的 `value` 是否为数字类型（不是字符串）

### Q3: 柱子太宽或太窄？

使用 `barWidth` 覆盖：
```typescript
barWidth: 40,  // 在 line 配置中
```

或全局设置：
```typescript
<TrendChart barSize={40} ... />
```

### Q4: 如何隐藏网格线？

```typescript
<TrendChart showGrid={false} ... />
```

## 🔗 相关文档

- [TrendChart 完整文档](./MULTI_SERIES_CHART_IMPLEMENTATION.md)
- [样式配置指南](./CHART_STYLING_GUIDE.md)
- [数据结构说明](./MULTI_SERIES_QUICKSTART.md)
- [Waterfall 集成总结](./WATERFALL_CHART_INTEGRATION.md)

## 📦 示例页面

查看 **JingjingOnePage_V0** 页面了解实际使用：

- Weekly Rhythm (旧版 WaterfallChart)
- Weekly Rhythm (新版 TrendChart) ⭐
- Weather Forecast (旧版 ColumnChart)
- Weather Forecast (新版 TrendChart) ⭐

位置: `/app/src/pages/playground/_luluDemo/JingjingOnePage_V0/`

## ✨ 总结

Waterfall Chart 现在完全集成到 TrendChart 中！

特点：
- ✅ 统一的数据格式
- ✅ 自动颜色映射
- ✅ 可混合其他图表类型
- ✅ 完整的样式配置
- ✅ TypeScript 类型安全

开始使用吧！🎉

