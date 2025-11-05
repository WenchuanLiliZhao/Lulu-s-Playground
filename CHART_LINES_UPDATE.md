# Chart Lines Update - Four Curves with Paired Colors

## Changes Made

Updated the "Today's Target" widget chart to display **four curves** instead of one, representing both achieved and goal values for Net Sales and Plan.

## Data Structure

### Updated `trendData`
The chart data is now automatically generated from the table data (`mockTargetTableData`):

```typescript
trendData: mockTargetTableData.map((row) => ({
  id: row.id,
  name: row.time,                          // Time range (e.g., "10:00 ~ 12:00")
  netSalesAchieved: row.netSales.achieve,  // Net Sales - Achieved
  netSalesGoal: row.netSales.goal,         // Net Sales - Goal
  planAchieved: row.plan.achieve,          // Plan - Achieved
  planGoal: row.plan.goal,                 // Plan - Goal
}))
```

### Example Data Point
```typescript
{
  id: "h10-12",
  name: "10:00 ~ 12:00",
  netSalesAchieved: 3050,
  netSalesGoal: 3300,
  planAchieved: 3300,
  planGoal: 3500
}
```

## Four Chart Lines with Paired Colors

### Color Strategy
- **Net Sales (Green)**: Wilderness color scale
  - Achieved: Deep green (`--wilderness-3`)
  - Goal: Light green (`--wilderness-5`)
- **Plan (Blue)**: Daydream color scale
  - Achieved: Deep blue (`--daydream-3`)
  - Goal: Light blue (`--daydream-5`)

### Line Configuration
```typescript
trendChartLines: [
  {
    dataKey: "netSalesAchieved",
    name: "Net Sales (Achieved)",
    color: "var(--wilderness-3)",  // #5F934F - Deep green
    strokeWidth: 3,                // Thicker for achieved
  },
  {
    dataKey: "netSalesGoal",
    name: "Net Sales (Goal)",
    color: "var(--wilderness-5)",  // #95C883 - Light green
    strokeWidth: 2,                // Thinner for goal
  },
  {
    dataKey: "planAchieved",
    name: "Plan (Achieved)",
    color: "var(--daydream-3)",    // #5990C2 - Deep blue
    strokeWidth: 3,                // Thicker for achieved
  },
  {
    dataKey: "planGoal",
    name: "Plan (Goal)",
    color: "var(--daydream-5)",    // #9EC4ED - Light blue
    strokeWidth: 2,                // Thinner for goal
  },
]
```

## Color Palette Details

### Wilderness (Green) Scale
- `--wilderness-3`: `#5F934F` - Deep green for Net Sales Achieved
- `--wilderness-5`: `#95C883` - Light green for Net Sales Goal

### Daydream (Blue) Scale
- `--daydream-3`: `#5990C2` - Deep blue for Plan Achieved
- `--daydream-5`: `#9EC4ED` - Light blue for Plan Goal

## Visual Design

### Line Styles
- **Achieved Lines**: Thicker (3px) to emphasize actual performance
- **Goal Lines**: Thinner (2px) to represent targets

### Color Pairing
- Each metric (Net Sales / Plan) uses two shades from the same color family
- Darker shade = Achieved (actual values)
- Lighter shade = Goal (target values)
- Easy visual distinction while maintaining color harmony

## Legend Display
The chart legend will show all four lines:
- 🟢 Net Sales (Achieved) - Dark green, thick line
- 🟢 Net Sales (Goal) - Light green, thin line
- 🔵 Plan (Achieved) - Dark blue, thick line
- 🔵 Plan (Goal) - Light blue, thin line

## Data Synchronization

The chart data is **automatically synchronized** with the table data:
- Single source of truth: `mockTargetTableData`
- Chart data is derived using `.map()` transformation
- Any updates to table data automatically reflect in the chart
- No manual data duplication required

## Benefits

### ✅ Visual Clarity
- Color pairing makes it easy to compare achieved vs goal
- Separate colors distinguish Net Sales from Plan
- Line thickness differentiates actual from target

### ✅ Data Consistency
- Chart data automatically matches table data
- No risk of data mismatch
- Easy to maintain

### ✅ Professional Design
- Uses Lululemon's official color scales
- Consistent with design system
- Theme-aware (works in light/dark mode)

### ✅ User-Friendly
- Clear legend labels
- Intuitive color coding
- Easy to interpret trends

## Testing

### How to Verify
1. Start dev server: `npm run dev`
2. Navigate to `/playground/jingjing-one-page-v0`
3. Find "Today's Target" widget
4. Click the chart toggle button
5. **Expected result**:
   - Four lines displayed
   - Green lines for Net Sales (dark + light)
   - Blue lines for Plan (dark + light)
   - Legend shows all four lines
   - Chart matches table data

### Visual Checks
- ✅ Four distinct lines visible
- ✅ Green lines (wilderness) for Net Sales
- ✅ Blue lines (daydream) for Plan
- ✅ Darker shades for Achieved
- ✅ Lighter shades for Goal
- ✅ Thicker lines for Achieved (3px)
- ✅ Thinner lines for Goal (2px)
- ✅ Legend displays correctly
- ✅ Data matches table values

## File Modified
- `/app/src/pages/playground/_luluDemo/JingjingOnePage_V0/data.ts`

## Lines of Code
- Updated: `trendData` generation (8 lines)
- Updated: `trendChartLines` configuration (25 lines)
- Total: ~33 lines modified

## Backward Compatibility
✅ All changes are contained in the data file
✅ No breaking changes to components
✅ Table view continues to work as before
✅ Chart toggle functionality preserved

## Future Enhancements
Possible improvements:
- Add interactive tooltips showing exact values
- Allow users to toggle individual lines on/off
- Add trend indicators (up/down arrows)
- Include variance percentage in tooltips
- Add comparison with previous period

