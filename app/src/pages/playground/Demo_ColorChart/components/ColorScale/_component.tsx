import ColorScaleItem from '../ColorScaleItem';
import styles from './_styles.module.scss';

export interface ColorScaleProps {
  title: string;
  originalColor: string;
  colors: Array<{
    varName: string;
    color: string;
    isOriginal?: boolean;
    onClick?: () => void;
  }>;
  className?: string;
}

export const ColorScale: React.FC<ColorScaleProps> = ({ className, title, originalColor, colors }) => {
  return (
    <div className={`${styles.scale} ${className || ''}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.original}>Original: {originalColor}</p>
      
      <div className={styles.items}>
        {colors.map((item, index) => (
          <ColorScaleItem
            key={index}
            color={item.color}
            varName={item.varName}
            isOriginal={item.isOriginal}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

