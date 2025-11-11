import { type ReactNode, useEffect, useRef } from "react";
import styles from "./_styles.module.scss";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";

export interface ChatDialogProps {
  /**
   * Controls whether the dialog is visible
   */
  isOpen: boolean;
  
  /**
   * Callback fired when dialog requests to close
   */
  onClose?: () => void;
  
  /**
   * Dialog content
   */
  children: ReactNode;
  
  /**
   * Optional className for custom styling
   */
  className?: string;
  
  /**
   * Dialog title
   * @default "AI Assistant"
   */
  title?: string;
  
  /**
   * Optional subtitle
   */
  subtitle?: string;
}

export const ChatDialog = ({
  isOpen,
  onClose,
  children,
  className = "",
  title = "AI Assistant",
  subtitle,
}: ChatDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add event listener with a small delay to avoid immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={dialogRef} className={`${styles["chat-dialog"]} ${className}`}>
      <div className={styles["dialog-header"]}>
        <div className={styles["header-content"]}>
          <div className={styles["icon-wrapper"]}>
            <Icon icon="smart_toy" style={{ fontSize: "20px" }} />
          </div>
          <div className={styles["title-section"]}>
            <h3 className={styles["title"]}>{title}</h3>
            {subtitle && <p className={styles["subtitle"]}>{subtitle}</p>}
          </div>
        </div>
        {onClose && (
          <IconButton
            icon="close"
            onClick={onClose}
            className={styles["close-button"]}
            aria-label="Close chat"
          />
        )}
      </div>
      <div className={styles["dialog-content"]}>
        {children}
      </div>
    </div>
  );
};

ChatDialog.displayName = "ChatDialog";

