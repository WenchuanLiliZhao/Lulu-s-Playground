# Loda Dashboard

A comprehensive full-page dashboard demonstrating the Lululemon UI component library with real-time performance and security monitoring.

## Overview

The Loda Dashboard is a three-column layout dashboard designed to showcase various dashboard widgets and data visualization components in a professional enterprise context.

## Layout Structure

### AppLayout Configuration
- **Viewport Mode**: `["scaled-from", 1920, 1080]`
- Optimized for 1920×1080 resolution with responsive scaling

### Three-Column Grid Layout

#### Left Column
1. **Business Metrics (6 widgets)**
   - Revenue tracking
   - Order statistics
   - Active users count
   - Conversion rate
   - Average session duration
   - Fulfillment rate
   
2. **User Journey Chart**
   - Multi-line trend chart showing:
     - Visitors
     - Sign-ups
     - Purchases
   - 24-hour data visualization

#### Middle Column
1. **Dashboard Header**
   - Main title with gradient background
   - Descriptive subtitle
   
2. **Pathway Visualization 3D** (Largest section)
   - Interactive 3D system workflow diagram
   - Shows data flow through system architecture:
     - User Request → Load Balancer → API Gateway
     - Branches to Service A, B, C
     - All services connect to Database
   - Auto-rotating view
   - Color-coded connections
   
3. **App Performance**
   - 4 key performance metrics:
     - Average Response Time
     - Memory Usage
     - Error Rate
     - Throughput

#### Right Column
1. **Security Monitoring**
   - 4 Mini Trend Charts in 2×2 grid:
     - Firewall Blocks
     - DDoS Attacks
     - Intrusion Attempts
     - WAF Events
   - Compact visualization without axes for clean look
   
2. **Network Traffic**
   - Full trend chart with:
     - Inbound traffic (Mbps)
     - Outbound traffic (Mbps)
   - Interactive legend and grid
   - 2 network metrics:
     - Peak Inbound bandwidth
     - Peak Outbound bandwidth

## Components Used

### Dashboard Widgets
- **MetricWidget**: Compact metric cards with icons and status indicators
- **MiniTrendChart**: Small-footprint trend visualizations for security monitoring
- **TrendChart**: Full-featured line charts for detailed data analysis
- **PathwayVisualization3D**: Interactive 3D workflow visualization

### Data Structure
- All chart data follows unique ID conventions (`${prefix}-${index}`)
- Type-safe data interfaces from component libraries
- Mock data generation with realistic patterns

## Features

### Real-time Monitoring
- Business performance metrics
- User behavior tracking
- Security threat monitoring
- Network bandwidth analysis

### Interactive Visualizations
- 3D pathway with orbital controls
- Hover tooltips on all charts
- Color-coded status indicators
- Responsive metric cards

### Design System Integration
- Uses Lululemon color palette
- Consistent spacing and typography
- Theme-adaptive (light/dark mode support)
- Professional shadows and borders

## File Structure

```
LodaDashboard/
├── index.tsx           # Main page component
├── data/
│   └── index.ts       # All mock data and configurations
├── styles.module.scss # Component-scoped styles
└── README.md          # This file
```

## Access

Navigate to: `/playground/loda-dashboard` or select "Loda Dashboard" from the playground pages list.

## Customization

### Adjusting Layout
- Grid columns can be adjusted in `styles.module.scss`:
  ```scss
  .gridContainer {
    grid-template-columns: 1fr 1fr 1fr; // Equal thirds
  }
  ```

### Changing Data
- All data configurations are in `data/index.ts`
- Each dataset follows the data generation rules (unique IDs, proper prefixes)
- Modify line colors, data points, or metrics as needed

### Styling
- Color scheme uses design system tokens
- Adjust spacing via SCSS variables
- Modify card shadows and borders in styles

## Performance Considerations

- Optimized for 60fps rendering
- Efficient chart animations
- Lazy-loaded 3D scene
- Responsive grid system

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- WebGL support required for 3D visualization
- Responsive down to tablet sizes (with horizontal scroll)

