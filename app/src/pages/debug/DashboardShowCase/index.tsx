import { useState } from 'react'
import { DashboardShowCase, DASHBOARD_SHOWCASE_DEFAULTS, type SizeType, type ColorType } from '../../../components/ui/forDashboard/DashboardShowCase'
import { TrendChart } from '../../../components/ui/forDashboard/TrendChart'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss' 
import { COLOR_SCALES } from '../../../styles/color-chart'

// Sample data for TrendChart
const sampleChartData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
]

const sampleChartLines = [
  { dataKey: 'revenue', name: 'Revenue', color: COLOR_SCALES.hotHeat.colors[4], strokeWidth: 2 },
  { dataKey: 'users', name: 'Users', color: COLOR_SCALES.cyan.colors[4], strokeWidth: 2 },
]

const DashboardShowCaseDebug = () => {
  // Header configuration
  const [showHeader, setShowHeader] = useState(true)
  const [headerIcon, setHeaderIcon] = useState('home')
  const [headerTitle, setHeaderTitle] = useState('Sales Analytics')
  const [headerSummary, setHeaderSummary] = useState('Track your revenue and user growth over time')
  const [headerTitleSize, setHeaderTitleSize] = useState<SizeType>(DASHBOARD_SHOWCASE_DEFAULTS.headerTitleSize)
  const [headerIconSize, setHeaderIconSize] = useState<SizeType>(DASHBOARD_SHOWCASE_DEFAULTS.headerIconSize)
  const [headerColor, setHeaderColor] = useState<ColorType>(DASHBOARD_SHOWCASE_DEFAULTS.headerColor)

  // Alert light configuration
  const [showAlertLight, setShowAlertLight] = useState<boolean>(DASHBOARD_SHOWCASE_DEFAULTS.showAlertLight)
  const [alertLightColor, setAlertLightColor] = useState<string>(DASHBOARD_SHOWCASE_DEFAULTS.alertLightColor)

  // Predefined material symbols for quick testing
  const materialIcons = [
    'home',
    'search',
    'settings',
    'favorite',
    'star',
    'add',
    'remove',
    'edit',
    'delete',
    'share',
    'menu',
    'close',
    'arrow_back',
    'arrow_forward',
    'open_in_full',
    'expand_content',
  ]

  // Predefined alert colors
  const alertColors = [
    { name: 'Green (Success)', value: '#10b981' },
    { name: 'Yellow (Warning)', value: '#f59e0b' },
    { name: 'Red (Error)', value: '#ef4444' },
    { name: 'Blue (Info)', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Gray (Neutral)', value: '#6b7280' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.debugHeader}>
        <h1>DashboardShowCase Component Debug</h1>
        <p className={styles.description}>
          Container component for dashboard widgets with optional header and alert indicator
        </p>
        <p className={styles.path}>
          Path: src/components/ui/forDashboard/DashboardShowCase
        </p>
      </div>

      {/* Live Preview */}
      <section className={styles.previewSection}>
        <h2>Live Preview</h2>
        <div className={styles.previewContainer}>
          <DashboardShowCase
            showHeader={showHeader}
            headerIcon={headerIcon}
            headerTitle={headerTitle}
            headerSummary={headerSummary}
            headerTitleSize={headerTitleSize}
            headerIconSize={headerIconSize}
            headerColor={headerColor}
            showAlertLight={showAlertLight}
            alertLightColor={alertLightColor}
          >
            {/* Sample content - TrendChart */}
            <TrendChart
              data={sampleChartData}
              lines={sampleChartLines}
              showGrid={true}
              showLegend={true}
              legendPosition="right"
            />
          </DashboardShowCase>
        </div>
      </section>

      {/* Controls */}
      <section className={styles.controlsSection}>
        <h2>Configuration Controls</h2>

        {/* Header Controls */}
        <div className={styles.controlCategory}>
          <h3>Header Configuration</h3>
          
          <div className={styles.controlGroup}>
            <label htmlFor="showHeader">
              <input
                id="showHeader"
                type="checkbox"
                checked={showHeader}
                onChange={(e) => setShowHeader(e.target.checked)}
              />
              {' '}Show Header <code>(showHeader)</code>
            </label>
          </div>

          {showHeader && (
            <>
              <div className={styles.controlGroup}>
                <label htmlFor="headerIcon">
                  Header Icon <code>(headerIcon)</code>
                </label>
                <div className={styles.iconGrid}>
                  {materialIcons.map((icon) => (
                    <button
                      key={icon}
                      className={`${styles.iconButton} ${headerIcon === icon ? styles.active : ''}`}
                      onClick={() => setHeaderIcon(icon)}
                      title={icon}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </button>
                  ))}
                </div>
                <input
                  id="headerIcon"
                  type="text"
                  value={headerIcon}
                  onChange={(e) => setHeaderIcon(e.target.value)}
                  placeholder="Material icon name"
                  className={styles.textInput}
                />
                <span className={styles.hint}>
                  Select from presets or type a <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Material Symbol</a> name
                </span>
              </div>

              <div className={styles.controlGroup}>
                <label htmlFor="headerTitle">
                  Header Title <code>(headerTitle)</code>
                </label>
                <input
                  id="headerTitle"
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  placeholder="Enter title"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.controlGroup}>
                <label htmlFor="headerSummary">
                  Header Summary <code>(headerSummary)</code>
                </label>
                <textarea
                  id="headerSummary"
                  value={headerSummary}
                  onChange={(e) => setHeaderSummary(e.target.value)}
                  placeholder="Enter summary text"
                  className={styles.textArea}
                  rows={3}
                />
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.fieldLabel}>
                  Size <code>(headerTitleSize, headerIconSize)</code>
                </div>
                <div className={styles.radioGroup}>
                  {(['small', 'medium', 'large'] as SizeType[]).map((size) => (
                    <label key={size} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="titleSize"
                        value={size}
                        checked={headerTitleSize === size && headerIconSize === size}
                        onChange={() => {
                          setHeaderTitleSize(size)
                          setHeaderIconSize(size)
                        }}
                      />
                      {' '}{size.charAt(0).toUpperCase() + size.slice(1)}
                    </label>
                  ))}
                </div>
                <span className={styles.hint}>
                  Summary size automatically follows the title size
                </span>
              </div>

              <div className={styles.controlGroup}>
                <label htmlFor="headerColor">
                  Header Color <code>(headerColor)</code>
                </label>
                <select
                  id="headerColor"
                  value={headerColor}
                  onChange={(e) => setHeaderColor(e.target.value as ColorType)}
                  className={styles.select}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="brand">Brand</option>
                  <option value="active">Active</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Alert Light Controls */}
        <div className={styles.controlCategory}>
          <h3>Alert Light Configuration</h3>
          
          <div className={styles.controlGroup}>
            <label htmlFor="showAlertLight">
              <input
                id="showAlertLight"
                type="checkbox"
                checked={showAlertLight}
                onChange={(e) => setShowAlertLight(e.target.checked)}
              />
              {' '}Show Alert Light <code>(showAlertLight)</code>
            </label>
          </div>

          {showAlertLight && (
            <>
              <div className={styles.controlGroup}>
                <div className={styles.fieldLabel}>
                  Alert Light Color <code>(alertLightColor)</code>
                </div>
                <div className={styles.colorGrid}>
                  {alertColors.map((color) => (
                    <button
                      key={color.value}
                      className={`${styles.colorButton} ${alertLightColor === color.value ? styles.active : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setAlertLightColor(color.value)}
                      title={color.name}
                    >
                      {alertLightColor === color.value && (
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '16px' }}>
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className={styles.colorInputGroup}>
                  <input
                    type="color"
                    value={alertLightColor}
                    onChange={(e) => setAlertLightColor(e.target.value)}
                    className={styles.colorPicker}
                    aria-label="Alert light color picker"
                  />
                  <input
                    type="text"
                    value={alertLightColor}
                    onChange={(e) => setAlertLightColor(e.target.value)}
                    placeholder="#10b981"
                    className={styles.textInput}
                    aria-label="Alert light color hex value"
                  />
                </div>
                <span className={styles.hint}>
                  Select a preset color or use the color picker / enter a hex value
                </span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Documentation */}
      <section className={styles.usageSection}>
        <h2>Component Features</h2>
        <ul>
          <li>
            <strong>Optional Header:</strong> Display icon, title, and summary text with configurable sizes and colors
          </li>
          <li>
            <strong>Alert Light Indicator:</strong> Pulsing indicator in top-right corner with customizable color
          </li>
          <li>
            <strong>Flexible Children:</strong> Place any dashboard content (charts, metrics, tables, etc.)
          </li>
          <li>
            <strong>Design Parameters:</strong> Extensive SCSS variables at the top of _styles.module.scss for fine-tuning
          </li>
          <li>
            <strong>Theme Support:</strong> Automatically adapts to light/dark themes using design system colors
          </li>
          <li>
            <strong>Material Symbols:</strong> Uses Material Symbols Outlined for header icon
          </li>
        </ul>

        <h3>Design Configuration (SCSS)</h3>
        <p>
          The following SCSS variables at the top of <code>_styles.module.scss</code> can be adjusted:
        </p>
        <ul>
          <li>
            <code>$container-padding-top/right/bottom/left</code>: Internal padding of the showcase (default: 24px)
          </li>
          <li>
            <code>$alert-light-top</code>: Alert light position from top (default: 16px)
          </li>
          <li>
            <code>$alert-light-right</code>: Alert light position from right (default: 16px)
          </li>
          <li>
            <code>$alert-light-size</code>: Alert light diameter (default: 12px)
          </li>
          <li>
            <code>$alert-light-glow-size</code>: Alert light glow radius (default: 8px)
          </li>
          <li>
            <code>$header-margin-bottom</code>: Space below header (default: 16px)
          </li>
          <li>
            <code>$header-icon-margin-right</code>: Space between icon and title (default: 12px)
          </li>
        </ul>

        <h3>TypeScript Configuration (_defaults.ts)</h3>
        <p>
          Adjust default values and size/color configurations in <code>_defaults.ts</code>:
        </p>
        <ul>
          <li>
            <code>DASHBOARD_SHOWCASE_DEFAULTS</code>: Default prop values
          </li>
          <li>
            <code>SIZE_CONFIG</code>: Font size mappings for small/medium/large
          </li>
          <li>
            <code>COLOR_CONFIG</code>: Color variable mappings
          </li>
        </ul>

        <h3>Usage Example</h3>
        <pre>
          <code>
{`<DashboardShowCase
  showHeader={true}
  headerIcon="home"
  headerTitle="Sales Analytics"
  headerSummary="Track revenue over time"
  headerTitleSize="medium"
  headerColor="primary"
  showAlertLight={true}
  alertLightColor="#10b981"
>
  <MyChart />
</DashboardShowCase>`}
          </code>
        </pre>
      </section>
    </div>
  )
}

const DashboardShowCaseDebugPage: PageProps = {
  title: 'DashboardShowCase Debug',
  slug: 'debug-dashboard-showcase',
  content: (
    <AppLayout isTesting={true}>
      <DashboardShowCaseDebug />
    </AppLayout>
  ),
}

export default DashboardShowCaseDebugPage

