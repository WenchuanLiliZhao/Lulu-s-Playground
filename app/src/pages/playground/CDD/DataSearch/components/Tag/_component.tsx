import styles from "./_styles.module.scss";

export interface TagProps {
  label: string;
  variant?: "default" | "primary" | "secondary" | "warning";
  className?: string;
}

export const Tag = ({ label, variant = "default", className = "" }: TagProps) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${className}`}>
      {label}
    </span>
  );
};

