import styles from "./_styles.module.scss";
import { DashboardWidgetFrame } from "../DashboardWidgetFrame";
import type { DashboardCommonProps } from "../_shared-types";
import { DASHBOARD_DEFAULTS } from "../_shared-config";

export interface ProgressBarItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Display label/title
   */
  label: string;
  /**
   * Numeric value
   */
  value: number;
  /**
   * Bar status: healthy, warning, critical
   */
  status: "healthy" | "warning" | "critical";
  /**
   * Additional info text (e.g., "80ms")
   */
  infoText?: string;
}

export interface ProgressBarChartProps extends DashboardCommonProps {
  /**
   * Chart title (internal header, alternative to showHeader)
   */
  title?: string;
  /**
   * Subtitle/description (internal header, alternative to showHeader)
   */
  subtitle?: string;
  /**
   * Data items to display
   */
  items: ProgressBarItem[];
  /**
   * Show percentage values on bars
   * @default true
   */
  showPercentage?: boolean;
  /**
   * Show info text (e.g., time duration)
   * @default true
   */
  showInfo?: boolean;
}

export const ProgressBarChart = ({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  className = "",

  // ProgressBarChart specific props
  title,
  subtitle,
  items,
  showPercentage = true,
  showInfo = true,
}: ProgressBarChartProps) => {
  // Find max value for percentage calculation
  const maxValue = Math.max(...items.map((item) => item.value));

  const getStatusClass = (status: ProgressBarItem["status"]) => {
    switch (status) {
      case "healthy":
        return styles.healthy;
      case "warning":
        return styles.warning;
      case "critical":
        return styles.critical;
      default:
        return styles.healthy;
    }
  };

  return (
    <DashboardWidgetFrame
      showHeader={showHeader}
      headerIcon={headerIcon}
      headerTitle={headerTitle}
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
      renderFooter={() => (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.healthy}`}></span>
            <span className={styles.legendLabel}>Healthy</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.warning}`}></span>
            <span className={styles.legendLabel}>Warning</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.critical}`}></span>
            <span className={styles.legendLabel}>Critical</span>
          </div>
        </div>
      )}
    >
      {/* Internal Header (alternative to dashboard header) */}
      {!showHeader && (title || subtitle) && (
        <div className={styles["internal-header"]}>
          {title && <h3 className={styles["internal-title"]}>{title}</h3>}
          {subtitle && (
            <p className={styles["internal-subtitle"]}>{subtitle}</p>
          )}
        </div>
      )}

      {/* Chart container */}
      <div className={styles.chartContainer}>
        {/* Chart */}
        <div className={styles.chart}>
          {items.map((item) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

            return (
              <div key={item.id} className={styles.barRow}>
                {/* Left side: Label and optional users/conversion info */}
                <div className={styles.leftSection}>
                  <div className={styles.label}>{item.label}</div>
                </div>

                {/* Middle: Progress bar */}
                <div className={styles.barContainer}>
                  <div
                    className={`${styles.bar} ${getStatusClass(item.status)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Right side: Info text with percentage */}
                {showInfo && (
                  <div className={styles.infoText}>
                    {showPercentage && (
                      <div className={styles.infoTextSecondary}>
                        {percentage.toFixed(1)}%
                      </div>
                    )}
                    {item.infoText && (
                      <div className={styles.infoTextMain}>{item.infoText}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardWidgetFrame>
  );
};
