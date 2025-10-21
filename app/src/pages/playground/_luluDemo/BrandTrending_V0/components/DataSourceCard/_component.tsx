import styles from './_styles.module.scss';

export interface DataSourceCardProps {
  title: string;
  description: string;
  sources: string[];
  metrics: string;
  period: string;
  className?: string;
}

export const DataSourceCard = ({
  title,
  description,
  sources,
  metrics,
  period,
  className = '',
}: DataSourceCardProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Data Sources</h4>
        <ul className={styles.sourceList}>
          {sources.map((source, index) => (
            <li key={index} className={styles.sourceItem}>
              {source}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Metrics</h4>
        <p className={styles.text}>{metrics}</p>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Time Period</h4>
        <p className={styles.text}>{period}</p>
      </div>
    </div>
  );
};

