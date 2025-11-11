# Waterfall Chart Integration (瀑布图集成)

## 完成的工作 (Completed Work)

### ✅ 扩展 ChartDisplayMode

添加了 `'waterfall'` 图表类型支持：

```typescript
export type ChartDisplayMode = 'line' | 'column' | 'area' | 'waterfall'
```

### ✅ 扩展 BaseChartLine 接口

添加了 Waterfall 专用属性：

```typescript
export interface BaseChartLine {
  // ... existing properties
  
  // === Waterfall Chart Properties ===
  positiveColor?: string        // 正值颜色 @default var(--wilderness-4)
  negativeColor?: string        // 负值颜色 @default var(--hot-heat-4)
  showLabels?: boolean          // 显示标签 @default true
  labelFormatter?: (value: number) => string  // 标签格式化函数
}
```

### ✅ 在 TrendChart 中实现 Waterfall 渲染

#### 多系列模式（ComposedChart）

```typescript
case 'waterfall':
  return (
    <Bar
      dataKey={line.dataKey}
      name={line.name}
      fillOpacity={line.barOpacity ?? line.opacity ?? 1}
      barSize={line.barWidth}
      animationDuration={animationDuration}
      radius={barRadius}
    >
      {/* 根据值的正负动态设置颜色 */}
      {filteredData.map((entry, index) => {
        const value = entry[line.dataKey] as number
        const color = value >= 0 
          ? (line.positiveColor ?? 'var(--wilderness-4)')
          : (line.negativeColor ?? 'var(--hot-heat-4)')
        return <Cell key={`cell-${index}`} fill={color} />
      })}
      
      {/* 可选的标签显示 */}
      {line.showLabels !== false && line.labelFormatter && (
        <LabelList
          dataKey={line.dataKey}
          position="top"
          formatter={line.labelFormatter}
        />
      )}
    </Bar>
  )
```

#### 单系列模式（BarChart）

同样的渲染逻辑也适用于单系列模式。

### ✅ JingjingOnePage_V0 集成

#### 1. 创建新数据结构

**Weekly Rhythm (Waterfall)**:

```typescript
export const mockWeeklyRhythmChartData: MultiSeriesChartData = {
  data: mockWeeklyRhythmData,
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Weekly Performance %',
          color: 'var(--wilderness-4)',
          positiveColor: 'var(--wilderness-4)',  // 正值：绿色
          negativeColor: 'var(--hot-heat-4)',   // 负值：红色
          showLabels: true,
          labelFormatter: (value: number) => `${value}%`,
          barWidth: 40,
        },
      ],
    },
  ],
}
```

**Weather Forecast (Column)**:

```typescript
export const mockWeatherForecastChartData: MultiSeriesChartData = {
  data: mockWeatherForecastData,
  series: [
    {
      defaultShowAs: 'column',
      lines: [
        {
          dataKey: 'value',
          name: 'Temperature (°C)',
          color: 'var(--daydream-4)',
          barOpacity: 0.9,
        },
      ],
    },
  ],
}
```

#### 2. 在页面中渲染

```typescript
{/* NEW: Weekly Rhythm using TrendChart */}
<div style={getDisplayStyle(contentDisplayBooleans.weeklyRhythm)}>
  <div style={{ height: '300px' }}>
    <TrendChart
      title="Weekly Rhythm (New TrendChart)"
      showHeader={true}
      headerIcon="calendar_month"
      headerColor="primary"
      multiSeries={mockWeeklyRhythmChartData}
      showGrid={true}
      showLegend={false}
      yAxisTickFormatter={(value) => `${value}%`}
      barSize={40}
    />
  </div>
</div>

{/* NEW: Weather Forecast using TrendChart */}
<div style={getDisplayStyle(contentDisplayBooleans.weatherForecast)}>
  <div style={{ height: '300px' }}>
    <TrendChart
      title="10-Day Weather Forecast (New TrendChart)"
      showHeader={true}
      headerIcon="wb_sunny"
      headerColor="primary"
      multiSeries={mockWeatherForecastChartData}
      showGrid={true}
      showLegend={false}
      yAxisTickFormatter={(value) => `${value}°C`}
    />
  </div>
</div>
```

## 对比：旧版 vs 新版

### Weekly Rhythm

| 特性 | 旧版 (WaterfallChart) | 新版 (TrendChart) |
|------|----------------------|-------------------|
| **组件** | `<WaterfallChart>` | `<TrendChart>` |
| **数据格式** | 直接数组 | `MultiSeriesChartData` |
| **配置位置** | Props | `multiSeries.series[0].lines[0]` |
| **混合能力** | ❌ 单一类型 | ✅ 可混合其他图表类型 |
| **标签配置** | `showLabels`, `labelFormatter` | 同左，在 line 配置中 |
| **颜色配置** | `positiveColor`, `negativeColor` | 同左，在 line 配置中 |

