import type React from "react";
import styles from "./styles/_style.module.scss";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <div className={styles["app-layout"]}>{children}</div>;
};

export default AppLayout;
