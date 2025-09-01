
import type { Product } from "@/hooks/use-cart.tsx";

export const products: Product[] = [
  { 
    id: 1, 
    name: "Elegant Vase", 
    price: 38.00,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1578941323382-0b3a2de54628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdmFzZXxlbnwwfHx8fDE3ODAwNTE3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "ceramic vase", 
    tag: "Hot", 
    description: "A beautifully crafted ceramic vase, perfect for adding a touch of elegance to any room. Its minimalist design complements a variety of decor styles.",
    rating: 4.8,
    reviews: 124
  },
  { 
    id: 2, 
    name: "Wooden Stool", 
    price: 80, 
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b29kJTIwc3Rvb2x8ZW58MHx8fHwxNzgwMDUxODMyfDA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "wood stool", 
    tag: "New", 
    description: "Solid wood stool with a natural finish. Versatile and sturdy, it can be used as a seat, a side table, or a plant stand.",
    rating: 4.6,
    reviews: 88
  },
  { 
    id: 3, 
    name: "Patterned Vase", 
    price: 52, 
    image: "https://images.unsplash.com/photo-1611018393323-264ab9937577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuZWQlMjB2YXNlfGVufDB8fHx8MTc4MDA1MTg4MHww&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "patterned vase", 
    description: "A unique vase featuring an intricate pattern. This statement piece is sure to draw attention and spark conversation.",
    rating: 4.9,
    reviews: 95
  },
  { 
    id: 4, 
    name: "Vintage Lamp", 
    price: 120, 
    image: "https://images.unsplash.com/photo-1543198136-428a931CB231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGFtcHxlbnwwfHx8fDE3ODAwNTE5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "vintage lamp", 
    description: "Add a warm, nostalgic glow to your space with this vintage-inspired table lamp. Features a fabric shade and a sturdy metal base.",
    rating: 4.5,
    reviews: 210
  },
  { 
    id: 5, 
    name: "Minimalist Chair", 
    price: 120.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNoYWlyfGVufDB8fHx8MTc4MDA1MTk5MHww&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "white chair", 
    tag: "Sale", 
    description: "Clean lines and a simple silhouette define this minimalist chair. Its ergonomic design provides comfort without sacrificing style.",
    rating: 4.7,
    reviews: 156
  },
  { 
    id: 6, 
    name: "Round Coffee Table", 
    price: 200, 
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB0YWJsZXxlbnwwfHx8fDE3ODAwNTIwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "coffee table", 
    description: "A modern round coffee table with a sleek metal frame and a durable top. The perfect centerpiece for your living area.",
    rating: 4.9,
    reviews: 289
  },
  { 
    id: 7, 
    name: "Cozy Armchair", 
    price: 350, 
    image: "https://images.unsplash.com/photo-1557854497-03310a9b3900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcm1jaGFpcnxlbnwwfHx8fDE3ODAwNTIxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "armchair", 
    description: "Sink into this cozy armchair, upholstered in a soft, high-quality fabric. It's the perfect spot for reading or relaxing.",
    rating: 4.8,
    reviews: 173
  },
  { 
    id: 8, 
    name: "Modern Bookshelf", 
    price: 180, 
    image: "https://images.unsplash.com/photo-1594393933753-413943a41a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rc2hlbGZ8ZW58MHx8fHwxNzgwMDUyMTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "bookshelf", 
    description: "Display your favorite books and decor on this stylish modern bookshelf. Its open design creates a feeling of space and light.",
    rating: 4.7,
    reviews: 132
  },
];
