#!/usr/bin/env node

/**
 * Script to generate colors.ts from color-chart.scss
 * 
 * Usage: node scripts/generate-colors-ts.js
 */

const fs = require('fs');
const path = require('path');

const SCSS_FILE = path.join(__dirname, '../src/styles/color-chart.scss');
const TS_OUTPUT_FILE = path.join(__dirname, '../src/styles/colors.ts');

/**
 * Parse SCSS file and extract color scales
 */
function parseScssColors(scssContent) {
  const colorScales = {};
  const lines = scssContent.split('\n');
  
  let currentScale = null;
  let currentScaleDisplayName = null;
  let currentScaleOriginalIndex = null;
  let currentColors = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Match comment lines like: /* Sequoia Color Scale - Based on #6A2C3E (maintaining hue) */
    const scaleCommentMatch = line.match(/\/\*\s*(.+?)\s+Color Scale\s*-\s*(?:#[A-Fa-f0-9]{6})?\s*(?:Based on\s+)?(?:#[A-Fa-f0-9]{6})?\s*(?:at index (\d+))?\s*(?:\(.*?\))?\s*\*\//i);
    
    if (scaleCommentMatch) {
      // Save previous scale if exists
      if (currentScale && Object.keys(currentColors).length > 0) {
        saveColorScale(colorScales, currentScale, currentScaleDisplayName, currentColors, currentScaleOriginalIndex);
      }
      
      // Start new scale
      currentScaleDisplayName = scaleCommentMatch[1].trim();
      currentScale = toKebabCase(currentScaleDisplayName);
      currentColors = {};
      currentScaleOriginalIndex = null;
      continue;
    }
    
    // Match color variable lines like: $sequoia-0: #3D1823;
    const colorMatch = line.match(/^\$([a-z-]+)-(\d+):\s*(#[A-Fa-f0-9]{6});?\s*(?:\/\*\s*Original color\s*\*\/)?/);
    
    if (colorMatch && currentScale) {
      const scaleName = colorMatch[1];
      const index = parseInt(colorMatch[2]);
      const color = colorMatch[3].toUpperCase();
      
      // Store color
      currentColors[index] = color;
      
      // Check if this is marked as original color
      if (line.includes('/* Original color */')) {
        currentScaleOriginalIndex = index;
      }
    }
  }
  
  // Save last scale
  if (currentScale && Object.keys(currentColors).length > 0) {
    saveColorScale(colorScales, currentScale, currentScaleDisplayName, currentColors, currentScaleOriginalIndex);
  }
  
  return colorScales;
}

/**
 * Save a color scale to the colorScales object
 */
function saveColorScale(colorScales, scaleName, displayName, colors, originalIndex) {
  // Convert colors object to array
  const colorArray = [];
  const indices = Object.keys(colors).map(Number).sort((a, b) => a - b);
  
  // Ensure we have 9 colors (indices 0-8)
  for (let i = 0; i <= 8; i++) {
    if (colors[i]) {
      colorArray.push(colors[i]);
    }
  }
  
  // If originalIndex not found in comments, try to find it by checking which matches known original colors
  if (originalIndex === null) {
    // Try to infer from the color scale comment in next iteration
    originalIndex = 4; // Default to middle if not specified
  }
  
  const camelCaseName = toCamelCase(scaleName);
  
  colorScales[camelCaseName] = {
    name: scaleName,
    displayName: displayName,
    originalIndex: originalIndex !== null ? originalIndex : 4,
    colors: colorArray
  };
}

/**
 * Convert string to kebab-case
 */
function toKebabCase(str) {
  return str
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to camelCase
 */
function toCamelCase(str) {
  return str
    .split('-')
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/**
 * Re-parse to find original indices from comments
 */
function findOriginalIndices(scssContent) {
  const lines = scssContent.split('\n');
  const originalIndices = {};
  
  let currentScale = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Match scale comment
    const scaleCommentMatch = line.match(/\/\*\s*(.+?)\s+Color Scale\s*-.*?at index (\d+)/i);
    if (scaleCommentMatch) {
      const displayName = scaleCommentMatch[1].trim();
      const originalIndex = parseInt(scaleCommentMatch[2]);
      currentScale = toKebabCase(displayName);
      originalIndices[currentScale] = originalIndex;
      continue;
    }
    
    // Also check for "Original color" inline comments
    const originalColorMatch = line.match(/^\$([a-z-]+)-(\d+):.*\/\*\s*Original color\s*\*\//);
    if (originalColorMatch) {
      const scaleName = originalColorMatch[1];
      const index = parseInt(originalColorMatch[2]);
      originalIndices[scaleName] = index;
    }
  }
  
  return originalIndices;
}

/**
 * Generate TypeScript file content
 */
function generateTypeScriptContent(colorScales) {
  const scales = Object.entries(colorScales)
    .map(([key, scale]) => {
      const colorsStr = scale.colors.map(c => `'${c}'`).join(', ');
      return `  ${key}: {
    name: '${scale.name}',
    displayName: '${scale.displayName}',
    originalIndex: ${scale.originalIndex},
    colors: [${colorsStr}],
  }`;
    })
    .join(',\n');
  
  return `/**
 * Color definitions extracted from color-chart.scss
 * This serves as the single source of truth for all color values in the application
 * 
 * @generated This file is auto-generated from color-chart.scss
 * Run 'npm run generate:colors' to regenerate
 */

export interface ColorScale {
  name: string;
  displayName: string;
  originalIndex: number;
  colors: [string, string, string, string, string, string, string, string, string];
}

export const COLOR_SCALES = {
${scales}
} as const satisfies Record<string, ColorScale>;

/**
 * Helper function to get a specific color from a scale
 */
export function getColor(scaleName: keyof typeof COLOR_SCALES, index: number): string {
  return COLOR_SCALES[scaleName].colors[index];
}

/**
 * Helper function to get the original color from a scale
 */
export function getOriginalColor(scaleName: keyof typeof COLOR_SCALES): string {
  const scale = COLOR_SCALES[scaleName];
  return scale.colors[scale.originalIndex];
}

/**
 * Get all color scales as an array
 */
export function getAllColorScales(): ColorScale[] {
  return Object.values(COLOR_SCALES);
}
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating colors.ts from color-chart.scss...\n');
  
  // Read SCSS file
  if (!fs.existsSync(SCSS_FILE)) {
    console.error(`❌ Error: ${SCSS_FILE} not found`);
    process.exit(1);
  }
  
  const scssContent = fs.readFileSync(SCSS_FILE, 'utf-8');
  
  // Parse colors
  const colorScales = parseScssColors(scssContent);
  
  // Find original indices from comments
  const originalIndices = findOriginalIndices(scssContent);
  
  // Update original indices
  Object.keys(colorScales).forEach(key => {
    const kebabName = colorScales[key].name;
    if (originalIndices[kebabName] !== undefined) {
      colorScales[key].originalIndex = originalIndices[kebabName];
    }
  });
  
  // Generate TypeScript content
  const tsContent = generateTypeScriptContent(colorScales);
  
  // Write to file
  fs.writeFileSync(TS_OUTPUT_FILE, tsContent, 'utf-8');
  
  console.log(`✅ Successfully generated ${path.relative(process.cwd(), TS_OUTPUT_FILE)}`);
  console.log(`📊 Extracted ${Object.keys(colorScales).length} color scales`);
  console.log('\nColor scales:');
  Object.entries(colorScales).forEach(([key, scale]) => {
    console.log(`  - ${scale.displayName} (${scale.colors.length} colors, original at index ${scale.originalIndex})`);
  });
}

main();

