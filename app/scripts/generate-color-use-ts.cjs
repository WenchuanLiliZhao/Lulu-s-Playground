#!/usr/bin/env node

/**
 * Script to generate color-use.ts from color-use.scss
 * 
 * Usage: node scripts/generate-color-use-ts.cjs
 */

const fs = require('fs');
const path = require('path');

const SCSS_FILE = path.join(__dirname, '../src/styles/color-use.scss');
const TS_OUTPUT_FILE = path.join(__dirname, '../src/styles/color-use.ts');

/**
 * Parse SCSS file and extract theme colors
 */
function parseScssThemeColors(scssContent) {
  const themes = {
    light: {},
    dark: {},
    root: {}
  };
  
  const lines = scssContent.split('\n');
  let currentTheme = null;
  let inMixin = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect @mixin light-theme or @mixin dark-theme
    if (line.match(/^@mixin\s+light-theme/)) {
      currentTheme = 'light';
      inMixin = true;
      continue;
    }
    
    if (line.match(/^@mixin\s+dark-theme/)) {
      currentTheme = 'dark';
      inMixin = true;
      continue;
    }
    
    // Check for :root block (not inside mixin, for brand color)
    if (line.match(/^:root\s*{/) && !inMixin) {
      currentTheme = 'root';
      continue;
    }
    
    // Exit mixin or block
    if (line === '}' && currentTheme) {
      if (inMixin) {
        inMixin = false;
      }
      currentTheme = null;
      continue;
    }
    
    // Extract CSS variable definitions
    // Match patterns like: --color-main: #1a1a1a;
    // or --color-sec-trans: rgba(0, 0, 0, 0.48);
    // or --brand-color: var(--hot-heat-4);
    const varMatch = line.match(/^--([a-z0-9-]+):\s*(.+?);/);
    
    if (varMatch && currentTheme) {
      const varName = varMatch[1];
      const varValue = varMatch[2].trim();
      
      // Convert CSS variable name to camelCase
      const camelCaseName = toCamelCase(varName);
      
      themes[currentTheme][camelCaseName] = {
        cssVar: `--${varName}`,
        value: varValue
      };
    }
  }
  
  return themes;
}

/**
 * Convert kebab-case to camelCase
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
 * Convert camelCase to kebab-case
 */
function toKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Generate TypeScript interface for theme colors
 */
function generateThemeInterface(themeColors) {
  const properties = Object.keys(themeColors)
    .map(key => `  ${key}: string;`)
    .join('\n');
  
  return properties;
}

/**
 * Generate TypeScript object for a theme
 */
function generateThemeObject(themeColors) {
  const properties = Object.entries(themeColors)
    .map(([key, data]) => `    ${key}: '${data.value}'`)
    .join(',\n');
  
  return properties;
}

/**
 * Generate CSS variable names mapping
 */
function generateCssVarMapping(themeColors) {
  const properties = Object.entries(themeColors)
    .map(([key, data]) => `  ${key}: '${data.cssVar}'`)
    .join(',\n');
  
  return properties;
}

/**
 * Generate TypeScript file content
 */
function generateTypeScriptContent(themes) {
  const interfaceProps = generateThemeInterface(themes.light);
  const lightTheme = generateThemeObject(themes.light);
  const darkTheme = generateThemeObject(themes.dark);
  const cssVarNames = generateCssVarMapping(themes.light);
  const rootVars = Object.entries(themes.root).map(([key, data]) => 
    `export const ${key.toUpperCase()} = '${data.value}';`
  ).join('\n');
  
  return `/**
 * Theme color definitions extracted from color-use.scss
 * This serves as the programmatic interface for theme colors
 * 
 * @generated This file is auto-generated from color-use.scss
 * Run 'npm run generate:color-use' to regenerate
 */

/**
 * Interface for theme color values
 */
export interface ThemeColors {
${interfaceProps}
}

/**
 * Root-level color variables
 */
${rootVars}

/**
 * Light theme color values
 */
export const LIGHT_THEME: ThemeColors = {
${lightTheme}
} as const;

/**
 * Dark theme color values
 */
export const DARK_THEME: ThemeColors = {
${darkTheme}
} as const;

/**
 * CSS variable names for theme colors
 * Use these to access CSS variables directly in styles
 */
export const CSS_VAR_NAMES = {
${cssVarNames}
} as const;

/**
 * Get theme colors based on theme mode
 */
export function getThemeColors(theme: 'light' | 'dark'): ThemeColors {
  return theme === 'light' ? LIGHT_THEME : DARK_THEME;
}

/**
 * Get a specific color value from a theme
 */
export function getThemeColor(
  theme: 'light' | 'dark',
  colorKey: keyof ThemeColors
): string {
  return getThemeColors(theme)[colorKey];
}

/**
 * Get CSS variable name for a color key
 */
export function getCssVarName(colorKey: keyof ThemeColors): string {
  return CSS_VAR_NAMES[colorKey];
}

/**
 * Generate inline style with CSS variable fallback
 */
export function getCssVar(colorKey: keyof ThemeColors, fallback?: string): string {
  const varName = getCssVarName(colorKey);
  return fallback ? \`var(\${varName}, \${fallback})\` : \`var(\${varName})\`;
}

/**
 * Type for theme mode
 */
export type ColorThemeMode = 'light' | 'dark';

/**
 * All available color keys
 */
export type ColorKey = keyof ThemeColors;
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating color-use.ts from color-use.scss...\n');
  
  // Read SCSS file
  if (!fs.existsSync(SCSS_FILE)) {
    console.error(`❌ Error: ${SCSS_FILE} not found`);
    process.exit(1);
  }
  
  const scssContent = fs.readFileSync(SCSS_FILE, 'utf-8');
  
  // Parse theme colors
  const themes = parseScssThemeColors(scssContent);
  
  // Generate TypeScript content
  const tsContent = generateTypeScriptContent(themes);
  
  // Write to file
  fs.writeFileSync(TS_OUTPUT_FILE, tsContent, 'utf-8');
  
  console.log(`✅ Successfully generated ${path.relative(process.cwd(), TS_OUTPUT_FILE)}`);
  console.log(`📊 Extracted theme colors:`);
  console.log(`  - Root variables: ${Object.keys(themes.root).length}`);
  console.log(`  - Light theme: ${Object.keys(themes.light).length} colors`);
  console.log(`  - Dark theme: ${Object.keys(themes.dark).length} colors`);
  
  console.log('\nColor variables:');
  Object.keys(themes.light).forEach(key => {
    console.log(`  - ${key}`);
  });
}

main();

