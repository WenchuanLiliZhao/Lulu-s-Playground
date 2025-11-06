import { Icon } from "../Icon";
import styles from "./_styles.module.scss";

export interface FloatingActionButtonProps {
  /**
   * Material Icon name to display
   * @default "smart_toy"
   */
  icon?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Optional className for custom styling
   */
  className?: string;
  
  /**
   * Optional aria-label for accessibility
   * @default "AI Assistant"
   */
  ariaLabel?: string;
  
  /**
   * Optional tooltip text
   * @default "AI Assistant"
   */
  tooltip?: string;
}

export const FloatingActionButton = ({
  icon = "smart_toy",
  onClick,
  className,
  ariaLabel = "AI Assistant",
  tooltip = "AI Assistant",
}: FloatingActionButtonProps) => {
  return (
    <button
      className={`${styles["fab"]} ${className || ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
      title={tooltip}
      type="button"
    >
      <Icon icon={icon} style={{ fontSize: '24px' }} />
    </button>
  );
};

