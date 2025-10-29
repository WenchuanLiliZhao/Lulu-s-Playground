import React from 'react';
import styles from "./_styles.module.scss";

export interface StatusBadgeProps {
  label: string;
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'light';
  className?: string;
}

export const StatusBadge = ({
  label,
  status,
  icon,
  size = 'medium',
  variant = 'light',
  className,
}: StatusBadgeProps) => {
  const containerClassName = `${styles['container']} ${styles[`status-${status}`]} ${styles[`size-${size}`]} ${styles[`variant-${variant}`]} ${className || ''}`;

  return (
    <span className={containerClassName}>
      {icon && <span className={styles['icon']}>{icon}</span>}
      <span className={styles['label']}>{label}</span>
    </span>
  );
};

