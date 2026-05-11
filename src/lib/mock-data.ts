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
