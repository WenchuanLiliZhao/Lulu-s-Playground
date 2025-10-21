import { useState } from "react";
import { Icon } from "../../../../../../components/ui/Icon";
import styles from "./_styles.module.scss";
import type { FilterGroup } from "../../data/searchData";

export interface FilterSectionProps {
  filterGroup: FilterGroup;
  className?: string;
}

export const FilterSection = ({ filterGroup, className = "" }: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{filterGroup.title}</h3>
        <button
          className={styles.expandBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <Icon icon="add" />
        </button>
      </div>

      {isExpanded && (
        <div className={styles.options}>
          {filterGroup.options.map((option) => (
            <label key={option.id} className={styles.option}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.label}>{option.label}</span>
              {option.count !== undefined && (
                <span className={styles.count}>({option.count})</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

