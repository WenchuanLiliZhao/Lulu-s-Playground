import React, { useState, useMemo, type Key } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  LabelList,
} from 'recharts'
import styles from './_styles.module.scss'
import { TREND_CHART_DEFAULTS, DASHBOARD_DEFAULTS } from '../_shared-config'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import { DateFilter } from '../../DateFilter'
import { getCssVar } from '../../../../styles/color-use'
import { useChartWidth, calculateXAxisInterval } from '../_shared-hooks'
import type { 
  BaseChartDataPoint, 
  BaseChartLine, 
  BaseChartProps,
  DashboardCommonProps,
} from '../_shared-chart-types'

export type TrendChartDataPoint = BaseChartDataPoint

export type TrendChartLine = BaseChartLine

/**
 * Display mode for chart
 */
export type ChartDisplayMode = 'line' | 'column' | 'area' | 'waterfall'

/**
 * Series configuration with display mode
 */
export interface ChartSeriesConfig {
  /**
   * Default display mode for this series
   */
  defaultShowAs: ChartDisplayMode
  /**
   * Lines/bars/areas to display
   * Note: In multi-series mode, data is shared across all series
   */
  lines: TrendChartLine[]
}

/**
 * Multi-series chart data structure
 * Supports combining line, column, and area charts in one visualization
 */
export interface MultiSeriesChartData {
  /**
   * Shared data points for all series
   * All series will use the same x-axis (name field)
   */
  data: TrendChartDataPoint[]
  /**
   * Array of series configurations
   * Each series can have a different display mode
   */
  series: ChartSeriesConfig[]
}

export interface TrendChartProps 
  extends Omit<BaseChartProps<TrendChartDataPoint>, 'data' | 'lines'>,
    DashboardCommonProps {
  /**
   * Data for the chart (legacy format or multi-series shared data)
   */
  data?: TrendChartDataPoint[]
  /**
   * Lines to display (legacy format)
   */
  lines?: TrendChartLine[]
  /**
   * Series configurations (single-series format, deprecated)
   * Use multiSeries for combining different chart types
   */
  series?: ChartSeriesConfig[]
  /**
   * Multi-series configuration (recommended for mixed chart types)
   * Supports combining line, column, and area in one chart
   */
  multiSeries?: MultiSeriesChartData
  /**
   * Bar size for column charts
   * @default undefined (auto)
   */
  barSize?: number
  /**
   * Corner radius for bars [topLeft, topRight, bottomRight, bottomLeft]
   * @default [4, 4, 0, 0]
   */
  barRadius?: [number, number, number, number] | number
  // All other props are inherited from BaseChartProps and DashboardCommonProps
}

/**
 * Core chart props (without dashboard frame)
 */
export interface TrendChartCoreProps extends Omit<BaseChartProps<TrendChartDataPoint>, 'data' | 'lines'> {
  /**
   * Data for the chart (legacy format or multi-series shared data)
   */
  data?: TrendChartDataPoint[]
  /**
   * Lines to display (legacy format)
   */
  lines?: TrendChartLine[]
  /**
   * Series configurations (single-series format)
   */
  series?: ChartSeriesConfig[]
  /**
   * Multi-series configuration (for mixed chart types)
   */
  multiSeries?: MultiSeriesChartData
  /**
   * Optional className for the container
   */
  className?: string
  /**
   * Bar size for column charts
   */
  barSize?: number
  /**
   * Corner radius for bars
   */
  barRadius?: [number, number, number, number] | number
}

/**
 * TrendChartCore - Core chart component without DashboardWidgetFrame
 * Use this when you want to embed the chart in a custom container
 * 
 * Supports both legacy format (data + lines) and new format (series)
 */
