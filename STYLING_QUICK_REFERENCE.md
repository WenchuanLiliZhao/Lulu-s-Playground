# Chart Styling Quick Reference (快速参考)

## 当前实现：3个属性组

### 📊 Column (柱状图)
```typescript
{
  defaultShowAs: 'column',
  lines: [{
    color: 'var(--hot-heat-4)',
    barWidth: 40,         // 柱子宽度（像素）
    barOpacity: 0.85,     // 柱子透明度 (0-1)
    // 或使用 opacity 作为通用透明度
  }]
}
```

### 📈 Line (线图)
```typescript
{
  defaultShowAs: 'line',
  lines: [{
    color: 'var(--hot-heat-4)',
    strokeWidth: 3,          // 线条粗细（像素）
    strokeOpacity: 0.7,      // 线条透明度 (0-1)
    strokeDasharray: '8 4',  // 虚线样式
    // 或使用 opacity 作为通用透明度
  }]
}
```

### 📉 Area (面积图)
```typescript
{
  defaultShowAs: 'area',
  lines: [{
    color: 'var(--hot-heat-4)',
    fillOpacity: 0.6,        // 填充透明度 (0-1)
    strokeWidth: 2,          // 边框粗细（像素）
    strokeOpacity: 0.8,      // 边框透明度 (0-1)
    // 或使用 opacity 作为通用透明度
  }]
}
```

## 属性映射表

| 属性 | Column | Line | Area | 说明 |
|------|--------|------|------|------|
| `barWidth` | ✅ | ❌ | ❌ | 柱子宽度（像素） |
| `barOpacity` | ✅ | ❌ | ❌ | 柱子透明度 |
| `strokeWidth` | ❌ | ✅ | ✅ | 线条/边框粗细 |
| `strokeOpacity` | ❌ | ✅ | ✅ | 线条/边框透明度 |
| `strokeDasharray` | ❌ | ✅ | ✅ | 虚线样式 |
| `fillOpacity` | ❌ | ❌ | ✅ | 填充透明度 |
| `opacity` | ✅ | ✅ | ✅ | 通用透明度（向后兼容） |

## 透明度优先级

```typescript
// Column
barOpacity ?? opacity ?? 1

// Line  
strokeOpacity ?? opacity ?? 1

// Area (填充)
fillOpacity ?? opacity ?? 0.6

// Area (边框)
strokeOpacity ?? 1
```

## 实用配置模板

### 模板 1: 柱状图 + 目标线

```typescript
series: [
  {
    defaultShowAs: 'column',
    lines: [{
      dataKey: 'actual',
      color: 'var(--wilderness-4)',
      barWidth: 50,
      barOpacity: 0.9,
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: 'target',
      color: 'var(--hot-heat-4)',
      strokeWidth: 2,
      strokeDasharray: '5 5',
      strokeOpacity: 0.7,
    }]
  }
]
```

### 模板 2: 面积图 + 趋势线

```typescript
series: [
  {
    defaultShowAs: 'area',
    lines: [{
      dataKey: 'range',
      color: '#8884d8',
      fillOpacity: 0.3,
      strokeWidth: 1,
      strokeOpacity: 0.5,
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: 'trend',
      color: '#8884d8',
      strokeWidth: 3,
      strokeOpacity: 1,
    }]
  }
]
```

### 模板 3: 多个柱状图对比

```typescript
series: [
  {
    defaultShowAs: 'column',
    lines: [
      {
        dataKey: 'current',
        color: 'var(--indigo-4)',
        barWidth: 40,
        barOpacity: 1,      // 当前：完全不透明
      },
      {
        dataKey: 'previous',
        color: 'var(--amber-4)',
        barWidth: 35,
        barOpacity: 0.6,    // 对比：半透明
      }
    ]
  }
]
```

## 推荐值

### 透明度推荐

