/**
 * Script to generate event data from data.md file
 * Reads the markdown table and generates EventData for the HellenSalesEventTrend_V1 demo
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DATA_MD_PATH = path.join(__dirname, '../src/pages/playground/_luluDemo/HellenSalesEventTrend_V1/data/data.md');
const OUTPUT_PATH = path.join(__dirname, '../src/pages/playground/_luluDemo/HellenSalesEventTrend_V1/data/generatedEventData.ts');
const FISCAL_YEAR_START_MONTH = 1; // February (0-indexed)

/**
 * Parse data.md markdown table
 */
function parseDataMd(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  
  // Skip header rows (first 2 lines)
  const dataLines = lines.slice(2);
  
  const records = [];
  for (const line of dataLines) {
    // Parse markdown table row: | col1 | col2 | ... |
    const cols = line.split('|').map(s => s.trim()).filter(s => s !== '');
    
    if (cols.length < 8) continue; // Skip invalid rows
    
    const [channel_type, channel, sub_channel, activity_name, activity_phase, activity_date, sub_channel_start_time, sub_channel_end_time] = cols;
    
    records.push({
      channel_type,
      channel,
      sub_channel,
      activity_name,
      activity_phase,
      activity_date,
      sub_channel_start_time: new Date(sub_channel_start_time),
      sub_channel_end_time: new Date(sub_channel_end_time)
    });
  }
  
  return records;
}

/**
 * Get fiscal year for a date
 * Fiscal year starts on February 1st
 */
function getFiscalYear(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // If date is before February 1st, it belongs to previous fiscal year
  if (month < FISCAL_YEAR_START_MONTH) {
    return year - 1;
  }
  
  return year;
}

/**
 * Group records by event definition:
 * For each activity_name and channel_type, aggregate across all sub_channels and years
 * We create separate events for each year to avoid spanning multiple years
 */
function groupEventsByDefinition(records) {
  const eventMap = new Map();
  
  for (const record of records) {
    // Extract year from start time
    const year = record.sub_channel_start_time.getFullYear();
    
    // Create unique key for event grouping: channel_type + activity_name + year
    const key = `${record.channel_type}|${record.activity_name}|${year}`;
    
    if (!eventMap.has(key)) {
      eventMap.set(key, {
        channel_type: record.channel_type,
        activity_name: record.activity_name,
        year: year,
        records: []
      });
    }
    
    eventMap.get(key).records.push(record);
  }
  
  return Array.from(eventMap.values());
}

/**
 * Calculate event start and end dates based on channel type
 * For each event, get the minimum start time and maximum end time across all records
 */
function calculateEventDates(eventGroup) {
  const { records } = eventGroup;
  
  if (records.length === 0) {
    return null;
  }
  
  // Get minimum start date and maximum end date
  const startDate = new Date(Math.min(...records.map(r => r.sub_channel_start_time.getTime())));
  const endDate = new Date(Math.max(...records.map(r => r.sub_channel_end_time.getTime())));
  
  return { startDate, endDate };
}

/**
 * Format Date object for TypeScript code
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  return `new Date(${year}, ${month}, ${day})`;
}

/**
 * Generate event name in format: "FY" + LastTwoDigitsOfYear + " " + activity_name
 */
function generateEventName(eventGroup, startDate) {
  const fiscalYear = getFiscalYear(startDate);
  const lastTwoDigits = fiscalYear.toString().slice(-2);
  return `FY${lastTwoDigits} ${eventGroup.activity_name}`;
}

/**
 * Convert event groups to EventData array
 */
function convertToEventData(eventGroups) {
  const events = [];
  
  for (const group of eventGroups) {
    const dates = calculateEventDates(group);
    
    if (!dates) continue;
    
    const { startDate, endDate } = dates;
    const eventName = generateEventName(group, startDate);
    const channel = group.channel_type === 'Retail' ? 'Retail' : 'EC';
    const colorVar = channel === 'Retail' ? 'retailColor' : 'ecColor';
    
    // Generate link URL (sanitize event name for URL)
    const urlSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    const link = `https://example.com/events/${urlSlug}`;
    
    events.push({
      name: eventName,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      channel,
      colorVar,
      link
    });
  }
  
  return events;
}

/**
 * Sort events by start date
 */
function sortEventsByDate(events) {
  return events.sort((a, b) => {
    // Extract year, month, day from formatted dates
    const getDateValue = (dateStr) => {
      const match = dateStr.match(/new Date\((\d+), (\d+), (\d+)\)/);
      if (!match) return 0;
      const [_, year, month, day] = match;
      return new Date(parseInt(year), parseInt(month), parseInt(day)).getTime();
    };
    
    return getDateValue(a.startDate) - getDateValue(b.startDate);
  });
}

/**
 * Generate TypeScript file content
 */
function generateTypeScriptFile(events) {
  const retailEvents = events.filter(e => e.channel === 'Retail');
  const ecEvents = events.filter(e => e.channel === 'EC');
  
  const retailEventsCode = retailEvents.map(event => {
    return `  { name: '${event.name}', interval: [${event.startDate}, ${event.endDate}], backgroundColor: ${event.colorVar}, backgroundOpacity: 0.32, channel: '${event.channel}', link: '${event.link}' },`;
  }).join('\n');
  
  const ecEventsCode = ecEvents.map(event => {
    return `  { name: '${event.name}', interval: [${event.startDate}, ${event.endDate}], backgroundColor: ${event.colorVar}, backgroundOpacity: 0.32, channel: '${event.channel}', link: '${event.link}' },`;
  }).join('\n');
  
  return `// This file is generated by scripts/generate-event-data.cjs
// @generated
// Do not edit this file directly. Run 'node scripts/generate-event-data.cjs' to regenerate.

import type { EventData } from './eventData';
import { COLOR_SCALES } from '../../../../../styles/color-chart';

const retailColor = COLOR_SCALES.teal.colors[4];
const ecColor = COLOR_SCALES.indigo.colors[5];

// Retail Events
export const retailEvents: EventData[] = [
${retailEventsCode}
];

// EC Events
export const ecEvents: EventData[] = [
${ecEventsCode}
];

// All Events (Retail + EC)
export const generatedEvents: EventData[] = [...retailEvents, ...ecEvents];
`;
}

/**
 * Main function
 */
function main() {
  console.log('📖 Reading data.md...');
  const records = parseDataMd(DATA_MD_PATH);
  console.log(`✅ Parsed ${records.length} records`);
  
  console.log('🔍 Grouping events by definition...');
  const eventGroups = groupEventsByDefinition(records);
  console.log(`✅ Found ${eventGroups.length} unique events`);
  
  console.log('📊 Converting to event data...');
  const events = convertToEventData(eventGroups);
  console.log(`✅ Generated ${events.length} events`);
  
  console.log('📅 Sorting events by date...');
  const sortedEvents = sortEventsByDate(events);
  console.log(`✅ Sorted events`);
  
  console.log('📝 Generating TypeScript file...');
  const tsContent = generateTypeScriptFile(sortedEvents);
  
  console.log(`💾 Writing to ${OUTPUT_PATH}...`);
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
  console.log('✅ Done!');
  
  // Print summary
  const retailCount = sortedEvents.filter(e => e.channel === 'Retail').length;
  const ecCount = sortedEvents.filter(e => e.channel === 'EC').length;
  console.log('\n📈 Summary:');
  console.log(`  - Retail events: ${retailCount}`);
  console.log(`  - EC events: ${ecCount}`);
  console.log(`  - Total events: ${sortedEvents.length}`);
}

// Run the script
main();