export const TrendChartCore = ({
  data: legacyData,
  lines: legacyLines,
  series,
  multiSeries,
  className = '',
  barSize,
  barRadius = [4, 4, 0, 0],
  // Visual props
  showGrid = TREND_CHART_DEFAULTS.showGrid,
  showLegend = TREND_CHART_DEFAULTS.showLegend,
  animationDuration = TREND_CHART_DEFAULTS.animationDuration,
  showDots = TREND_CHART_DEFAULTS.showDots,
  dotInterval,
  // X-axis props
  showXAxis = TREND_CHART_DEFAULTS.showXAxis,
  xAxisInterval = TREND_CHART_DEFAULTS.xAxisInterval,
  targetTickCount,
  minXAxisSpacing = TREND_CHART_DEFAULTS.minXAxisSpacing,
  maxTickCount = TREND_CHART_DEFAULTS.maxTickCount,
  xAxisAngle = TREND_CHART_DEFAULTS.xAxisAngle,
  xAxisHeight = TREND_CHART_DEFAULTS.xAxisHeight,
  xAxisTickMargin = TREND_CHART_DEFAULTS.xAxisTickMargin,
  estimatedChartWidth = TREND_CHART_DEFAULTS.estimatedChartWidth,
  // Chart margins
  marginTop = TREND_CHART_DEFAULTS.marginTop,
  marginRight = TREND_CHART_DEFAULTS.marginRight,
  marginBottom = TREND_CHART_DEFAULTS.marginBottom,
  marginLeft = TREND_CHART_DEFAULTS.marginLeft,
  // Y-axis props
  showYAxis = TREND_CHART_DEFAULTS.showYAxis,
  yAxisWidth = TREND_CHART_DEFAULTS.yAxisWidth,
  yAxisOrientation = TREND_CHART_DEFAULTS.yAxisOrientation,
  yAxisTickFormatter,
  yAxisDomain,
  yAxisTickMargin = TREND_CHART_DEFAULTS.yAxisTickMargin,
  // Date filter props
  enableDateFilter = TREND_CHART_DEFAULTS.enableDateFilter,
  getDateFromDataPoint,
  initialStartDate = TREND_CHART_DEFAULTS.initialStartDate,
  initialEndDate = TREND_CHART_DEFAULTS.initialEndDate,
}: TrendChartCoreProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  
  // Get actual chart width for responsive tick calculation
  const { width: chartWidth, refCallback } = useChartWidth()

  // Determine chart configuration based on provided format
  const chartConfig = useMemo(() => {
    // Priority 1: multiSeries format (supports mixed chart types)
    if (multiSeries) {
      return {
        isMultiSeries: true,
        chartData: multiSeries.data,
        seriesConfig: multiSeries.series,
      }
    }
    
    // Priority 2: series format (single chart type, deprecated for mixed)
    if (series && series.length > 0) {
      const firstSeries = series[0]
      return {
        isMultiSeries: false,
        chartMode: firstSeries.defaultShowAs,
        chartData: legacyData || [],
        chartLines: firstSeries.lines,
      }
    }
    
    // Priority 3: Legacy format (data + lines)
    return {
      isMultiSeries: false,
      chartMode: 'line' as ChartDisplayMode,
      chartData: legacyData || [],
      chartLines: legacyLines || [],
    }
  }, [multiSeries, series, legacyData, legacyLines])

  // Process waterfall data with cumulative calculations
  const processWaterfallData = useMemo(() => {
    return (data: TrendChartDataPoint[], dataKey: string) => {
      let cumulative = 0
      
      return data.map((entry) => {
        const value = entry[dataKey] as number
        const start = value >= 0 ? cumulative : cumulative + value
        cumulative += value
        
        return {
          ...entry,
          [`${dataKey}_start`]: start,
          [`${dataKey}_abs`]: Math.abs(value),
          [`${dataKey}_original`]: value,
        }
      })
    }
  }, [])

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    const dataToFilter = chartConfig.chartData
    
    if (!enableDateFilter || !getDateFromDataPoint) {
      return dataToFilter
    }

    if (!startDate && !endDate) {
      return dataToFilter
    }

    return dataToFilter.filter((dataPoint) => {
      const pointDate = getDateFromDataPoint(dataPoint)
      
      if (startDate && endDate) {
        return pointDate >= startDate && pointDate <= endDate
      } else if (startDate) {
        return pointDate >= startDate
      } else if (endDate) {
        return pointDate <= endDate
      }
      
      return true
    })
  }, [chartConfig.chartData, startDate, endDate, enableDateFilter, getDateFromDataPoint])

  // Determine effective x-axis interval using responsive calculation
  const effectiveXAxisInterval = useMemo(() => {
    return calculateXAxisInterval(
      filteredData.length,
      chartWidth || estimatedChartWidth,
      xAxisInterval,
      targetTickCount,
      minXAxisSpacing,
      maxTickCount
    )
  }, [
    filteredData.length,
    chartWidth,
    estimatedChartWidth,
    xAxisInterval,
    targetTickCount,
    minXAxisSpacing,
    maxTickCount,
  ])

  // Use dotInterval if provided, otherwise sync with effectiveXAxisInterval
  const effectiveDotInterval = dotInterval !== undefined 
    ? dotInterval 
    : (typeof effectiveXAxisInterval === 'number' ? effectiveXAxisInterval : 0)

  // Custom dot renderer that respects the interval and showDots setting
  const renderDot = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number; index?: number; key?: Key | null }) => {
    const { cx, cy, stroke, strokeWidth, index = 0, key } = props
    
    if (!showDots) {
      return <circle key={key} cx={cx} cy={cy} r={0} fill="none" stroke="none" />
    }
    
    if (effectiveDotInterval === 0 || index % (effectiveDotInterval + 1) === 0) {
      return (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={4}
          fill={getCssVar('colorBgMain')}
          stroke={stroke}
          strokeWidth={strokeWidth || 1}
        />
      )
    }
    
    return <circle key={key} cx={cx} cy={cy} r={0} fill="none" stroke="none" />
  }

  // Active dot renderer (always show on hover)
  const renderActiveDot = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number; key?: Key | null }) => {
    const { cx, cy, stroke, strokeWidth, key } = props
    return (
      <circle
        key={key}
        cx={cx}
        cy={cy}
        r={6}
        fill={getCssVar('colorBgMain')}
        stroke={stroke}
        strokeWidth={strokeWidth || 1}
      />
    )
  }

  const chartMargin = {
              top: marginTop,
              right: marginRight,
              left: marginLeft,
              bottom: marginBottom,
  }

  const commonAxisProps = {
    xAxis: showXAxis ? (
              <XAxis 
                dataKey="name" 
                interval={effectiveXAxisInterval}
                angle={xAxisAngle}
                textAnchor={xAxisAngle === 0 ? "middle" : xAxisAngle < 0 ? "end" : "start"}
                height={xAxisHeight}
                tickMargin={xAxisTickMargin}
              />
    ) : null,
    yAxis: showYAxis ? (
              <YAxis 
                width={yAxisWidth}
                orientation={yAxisOrientation}
                tickFormatter={yAxisTickFormatter}
                domain={yAxisDomain}
                tickMargin={yAxisTickMargin}
      />
    ) : null,
  }

  // Render chart based on mode
  const renderChart = () => {
        // Multi-series mode: use ComposedChart to support mixed types
        if (chartConfig.isMultiSeries && chartConfig.seriesConfig) {
          // Process waterfall data if any series uses waterfall mode
          const hasWaterfall = chartConfig.seriesConfig.some(s => s.defaultShowAs === 'waterfall')
          let chartData = filteredData
          
          if (hasWaterfall) {
            chartData = [...filteredData]
            chartConfig.seriesConfig.forEach((seriesItem) => {
              if (seriesItem.defaultShowAs === 'waterfall') {
                seriesItem.lines.forEach((line) => {
                  const processed = processWaterfallData(filteredData, line.dataKey)
                  chartData = processed
                })
              }
            })
          }
          
          return (
            <ComposedChart
              data={chartData}
              margin={chartMargin}
              barSize={barSize}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
              {commonAxisProps.xAxis}
              {commonAxisProps.yAxis}
              <Tooltip />
              {showLegend && (
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  layout="horizontal"
                />
              )}
              {chartConfig.seriesConfig.map((seriesItem, seriesIndex) => {
                const seriesMode = seriesItem.defaultShowAs
                
                return seriesItem.lines.map((line) => {
                  const key = `${seriesMode}-${line.dataKey}-${seriesIndex}`
                  
                  switch (seriesMode) {
                case 'column':
                  return (
                    <Bar
                      key={key}
                      dataKey={line.dataKey}
                      name={line.name}
                      fill={line.color}
                      fillOpacity={line.barOpacity ?? line.opacity ?? 1}
                      barSize={line.barWidth}
                      animationDuration={animationDuration}
                      radius={barRadius}
                    />
                  )
                
                case 'waterfall': {
                  // For waterfall, we render two stacked bars: transparent start + visible value
                  const waterfallStackId = `waterfall-${line.dataKey}-${seriesIndex}`
                  return (
                    <React.Fragment key={key}>
                      {/* Invisible bar to create the starting position */}
                      <Bar
                        dataKey={`${line.dataKey}_start`}
                        fill="transparent"
                        stackId={waterfallStackId}
                        animationDuration={0}
                      />
                      {/* Visible bar showing the actual value */}
                      <Bar
                        dataKey={`${line.dataKey}_abs`}
                        name={line.name}
                        stackId={waterfallStackId}
                        fillOpacity={line.barOpacity ?? line.opacity ?? 1}
                        barSize={line.barWidth}
                        animationDuration={animationDuration}
                        radius={barRadius}
                      >
                        {chartData.map((entry, index) => {
                          const value = entry[`${line.dataKey}_original`] as number
                          const color = value >= 0 
                            ? (line.positiveColor ?? 'var(--wilderness-4)')
                            : (line.negativeColor ?? 'var(--hot-heat-4)')
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={color} 
                            />
                          )
                        })}
                        {line.showLabels !== false && line.labelFormatter && (
                          <LabelList
                            dataKey={`${line.dataKey}_original`}
                            position="top"
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={line.labelFormatter as any}
                            style={{ fontSize: '11px', fill: getCssVar('colorMain') }}
                          />
                        )}
                      </Bar>
                    </React.Fragment>
                  )
                }
                
                case 'area':
                  return (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={line.dataKey}
                      name={line.name}
                      stroke={line.color}
                      fill={line.color}
                      fillOpacity={line.fillOpacity ?? line.opacity ?? 0.6}
                      strokeWidth={line.strokeWidth ?? 2}
                      strokeOpacity={line.strokeOpacity ?? 1}
                      strokeDasharray={line.strokeDasharray}
                      animationDuration={animationDuration}
                    />
                  )
                
                case 'line':
                default:
                  return (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={line.dataKey}
                      name={line.name}
                      stroke={line.color}
                      strokeWidth={line.strokeWidth ?? 2}
                      strokeDasharray={line.strokeDasharray}
                      strokeOpacity={line.strokeOpacity ?? line.opacity ?? 1}
                      dot={(props) => renderDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                      activeDot={(props) => renderActiveDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                      animationDuration={animationDuration}
                    />
                  )
              }
            })
          })}
        </ComposedChart>
      )
    }
    
    // Single-series mode: use specific chart type
    const chartMode = chartConfig.chartMode || 'line'
    const chartLines = chartConfig.chartLines || []
    
    // Process waterfall data if needed
    let chartData = filteredData
    if (chartMode === 'waterfall' && chartLines.length > 0) {
      chartData = processWaterfallData(filteredData, chartLines[0].dataKey)
    }
    
    switch (chartMode) {
      case 'column':
        return (
          <BarChart
            data={filteredData}
            margin={chartMargin}
            barSize={barSize}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            <Tooltip />
            {showLegend && (
              <Legend 
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            )}
            {chartLines.map((line) => (
              <Bar
                key={line.dataKey}
                dataKey={line.dataKey}
                name={line.name}
                fill={line.color}
                fillOpacity={line.barOpacity ?? line.opacity ?? 1}
                barSize={line.barWidth}
                animationDuration={animationDuration}
                radius={barRadius}
              />
            ))}
          </BarChart>
        )
      
      case 'waterfall':
        return (
          <BarChart
            data={chartData}
            margin={chartMargin}
            barSize={barSize}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            <Tooltip />
            {showLegend && (
              <Legend 
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            )}
            {chartLines.map((line, lineIndex) => {
              const waterfallStackId = `waterfall-${line.dataKey}-${lineIndex}`
              return (
                <React.Fragment key={line.dataKey}>
                  {/* Invisible bar to create the starting position */}
                  <Bar
                    dataKey={`${line.dataKey}_start`}
                    fill="transparent"
                    stackId={waterfallStackId}
                    animationDuration={0}
                  />
                  {/* Visible bar showing the actual value */}
                  <Bar
                    dataKey={`${line.dataKey}_abs`}
                    name={line.name}
                    stackId={waterfallStackId}
                    fillOpacity={line.barOpacity ?? line.opacity ?? 1}
                    barSize={line.barWidth}
                    animationDuration={animationDuration}
                    radius={barRadius}
                  >
                    {chartData.map((entry, index) => {
                      const value = entry[`${line.dataKey}_original`] as number
                      const color = value >= 0 
                        ? (line.positiveColor ?? 'var(--wilderness-4)')
                        : (line.negativeColor ?? 'var(--hot-heat-4)')
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={color} 
                        />
                      )
                    })}
                    {line.showLabels !== false && line.labelFormatter && (
                      <LabelList
                        dataKey={`${line.dataKey}_original`}
                        position="top"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={line.labelFormatter as any}
                        style={{ fontSize: '11px', fill: getCssVar('colorMain') }}
                      />
                    )}
                  </Bar>
                </React.Fragment>
              )
            })}
          </BarChart>
        )

      case 'area':
        return (
          <AreaChart
            data={filteredData}
            margin={chartMargin}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            <Tooltip />
            {showLegend && (
              <Legend 
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            )}
            {chartLines.map((line) => (
              <Area
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                fill={line.color}
                fillOpacity={line.fillOpacity ?? line.opacity ?? 0.6}
                strokeWidth={line.strokeWidth ?? 2}
                strokeOpacity={line.strokeOpacity ?? 1}
                strokeDasharray={line.strokeDasharray}
                animationDuration={animationDuration}
              />
            ))}
          </AreaChart>
        )

      case 'line':
      default:
        return (
          <LineChart
            data={filteredData}
            margin={chartMargin}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            <Tooltip />
            {showLegend && (
              <Legend 
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            )}
            {chartLines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth ?? 2}
                strokeDasharray={line.strokeDasharray}
                strokeOpacity={line.strokeOpacity ?? line.opacity ?? 1}
                dot={(props) => renderDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                activeDot={(props) => renderActiveDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                animationDuration={animationDuration}
              />
            ))}
          </LineChart>
        )
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', minHeight: 0 }}>
      {enableDateFilter && (
        <div className={styles.header}>
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            size="small"
          />
        </div>
      )}
      <div ref={refCallback} className={`${styles.chartWrapper} ${className}`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const TrendChart = ({
  title,
  data,
  lines,
  series,
  multiSeries,
  className = '',
  barSize,
  barRadius,
  // Dashboard header props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  // Dashboard alert light props
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  // All other props passed to TrendChartCore
  ...chartProps
}: TrendChartProps) => {
  return (
    <DashboardWidgetFrame
      showHeader={showHeader || !!title}
      headerIcon={headerIcon}
      headerTitle={headerTitle || title}
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
    >
      <TrendChartCore 
        data={data} 
        lines={lines} 
        series={series}
        multiSeries={multiSeries}
        barSize={barSize}
        barRadius={barRadius}
        {...chartProps} 
      />
    </DashboardWidgetFrame>
  )
}

