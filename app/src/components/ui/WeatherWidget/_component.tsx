import styles from "./_styles.module.scss";

export interface WeatherWidgetProps {
  condition: string; // "Sunny", "Cloudy", "Rainy", etc.
  temperature?: number; // Temperature in celsius
  icon?: string; // Icon identifier or emoji
  showTemperature?: boolean; // Default: true
  size?: 'small' | 'medium' | 'large'; // Default: 'medium'
  className?: string;
}

// Weather icon mapping (using emoji for simplicity)
const WEATHER_ICONS: Record<string, string> = {
  sunny: '☀️',
  'partly cloudy': '⛅',
  cloudy: '☁️',
  rainy: '🌧️',
  stormy: '⛈️',
  snowy: '❄️',
  foggy: '🌫️',
  windy: '💨',
};

export const WeatherWidget = ({
  condition,
  temperature,
  icon,
  showTemperature = true,
  size = 'medium',
  className,
}: WeatherWidgetProps) => {
  // Get icon based on condition or use custom icon
  const weatherIcon = icon || WEATHER_ICONS[condition.toLowerCase()] || '🌤️';

  const containerClassName = `${styles['container']} ${styles[`size-${size}`]} ${className || ''}`;

  return (
    <div className={containerClassName}>
      <span className={styles['icon']} role="img" aria-label={condition}>
        {weatherIcon}
      </span>
      <span className={styles['condition']}>{condition}</span>
      {showTemperature && temperature !== undefined && (
        <span className={styles['temperature']}>{temperature}°</span>
      )}
    </div>
  );
};

