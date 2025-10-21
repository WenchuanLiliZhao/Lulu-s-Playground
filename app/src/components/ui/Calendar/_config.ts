export interface repsonsivenessProps {
  breakpoint: number // 顾名思义
  yearFontSize: number // 年份的字体大小
  monthFontSize: number // 月份字体大小
  weekFontSize: number // 星期（Sun, Mon...）的字体大小
  cellFontSize: number // 日期单元格的字体大小
  gap: number // 月卡之间的 gap
  monthColCount: number // 横向显示月卡的数量
}

export const responsiveness: repsonsivenessProps[] = [
  {
    breakpoint: 0,
    yearFontSize: 24,
    monthFontSize: 14,
    weekFontSize: 6,
    cellFontSize: 10,
    gap: 12,
    monthColCount: 2,
  },
  {
    breakpoint: 480,
    yearFontSize: 28,
    monthFontSize: 14,
    weekFontSize: 10,
    cellFontSize: 11,
    gap: 12,
    monthColCount: 2,
  },
  {
    breakpoint: 720,
    yearFontSize: 28,
    monthFontSize: 14,
    weekFontSize: 10,
    cellFontSize: 11,
    gap: 12,
    monthColCount: 3,
  },
  {
    breakpoint: 1080,
    yearFontSize: 32,
    monthFontSize: 16,
    weekFontSize: 11,
    cellFontSize: 12,
    gap: 12,
    monthColCount: 4,
  },
  {
    breakpoint: 1200,
    yearFontSize: 36,
    monthFontSize: 16,
    weekFontSize: 12,
    cellFontSize: 13,
    gap: 16,
    monthColCount: 4,
  },
  {
    breakpoint: 1400,
    yearFontSize: 36,
    monthFontSize: 16,
    weekFontSize: 13,
    cellFontSize: 14,
    gap: 16,
    monthColCount: 4,
  },
]

