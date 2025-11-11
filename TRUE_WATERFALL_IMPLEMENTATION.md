# True Waterfall Chart Implementation (真正的瀑布图实现)

## 问题说明 (Problem Statement)

用户指出："Weekly Rhythm (New TrendChart) 的图样应该与旧的一样，每个 data element 是一个**区间**而不是一个单独的数"。

初始实现的 waterfall 模式只是简单地根据值的正负给柱子上色，但**不是真正的瀑布图**。真正的瀑布图应该：
- 每个柱子显示为**累积区间**（从起点到终点）
- 柱子"堆叠"显示累积效果
- 第一个柱子从 0 开始
- 后续每个柱子从前一个柱子的结束位置开始

## 真正的瀑布图原理 (True Waterfall Principle)

### 视觉效果

```
示例数据: [+11%, +13%, -5%, +12%]

真正的瀑布图:
     ┌──────┐
     │ +12% │ ← 从 19% 开始，到 31%
     └──────┘
         ╳
     ╳
 ╳
┌──────┐
│ +13% │ ← 从 11% 开始，到 24%
└──────┘
┌──────┐
│ +11% │ ← 从 0 开始，到 11%
└──────┘
  Mon    Tue    Wed    Thu

累积值:  11%    24%    19%    31%
```

### 技术实现

使用**堆叠柱状图（Stacked Bar Chart）**：
- **透明柱子（start）**：定位到起始位置
- **可见柱子（absValue）**：显示增量/减量的绝对值

```typescript
数据转换示例:

原始数据:
{ name: 'Mon', value: 11 }

处理后数据:
{
  name: 'Mon',
  value_start: 0,      // 透明柱子高度（起始位置）
  value_abs: 11,       // 可见柱子高度（绝对值）
  value_original: 11   // 用于标签和颜色
}
```

## 实现细节 (Implementation Details)

### 1. 数据处理函数

```typescript
// Process waterfall data with cumulative calculations
const processWaterfallData = useMemo(() => {
  return (data: TrendChartDataPoint[], dataKey: string) => {
    let cumulative = 0
    
    return data.map((entry) => {
      const value = entry[dataKey] as number
      
      // 计算起始位置
      // 正值：从当前累积值开始
      // 负值：从 (当前累积值 + 负值) 开始，这样柱子向下
      const start = value >= 0 ? cumulative : cumulative + value
      
      // 更新累积值
      cumulative += value
      
      return {
        ...entry,
        [`${dataKey}_start`]: start,        // 透明柱子高度
        [`${dataKey}_abs`]: Math.abs(value), // 可见柱子高度
        [`${dataKey}_original`]: value,      // 原始值（用于标签和颜色）
      }
    })
  }
}, [])
```

### 2. 渲染逻辑（多系列模式）

```typescript
case 'waterfall': {
  const waterfallStackId = `waterfall-${line.dataKey}-${seriesIndex}`
  return (
    <React.Fragment key={key}>
      {/* 1. 透明柱子 - 创建起始位置 */}
      <Bar
        dataKey={`${line.dataKey}_start`}
        fill="transparent"
        stackId={waterfallStackId}  // ← 关键：使用 stackId 堆叠
        animationDuration={0}        // ← 不需要动画
      />
      
      {/* 2. 可见柱子 - 显示实际值 */}
      <Bar
        dataKey={`${line.dataKey}_abs`}
        name={line.name}
        stackId={waterfallStackId}  // ← 关键：相同的 stackId
        fillOpacity={line.barOpacity ?? line.opacity ?? 1}
        barSize={line.barWidth}
        animationDuration={animationDuration}
        radius={barRadius}
      >
        {/* 根据原始值的正负设置颜色 */}
        {chartData.map((entry, index) => {
          const value = entry[`${line.dataKey}_original`] as number
          const color = value >= 0 
            ? (line.positiveColor ?? 'var(--wilderness-4)')
            : (line.negativeColor ?? 'var(--hot-heat-4)')
          return <Cell key={`cell-${index}`} fill={color} />
        })}
        
        {/* 使用原始值显示标签 */}
        {line.showLabels !== false && line.labelFormatter && (
          <LabelList
            dataKey={`${line.dataKey}_original`}
            position="top"
            formatter={line.labelFormatter as any}
            style={{ fontSize: '11px', fill: getCssVar('colorMain') }}
          />
        )}
      </Bar>
    </React.Fragment>
  )
}
```