### Weather Forecast

| 特性 | 旧版 (ColumnChart) | 新版 (TrendChart) |
|------|-------------------|-------------------|
| **组件** | `<ColumnChart>` | `<TrendChart>` |
| **数据格式** | 直接数组 | `MultiSeriesChartData` |
| **图表类型** | Column | Column (可轻松切换) |
| **混合能力** | ❌ 单一类型 | ✅ 可混合其他图表类型 |

## 使用示例

### Example 1: 基础 Waterfall

```typescript
const data: MultiSeriesChartData = {
  data: [
    { id: 'mon', name: 'Mon', value: 5 },
    { id: 'tue', name: 'Tue', value: -3 },
    { id: 'wed', name: 'Wed', value: 8 },
    { id: 'thu', name: 'Thu', value: -2 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'value',
          name: 'Daily Change',
          color: 'var(--wilderness-4)',
          positiveColor: 'var(--wilderness-4)',
          negativeColor: 'var(--hot-heat-4)',
          showLabels: true,
        },
      ],
    },
  ],
}

<TrendChart
  title="Daily Performance"
  multiSeries={data}
  yAxisTickFormatter={(v) => `${v}%`}
/>
```

### Example 2: Waterfall + Line (混合)

```typescript
const data: MultiSeriesChartData = {
  data: [
    { id: '1', name: 'Q1', change: 15, target: 20 },
    { id: '2', name: 'Q2', change: -5, target: 15 },
    { id: '3', name: 'Q3', change: 10, target: 18 },
  ],
  series: [
    {
      defaultShowAs: 'waterfall',
      lines: [
        {
          dataKey: 'change',
          name: 'Actual Change',
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
      ],
    },
  ],
}
```

## Waterfall 特性

### 1. 自动颜色映射

```typescript
{
  positiveColor: 'var(--wilderness-4)',  // 正值：成功/增长
  negativeColor: 'var(--hot-heat-4)',    // 负值：警告/下降
}
```

- **正值** (≥ 0)：使用 `positiveColor`
- **负值** (< 0)：使用 `negativeColor`

### 2. 标签显示

```typescript
{
  showLabels: true,
  labelFormatter: (value) => `${value}%`,
}
```

- `showLabels`: 是否显示标签
- `labelFormatter`: 自定义标签格式

### 3. 柱子样式

```typescript
{
  barWidth: 40,           // 柱子宽度
  barOpacity: 0.9,        // 柱子透明度
  barRadius: [4,4,0,0],   // 柱子圆角 (全局配置)
}
```

## 技术细节

### Cell 动态渲染

Waterfall 使用 Recharts 的 `<Cell>` 组件为每个柱子单独设置颜色：

```typescript
<Bar dataKey="value">
  {data.map((entry, index) => {
    const value = entry.value
    const color = value >= 0 ? positiveColor : negativeColor
    return <Cell key={index} fill={color} />
  })}
</Bar>
```

### LabelList 类型转换

由于 Recharts 的 `LabelList` 类型定义问题，使用了类型断言：

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
formatter={line.labelFormatter as any}
```

这是必要的类型转换，确保 `(value: number) => string` 能正确工作。

## 验证状态

✅ TypeScript 编译通过  
✅ 无 Lint 错误  
✅ 多系列模式支持  
✅ 单系列模式支持  
✅ JingjingOnePage_V0 集成完成  
✅ 新旧版本并存（用于测试对比）  

## 页面布局

在 JingjingOnePage_V0 中，现在的布局为：

```
1. Performance Snapshot
2. Metrics Row
3. Today's Target Detail
4. Morning Target Detail
5. Weekly Rhythm (旧版 - WaterfallChart)
6. Weather Forecast (旧版 - ColumnChart)
7. Weekly Rhythm (新版 - TrendChart) ← NEW
8. Weather Forecast (新版 - TrendChart) ← NEW
9. Sales Summary
... (其他部分)
```

这样可以直接对比新旧实现的效果。

## 总结

现在 TrendChart 支持 **4 种图表类型**：

1. ✅ **Line** - 线图
2. ✅ **Column** - 柱状图
3. ✅ **Area** - 面积图  
4. ✅ **Waterfall** - 瀑布图 ⭐ NEW

所有图表类型都可以：
- 在同一个图表中混合使用
- 使用统一的 `MultiSeriesChartData` 格式
- 享受完整的样式配置能力
- 保持向后兼容性

TrendChart 现在真正成为了一个**全能的 XY 轴图表组件**！🎉

