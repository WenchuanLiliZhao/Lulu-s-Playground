import { getAllColorScales, type ColorScale } from '../../../../../styles/color-chart';

export interface ColorScaleData {
  title: string;
  originalColor: string;
  originalIndex: number;
  colors: string[];
}

/**
 * Generate color scale data from the centralized color definitions
 * This ensures single source of truth from color-chart.scss
 */
export const colorScales: ColorScaleData[] = getAllColorScales().map((scale: ColorScale) => ({
  title: scale.displayName,
  originalColor: scale.colors[scale.originalIndex],
  originalIndex: scale.originalIndex,
  colors: [...scale.colors],
}));

