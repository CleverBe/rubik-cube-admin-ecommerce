export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  categoryId: string;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export const categories: Category[] = [
  {
    id: "a1b2c3d4-1111-4000-8000-000000000001",
    name: "3x3 Speed Cubes",
    slug: "3x3-speed-cubes",
    description: "High-performance 3x3 speed cubes for competitions",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-01-15",
    updatedAt: "2026-03-10",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000002",
    name: "2x2 Cubes",
    slug: "2x2-cubes",
    description: "Compact 2x2 cubes for beginners and pros",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-01-15",
    updatedAt: "2026-03-10",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000003",
    name: "4x4 & Big Cubes",
    slug: "4x4-big-cubes",
    description: "Challenge yourself with bigger puzzles",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-02-01",
    updatedAt: "2026-03-12",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000004",
    name: "Pyraminx",
    slug: "pyraminx",
    description: "Pyramid-shaped puzzles for a different challenge",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-02-01",
    updatedAt: "2026-02-28",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000005",
    name: "Megaminx",
    slug: "megaminx",
    description: "Dodecahedron-shaped puzzles",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-03-05",
    updatedAt: "2026-03-15",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000006",
    name: "Accessories",
    slug: "accessories",
    description: "Lubes, bags, mats and more",
    image: "/placeholder.svg",
    parentId: null,
    createdAt: "2025-03-10",
    updatedAt: "2026-03-20",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000007",
    name: "Magnetic 3x3",
    slug: "magnetic-3x3",
    description: "3x3 cubes with magnetic positioning",
    image: "/placeholder.svg",
    parentId: "a1b2c3d4-1111-4000-8000-000000000001",
    createdAt: "2025-04-01",
    updatedAt: "2026-03-18",
  },
  {
    id: "a1b2c3d4-1111-4000-8000-000000000008",
    name: "Budget 3x3",
    slug: "budget-3x3",
    description: "Affordable 3x3 cubes for casual cubers",
    image: "/placeholder.svg",
    parentId: "a1b2c3d4-1111-4000-8000-000000000001",
    createdAt: "2025-04-01",
    updatedAt: "2026-03-18",
  },
];

export const monthlySales = [
  { month: "Nov", sales: 4200, orders: 28 },
  { month: "Dic", sales: 5800, orders: 35 },
  { month: "Ene", sales: 3900, orders: 22 },
  { month: "Feb", sales: 5100, orders: 30 },
  { month: "Mar", sales: 6700, orders: 38 },
  { month: "Abr", sales: 4900, orders: 26 },
];

export const orderStatusStats = [
  { name: "Pagadas", value: 8, color: "#22c55e" },
  { name: "Pendientes", value: 2, color: "#f59e0b" },
  { name: "Fallidas", value: 1, color: "#ef4444" },
  { name: "Reembolsadas", value: 1, color: "#3b82f6" },
];

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  items: OrderItem[];
  total: number;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  deliveryType: "standard" | "express" | "pickup";
  shippingAddress: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
}

