import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./_styles.module.scss";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Optional className for custom styling
   */
  className?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Input value
   */
  value?: string;
  
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Optional error state
   */
  error?: boolean;
  
  /**
   * Optional error message
   */
  errorMessage?: string;
  
  /**
   * Optional disabled state
   */
  disabled?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, errorMessage, disabled, ...props }, ref) => {
    return (
      <div className={`${styles["input-wrapper"]} ${className || ""}`}>
        <input
          ref={ref}
          className={`${styles["input"]} ${error ? styles["error"] : ""} ${disabled ? styles["disabled"] : ""}`}
          disabled={disabled}
          {...props}
        />
        {error && errorMessage && (
          <span className={styles["error-message"]}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

