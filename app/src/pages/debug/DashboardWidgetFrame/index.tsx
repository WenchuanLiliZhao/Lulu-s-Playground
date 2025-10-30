import { useState } from 'react';
import { DashboardWidgetFrame } from '../../../components/ui/forDashboard/DashboardWidgetFrame';
import AppLayout from '../../../components/ui/AppLayout';
import type { PageProps } from '../../_page-types';
import styles from './styles.module.scss';

const DashboardWidgetFrameDebug = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const simulateError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const resetStates = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.debugHeader}>
        <h1>DashboardWidgetFrame Debug</h1>
        <p className={styles.description}>
          Testing the DashboardWidgetFrame component with various configurations, slots, and states
        </p>
      </div>

      {/* Section: Basic Usage */}
      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <p className={styles.sectionDesc}>
          Simple frame with header and alert light
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
          >
            <div className={styles.sampleContent}>
              <h3>Main Content Area</h3>
              <p>This is the main content of the widget.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Summary"
            headerSummary="Additional description text"
            headerIcon="analytics"
            showAlertLight={true}
            alertLightColor="#3b82f6"
          >
            <div className={styles.sampleContent}>
              <h3>Content with Summary</h3>
              <p>Frame with header summary included.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Header Sizes */}
      <section className={styles.section}>
        <h2>Header Sizes</h2>
        <p className={styles.sectionDesc}>
          Small, medium, and large header configurations
        </p>

        <div className={styles.grid3}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Small Header"
            headerIcon="info"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#10b981"
          >
            <div className={styles.sampleContent}>
              <p>Small sized header and icon</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Medium Header"
            headerIcon="info"
            headerTitleSize="medium"
            headerIconSize="medium"
            showAlertLight={true}
            alertLightColor="#3b82f6"
          >
            <div className={styles.sampleContent}>
              <p>Medium sized header and icon (default)</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Large Header"
            headerIcon="info"
            headerTitleSize="large"
            headerIconSize="large"
            showAlertLight={true}
            alertLightColor="#f59e0b"
          >
            <div className={styles.sampleContent}>
              <p>Large sized header and icon</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Alert Light Colors */}
      <section className={styles.section}>
        <h2>Alert Light Colors</h2>
        <p className={styles.sectionDesc}>
          Different alert light colors for various statuses
        </p>

        <div className={styles.grid4}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Healthy"
            headerIcon="check_circle"
            showAlertLight={true}
            alertLightColor="#10b981"
          >
            <div className={styles.sampleContent}>
              <p style={{ color: '#10b981' }}>Green - Healthy Status</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Warning"
            headerIcon="warning"
            showAlertLight={true}
            alertLightColor="#f59e0b"
          >
            <div className={styles.sampleContent}>
              <p style={{ color: '#f59e0b' }}>Orange - Warning Status</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Critical"
            headerIcon="error"
            showAlertLight={true}
            alertLightColor="#ef4444"
          >
            <div className={styles.sampleContent}>
              <p style={{ color: '#ef4444' }}>Red - Critical Status</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Info"
            headerIcon="info"
            showAlertLight={true}
            alertLightColor="#3b82f6"
          >
            <div className={styles.sampleContent}>
              <p style={{ color: '#3b82f6' }}>Blue - Info Status</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Without Header/Alert Light */}
      <section className={styles.section}>
        <h2>Without Header or Alert Light</h2>
        <p className={styles.sectionDesc}>
          Frame with minimal decoration for content-focused widgets
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
            showHeader={false}
            showAlertLight={false}
          >
            <div className={styles.sampleContent}>
              <h3>No Header, No Alert Light</h3>
              <p>Just the content area with frame styling.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={false}
            showAlertLight={true}
            alertLightColor="#8b5cf6"
          >
            <div className={styles.sampleContent}>
              <h3>Alert Light Only</h3>
              <p>Content with alert light but no header.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Slots - renderAfterHeader */}
      <section className={styles.section}>
        <h2>Slot: renderAfterHeader</h2>
        <p className={styles.sectionDesc}>
          Adding content after the header (filters, buttons, etc.)
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Date Filter"
            headerIcon="calendar_month"
            showAlertLight={true}
            alertLightColor="#10b981"
            renderAfterHeader={() => (
              <div className={styles.dateFilter}>
                <label htmlFor="startDate">Start Date:</label>
                <input id="startDate" type="date" defaultValue="2024-01-01" />
                <label htmlFor="endDate">End Date:</label>
                <input id="endDate" type="date" defaultValue="2024-12-31" />
              </div>
            )}
          >
            <div className={styles.sampleContent}>
              <h3>Filtered Content</h3>
              <p>Content that responds to date filter.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Action Buttons"
            headerIcon="settings"
            showAlertLight={true}
            alertLightColor="#3b82f6"
            renderAfterHeader={() => (
              <div className={styles.actionButtons}>
                <button className={styles.button}>Export</button>
                <button className={styles.button}>Refresh</button>
                <button className={styles.button}>Settings</button>
              </div>
            )}
          >
            <div className={styles.sampleContent}>
              <h3>Content with Actions</h3>
              <p>Widget with quick action buttons.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Slots - renderBeforeHeader */}
      <section className={styles.section}>
        <h2>Slot: renderBeforeHeader</h2>
        <p className={styles.sectionDesc}>
          Adding content before the header (banners, alerts)
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Banner"
            headerIcon="notifications"
            showAlertLight={true}
            alertLightColor="#f59e0b"
            renderBeforeHeader={() => (
              <div className={styles.banner}>
                <span className="material-symbols-outlined">info</span>
                <span>New data available - Last updated 5 minutes ago</span>
              </div>
            )}
          >
            <div className={styles.sampleContent}>
              <h3>Content with Banner</h3>
              <p>Widget with informational banner above header.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Alert"
            headerIcon="warning"
            showAlertLight={true}
            alertLightColor="#ef4444"
            renderBeforeHeader={() => (
              <div className={styles.alert}>
                <span className="material-symbols-outlined">warning</span>
                <span>Warning: High resource usage detected</span>
              </div>
            )}
          >
            <div className={styles.sampleContent}>
              <h3>Content with Alert</h3>
              <p>Widget with warning alert above header.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Slots - renderFooter */}
      <section className={styles.section}>
        <h2>Slot: renderFooter</h2>
        <p className={styles.sectionDesc}>
          Adding content at the bottom (legends, summaries, pagination)
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Legend"
            headerIcon="show_chart"
            showAlertLight={true}
            alertLightColor="#10b981"
            renderFooter={() => (
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#10b981' }} />
                  <span>Healthy</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#f59e0b' }} />
                  <span>Warning</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#ef4444' }} />
                  <span>Critical</span>
                </div>
              </div>
            )}
          >
            <div className={styles.chartArea}>
              <div className={styles.mockChart}>Chart Visualization</div>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="With Summary"
            headerIcon="summarize"
            showAlertLight={true}
            alertLightColor="#3b82f6"
            renderFooter={() => (
              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Total:</span>
                  <span className={styles.summaryValue}>1,234</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Average:</span>
                  <span className={styles.summaryValue}>456</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Peak:</span>
                  <span className={styles.summaryValue}>789</span>
                </div>
              </div>
            )}
          >
            <div className={styles.sampleContent}>
              <h3>Main Content</h3>
              <p>Content with summary footer below.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Combined Slots */}
      <section className={styles.section}>
        <h2>Combined Slots</h2>
        <p className={styles.sectionDesc}>
          Using multiple slots together for complex widgets
        </p>

        <div className={styles.gridFull}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Complete Widget Example"
            headerSummary="All slots in action"
            headerIcon="dashboard"
            headerTitleSize="medium"
            showAlertLight={true}
            alertLightColor="#10b981"
            renderBeforeHeader={() => (
              <div className={styles.banner}>
                <span className="material-symbols-outlined">info</span>
                <span>Data synced successfully</span>
              </div>
            )}
            renderAfterHeader={() => (
              <div className={styles.actionButtons}>
                <button className={styles.button}>Today</button>
                <button className={styles.button}>This Week</button>
                <button className={styles.button}>This Month</button>
              </div>
            )}
            renderFooter={() => (
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#3b82f6' }} />
                  <span>Sales</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#8b5cf6' }} />
                  <span>Traffic</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#10b981' }} />
                  <span>Conversions</span>
                </div>
              </div>
            )}
          >
            <div className={styles.chartArea}>
              <div className={styles.mockChart}>Full Featured Chart Visualization</div>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Loading and Error States */}
      <section className={styles.section}>
        <h2>Loading and Error States</h2>
        <p className={styles.sectionDesc}>
          Test loading spinners and error messages
        </p>

        <div className={styles.stateControls}>
          <button onClick={simulateLoading} className={styles.button}>
            Simulate Loading
          </button>
          <button onClick={simulateError} className={styles.button}>
            Simulate Error
          </button>
          <button onClick={resetStates} className={styles.button}>
            Reset
          </button>
        </div>

        <div className={styles.grid3}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Normal State"
            headerIcon="check_circle"
            showAlertLight={true}
            alertLightColor="#10b981"
          >
            <div className={styles.sampleContent}>
              <h3>Content Loaded</h3>
              <p>Everything is working normally.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Loading State"
            headerIcon="hourglass_empty"
            showAlertLight={true}
            alertLightColor="#f59e0b"
            loading={isLoading}
          >
            <div className={styles.sampleContent}>
              <h3>This content is hidden during loading</h3>
              <p>The loading spinner replaces this.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Error State"
            headerIcon="error"
            showAlertLight={true}
            alertLightColor="#ef4444"
            error={hasError ? new Error('Failed to load data: Network timeout') : null}
          >
            <div className={styles.sampleContent}>
              <h3>This content is hidden during error</h3>
              <p>The error message replaces this.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Custom Content Styling */}
      <section className={styles.section}>
        <h2>Custom Content Styling</h2>
        <p className={styles.sectionDesc}>
          Using contentClassName for custom spacing and styling
        </p>

        <div className={styles.grid2}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Default Spacing"
            headerIcon="space_bar"
            showAlertLight={true}
            alertLightColor="#10b981"
          >
            <div className={styles.sampleContent}>
              <h3>Default Content Area</h3>
              <p>Standard spacing and styling.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Custom Spacing"
            headerIcon="space_bar"
            showAlertLight={true}
            alertLightColor="#3b82f6"
            contentClassName={styles.customContent}
          >
            <div className={styles.sampleContent}>
              <h3>Custom Content Area</h3>
              <p>With custom contentClassName applied.</p>
            </div>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Section: Different Content Types */}
      <section className={styles.section}>
        <h2>Different Content Types</h2>
        <p className={styles.sectionDesc}>
          Frame works with any content type
        </p>

        <div className={styles.grid3}>
          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Text Content"
            headerIcon="article"
            showAlertLight={true}
            alertLightColor="#10b981"
          >
            <div className={styles.textContent}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="List Content"
            headerIcon="list"
            showAlertLight={true}
            alertLightColor="#3b82f6"
          >
            <ul className={styles.listContent}>
              <li>First item in list</li>
              <li>Second item in list</li>
              <li>Third item in list</li>
              <li>Fourth item in list</li>
            </ul>
          </DashboardWidgetFrame>

          <DashboardWidgetFrame
            showHeader={true}
            headerTitle="Form Content"
            headerIcon="edit_note"
            showAlertLight={true}
            alertLightColor="#f59e0b"
          >
            <form className={styles.formContent}>
              <label>
                Name:
                <input type="text" placeholder="Enter name" />
              </label>
              <label>
                Email:
                <input type="email" placeholder="Enter email" />
              </label>
              <button type="submit" className={styles.button}>Submit</button>
            </form>
          </DashboardWidgetFrame>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className={styles.usageSection}>
        <h2>Usage Instructions</h2>
        <div className={styles.usageGrid}>
          <div className={styles.usageCard}>
            <h3>Props</h3>
            <ul>
              <li><strong>showHeader</strong>: Toggle header visibility</li>
              <li><strong>headerIcon/Title/Summary</strong>: Header content</li>
              <li><strong>headerTitleSize/IconSize</strong>: Size variants</li>
              <li><strong>showAlertLight</strong>: Toggle alert light</li>
              <li><strong>alertLightColor</strong>: CSS color value</li>
              <li><strong>loading/error</strong>: State management</li>
            </ul>
          </div>
          <div className={styles.usageCard}>
            <h3>Slots</h3>
            <ul>
              <li><strong>children</strong>: Main content (required)</li>
              <li><strong>renderBeforeHeader</strong>: Banners, alerts</li>
              <li><strong>renderAfterHeader</strong>: Filters, buttons</li>
              <li><strong>renderFooter</strong>: Legends, summaries</li>
              <li><strong>contentClassName</strong>: Custom styling</li>
            </ul>
          </div>
          <div className={styles.usageCard}>
            <h3>Best Practices</h3>
            <ul>
              <li>Use for all dashboard widgets</li>
              <li>Keep frame props at top level</li>
              <li>Let children control their layout</li>
              <li>Use slots for optional content</li>
              <li>Don't override frame container styles</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const DashboardWidgetFrameDebugPage: PageProps = {
  title: 'DashboardWidgetFrame Debug',
  slug: 'debug-dashboard-widget-frame',
  content: (
    <AppLayout isTesting={true}>
      <DashboardWidgetFrameDebug />
    </AppLayout>
  ),
};

export default DashboardWidgetFrameDebugPage;