export const clients: Client[] = [
  {
    id: "c001",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+52 55 1234 5678",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos",
    address: "Av. Reforma 123, Col. Centro, CDMX, 06000, México",
    status: "active",
    createdAt: "2024-08-15",
  },
  {
    id: "c002",
    name: "María García",
    email: "maria.garcia@email.com",
    phone: "+52 33 9876 5432",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria",
    address: "Calle Vallarta 456, Col. Americana, Guadalajara, 44100, México",
    status: "active",
    createdAt: "2024-09-02",
  },
  {
    id: "c003",
    name: "Alejandro Ruiz",
    email: "alejandro.ruiz@email.com",
    phone: "+52 81 2345 6789",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alejandro",
    address: "Av. Constitución 789, Col. Centro, Monterrey, 64000, México",
    status: "active",
    createdAt: "2024-10-20",
  },
  {
    id: "c004",
    name: "Sofía Torres",
    email: "sofia.torres@email.com",
    phone: "+52 55 8765 4321",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia",
    address: "Insurgentes Sur 321, Col. Del Valle, CDMX, 03100, México",
    status: "inactive",
    createdAt: "2024-06-10",
  },
  {
    id: "c005",
    name: "Diego Hernández",
    email: "diego.hernandez@email.com",
    phone: "+52 999 345 6789",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Diego",
    address: "Calle 60 234, Col. Itzimná, Mérida, 97100, México",
    status: "active",
    createdAt: "2025-01-05",
  },
  {
    id: "c006",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+52 81 5678 9012",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ana",
    address: "Av. Vasconcelos 567, Col. Residencial San Agustín, Monterrey, 66260, México",
    status: "active",
    createdAt: "2024-11-18",
  },
  {
    id: "c007",
    name: "Roberto López",
    email: "roberto.lopez@email.com",
    phone: "+52 33 1111 2222",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Roberto",
    address: "Av. Chapultepec 890, Col. Providencia, Guadalajara, 44630, México",
    status: "active",
    createdAt: "2025-02-28",
  },
  {
    id: "c008",
    name: "Valentina Castro",
    email: "valentina.castro@email.com",
    phone: "+52 55 4444 5555",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Valentina",
    address: "Av. Universidad 654, Col. Narvarte, CDMX, 03020, México",
    status: "inactive",
    createdAt: "2024-07-22",
  },
];

