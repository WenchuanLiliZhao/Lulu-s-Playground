import { useState, useCallback } from 'react';
import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import { ColorScale, Notification } from './components';
import { colorScales } from './data/colorData';
import styles from './styles.module.scss';

interface NotificationState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ColorChart_V0 = () => {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const handleColorCopy = useCallback((color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      showNotification(`Copied ${color.toUpperCase()}`, 'success');
    }).catch((error) => {
      console.error('Failed to copy:', error);
      showNotification('Failed to copy color', 'error');
    });
  }, [showNotification]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Color Scale Generator</h1>
        <p className={styles.subtitle}>
          18 Beautiful Color Palettes with Full Scale Gradients
        </p>
      </header>

      {/* Color Scales Grid */}
      <section className={styles.scalesSection}>
        <div className={styles.scalesGrid}>
          {colorScales.map((scale, scaleIndex) => (
            <ColorScale
              key={scaleIndex}
              title={scale.title}
              originalColor={scale.originalColor}
              colors={scale.colors.map((color, index) => ({
                varName: `--${scale.title.toLowerCase().replace(/\s+/g, '-')}-${index}`,
                color: color,
                isOriginal: index === scale.originalIndex,
                onClick: () => handleColorCopy(color),
              }))}
            />
          ))}
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

const ColorChartPage_V0: PageProps = {
  title: "Color Chart Demo V0",
  slug: "demo-color-chart-v0",
  content: (
    <AppLayout isTesting={true}>
      <ColorChart_V0 />
    </AppLayout>
  ),
};

export default ColorChartPage_V0;
