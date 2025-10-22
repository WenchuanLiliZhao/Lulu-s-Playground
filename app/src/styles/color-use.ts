/**
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
  colorMain: string;
  colorSec: string;
  colorSecTrans: string;
  colorNeg: string;
  colorNegTrans: string;
  colorDisabled: string;
  colorDisabledTrans: string;
  colorBgMain: string;
  colorBgSec: string;
  colorBgSecTrans: string;
  colorBgSec2: string;
  colorBgSec2Trans: string;
  colorBorderMain: string;
  colorBorderMainTrans: string;
  colorBorderDarkenTrans: string;
  colorSemanticActive: string;
  colorSemanticSuccess: string;
  colorSemanticWarning: string;
  colorSemanticError: string;
  colorSemanticErrorTextEm: string;
}

/**
 * Root-level color variables
 */
export const BRANDCOLOR = 'var(--hot-heat-4)';

/**
 * Light theme color values
 */
export const LIGHT_THEME: ThemeColors = {
    colorMain: '#1a1a1a',
    colorSec: '#858585',
    colorSecTrans: 'rgba(0, 0, 0, 0.48)',
    colorNeg: '#ADADAD',
    colorNegTrans: 'rgba(0, 0, 0, 0.32)',
    colorDisabled: '#C2C2C2',
    colorDisabledTrans: 'rgba(0, 0, 0, 0.24)',
    colorBgMain: 'white',
    colorBgSec: '#fafafa',
    colorBgSecTrans: 'rgba(0, 0, 0, 0.02)',
    colorBgSec2: '#f5f5f5',
    colorBgSec2Trans: 'rgba(0, 0, 0, 0.04)',
    colorBorderMain: '#ebebeb',
    colorBorderMainTrans: 'rgba(0, 0, 0, 0.08)',
    colorBorderDarkenTrans: 'rgba(0, 0, 0, 0.16)',
    colorSemanticActive: 'var(--indigo-5)',
    colorSemanticSuccess: 'var(--wilderness-4)',
    colorSemanticWarning: 'var(--amber-4)',
    colorSemanticError: 'var(--hot-heat-4)',
    colorSemanticErrorTextEm: 'var(--hot-heat-3)'
} as const;

/**
 * Dark theme color values
 */
export const DARK_THEME: ThemeColors = {
    colorMain: '#eaeaea',
    colorSec: '#b3b3b3',
    colorSecTrans: 'rgba(255, 255, 255, 0.48)',
    colorNeg: '#4d4d4d',
    colorNegTrans: 'rgba(255, 255, 255, 0.32)',
    colorDisabled: '#3D3D3D',
    colorDisabledTrans: 'rgba(255, 255, 255, 0.24)',
    colorBgMain: '#121212',
    colorBgSec: '#1e1e1e',
    colorBgSecTrans: 'rgba(255, 255, 255, 0.02)',
    colorBgSec2: '#2a2a2a',
    colorBgSec2Trans: 'rgba(255, 255, 255, 0.04)',
    colorBorderMain: '#333333',
    colorBorderMainTrans: 'rgba(255, 255, 255, 0.08)',
    colorBorderDarkenTrans: 'rgba(255, 255, 255, 0.16)',
    colorSemanticActive: 'var(--indigo-5)',
    colorSemanticSuccess: 'var(--wilderness-4)',
    colorSemanticWarning: 'var(--amber-4)',
    colorSemanticError: 'var(--hot-heat-4)',
    colorSemanticErrorTextEm: 'var(--hot-heat-5)'
} as const;

/**
 * CSS variable names for theme colors
 * Use these to access CSS variables directly in styles
 */
export const CSS_VAR_NAMES = {
  colorMain: '--color-main',
  colorSec: '--color-sec',
  colorSecTrans: '--color-sec-trans',
  colorNeg: '--color-neg',
  colorNegTrans: '--color-neg-trans',
  colorDisabled: '--color-disabled',
  colorDisabledTrans: '--color-disabled-trans',
  colorBgMain: '--color-bg-main',
  colorBgSec: '--color-bg-sec',
  colorBgSecTrans: '--color-bg-sec-trans',
  colorBgSec2: '--color-bg-sec-2',
  colorBgSec2Trans: '--color-bg-sec-2-trans',
  colorBorderMain: '--color-border-main',
  colorBorderMainTrans: '--color-border-main-trans',
  colorBorderDarkenTrans: '--color-border-darken-trans',
  colorSemanticActive: '--color-semantic-active',
  colorSemanticSuccess: '--color-semantic-success',
  colorSemanticWarning: '--color-semantic-warning',
  colorSemanticError: '--color-semantic-error',
  colorSemanticErrorTextEm: '--color-semantic-error-text-em'
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
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}

/**
 * Type for theme mode
 */
export type ThemeMode = 'light' | 'dark';

/**
 * All available color keys
 */
export type ColorKey = keyof ThemeColors;