export const orders: Order[] = [
  {
    id: "o001",
    orderNumber: "OC-2026-001",
    clientId: "c001",
    clientName: "Carlos Mendoza",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000001", productName: "CubeSpeed Pro X3", productImage: "/images/products/CubeSpeed_Pro_X3.webp", sku: "CSP-X3-001", quantity: 2, unitPrice: 34.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000008", productName: "Cube Lube Premium", productImage: "/images/products/Cube_Lube_Premium.webp", sku: "CL-PRM-001", quantity: 1, unitPrice: 12.99 },
    ],
    total: 82.97,
    paymentStatus: "paid",
    deliveryType: "express",
    shippingAddress: "Av. Reforma 123, Col. Centro, CDMX, 06000, México",
    createdAt: "2026-04-01",
  },
  {
    id: "o002",
    orderNumber: "OC-2026-002",
    clientId: "c002",
    clientName: "María García",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000003", productName: "CubeX 2x2 Magnetic", productImage: "/images/products/CubeX_2x2_Magnetic.jpg", sku: "CX-2M-001", quantity: 1, unitPrice: 18.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000004", productName: "Budget Cube 3x3", productImage: "/images/products/Budget_Cube_3x3.jpg", sku: "BC-33-001", quantity: 3, unitPrice: 8.99 },
    ],
    total: 45.96,
    paymentStatus: "paid",
    deliveryType: "standard",
    shippingAddress: "Calle Vallarta 456, Col. Americana, Guadalajara, 44100, México",
    createdAt: "2026-04-03",
  },
  {
    id: "o003",
    orderNumber: "OC-2026-003",
    clientId: "c003",
    clientName: "Alejandro Ruiz",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000005", productName: "BigCube 4x4 M", productImage: "/images/products/BigCube_4x4 M.jpg", sku: "BC-4M-001", quantity: 1, unitPrice: 29.99 },
    ],
    total: 29.99,
    paymentStatus: "pending",
    deliveryType: "standard",
    shippingAddress: "Av. Constitución 789, Col. Centro, Monterrey, 64000, México",
    createdAt: "2026-04-05",
  },
  {
    id: "o004",
    orderNumber: "OC-2026-004",
    clientId: "c004",
    clientName: "Sofía Torres",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000006", productName: "PyraMaster X", productImage: "/images/products/PyraMaster_X.webp", sku: "PM-X-001", quantity: 1, unitPrice: 15.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000007", productName: "MegaStar Megaminx", productImage: "/images/products/MegaStar_Megaminx.png", sku: "MS-MG-001", quantity: 1, unitPrice: 22.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000010", productName: "SpeedCube Stand", productImage: "/images/products/SpeedCube_Stand.webp", sku: "SCS-001", quantity: 2, unitPrice: 9.99 },
    ],
    total: 58.96,
    paymentStatus: "paid",
    deliveryType: "express",
    shippingAddress: "Insurgentes Sur 321, Col. Del Valle, CDMX, 03100, México",
    createdAt: "2026-04-07",
  },
  {
    id: "o005",
    orderNumber: "OC-2026-005",
    clientId: "c005",
    clientName: "Diego Hernández",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000002", productName: "SpeedCube RS3 2025", productImage: "/images/products/SpeedCube_RS3_2025.jpg", sku: "SC-RS3-2025", quantity: 1, unitPrice: 24.99 },
    ],
    total: 24.99,
    paymentStatus: "paid",
    deliveryType: "pickup",
    shippingAddress: "Calle 60 234, Col. Itzimná, Mérida, 97100, México",
    createdAt: "2026-04-10",
  },
  {
    id: "o006",
    orderNumber: "OC-2026-006",
    clientId: "c001",
    clientName: "Carlos Mendoza",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000004", productName: "Budget Cube 3x3", productImage: "/images/products/Budget_Cube_3x3.jpg", sku: "BC-33-001", quantity: 5, unitPrice: 8.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000010", productName: "SpeedCube Stand", productImage: "/images/products/SpeedCube_Stand.webp", sku: "SCS-001", quantity: 2, unitPrice: 9.99 },
    ],
    total: 64.93,
    paymentStatus: "paid",
    deliveryType: "standard",
    shippingAddress: "Av. Reforma 123, Col. Centro, CDMX, 06000, México",
    createdAt: "2026-04-12",
  },
  {
    id: "o007",
    orderNumber: "OC-2026-007",
    clientId: "c006",
    clientName: "Ana Martínez",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000001", productName: "CubeSpeed Pro X3", productImage: "/images/products/CubeSpeed_Pro_X3.webp", sku: "CSP-X3-001", quantity: 1, unitPrice: 34.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000008", productName: "Cube Lube Premium", productImage: "/images/products/Cube_Lube_Premium.webp", sku: "CL-PRM-001", quantity: 3, unitPrice: 12.99 },
    ],
    total: 73.96,
    paymentStatus: "paid",
    deliveryType: "express",
    shippingAddress: "Av. Vasconcelos 567, Col. Residencial San Agustín, Monterrey, 66260, México",
    createdAt: "2026-04-15",
  },
  {
    id: "o008",
    orderNumber: "OC-2026-008",
    clientId: "c007",
    clientName: "Roberto López",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000005", productName: "BigCube 4x4 M", productImage: "/images/products/BigCube_4x4 M.jpg", sku: "BC-4M-001", quantity: 2, unitPrice: 29.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000003", productName: "CubeX 2x2 Magnetic", productImage: "/images/products/CubeX_2x2_Magnetic.jpg", sku: "CX-2M-001", quantity: 1, unitPrice: 18.99 },
    ],
    total: 78.97,
    paymentStatus: "pending",
    deliveryType: "standard",
    shippingAddress: "Av. Chapultepec 890, Col. Providencia, Guadalajara, 44630, México",
    createdAt: "2026-04-18",
  },
  {
    id: "o009",
    orderNumber: "OC-2026-009",
    clientId: "c008",
    clientName: "Valentina Castro",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000006", productName: "PyraMaster X", productImage: "/images/products/PyraMaster_X.webp", sku: "PM-X-001", quantity: 2, unitPrice: 15.99 },
    ],
    total: 31.98,
    paymentStatus: "refunded",
    deliveryType: "standard",
    shippingAddress: "Av. Universidad 654, Col. Narvarte, CDMX, 03020, México",
    createdAt: "2026-04-20",
  },
  {
    id: "o010",
    orderNumber: "OC-2026-010",
    clientId: "c002",
    clientName: "María García",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000002", productName: "SpeedCube RS3 2025", productImage: "/images/products/SpeedCube_RS3_2025.jpg", sku: "SC-RS3-2025", quantity: 1, unitPrice: 24.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000007", productName: "MegaStar Megaminx", productImage: "/images/products/MegaStar_Megaminx.png", sku: "MS-MG-001", quantity: 1, unitPrice: 22.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000010", productName: "SpeedCube Stand", productImage: "/images/products/SpeedCube_Stand.webp", sku: "SCS-001", quantity: 1, unitPrice: 9.99 },
    ],
    total: 57.97,
    paymentStatus: "paid",
    deliveryType: "express",
    shippingAddress: "Calle Vallarta 456, Col. Americana, Guadalajara, 44100, México",
    createdAt: "2026-04-22",
  },
  {
    id: "o011",
    orderNumber: "OC-2026-011",
    clientId: "c003",
    clientName: "Alejandro Ruiz",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000001", productName: "CubeSpeed Pro X3", productImage: "/images/products/CubeSpeed_Pro_X3.webp", sku: "CSP-X3-001", quantity: 1, unitPrice: 34.99 },
    ],
    total: 34.99,
    paymentStatus: "failed",
    deliveryType: "standard",
    shippingAddress: "Av. Constitución 789, Col. Centro, Monterrey, 64000, México",
    createdAt: "2026-04-25",
  },
  {
    id: "o012",
    orderNumber: "OC-2026-012",
    clientId: "c005",
    clientName: "Diego Hernández",
    items: [
      { productId: "b1c2d3e4-2222-4000-8000-000000000004", productName: "Budget Cube 3x3", productImage: "/images/products/Budget_Cube_3x3.jpg", sku: "BC-33-001", quantity: 10, unitPrice: 8.99 },
      { productId: "b1c2d3e4-2222-4000-8000-000000000008", productName: "Cube Lube Premium", productImage: "/images/products/Cube_Lube_Premium.webp", sku: "CL-PRM-001", quantity: 2, unitPrice: 12.99 },
    ],
    total: 115.88,
    paymentStatus: "paid",
    deliveryType: "pickup",
    shippingAddress: "Calle 60 234, Col. Itzimná, Mérida, 97100, México",
    createdAt: "2026-04-28",
  },
];

