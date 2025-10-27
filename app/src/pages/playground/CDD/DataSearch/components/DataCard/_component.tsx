import { Icon } from "../../../../../../components/ui/Icon";
import { Tag } from "../Tag";
import styles from "./_styles.module.scss";
import type { DataItem } from "../../data/searchData";

export interface DataCardProps {
  data: DataItem;
  className?: string;
}

export const DataCard = ({ data, className = "" }: DataCardProps) => {
  const renderHighlightedName = () => {
    if (!data.nameHighlight) {
      return <span className={styles.title}>{data.name}</span>;
    }

    const parts = data.name.split(new RegExp(`(${data.nameHighlight})`, 'gi'));
    return (
      <span className={styles.title}>
        {parts.map((part, index) =>
          part.toLowerCase() === data.nameHighlight?.toLowerCase() ? (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Icon icon="table_chart" className={styles.icon} />
          <div className={styles.titleWrapper}>{renderHighlightedName()}</div>
          <button className={styles.copyBtn} aria-label="feature_search">
            <Icon icon="feature_search" />
          </button>
        </div>
      </div>

      <div className={styles.path}>
        <span className={styles.pathLabel}>Registry Path:</span>
        <span className={styles.pathValue}>{data.path}</span>
      </div>

      <div className={styles.tags}>
        {data.tags.map((tag, index) => (
          <Tag key={index} label={tag} variant="default" />
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.source}>
          <span className={styles.sourceLabel}>Data Source:</span>
          <span className={styles.sourceValue}>{data.source}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.views}>
            <Icon icon="visibility" />
            {data.views}
          </span>
          <span className={styles.timestamp}>
            <Icon icon="schedule" />
            {data.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

