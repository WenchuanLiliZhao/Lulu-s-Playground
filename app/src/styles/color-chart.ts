/**
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
  sequoia: {
    name: 'sequoia',
    displayName: 'Sequoia',
    originalIndex: 2,
    colors: ['#3D1823', '#532230', '#6A2C3E', '#874058', '#A45472', '#C1688C', '#D488A8', '#E5B3C9', '#F5DEEA'],
  },
  rosewood: {
    name: 'rosewood',
    displayName: 'Rosewood',
    originalIndex: 5,
    colors: ['#4D1F2D', '#6B2C3F', '#893951', '#A74663', '#C55375', '#DC6D87', '#E68FA3', '#F0B1BF', '#FAD3DB'],
  },
  hotHeat: {
    name: 'hot-heat',
    displayName: 'Hot Heat',
    originalIndex: 4,
    colors: ['#5F0000', '#8B0D0D', '#B71C1C', '#DB2B2B', '#FF4646', '#FF7070', '#FF9A9A', '#FFC4C4', '#FFEEEE'],
  },
  nomad: {
    name: 'nomad',
    displayName: 'Nomad',
    originalIndex: 4,
    colors: ['#3D3631', '#524840', '#685D54', '#73685F', '#7F746C', '#9A9189', '#B5ADA7', '#D0CAC4', '#EBE7E2'],
  },
  bone: {
    name: 'bone',
    displayName: 'Bone',
    originalIndex: 7,
    colors: ['#5C5B59', '#7A7977', '#989795', '#B6B5B3', '#C8C7C5', '#DAD9D7', '#E5E4E2', '#EFEEEC', '#F7F7F6'],
  },
  riverstone: {
    name: 'riverstone',
    displayName: 'Riverstone',
    originalIndex: 6,
    colors: ['#3A352E', '#524C43', '#6A6359', '#827A6E', '#9A9184', '#B1AA9E', '#C8C2B8', '#DDD9D2', '#F2F0ED'],
  },
  espresso: {
    name: 'espresso',
    displayName: 'Espresso',
    originalIndex: 0,
    colors: ['#2B1F1E', '#4A3B39', '#695754', '#88736F', '#A78F8A', '#C6ABA5', '#D9C6C2', '#E8DBDA', '#F7F0EF'],
  },
  wilderness: {
    name: 'wilderness',
    displayName: 'Wilderness',
    originalIndex: 0,
    colors: ['#142A0E', '#2D4D24', '#467039', '#5F934F', '#78B664', '#95C883', '#B2DAA2', '#CFEBC1', '#ECFDE0'],
  },
  daydream: {
    name: 'daydream',
    displayName: 'Daydream',
    originalIndex: 6,
    colors: ['#1A4166', '#2F5B85', '#4475A3', '#5990C2', '#7DABE0', '#9EC4ED', '#C0DDFF', '#DAEAFF', '#F4F8FF'],
  },
  zest: {
    name: 'zest',
    displayName: 'Zest',
    originalIndex: 7,
    colors: ['#5C6614', '#7A8829', '#98AA3D', '#B6CC52', '#D4EE66', '#E0F574', '#EAFA81', '#F4FF8E', '#F9FFC6'],
  },
  mossy: {
    name: 'mossy',
    displayName: 'Mossy',
    originalIndex: 3,
    colors: ['#1F1A15', '#312B25', '#423B34', '#524A43', '#6E6660', '#8B847D', '#A9A39D', '#C8C4C0', '#E8E6E4'],
  },
  pinkOrganza: {
    name: 'pink-organza',
    displayName: 'Pink Organza',
    originalIndex: 7,
    colors: ['#6B244E', '#8F3368', '#B34282', '#D7519C', '#F076BA', '#FFA0D5', '#FFC3E6', '#FFE5F7', '#FFF2FB'],
  },
  cyan: {
    name: 'cyan',
    displayName: 'Cyan',
    originalIndex: 4,
    colors: ['#083344', '#0E4C5E', '#0E7490', '#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC', '#CFFAFE'],
  },
  teal: {
    name: 'teal',
    displayName: 'Teal',
    originalIndex: 4,
    colors: ['#042F2E', '#0F5C57', '#0D9488', '#13A894', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4', '#CCFBF1'],
  },
  purple: {
    name: 'purple',
    displayName: 'Purple',
    originalIndex: 4,
    colors: ['#2E1065', '#4C1D95', '#6B21A8', '#7E22CE', '#9333EA', '#A855F7', '#C084FC', '#D8B4FE', '#E9D5FF'],
  },
  indigo: {
    name: 'indigo',
    displayName: 'Indigo',
    originalIndex: 4,
    colors: ['#1E1B4B', '#312E81', '#3730A3', '#4338CA', '#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'],
  },
  orange: {
    name: 'orange',
    displayName: 'Orange',
    originalIndex: 4,
    colors: ['#5A1807', '#9A3412', '#C2410C', '#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA', '#FFEDD5'],
  },
  amber: {
    name: 'amber',
    displayName: 'Amber',
    originalIndex: 4,
    colors: ['#451A03', '#78350F', '#B45309', '#D97706', '#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'],
  }
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