### 3. 数据处理时机

```typescript
// Multi-series mode
if (chartConfig.isMultiSeries && chartConfig.seriesConfig) {
  // 检测是否有 waterfall 系列
  const hasWaterfall = chartConfig.seriesConfig.some(s => s.defaultShowAs === 'waterfall')
  let chartData = filteredData
  
  if (hasWaterfall) {
    // 处理 waterfall 数据
    chartConfig.seriesConfig.forEach((seriesItem) => {
      if (seriesItem.defaultShowAs === 'waterfall') {
        seriesItem.lines.forEach((line) => {
          chartData = processWaterfallData(filteredData, line.dataKey)
        })
      }
    })
  }
  
  return (
    <ComposedChart data={chartData} ...>
      {/* ... */}
    </ComposedChart>
  )
}

// Single-series mode
const chartMode = chartConfig.chartMode || 'line'
const chartLines = chartConfig.chartLines || []

let chartData = filteredData
if (chartMode === 'waterfall' && chartLines.length > 0) {
  chartData = processWaterfallData(filteredData, chartLines[0].dataKey)
}
```

## 与旧版 WaterfallChart 的对比

### 旧版实现

```typescript
// WaterfallChart/_component.tsx
const processWaterfallData = (data, positiveColor, negativeColor) => {
  let cumulative = 0
  
  return data.map((entry) => {
    const start = entry.value >= 0 ? cumulative : cumulative + entry.value
    cumulative += entry.value
    
    return {
      ...entry,
      start,           // 起始位置
      absValue: Math.abs(entry.value),  // 绝对值
      calculatedColor: color,
    }
  })
}

// 渲染
<BarChart data={processedData}>
  {/* 透明柱子 */}
  <Bar dataKey="start" fill="transparent" stackId="waterfall" />
  
  {/* 可见柱子 */}
  <Bar dataKey="absValue" stackId="waterfall">
    {processedData.map((entry, index) => (
      <Cell key={index} fill={entry.calculatedColor} />
    ))}
  </Bar>
</BarChart>
```

### 新版实现（TrendChart）

```typescript
// TrendChart/_component.tsx
const processWaterfallData = (data, dataKey) => {
  let cumulative = 0
  
  return data.map((entry) => {
    const value = entry[dataKey] as number
    const start = value >= 0 ? cumulative : cumulative + value
    cumulative += value
    
    return {
      ...entry,
      [`${dataKey}_start`]: start,        // 动态键名
      [`${dataKey}_abs`]: Math.abs(value),
      [`${dataKey}_original`]: value,
    }
  })
}

// 渲染（支持多 dataKey）
<BarChart data={processedData}>
  {chartLines.map((line) => (
    <React.Fragment key={line.dataKey}>
      {/* 透明柱子 */}
      <Bar 
        dataKey={`${line.dataKey}_start`} 
        fill="transparent" 
        stackId={`waterfall-${line.dataKey}`} 
      />
      
      {/* 可见柱子 */}
      <Bar 
        dataKey={`${line.dataKey}_abs`} 
        stackId={`waterfall-${line.dataKey}`}
      >
        {processedData.map((entry, index) => {
          const value = entry[`${line.dataKey}_original`] as number
          const color = value >= 0 ? positiveColor : negativeColor
          return <Cell key={index} fill={color} />
        })}
      </Bar>
    </React.Fragment>
  ))}
</BarChart>
```

### 关键区别

| 特性 | 旧版 WaterfallChart | 新版 TrendChart |
|------|---------------------|-----------------|
| **数据键** | 固定 (`start`, `absValue`, `value`) | 动态 (`${dataKey}_start`, `${dataKey}_abs`) |
| **颜色计算** | 预计算存储在数据中 | 渲染时动态计算 |
| **多系列** | ❌ 不支持 | ✅ 支持（ComposedChart） |
| **混合图表** | ❌ 不支持 | ✅ 支持（waterfall + line + column + area） |
| **stackId** | 固定 `"waterfall"` | 动态 `waterfall-${dataKey}` |

## 关键概念 (Key Concepts)

### 1. `stackId` 的作用

