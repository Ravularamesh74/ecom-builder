export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  type: "physical" | "digital";
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  features?: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books & Courses",
  "Software",
  "Sports & Outdoors",
  "Beauty & Health",
  "Toys & Games",
];

export const products: Product[] = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones Pro",
    description: "Premium over-ear headphones with active noise cancellation, 40-hour battery life, and Hi-Res audio support. Perfect for music lovers and remote workers.",
    price: 249.99,
    originalPrice: 349.99,
    category: "Electronics",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    rating: 4.5,
    reviewCount: 2847,
    stock: 45,
    badge: "Best Seller",
    features: ["Active Noise Cancellation", "40hr Battery", "Bluetooth 5.3", "Hi-Res Audio"],
  },
  {
    id: "2",
    title: "Smart Fitness Watch Series X",
    description: "Advanced fitness tracker with GPS, heart rate monitoring, blood oxygen sensor, and 7-day battery life. Water resistant to 50m.",
    price: 199.99,
    originalPrice: 279.99,
    category: "Electronics",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    rating: 4.3,
    reviewCount: 1563,
    stock: 120,
    badge: "Deal",
    features: ["GPS Tracking", "Heart Rate Monitor", "7-Day Battery", "Water Resistant 50m"],
  },
  {
    id: "3",
    title: "Organic Cotton Unisex Hoodie",
    description: "Ultra-soft organic cotton hoodie with a relaxed fit. Available in multiple colors. Sustainably sourced materials.",
    price: 59.99,
    category: "Clothing",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
    rating: 4.7,
    reviewCount: 892,
    stock: 200,
    features: ["100% Organic Cotton", "Relaxed Fit", "Sustainably Made"],
  },
  {
    id: "4",
    title: "Full-Stack Web Development Masterclass",
    description: "Complete course covering React, Node.js, databases, and deployment. 60+ hours of content with lifetime access and certificate.",
    price: 29.99,
    originalPrice: 199.99,
    category: "Books & Courses",
    type: "digital",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"],
    rating: 4.8,
    reviewCount: 5231,
    stock: 999,
    badge: "Best Seller",
    features: ["60+ Hours", "Lifetime Access", "Certificate", "Project-Based"],
  },
  {
    id: "5",
    title: "Premium Chef Knife Set (8-Piece)",
    description: "Professional-grade stainless steel knife set with ergonomic handles. Includes chef knife, santoku, bread knife, and more.",
    price: 129.99,
    originalPrice: 189.99,
    category: "Home & Kitchen",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500"],
    rating: 4.6,
    reviewCount: 734,
    stock: 67,
    features: ["8-Piece Set", "German Stainless Steel", "Ergonomic Handles"],
  },
  {
    id: "6",
    title: "Cloud Photo Editor Pro - Annual License",
    description: "Professional photo editing software with AI-powered tools, RAW support, and cloud storage. Works on desktop and mobile.",
    price: 49.99,
    originalPrice: 99.99,
    category: "Software",
    type: "digital",
    images: ["https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500"],
    rating: 4.4,
    reviewCount: 1892,
    stock: 999,
    badge: "50% Off",
    features: ["AI-Powered Tools", "RAW Support", "Cloud Storage", "Cross-Platform"],
  },
  {
    id: "7",
    title: "Yoga Mat Premium Non-Slip",
    description: "Extra thick 6mm yoga mat with alignment lines. Non-slip surface for all types of yoga and exercise.",
    price: 39.99,
    category: "Sports & Outdoors",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500"],
    rating: 4.5,
    reviewCount: 2103,
    stock: 150,
    features: ["6mm Thick", "Non-Slip", "Alignment Lines", "Eco-Friendly"],
  },
  {
    id: "8",
    title: "Vitamin C Serum with Hyaluronic Acid",
    description: "Advanced anti-aging serum with 20% Vitamin C, hyaluronic acid, and vitamin E. Brightens and hydrates skin.",
    price: 24.99,
    originalPrice: 39.99,
    category: "Beauty & Health",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500"],
    rating: 4.6,
    reviewCount: 3456,
    stock: 89,
    badge: "Deal",
    features: ["20% Vitamin C", "Hyaluronic Acid", "Anti-Aging", "Cruelty-Free"],
  },
  {
    id: "9",
    title: "Mechanical Gaming Keyboard RGB",
    description: "Full-size mechanical keyboard with cherry MX switches, per-key RGB lighting, and aircraft-grade aluminum frame.",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1541140532154-b024d1b23898?w=500"],
    rating: 4.4,
    reviewCount: 967,
    stock: 34,
    features: ["Cherry MX Switches", "Per-Key RGB", "Aluminum Frame", "N-Key Rollover"],
  },
  {
    id: "10",
    title: "Building Strategy Board Game",
    description: "Award-winning strategy board game for 2-4 players. Build settlements, trade resources, and compete for dominance.",
    price: 44.99,
    category: "Toys & Games",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500"],
    rating: 4.8,
    reviewCount: 4521,
    stock: 78,
    badge: "Best Seller",
    features: ["2-4 Players", "60-90 Min Games", "Ages 10+", "Award-Winning"],
  },
  {
    id: "11",
    title: "UX Design Principles eBook Bundle",
    description: "Comprehensive 5-book bundle covering UX research, wireframing, prototyping, usability testing, and design systems.",
    price: 19.99,
    originalPrice: 79.99,
    category: "Books & Courses",
    type: "digital",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"],
    rating: 4.3,
    reviewCount: 612,
    stock: 999,
    features: ["5 eBooks", "Instant Download", "PDF + EPUB", "450+ Pages"],
  },
  {
    id: "12",
    title: "Premium Running Shoes - UltraBoost",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for long-distance comfort.",
    price: 139.99,
    originalPrice: 179.99,
    category: "Sports & Outdoors",
    type: "physical",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
    rating: 4.5,
    reviewCount: 1834,
    stock: 56,
    features: ["Responsive Cushioning", "Breathable Mesh", "Lightweight", "All-Terrain"],
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "1", userName: "Alex M.", rating: 5, title: "Incredible sound quality!", comment: "Best headphones I've ever owned. The noise cancellation is phenomenal.", date: "2024-01-15", verified: true },
  { id: "r2", productId: "1", userName: "Sarah K.", rating: 4, title: "Great but pricey", comment: "Amazing sound and comfort, but expensive even on sale.", date: "2024-01-10", verified: true },
  { id: "r3", productId: "1", userName: "Mike R.", rating: 5, title: "Worth every penny", comment: "Use these daily for work calls and music. Battery life is insane.", date: "2024-01-05", verified: true },
  { id: "r4", productId: "4", userName: "Dev Student", rating: 5, title: "Career-changing course", comment: "Went from zero coding knowledge to landing a junior dev job.", date: "2024-02-01", verified: true },
  { id: "r5", productId: "4", userName: "Lisa W.", rating: 5, title: "Best investment", comment: "Thorough, well-structured, and the instructor explains everything clearly.", date: "2024-01-20", verified: true },
  { id: "r6", productId: "2", userName: "Runner42", rating: 4, title: "Solid fitness watch", comment: "GPS accuracy is great, battery lasts 5 days with heavy use.", date: "2024-01-18", verified: true },
  { id: "r7", productId: "10", userName: "BoardGameFan", rating: 5, title: "Family favorite!", comment: "We play this every weekend. Easy to learn, hard to master.", date: "2024-02-05", verified: true },
  { id: "r8", productId: "8", userName: "SkinCareLover", rating: 5, title: "Visible results in 2 weeks", comment: "My skin is noticeably brighter and more hydrated.", date: "2024-01-25", verified: true },
];
