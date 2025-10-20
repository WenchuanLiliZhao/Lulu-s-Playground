import styles from './_styles.module.scss';

export interface OriginalBadgeProps {
  className?: string;
}

export const OriginalBadge: React.FC<OriginalBadgeProps> = ({ className }) => {
  return (
    <span className={`${styles.badge} ${className || ''}`}>
      ORIGINAL
    </span>
  );
};