export interface Return {
  id: string;
  returnNumber: string;
  orderNumber: string;
  orderId: string;
  clientId: string;
  clientName: string;
  productName: string;
  productImage: string;
  quantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "refunded";
  createdAt: string;
  resolvedAt: string | null;
}

export const returns: Return[] = [
  {
    id: "r001",
    returnNumber: "RT-2026-001",
    orderNumber: "OC-2026-004",
    orderId: "o004",
    clientId: "c004",
    clientName: "Sofía Torres",
    productName: "PyraMaster X",
    productImage: "/images/products/PyraMaster_X.webp",
    quantity: 1,
    reason: "Producto llegó con un sticker despegado",
    status: "approved",
    createdAt: "2026-04-10",
    resolvedAt: "2026-04-12",
  },
  {
    id: "r002",
    returnNumber: "RT-2026-002",
    orderNumber: "OC-2026-009",
    orderId: "o009",
    clientId: "c008",
    clientName: "Valentina Castro",
    productName: "PyraMaster X",
    productImage: "/images/products/PyraMaster_X.webp",
    quantity: 2,
    reason: "No funciona correctamente, las caras no giran suave",
    status: "refunded",
    createdAt: "2026-04-22",
    resolvedAt: "2026-04-25",
  },
  {
    id: "r003",
    returnNumber: "RT-2026-003",
    orderNumber: "OC-2026-008",
    orderId: "o008",
    clientId: "c007",
    clientName: "Roberto López",
    productName: "BigCube 4x4 M",
    productImage: "/images/products/BigCube_4x4 M.jpg",
    quantity: 1,
    reason: "El cubo llegó con un centro roto",
    status: "pending",
    createdAt: "2026-04-20",
    resolvedAt: null,
  },
  {
    id: "r004",
    returnNumber: "RT-2026-004",
    orderNumber: "OC-2026-001",
    orderId: "o001",
    clientId: "c001",
    clientName: "Carlos Mendoza",
    productName: "Cube Lube Premium",
    productImage: "/images/products/Cube_Lube_Premium.webp",
    quantity: 1,
    reason: "El lubricante llegó abierto y derramado",
    status: "pending",
    createdAt: "2026-04-05",
    resolvedAt: null,
  },
  {
    id: "r005",
    returnNumber: "RT-2026-005",
    orderNumber: "OC-2026-007",
    orderId: "o007",
    clientId: "c006",
    clientName: "Ana Martínez",
    productName: "Cube Lube Premium",
    productImage: "/images/products/Cube_Lube_Premium.webp",
    quantity: 2,
    reason: "Pedí 3 unidades pero solo llegaron 2",
    status: "approved",
    createdAt: "2026-04-17",
    resolvedAt: "2026-04-19",
  },
  {
    id: "r006",
    returnNumber: "RT-2026-006",
    orderNumber: "OC-2026-011",
    orderId: "o011",
    clientId: "c003",
    clientName: "Alejandro Ruiz",
    productName: "CubeSpeed Pro X3",
    productImage: "/images/products/CubeSpeed_Pro_X3.webp",
    quantity: 1,
    reason: "No me gustó el color, quiero otro modelo",
    status: "rejected",
    createdAt: "2026-04-27",
    resolvedAt: "2026-04-28",
  },
  {
    id: "r007",
    returnNumber: "RT-2026-007",
    orderNumber: "OC-2026-002",
    orderId: "o002",
    clientId: "c002",
    clientName: "María García",
    productName: "Budget Cube 3x3",
    productImage: "/images/products/Budget_Cube_3x3.jpg",
    quantity: 1,
    reason: "El cubo llegó rayado en varias caras",
    status: "pending",
    createdAt: "2026-04-08",
    resolvedAt: null,
  },
  {
    id: "r008",
    returnNumber: "RT-2026-008",
    orderNumber: "OC-2026-003",
    orderId: "o003",
    clientId: "c003",
    clientName: "Alejandro Ruiz",
    productName: "BigCube 4x4 M",
    productImage: "/images/products/BigCube_4x4 M.jpg",
    quantity: 1,
    reason: "Cambié de opinión, ya no lo quiero",
    status: "refunded",
    createdAt: "2026-04-09",
    resolvedAt: "2026-04-11",
  },
];

