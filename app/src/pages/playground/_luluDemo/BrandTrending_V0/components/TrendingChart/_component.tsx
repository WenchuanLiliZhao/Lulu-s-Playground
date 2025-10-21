import { useMemo } from 'react';
import styles from './_styles.module.scss';
import type { BrandTrendingData } from '../../data/trendingData';

export interface TrendingChartProps {
  data: BrandTrendingData[];
  className?: string;
  width?: number;
  height?: number;
}

export const TrendingChart = ({ 
  data, 
  className = '',
  width = 900,
  height = 500,
}: TrendingChartProps) => {
  const padding = { top: 40, right: 150, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const { xScale, yScale, xLabels, yLabels } = useMemo(() => {
    const allDates = data[0]?.data.map(d => d.date) || [];
    const allValues = data.flatMap(brand => brand.data.map(d => d.value));
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    
    // Add padding to y-axis range
    const yMin = Math.max(0, Math.floor(minValue / 10) * 10 - 10);
    const yMax = Math.ceil(maxValue / 10) * 10 + 10;
    
    const xScale = (index: number) => (index / (allDates.length - 1)) * chartWidth;
    const yScale = (value: number) => chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight;
    
    // Generate y-axis labels
    const yStep = (yMax - yMin) / 5;
    const yLabels = Array.from({ length: 6 }, (_, i) => yMin + i * yStep);
    
    return { xScale, yScale, xLabels: allDates, yLabels };
  }, [data, chartWidth, chartHeight]);

  // Generate path for each brand
  const generatePath = (brandData: BrandTrendingData) => {
    return brandData.data
      .map((point, index) => {
        const x = xScale(index);
        const y = yScale(point.value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <svg 
        width={width} 
        height={height}
        className={styles.svg}
      >
        {/* Chart area background */}
        <rect
          x={padding.left}
          y={padding.top}
          width={chartWidth}
          height={chartHeight}
          className={styles.chartBackground}
        />

        {/* Grid lines */}
        <g className={styles.gridLines}>
          {/* Horizontal grid lines */}
          {yLabels.map((value, index) => {
            const y = padding.top + yScale(value);
            return (
              <line
                key={`h-grid-${index}`}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                className={styles.gridLine}
              />
            );
          })}
          
          {/* Vertical grid lines */}
          {xLabels.map((_, index) => {
            const x = padding.left + xScale(index);
            return (
              <line
                key={`v-grid-${index}`}
                x1={x}
                y1={padding.top}
                x2={x}
                y2={padding.top + chartHeight}
                className={styles.gridLine}
              />
            );
          })}
        </g>

        {/* Y-axis labels */}
        <g className={styles.yAxis}>
          {yLabels.map((value, index) => {
            const y = padding.top + yScale(value);
            return (
              <text
                key={`y-label-${index}`}
                x={padding.left - 10}
                y={y}
                className={styles.axisLabel}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(value)}
              </text>
            );
          })}
        </g>

        {/* X-axis labels */}
        <g className={styles.xAxis}>
          {xLabels.map((date, index) => {
            const x = padding.left + xScale(index);
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={padding.top + chartHeight + 20}
                className={styles.axisLabel}
                textAnchor="middle"
              >
                {date}
              </text>
            );
          })}
        </g>

        {/* Brand lines */}
        <g className={styles.lines}>
          {data.map((brand) => (
            <g key={brand.brand}>
              {/* Line path */}
              <path
                d={generatePath(brand)}
                className={styles.line}
                stroke={brand.color}
                fill="none"
                strokeWidth={2.5}
                transform={`translate(${padding.left}, ${padding.top})`}
              />
              
              {/* Data points */}
              {brand.data.map((point, index) => {
                const x = padding.left + xScale(index);
                const y = padding.top + yScale(point.value);
                return (
                  <circle
                    key={`${brand.brand}-${index}`}
                    cx={x}
                    cy={y}
                    r={4}
                    className={styles.dataPoint}
                    fill={brand.color}
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* Legend */}
        <g className={styles.legend}>
          {data.map((brand, index) => {
            const y = padding.top + index * 30;
            const x = padding.left + chartWidth + 20;
            
            return (
              <g key={brand.brand}>
                <line
                  x1={x}
                  y1={y}
                  x2={x + 30}
                  y2={y}
                  stroke={brand.color}
                  strokeWidth={2.5}
                  className={styles.legendLine}
                />
                <circle
                  cx={x + 15}
                  cy={y}
                  r={4}
                  fill={brand.color}
                />
                <text
                  x={x + 40}
                  y={y}
                  className={styles.legendText}
                  dominantBaseline="middle"
                >
                  {brand.brand}
                </text>
              </g>
            );
          })}
        </g>

        {/* Axis labels */}
        <text
          x={padding.left + chartWidth / 2}
          y={height - 10}
          className={styles.axisTitle}
          textAnchor="middle"
        >
          Time Period
        </text>
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          className={styles.axisTitle}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          Trending Index
        </text>
      </svg>
    </div>
  );
};

