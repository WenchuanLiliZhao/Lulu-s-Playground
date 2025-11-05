# ColumnChart Component

A flexible column chart component with support for weather visualization and customizable color mappings.

## Features

- **Column Chart Visualization**: Display data as vertical bars with customizable heights
- **Weather Icon Support**: Display Material Symbol icons on top of bars (perfect for weather conditions)
- **Color Mapping**: Automatic color assignment based on value thresholds (e.g., cold vs warm temperatures)
- **Customizable Tooltips**: Default tooltip with support for custom renderers
- **Dashboard Integration**: Seamless integration with DashboardWidgetFrame
- **Responsive**: Adapts to container width
- **Theme Support**: Works with light and dark themes

## Usage

### Basic Usage

```tsx
import { ColumnChart } from '@/components/ui/forDashboard/ColumnChart';

const data = [
  { name: 'Mon', value: 15 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 22 },
  { name: 'Thu', value: 19 },
  { name: 'Fri', value: 25 },
];

<ColumnChart
  title="Weekly Temperature"
  data={data}
  showHeader={true}
  headerColor="primary"
/>
```

### Weather Forecast Example

```tsx
const weatherData = [
  { name: 'Mon', value: 15, icon: 'Sunny' },
  { name: 'Tue', value: 12, icon: 'Cloudy' },
  { name: 'Wed', value: 8, icon: 'Rainy' },
  { name: 'Thu', value: -2, icon: 'Snowy' },
  { name: 'Fri', value: 18, icon: 'Partly Cloudy' },
];

const colorMappings = [
  { threshold: 0, color: 'var(--cyan-4)' },      // Cold (<=0°C) - blue
  { threshold: 10, color: 'var(--daydream-4)' }, // Cool (<=10°C) - light blue
  { threshold: 20, color: 'var(--amber-4)' },    // Warm (<=20°C) - amber
  { threshold: 100, color: 'var(--hot-heat-4)' }, // Hot (>20°C) - red
];

<ColumnChart
  title="10-Day Weather Forecast"
  data={weatherData}
  showHeader={true}
  headerIcon="wb_sunny"
  headerColor="primary"
  showIcons={true}
  iconSize={24}
  colorMappings={colorMappings}
  height={350}
/>
```

### Without Dashboard Frame

```tsx
import { ColumnChartCore } from '@/components/ui/forDashboard/ColumnChart';

<ColumnChartCore
  data={data}
  height={300}
  showIcons={true}
  colorMappings={colorMappings}
/>
```

## Props

### ColumnChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ColumnChartDataPoint[]` | Required | Chart data |
| `title` | `string` | - | Chart title |
| `height` | `number` | `300` | Chart height in pixels |
| `defaultBarColor` | `string` | `var(--indigo-4)` | Default bar color |
| `colorMappings` | `ColorMapping[]` | - | Value-based color mappings |
| `showIcons` | `boolean` | `false` | Show icons on top of bars |
| `iconSize` | `number` | `20` | Icon size in pixels |
| `dataKey` | `string` | `'value'` | Data key for values |
| `showXAxis` | `boolean` | `true` | Show X-axis |
| `showYAxis` | `boolean` | `true` | Show Y-axis |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `customTooltip` | `React.ComponentType` | - | Custom tooltip component |
| `showHeader` | `boolean` | `false` | Show dashboard header |
| `headerIcon` | `string` | - | Header icon (Material Symbol) |
| `headerTitle` | `string` | - | Header title |
| `headerColor` | `DashboardColorType` | `'secondary'` | Header color |

### ColumnChartDataPoint

```tsx
interface ColumnChartDataPoint {
  name: string;           // Display name (X-axis label)
  value: number;          // Bar height value
  color?: string;         // Optional explicit color
  icon?: string;          // Optional weather condition name
  [key: string]: any;     // Additional data for tooltips
}
```

### ColorMapping

```tsx
interface ColorMapping {
  threshold: number;      // Value threshold
  color: string;          // CSS color value
}
```

Color mappings are applied in order. The last matching mapping (where `value <= threshold`) is used.

## Weather Icon Support

The component automatically maps common weather conditions to Material Symbols:

