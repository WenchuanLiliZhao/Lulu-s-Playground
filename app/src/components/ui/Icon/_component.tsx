import { type CSSProperties } from 'react';
import styles from "./_styles.module.scss";

export interface IconProps {
  icon: string;
  className?: string;
  style?: CSSProperties;
}

export const Icon = ({ icon, className, style }: IconProps) => {
  return <span className={`${styles["icon"]} material-symbols-outlined ${className}`} style={style}>{icon}</span>;
};