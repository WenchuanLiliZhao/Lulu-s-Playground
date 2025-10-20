import OriginalBadge from '../OriginalBadge';
import styles from './_styles.module.scss';

export interface ColorScaleItemProps {
  color: string;
  varName: string;
  isOriginal?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ColorScaleItem: React.FC<ColorScaleItemProps> = ({ 
  className, 
  color, 
  varName, 
  isOriginal = false,
  onClick 
}) => {
  return (
    <div className={`${styles.item} ${className || ''}`} onClick={onClick}>
      <div className={styles.swatch} style={{ backgroundColor: color }} />
      <div className={styles.info}>
        <span className={styles.varName}>{varName}</span>
        <span className={styles.hex}>
          {color.toUpperCase()}
          {isOriginal && <OriginalBadge />}
        </span>
      </div>
    </div>
  );
};

