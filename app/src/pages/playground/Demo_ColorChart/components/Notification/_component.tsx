import { useEffect } from 'react';
import styles from './_styles.module.scss';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
  className?: string;
}

export const Notification = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose,
  className 
}: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]} ${className || ''}`}>
      <div className={styles.content}>
        <span className={styles.icon}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ⓘ'}
        </span>
        <span className={styles.message}>{message}</span>
      </div>
      <button 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