export const products: Product[] = [
  {
    id: "b1c2d3e4-2222-4000-8000-000000000001",
    name: "CubeSpeed Pro X3",
    slug: "cubespeed-pro-x3",
    description:
      "<h3>El último en velocidad</h3><p>El CubeSpeed Pro X3 cuenta con un sistema magnético de 48 imanes y tensión ajustable. Ideal para <strong>competencias oficiales</strong>.</p><ul><li>Sistema magnético de 48 imanes</li><li>Tensión ajustable con 5 niveles</li><li>Peso: 72g</li></ul>",
    price: 34.99,
    comparePrice: 44.99,
    images: ["/images/products/CubeSpeed_Pro_X3.webp"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000007",
    stock: 42,
    sku: "CSP-X3-001",
    createdAt: "2025-05-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000002",
    name: "SpeedCube RS3 2025",
    slug: "speedcube-rs3-2025",
    description:
      "<p>La versión más reciente de la aclamada serie RS3. <em>Mejorada con nuevo mecanismo de núcleo flotante</em> que reduce el friction al mínimo.</p><p>Perfecto tanto para principiantes como para avanzados.</p>",
    price: 24.99,
    comparePrice: null,
    images: ["/images/products/SpeedCube_RS3_2025.jpg"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000007",
    stock: 78,
    sku: "SC-RS3-2025",
    createdAt: "2025-06-15",
    updatedAt: "2026-04-02",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000003",
    name: "CubeX 2x2 Magnetic",
    slug: "cubex-2x2-magnetic",
    description:
      "<p>Cubo 2x2 magnético premium con <strong>esquinas redondeadas</strong> para facilitar los giros. Ideal para resolver con una mano.</p><h4>Especificaciones:</h4><ol><li>8 imanes de posicionamiento</li><li>Peso: 55g</li><li>Incluye funda protectora</li></ol>",
    price: 18.99,
    comparePrice: 22.99,
    images: ["/images/products/CubeX_2x2_Magnetic.jpg"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000002",
    stock: 55,
    sku: "CX-2M-001",
    createdAt: "2025-05-10",
    updatedAt: "2026-03-28",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000004",
    name: "Budget Cube 3x3",
    slug: "budget-cube-3x3",
    description:
      "<p>Excelente cubo de inicio a un <strong>precio imbatible</strong>. Gira suavemente y viene pre-lubricado de fábrica.</p><p>Perfecto para regalar o empezar en el mundo del speedcubing.</p>",
    price: 8.99,
    comparePrice: null,
    images: ["/images/products/Budget_Cube_3x3.jpg"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000008",
    stock: 150,
    sku: "BC-33-001",
    createdAt: "2025-04-20",
    updatedAt: "2026-03-15",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000005",
    name: "BigCube 4x4 M",
    slug: "bigcube-4x4-m",
    description:
      "<p>Cubo 4x4 magnético diseñado para <strong>cubers avanzados</strong>. Incluye mecanismo anti-pop y centro ajustable.</p><h4>Características:</h4><ul><li>64 imantes</li><li>Mecanismo anti-pop</li><li>Centro ajustable en 3 niveles</li></ul>",
    price: 29.99,
    comparePrice: 36.99,
    images: ["/images/products/BigCube_4x4 M.jpg"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000003",
    stock: 30,
    sku: "BC-4M-001",
    createdAt: "2025-07-01",
    updatedAt: "2026-04-05",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000006",
    name: "PyraMaster X",
    slug: "pyramaster-x",
    description:
      "<p>Pyraminx de giro suave con <strong>acabado en fibra de carbono</strong>. Ligero y rápido, ideal para <em>one-look solves</em>.</p><p>Incluye stickers de repuesto y guía de resolución.</p>",
    price: 15.99,
    comparePrice: null,
    images: ["/images/products/PyraMaster_X.webp"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000004",
    stock: 65,
    sku: "PM-X-001",
    createdAt: "2025-06-01",
    updatedAt: "2026-03-20",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000007",
    name: "MegaStar Megaminx",
    slug: "megastar-megaminx",
    description:
      "<p>Megaminx profesional con <strong>12 colores vibrantes</strong> y sistema de giro ultra-suave. Cada cara tiene un acabado mate antideslizante.</p><ul><li>12 caras de colores vibrantes</li><li>Acabado mate antideslizante</li><li>Peso: 128g</li></ul>",
    price: 22.99,
    comparePrice: 28.99,
    images: ["/images/products/MegaStar_Megaminx.png"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000005",
    stock: 22,
    sku: "MS-MG-001",
    createdAt: "2025-08-15",
    updatedAt: "2026-04-03",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000008",
    name: "Cube Lube Premium",
    slug: "cube-lube-premium",
    description:
      "<p>Lubricante de <strong>alta viscosidad</strong> para un giro suave y controlado. Aplicación precisa con gotero incluido.</p><p>Un solo aplicador rinde para más de 50 cubos.</p>",
    price: 12.99,
    comparePrice: null,
    images: ["/images/products/Cube_Lube_Premium.webp"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000006",
    stock: 200,
    sku: "CL-PRM-001",
    createdAt: "2025-03-15",
    updatedAt: "2026-02-10",
  },
  {
    id: "b1c2d3e4-2222-4000-8000-000000000010",
    name: "SpeedCube Stand",
    slug: "speedcube-stand",
    description:
      "<p>Soporte de exhibición de <strong>aluminio anodizado</strong> para tu cubo favorito. Base antideslizante con acabado premium.</p><p>Compatible con cubos de 3x3 a 5x5.</p>",
    price: 9.99,
    comparePrice: null,
    images: ["/images/products/SpeedCube_Stand.webp"],
    categoryId: "a1b2c3d4-1111-4000-8000-000000000006",
    stock: 120,
    sku: "SCS-001",
    createdAt: "2025-05-20",
    updatedAt: "2026-01-15",
  },
];
