# Event Data Generation Guide

This guide explains how to generate event data for the Hellen Sales Event Trend demo from the `data.md` file.

## Overview

The event data generation script reads activity information from `data.md` and automatically generates TypeScript event definitions for the demo.

## How It Works

### Input: data.md

The input is a markdown table with sales event activities across different channels and phases:

| channel_type | channel | sub_channel | activity_name | activity_phase | activity_date | sub_channel_start_time | sub_channel_end_time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EC | JD | JD | 618 | Phase 1 | 2025-05-16 | 2025-05-16 20:00:00 | 2025-05-20 23:59:59 |
| EC | JD | JD | 618 | Phase 2 | 2025-05-28 | 2025-05-28 20:00:00 | 2025-05-31 23:59:59 |
| EC | JD | JD | 618 | Phase 3 | 2025-06-15 | 2025-06-15 20:00:00 | 2025-06-20 23:59:59 |
| ... | ... | ... | ... | ... | ... | ... | ... |

### Event Grouping Logic

**Each event is defined as:**
- All activity phases with the same `activity_name`, `channel_type`, and `year`
- Aggregates across ALL `sub_channel` values for that channel type

**Example:** "D11 2024" with channel type "EC" aggregates:
- T_MALL D11 (all phases)
- JD D11 (all phases)
- Wechat Wecom D11 (all phases)
- Wechat Virtual Shelf D11 (all phases)
- Wechat MPS D11 (all phases)
- Wechat .CN D11 (all phases)
- Douyin D11 (all phases)

### Event Attributes

For each event group, the script calculates:

1. **Event Name**: `"FY" + LastTwoDigitsOfYear + " " + activity_name`
   - Example: "FY25 618" for 618 activity in 2025

2. **Start Date**: Minimum of all `sub_channel_start_time` for that group
   - Takes the earliest start time across all sub_channels and phases

3. **End Date**: Maximum of all `sub_channel_end_time` for that group
   - Takes the latest end time across all sub_channels and phases

4. **Channel**: Either "Retail" or "EC" based on `channel_type`

5. **Color**: 
   - Retail events: Teal (COLOR_SCALES.teal.colors[4])
   - EC events: Indigo (COLOR_SCALES.indigo.colors[5])

### Output: generatedEventData.ts

The script generates a TypeScript file with event arrays:

```typescript
// Retail Events
export const retailEvents: EventData[] = [
  { 
    name: 'FY25 SMD', 
    interval: [new Date(2025, 4, 27), new Date(2025, 5, 9)], 
    backgroundColor: retailColor, 
    backgroundOpacity: 0.32, 
    channel: 'Retail', 
    link: 'https://example.com/events/fy25-smd' 
  },
  // ... more retail events
];

// EC Events
export const ecEvents: EventData[] = [
  { 
    name: 'FY25 618', 
    interval: [new Date(2025, 4, 16), new Date(2025, 5, 20)], 
    backgroundColor: ecColor, 
    backgroundOpacity: 0.32, 
    channel: 'EC', 
    link: 'https://example.com/events/fy25-618' 
  },
  // ... more EC events
];

// All Events (Retail + EC)
export const generatedEvents: EventData[] = [...retailEvents, ...ecEvents];
```

## How to Use

### Step 1: Update data.md

Add or modify activities in the markdown table:

```markdown
| EC | T_MALL | T_MALL | 618 | Phase 1 | 2025-05-16 | 2025-05-16 20:00:00 | 2025-05-20 23:59:59 |
| EC | T_MALL | T_MALL | 618 | Phase 2 | 2025-05-28 | 2025-05-28 20:00:00 | 2025-05-31 23:59:59 |
```

### Step 2: Run the Generation Script

```bash
cd /Users/wzhao11/Documents/GitHub/Lululemon/Lulu-s-Playground/app
node scripts/generate-event-data.cjs
```

The script will:
1. Parse the markdown table
2. Group events by (activity_name, channel_type, year)
3. Calculate start/end dates
4. Generate TypeScript code
5. Write to `generatedEventData.ts`

### Step 3: Verify the Output

The script prints a summary:

```
📖 Reading data.md...
✅ Parsed 128 records
🔍 Grouping events by definition...
✅ Found 37 unique events
📊 Converting to event data...
✅ Generated 37 events
📅 Sorting events by date...
✅ Sorted events
📝 Generating TypeScript file...
💾 Writing to generatedEventData.ts...
✅ Done!

📈 Summary:
  - Retail events: 12
  - EC events: 25
  - Total events: 37
```

### Step 4: Test the Demo

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the demo page:
   ```
   http://localhost:5173/playground/hellen-sales-event-trend-v1
   ```

3. Verify that:
   - Events display correctly in the calendar view
   - Event dates match the expected ranges
   - Retail and EC filters work properly
   - Event counts are accurate

## Important Notes

### Holidays Are Not Affected

The script only generates event data. **Holidays remain unchanged** and are defined separately in `eventData.ts`:

```typescript
export const holidays: HolidayData[] = [
  { name: "New Year's Day", date: new Date(2025, 0, 1), ... },
  { name: "Chinese New Year", date: new Date(2025, 0, 29), ... },
  // ... more holidays
]
```

### Fiscal Year Calculation

The fiscal year is calculated based on February 1st as the fiscal year start:
- Dates before Feb 1, 2025 → FY24
- Dates on or after Feb 1, 2025 → FY25

### Event Deduplication

The script automatically:
- Groups events by year to avoid multi-year spans
- Removes duplicate events with the same name
- Sorts events chronologically by start date

## Troubleshooting

### Issue: Events spanning multiple years

**Solution**: The script automatically splits events by year. Check that `activity_date` values in `data.md` are correct.

### Issue: Missing events

**Solution**: Verify that the markdown table format is correct with all required columns and proper pipe delimiters.

### Issue: Incorrect date ranges

**Solution**: Check that `sub_channel_start_time` and `sub_channel_end_time` values are in the correct format: `YYYY-MM-DD HH:mm:ss`

## Data Model Reference

### EventData Interface

```typescript
interface EventData {
  name: string                    // Event name (e.g., "FY25 618")
  interval: [Date, Date]          // [start date, end date]
  color?: string                  // Optional text color
  backgroundColor: string         // Background color for label
  backgroundOpacity?: number      // Opacity (default: 0.32)
  channel?: 'Retail' | 'EC'      // Channel type
  duration?: number               // Duration in days (calculated)
  link?: string                   // URL link to event details
}
```

### Input Columns (data.md)

- `channel_type`: "Retail" or "EC"
- `channel`: Platform name (e.g., "T_MALL", "JD", "Retail")
- `sub_channel`: Sub-platform (e.g., "Wecom", "Virtual Shelf", "Corporate Store")
- `activity_name`: Activity identifier (e.g., "618", "D11", "SMD")
- `activity_phase`: Phase identifier (e.g., "Phase 1", "Phase 2")
- `activity_date`: Reference date
- `sub_channel_start_time`: Start timestamp (YYYY-MM-DD HH:mm:ss)
- `sub_channel_end_time`: End timestamp (YYYY-MM-DD HH:mm:ss)

## Example Workflow

1. Business team updates `data.md` with new activity dates
2. Developer runs `node scripts/generate-event-data.cjs`
3. Script generates updated `generatedEventData.ts`
4. Demo automatically uses new event data
5. Test in browser to verify correctness

This workflow ensures that event data stays in sync with business planning while maintaining type safety and code quality.

