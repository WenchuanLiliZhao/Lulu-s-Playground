export interface DataItem {
  id: string;
  type: string;
  name: string;
  nameHighlight?: string; // The part of name to highlight
  path: string;
  tags: string[];
  source: string;
  views: number;
  timestamp: string;
}

export const dataItems: DataItem[] = [
  {
    id: '1',
    type: 'datatype',
    name: 'datatype',
    nameHighlight: 'data',
    path: '/manage_engine.public/datatype',
    tags: ['PostgreSQL', 'Manage_Engine', '2-Internal'],
    source: 'Manage-Engine',
    views: 0,
    timestamp: '2025-02-18 20:09:03',
  },
  {
    id: '2',
    type: 'ruledata',
    name: 'ruledata',
    nameHighlight: 'data',
    path: '/manage_engine.public/ruledata',
    tags: ['PostgreSQL', 'Manage_Engine', '2-Internal'],
    source: 'Manage-Engine',
    views: 0,
    timestamp: '2025-02-18 20:09:03',
  },
  {
    id: '3',
    type: 'task_data',
    name: 'task_data',
    nameHighlight: 'data',
    path: '/lulu_promotion_test/task_data',
    tags: ['MySQL', 'VC', '3-Confidential'],
    source: 'VC',
    views: 0,
    timestamp: '2025-02-18 14:50:40',
  },
  {
    id: '4',
    type: 'databaseci',
    name: 'databaseci',
    nameHighlight: 'data',
    path: '/manage_engine.public/databaseci',
    tags: ['PostgreSQL', 'Manage_Engine', '2-Internal'],
    source: 'Manage-Engine',
    views: 0,
    timestamp: '2025-02-18 20:09:03',
  },
  {
    id: '5',
    type: 'databaseci',
    name: 'databaseci',
    nameHighlight: 'data',
    path: '/manage_engine.public/databaseci',
    tags: ['PostgreSQL', 'Manage_Engine', '2-Internal'],
    source: 'Manage-Engine',
    views: 0,
    timestamp: '2025-02-18 20:09:03',
  },
  {
    id: '6',
    type: 'databaseci',
    name: 'databaseci',
    nameHighlight: 'data',
    path: '/manage_engine.public/databaseci',
    tags: ['PostgreSQL', 'Manage_Engine', '2-Internal'],
    source: 'Manage-Engine',
    views: 0,
    timestamp: '2025-02-18 20:09:03',
  },
];

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

export const filterGroups: FilterGroup[] = [
  {
    title: 'Source System',
    key: 'source',
    options: [
      { id: 'manage-engine', label: 'Manage-Engine', count: 3 },
      { id: 'vc', label: 'VC', count: 1 },
      { id: 'retail', label: 'Retail System', count: 5 },
      { id: 'ec', label: 'E-Commerce', count: 8 },
    ],
  },
  {
    title: 'Data Tags',
    key: 'tags',
    options: [
      { id: 'postgresql', label: 'PostgreSQL', count: 3 },
      { id: 'mysql', label: 'MySQL', count: 1 },
      { id: 'internal', label: '2-Internal', count: 3 },
      { id: 'confidential', label: '3-Confidential', count: 1 },
    ],
  },
  {
    title: 'Other Filters',
    key: 'other',
    options: [
      { id: 'recent', label: 'Recently Updated', count: 12 },
      { id: 'popular', label: 'Most Viewed', count: 8 },
      { id: 'deprecated', label: 'Deprecated', count: 2 },
    ],
  },
];

export const tabOptions = ['Data Tables', 'Views', 'Reports', 'Fields', 'Metrics', 'Script Content'];

