// Sample data for Table demo

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: Date
  lastLogin: Date | null
  tasksCompleted: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  rating: number
  inStock: boolean
}

export interface SalesRecord {
  id: number
  date: Date
  product: string
  region: string
  revenue: number
  units: number
  growth: number
}

export const usersData: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@lululemon.com',
    role: 'Admin',
    status: 'active',
    joinDate: new Date(2023, 0, 15),
    lastLogin: new Date(2024, 9, 28),
    tasksCompleted: 156,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@lululemon.com',
    role: 'Manager',
    status: 'active',
    joinDate: new Date(2023, 2, 20),
    lastLogin: new Date(2024, 9, 29),
    tasksCompleted: 243,
  },
  {
    id: 3,
    name: 'Mike Williams',
    email: 'mike.williams@lululemon.com',
    role: 'User',
    status: 'active',
    joinDate: new Date(2023, 5, 10),
    lastLogin: new Date(2024, 9, 27),
    tasksCompleted: 89,
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@lululemon.com',
    role: 'User',
    status: 'inactive',
    joinDate: new Date(2023, 7, 5),
    lastLogin: new Date(2024, 8, 15),
    tasksCompleted: 45,
  },
  {
    id: 5,
    name: 'James Brown',
    email: 'james.brown@lululemon.com',
    role: 'User',
    status: 'pending',
    joinDate: new Date(2024, 9, 1),
    lastLogin: null,
    tasksCompleted: 0,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@lululemon.com',
    role: 'Manager',
    status: 'active',
    joinDate: new Date(2022, 10, 12),
    lastLogin: new Date(2024, 9, 29),
    tasksCompleted: 387,
  },
  {
    id: 7,
    name: 'David Martinez',
    email: 'david.martinez@lululemon.com',
    role: 'User',
    status: 'active',
    joinDate: new Date(2023, 3, 18),
    lastLogin: new Date(2024, 9, 28),
    tasksCompleted: 112,
  },
  {
    id: 8,
    name: 'Rachel Kim',
    email: 'rachel.kim@lululemon.com',
    role: 'Admin',
    status: 'active',
    joinDate: new Date(2022, 8, 25),
    lastLogin: new Date(2024, 9, 29),
    tasksCompleted: 421,
  },
]

export const productsData: Product[] = [
  {
    id: 'PROD-001',
    name: 'Align High-Rise Pant 25"',
    category: 'Women\'s Pants',
    price: 98.00,
    stock: 234,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'PROD-002',
    name: 'Scuba Oversized Full-Zip Hoodie',
    category: 'Women\'s Hoodies',
    price: 118.00,
    stock: 156,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'PROD-003',
    name: 'Fast and Free High-Rise Tight 28"',
    category: 'Women\'s Pants',
    price: 128.00,
    stock: 89,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'PROD-004',
    name: 'Metal Vent Tech Short Sleeve',
    category: 'Men\'s Shirts',
    price: 68.00,
    stock: 0,
    rating: 4.6,
    inStock: false,
  },
  {
    id: 'PROD-005',
    name: 'ABC Classic-Fit Pant 32"',
    category: 'Men\'s Pants',
    price: 128.00,
    stock: 178,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'PROD-006',
    name: 'Energy Bra High Neck',
    category: 'Women\'s Sports Bras',
    price: 58.00,
    stock: 12,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 'PROD-007',
    name: 'Commission Classic-Fit Pant',
    category: 'Men\'s Pants',
    price: 138.00,
    stock: 95,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'PROD-008',
    name: 'Define Jacket',
    category: 'Women\'s Jackets',
    price: 118.00,
    stock: 67,
    rating: 4.9,
    inStock: true,
  },
]

export const salesData: SalesRecord[] = [
  {
    id: 1,
    date: new Date(2024, 9, 1),
    product: 'Align Pant',
    region: 'North America',
    revenue: 45230,
    units: 462,
    growth: 12.5,
  },
  {
    id: 2,
    date: new Date(2024, 9, 1),
    product: 'Scuba Hoodie',
    region: 'Europe',
    revenue: 38420,
    units: 326,
    growth: 8.3,
  },
  {
    id: 3,
    date: new Date(2024, 9, 2),
    product: 'ABC Pant',
    region: 'Asia Pacific',
    revenue: 52100,
    units: 407,
    growth: 15.2,
  },
  {
    id: 4,
    date: new Date(2024, 9, 2),
    product: 'Fast and Free',
    region: 'North America',
    revenue: 41300,
    units: 323,
    growth: -3.1,
  },
  {
    id: 5,
    date: new Date(2024, 9, 3),
    product: 'Define Jacket',
    region: 'Europe',
    revenue: 35870,
    units: 304,
    growth: 6.7,
  },
  {
    id: 6,
    date: new Date(2024, 9, 3),
    product: 'Metal Vent Tech',
    region: 'Asia Pacific',
    revenue: 28940,
    units: 426,
    growth: 4.2,
  },
]

