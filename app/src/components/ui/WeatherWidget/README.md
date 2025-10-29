# WeatherWidget Component

A compact weather display component that shows weather conditions with an icon, condition text, and optional temperature.

## Features

- **Weather icons**: Emoji-based icons for common weather conditions
- **Customizable icons**: Support for custom icon strings
- **Temperature display**: Optional temperature with Celsius notation
- **Size variants**: Small, medium, and large sizes
- **Accessible**: Proper ARIA labels for icons
- **Design system compliant**: Uses CSS variables

## Usage

### Basic Usage

```tsx
import { WeatherWidget } from '@/components/ui/WeatherWidget';

<WeatherWidget 
  condition="Sunny" 
  temperature={18}
/>
```

### Without Temperature

```tsx
<WeatherWidget 
  condition="Cloudy"
  showTemperature={false}
/>
```

### Size Variants

```tsx
// Small size
<WeatherWidget 
  condition="Rainy" 
  temperature={12}
  size="small"
/>

// Medium size (default)
<WeatherWidget 
  condition="Sunny" 
  temperature={20}
  size="medium"
/>

// Large size
<WeatherWidget 
  condition="Snowy" 
  temperature={-2}
  size="large"
/>
```

### Custom Icon

```tsx
<WeatherWidget 
  condition="Partly Cloudy"
  temperature={16}
  icon="🌤️"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `condition` | `string` | Yes | - | Weather condition name (e.g., "Sunny", "Cloudy") |
| `temperature` | `number` | No | - | Temperature in Celsius |
| `icon` | `string` | No | Auto-mapped | Custom icon string or emoji |
| `showTemperature` | `boolean` | No | `true` | Whether to display temperature |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | Size variant |
| `className` | `string` | No | - | Additional CSS class |

## Supported Weather Conditions

The component automatically maps the following conditions to icons:

| Condition | Icon |
|-----------|------|
| Sunny | ☀️ |
| Partly Cloudy | ⛅ |
| Cloudy | ☁️ |
| Rainy | 🌧️ |
| Stormy | ⛈️ |
| Snowy | ❄️ |
| Foggy | 🌫️ |
| Windy | 💨 |

If the condition doesn't match any predefined option, it falls back to 🌤️.

## Examples

### In Navigation Bar

```tsx
<div className={styles.navRight}>
  <span className={styles.date}>Oct 29, 2025</span>
  <span className={styles.day}>Wednesday</span>
  <WeatherWidget 
    condition="Sunny" 
    temperature={18}
    size="medium"
  />
</div>
```

### Weather Dashboard

```tsx
<div className={styles.weatherPanel}>
  <h3>Current Weather</h3>
  <WeatherWidget 
    condition="Rainy" 
    temperature={15}
    size="large"
  />
</div>
```

### Compact Display

```tsx
<WeatherWidget 
  condition="Cloudy"
  showTemperature={false}
  size="small"
/>
```

## Accessibility

- Icon has proper `role="img"` attribute
- Condition text provides context for screen readers via `aria-label`
- Temperature units are clearly indicated with degree symbol

## Design System

Uses the following design system variables:

- `--color-main` - Primary text color
- `--color-sec` - Secondary text color (temperature)
- Font size follows responsive scaling

## Customization

### Using Custom Icons

You can pass any emoji or text as the icon:

```tsx
<WeatherWidget 
  condition="Hurricane"
  temperature={25}
  icon="🌀"
/>
```

### Styling with className

Add custom styles by passing a className:

```tsx
<WeatherWidget 
  condition="Sunny"
  temperature={22}
  className={styles.customWeather}
/>
```

## Notes

- Temperature is always displayed in Celsius with the ° symbol
- Icon size scales with the size prop
- The component uses inline-flex for easy integration into layouts
- Works seamlessly in both light and dark modes

