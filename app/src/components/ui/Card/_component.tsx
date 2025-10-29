import React from 'react';
import styles from "./_styles.module.scss";

export interface CardProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'danger' | 'warning' | 'success' | 'info';
  borderColor?: string; // Custom border color (CSS variable or hex)
  borderPosition?: 'left' | 'top' | 'right' | 'bottom' | 'all';
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  header,
  body,
  footer,
  variant = 'default',
  borderColor,
  borderPosition = 'all',
  className,
  onClick,
}: CardProps) => {
  const containerClassName = `${styles['container']} ${styles[`variant-${variant}`]} ${styles[`border-${borderPosition}`]} ${className || ''} ${onClick ? styles['clickable'] : ''}`;

  const customBorderStyle = borderColor
    ? {
        [`border${borderPosition === 'all' ? '' : borderPosition.charAt(0).toUpperCase() + borderPosition.slice(1)}Color`]:
          borderColor.startsWith('--') ? `var(${borderColor})` : borderColor,
      }
    : undefined;

  const interactiveProps = onClick
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick,
      }
    : {};

  return (
    <div
      className={containerClassName}
      style={customBorderStyle}
      {...interactiveProps}
    >
      {header && <div className={styles['header']}>{header}</div>}
      <div className={styles['body']}>{body}</div>
      {footer && <div className={styles['footer']}>{footer}</div>}
    </div>
  );
};

