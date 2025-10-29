import React from 'react';
import styles from "./_styles.module.scss";

export interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  color?: string;
  sublabel?: string; // For additional info
}

export interface InfoPanelProps {
  icon?: React.ReactNode;
  title: string;
  items: InfoItem[];
  variant?: 'default' | 'compact' | 'highlighted';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const InfoPanel = ({
  icon,
  title,
  items,
  variant = 'default',
  layout = 'vertical',
  className,
}: InfoPanelProps) => {
  const containerClassName = `${styles['container']} ${styles[`variant-${variant}`]} ${styles[`layout-${layout}`]} ${className || ''}`;

  return (
    <div className={containerClassName}>
      <div className={styles['header']}>
        {icon && <span className={styles['icon']}>{icon}</span>}
        <h3 className={styles['title']}>{title}</h3>
      </div>
      <div className={styles['body']}>
        {items.map((item, index) => {
          const itemClassName = `${styles['item']} ${item.highlight ? styles['item-highlight'] : ''}`;
          const valueStyle = item.color ? { color: `var(--${item.color})` } : undefined;

          return (
            <div key={index} className={itemClassName}>
              <div className={styles['item-content']}>
                <span className={styles['label']}>{item.label}</span>
                <span className={styles['value']} style={valueStyle}>
                  {item.value}
                </span>
              </div>
              {item.sublabel && (
                <span className={styles['sublabel']}>{item.sublabel}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