```typescript
// 主要数据
barOpacity: 0.9 - 1.0
strokeOpacity: 0.8 - 1.0
fillOpacity: 0.7 - 0.8

// 次要数据
barOpacity: 0.5 - 0.7
strokeOpacity: 0.5 - 0.7
fillOpacity: 0.3 - 0.5

// 背景/参考
barOpacity: 0.3 - 0.4
strokeOpacity: 0.3 - 0.4
fillOpacity: 0.1 - 0.3
```

### 线条粗细推荐

```typescript
// 细线（参考线）
strokeWidth: 1

// 标准线
strokeWidth: 2

// 强调线
strokeWidth: 3 - 4

// 超粗线（特殊强调）
strokeWidth: 5 - 6
```

### 柱子宽度推荐

```typescript
// 少量数据（<10个点）
barWidth: 50 - 80

// 中等数据（10-20个点）
barWidth: 30 - 50

// 大量数据（>20个点）
barWidth: 15 - 30

// 多系列对比
barWidth: [40, 35, 30]  // 错开显示
```

### 虚线样式推荐

```typescript
// 标准虚线
strokeDasharray: '5 5'

// 长虚线
strokeDasharray: '8 4'
strokeDasharray: '10 5'

// 点线
strokeDasharray: '2 3'

// 点划线
strokeDasharray: '10 5 2 5'
```

## 常见问题

### Q: 为什么我的透明度设置没生效？

A: 确保使用正确的属性名：
```typescript
// ❌ 错误
{ defaultShowAs: 'column', lines: [{ opacity: 0.5 }] }

// ✅ 正确
{ defaultShowAs: 'column', lines: [{ barOpacity: 0.5 }] }
```

### Q: 如何让柱子不重叠？

A: 使用不同的 `barWidth`：
```typescript
lines: [
  { barWidth: 50, ... },  // 宽柱子
  { barWidth: 35, ... },  // 窄柱子
]
```

### Q: opacity 和 barOpacity 有什么区别？

A: 
- `barOpacity`: 专门用于柱状图，优先级更高
- `opacity`: 通用属性，向后兼容

优先级：`barOpacity > opacity > default`

## 调试技巧

### 1. 快速测试透明度
```typescript
barOpacity: 0.2,  // 20%
barOpacity: 0.4,  // 40%
barOpacity: 0.6,  // 60%
barOpacity: 0.8,  // 80%
barOpacity: 1.0,  // 100%
```

### 2. 临时高亮某个系列
```typescript
{
  // 临时设置为完全不透明+粗线条
  strokeWidth: 5,
  strokeOpacity: 1,
}
```

### 3. 检查层叠顺序
```typescript
// 从淡到实，从后到前
series: [
  { fillOpacity: 0.2 },  // 最淡的在后
  { barOpacity: 0.6 },
  { strokeOpacity: 1 },  // 最实的在前
]
```

## 您当前的配置

根据您的代码：

```typescript
// 柱状图
{
  barWidth: 40,      // ✅ 好
  opacity: 0.4,      // 💡 建议改为 barOpacity: 0.4
}

// 线图
{
  strokeDasharray: "5 5",  // ✅ 好
  opacity: 1,              // 💡 建议改为 strokeOpacity: 1
}
```

## 建议优化

```typescript
series: [
  {
    defaultShowAs: 'column',
    lines: [{
      dataKey: "netSalesAchieved",
      name: "Net Sales (Achieved)",
      color: "var(--hot-heat-4)",
      barOpacity: 0.85,     // 更语义化
      barWidth: 50,         // 稍微宽一点
    }]
  },
  {
    defaultShowAs: 'line',
    lines: [{
      dataKey: "netSalesGoal",
      name: "Net Sales (Goal)",
      color: "var(--hot-heat-4)",
      strokeWidth: 3,       // 更粗，更明显
      strokeDasharray: "8 4",   // 更长的虚线
      strokeOpacity: 0.7,   // 更语义化
    }]
  }
]
```

这样更清晰、更容易维护！🎨

