// Today's Target Table Data
export interface TargetTableRow {
  id: string;
  time: string;
  sales: number;
  target: number;
  progress: number;
  status: 'success' | 'warning' | 'error';
}

export const mockTargetTableData: TargetTableRow[] = [
  { id: 'h10', time: '10:00 AM', sales: 1200, target: 1500, progress: 80, status: 'warning' },
  { id: 'h11', time: '11:00 AM', sales: 1850, target: 1800, progress: 103, status: 'success' },
  { id: 'h12', time: '12:00 PM', sales: 2400, target: 2200, progress: 109, status: 'success' },
];