Recharts 使用 `stackId` 来决定哪些 Bar 应该堆叠在一起：
- 相同 `stackId` 的 Bar 会**垂直堆叠**
- 第二个 Bar 从第一个 Bar 的顶部开始
- 透明的 Bar 创建了"空白区域"，将可见 Bar 推到正确位置

```typescript
// 相同 stackId → 堆叠
<Bar dataKey="start" stackId="waterfall" fill="transparent" />
<Bar dataKey="abs" stackId="waterfall" fill="green" />

// 不同 stackId → 不堆叠（并排显示）
<Bar dataKey="start" stackId="stack1" />
<Bar dataKey="abs" stackId="stack2" />
```

### 2. 为什么使用绝对值

```typescript
// 错误做法：使用原始值
<Bar dataKey="value" />  // value = -5
// 结果：柱子向下延伸（从 0 到 -5）

// 正确做法：使用绝对值 + 透明起始柱子
<Bar dataKey="start" fill="transparent" stackId="w" />  // start = 24
<Bar dataKey="abs" stackId="w" />                        // abs = 5
// 结果：柱子从 24 开始，向下延伸 5 个单位（到 19）
```

### 3. 动态键名的必要性

因为 TrendChart 支持多个 dataKey（多条线），需要为每个 dataKey 创建独立的字段：

```typescript
// 单个 dataKey
{
  name: 'Mon',
  value: 11,
  value_start: 0,
  value_abs: 11,
  value_original: 11
}

// 多个 dataKey（未来扩展）
{
  name: 'Mon',
  sales: 11,
  sales_start: 0,
  sales_abs: 11,
  sales_original: 11,
  profit: 5,
  profit_start: 0,
  profit_abs: 5,
  profit_original: 5
}
```

## 使用示例 (Usage Examples)

### 基础 Waterfall

```typescript
const data: MultiSeriesChartData = {
  data: [
    { id: 'mon', name: 'Mon', value: 11 },
    { id: 'tue', name: 'Tue', value: 13 },
    { id: 'wed', name: 'Wed', value: -5 },
    { id: 'thu', name: 'Thu', value: 12 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Weekly Performance',
          color: 'var(--wilderness-4)',
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--hot-heat-4)',
          showLabels: true,
          labelFormatter: (v) => `${v}%`,
          barWidth: 40,
        },
      ],
    },
  ],
}

<TrendChart
  title="Weekly Sales Growth"
  multiSeries={data}
  yAxisTickFormatter={(v) => `${v}%`}
/>
```

### Waterfall + 累积线（混合图表）

```typescript
const data: MultiSeriesChartData = {
  data: [
    { name: 'Q1', change: 15, cumulative: 15 },
    { name: 'Q2', change: -5, cumulative: 10 },
    { name: 'Q3', change: 12, cumulative: 22 },
    { name: 'Q4', change: 8, cumulative: 30 },
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
          dataKey: 'cumulative',
          name: 'Cumulative Total',
          color: 'var(--daydream-4)',
          strokeWidth: 2,
          strokeDasharray: '5 5',
        },
      ],
    },
  ],
}
```

## 验证 (Verification)

现在 Weekly Rhythm (New TrendChart) 应该：
- ✅ 每个柱子显示为累积区间（从起点到终点）
- ✅ 第一个柱子从 0 开始
- ✅ 后续柱子从前一个柱子结束位置开始
- ✅ 正值柱子向上，负值柱子向下
- ✅ 与旧版 WaterfallChart 视觉效果一致

## 技术总结 (Technical Summary)

### 核心技术
1. **堆叠柱状图（Stacked Bar Chart）**：使用 `stackId` 实现柱子堆叠
2. **透明占位柱（Transparent Placeholder）**：创建起始位置
3. **累积计算（Cumulative Calculation）**：追踪运行总和
4. **动态键名（Dynamic Keys）**：支持多个 dataKey

### 关键代码
- **数据处理**：`processWaterfallData` 函数
- **渲染逻辑**：两个 Bar + stackId + Cell 颜色映射
- **标签显示**：使用原始值（`_original`）而不是绝对值

### 与旧版兼容性
完全兼容旧版 WaterfallChart 的数据格式和视觉效果，只是：
- 键名从固定改为动态
- 颜色从预计算改为动态计算
- 支持更多功能（多系列、混合图表）

🎉 现在 TrendChart 实现了**真正的瀑布图**！