| Condition | Material Symbol |
|-----------|----------------|
| Sunny, Clear | `wb_sunny` |
| Partly Cloudy | `partly_cloudy_day` |
| Cloudy, Overcast | `cloud` |
| Rainy, Rain, Showers | `rainy` |
| Light Rain, Drizzle | `rainy_light` |
| Heavy Rain | `rainy_heavy` |
| Snowy, Snow | `weather_snowy` |
| Stormy, Thunder | `thunderstorm` |
| Foggy, Fog | `foggy` |
| Windy | `air` |
| Mist, Haze | `mist` |
| Unknown | `warning` |

## Color Mapping Examples

### Temperature-based Colors

```tsx
const temperatureColors = [
  { threshold: 0, color: 'var(--cyan-4)' },      // Freezing
  { threshold: 10, color: 'var(--daydream-4)' }, // Cold
  { threshold: 20, color: 'var(--amber-4)' },    // Mild
  { threshold: 30, color: 'var(--orange-4)' },   // Warm
  { threshold: 100, color: 'var(--hot-heat-4)' }, // Hot
];
```

### Performance-based Colors

```tsx
const performanceColors = [
  { threshold: 50, color: 'var(--hot-heat-4)' },      // Poor (red)
  { threshold: 80, color: 'var(--amber-4)' },         // Average (amber)
  { threshold: 100, color: 'var(--wilderness-4)' },   // Good (green)
];
```

## Custom Tooltip

```tsx
const CustomWeatherTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0].payload;
  
  return (
    <div style={{ 
      background: 'var(--color-bg-main)',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid var(--color-border-main)',
    }}>
      <div>{data.name}</div>
      <div>{data.value}°C</div>
      <div>{data.icon}</div>
    </div>
  );
};

<ColumnChart
  data={weatherData}
  customTooltip={CustomWeatherTooltip}
/>
```

## Styling

The component uses CSS modules and design system variables:

- `--color-main` - Primary text
- `--color-sec` - Secondary text
- `--color-bg-main` - Background
- `--color-border-main` - Borders
- `--pop-shadow` - Tooltip shadow

## Integration Example

```tsx
const WeatherWidget = () => {
  const weatherData = [
    { name: 'Nov 5', value: 15, icon: 'Sunny' },
    { name: 'Nov 6', value: 12, icon: 'Cloudy' },
    { name: 'Nov 7', value: 8, icon: 'Rainy' },
    { name: 'Nov 8', value: 10, icon: 'Partly Cloudy' },
    { name: 'Nov 9', value: 16, icon: 'Sunny' },
    { name: 'Nov 10', value: 14, icon: 'Cloudy' },
    { name: 'Nov 11', value: 11, icon: 'Rainy' },
    { name: 'Nov 12', value: 13, icon: 'Partly Cloudy' },
    { name: 'Nov 13', value: 18, icon: 'Sunny' },
    { name: 'Nov 14', value: 19, icon: 'Sunny' },
  ];

  const temperatureColors = [
    { threshold: 0, color: 'var(--cyan-4)' },
    { threshold: 10, color: 'var(--daydream-4)' },
    { threshold: 15, color: 'var(--wilderness-4)' },
    { threshold: 20, color: 'var(--amber-4)' },
    { threshold: 100, color: 'var(--hot-heat-4)' },
  ];

  return (
    <ColumnChart
      title="10-Day Weather Forecast"
      data={weatherData}
      showHeader={true}
      headerIcon="wb_sunny"
      headerColor="primary"
      showIcons={true}
      iconSize={24}
      colorMappings={temperatureColors}
      height={350}
      yAxisTickFormatter={(value) => `${value}°C`}
    />
  );
};
```

## Accessibility

- Uses semantic HTML and ARIA attributes
- Icons have proper Material Symbol names
- Tooltips provide additional context
- Keyboard navigation supported through Recharts

## Best Practices

1. **Color Mappings**: Order thresholds from low to high for predictable results
2. **Icon Size**: Use 20-24px for optimal visibility without overcrowding
3. **Data Keys**: Keep consistent naming for easier data management
4. **Tooltips**: Provide relevant context for data interpretation
5. **Height**: Adjust based on number of bars and available space (300-400px recommended)

