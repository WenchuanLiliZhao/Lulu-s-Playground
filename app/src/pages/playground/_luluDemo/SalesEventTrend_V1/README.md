# Sales Event Trend V1

A comprehensive demo that combines calendar and trend chart views for sales event analysis.

## Features

### Navigation (56px height)
- **Logo & Title**: Black & white logo with "Sales Event Trend" title
- **View Mode Switch**: Toggle between Calendar and Trend views
- **Zoom Level Switch**: Available in Trend view only (Day, Week, Month, Quarter, Year)

### Calendar View
- Full-year calendar with event highlighting
- Event list with status badges (In progress, Last, Incoming)
- Holiday list
- Channel filter (Retail/EC)
- Interactive hover effects

### Trend View
- Two trend charts displayed vertically (50/50 split)
- Sales Performance chart
- User Growth & Engagement chart
- Date range filtering
- Zoom level support with data aggregation (Day, Week, Month, Quarter, Year)

## Layout

```
┌─────────────────────────────────────────────────┐
│  Navigation (56px)                              │
│  [Logo] Sales Event Trend    [Zoom] [View]     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Main Content (calc(100vh - 56px))             │
│  - Calendar View OR                             │
│  - Trend View                                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

## File Structure

```
SalesEventTrend_V1/
├── index.tsx                    # Main page component
├── styles.module.scss           # Main page styles
├── README.md                    # This file
├── components/
│   ├── index.ts
│   └── Navigation/
│       ├── _component.tsx       # Navigation component
│       ├── _styles.module.scss  # Navigation styles
│       └── index.ts
├── data/
│   ├── index.ts                 # Data exports
│   ├── salesData.ts             # Daily sales and user growth data
│   ├── dataAggregation.ts       # Zoom level aggregation functions
│   └── lineConfigs.ts           # Chart line configurations
└── views/
    ├── CalendarView.tsx         # Calendar view (from SalesEventCalendar_V1)
    ├── CalendarView.module.scss
    ├── TrendView.tsx            # Trend view with zoom level support
    └── TrendView.module.scss
```

## Usage

The page is accessible at: `/playground/sales-event-trend-v1`

### State Management
- `viewMode`: 'calendar' | 'trend'
- `zoomLevel`: 'day' | 'week' | 'month' | 'quarter' | 'year'

### Component Integration
- Reuses data and features from `SalesEventCalendar_V1`
- Reuses data and chart configurations from `TrendChartDemo_V1`
- Custom Navigation component for view switching

## Data Aggregation

The Trend view supports five zoom levels with intelligent data aggregation:

- **Day**: Shows daily data points (ideal for last 1-2 months)
- **Week**: Aggregates data by week starting Monday
- **Month**: Aggregates data by month (default view)
- **Quarter**: Aggregates data by quarter (Q1-Q4)
- **Year**: Aggregates data by year

Each zoom level automatically:
- Aggregates metrics appropriately (sum for totals, average for rates)
- Adjusts date ranges for optimal visualization
- Configures X-axis display (angle, interval, height)

## Future Enhancements

1. Sync date selection between Calendar and Trend views
2. Add transition animations between view switches
3. Add export/download functionality
4. Add responsive mobile layout
5. Add drill-down capability (click to zoom in)

