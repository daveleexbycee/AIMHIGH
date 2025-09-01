
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
    reviews: [
        { id: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?u=alice", rating: 5, comment: "Absolutely stunning! Looks even better in person." },
        { id: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?u=bob", rating: 4, comment: "Great quality, but a little smaller than I expected." }
    ]
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
    reviews: [
        { id: 3, user: "Charlie", avatar: "https://i.pravatar.cc/150?u=charlie", rating: 5, comment: "Perfect height and very sturdy. I use it as a plant stand." },
        { id: 4, user: "Diana", avatar: "https://i.pravatar.cc/150?u=diana", rating: 4, comment: "Love the natural wood grain." }
    ]
  },
  { 
    id: 3, 
    name: "Patterned Vase", 
    price: 52, 
    image: "https://images.unsplash.com/photo-1611018393323-264ab9937577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuZWQlMjB2YXNlfGVufDB8fHx8fDE3ODAwNTE4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "patterned vase", 
    description: "A unique vase featuring an intricate pattern. This statement piece is sure to draw attention and spark conversation.",
    rating: 4.9,
    reviews: [
        { id: 5, user: "Eve", avatar: "https://i.pravatar.cc/150?u=eve", rating: 5, comment: "This vase is a work of art. So beautiful!" }
    ]
  },
  { 
    id: 4, 
    name: "Vintage Lamp", 
    price: 120, 
    image: "https://images.unsplash.com/photo-1543198136-428a931CB231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGFtcHxlbnwwfHx8fDE3ODAwNTE5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "vintage lamp", 
    description: "Add a warm, nostalgic glow to your space with this vintage-inspired table lamp. Features a fabric shade and a sturdy metal base.",
    rating: 4.5,
    reviews: [
        { id: 6, user: "Frank", avatar: "https://i.pravatar.cc/150?u=frank", rating: 5, comment: "Gives off a lovely warm light. Perfect for my bedside table." },
        { id: 7, user: "Grace", avatar: "https://i.pravatar.cc/150?u=grace", rating: 4, comment: "Looks great, but the switch is a bit fiddly." }
    ]
  },
  { 
    id: 5, 
    name: "Minimalist Chair", 
    price: 120.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNoYWlyfGVufDB8fHx8fDE3ODAwNTE5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "white chair", 
    tag: "Sale", 
    description: "Clean lines and a simple silhouette define this minimalist chair. Its ergonomic design provides comfort without sacrificing style.",
    rating: 4.7,
    reviews: [
        { id: 8, user: "Heidi", avatar: "https://i.pravatar.cc/150?u=heidi", rating: 5, comment: "Stylish and surprisingly comfortable." },
        { id: 9, user: "Ivan", avatar: "https://i.pravatar.cc/150?u=ivan", rating: 4, comment: "A bit tricky to assemble, but looks great once it's done." }
    ]
  },
  { 
    id: 6, 
    name: "Round Coffee Table", 
    price: 200, 
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB0YWJsZXxlbnwwfHx8fDE3ODAwNTIwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "coffee table", 
    description: "A modern round coffee table with a sleek metal frame and a durable top. The perfect centerpiece for your living area.",
    rating: 4.9,
    reviews: [
        { id: 10, user: "Judy", avatar: "https://i.pravatar.cc/150?u=judy", rating: 5, comment: "I love this coffee table! It's the perfect size and looks so chic." }
    ]
  },
  { 
    id: 7, 
    name: "Cozy Armchair", 
    price: 350, 
    image: "https://images.unsplash.com/photo-1557854497-03310a9b3900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcm1jaGFpcnxlbnwwfHx8fDE3ODAwNTIxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "armchair", 
    description: "Sink into this cozy armchair, upholstered in a soft, high-quality fabric. It's the perfect spot for reading or relaxing.",
    rating: 4.8,
    reviews: [
        { id: 11, user: "Kevin", avatar: "https://i.pravatar.cc/150?u=kevin", rating: 5, comment: "So comfortable, I never want to get up!" }
    ]
  },
  { 
    id: 8, 
    name: "Modern Bookshelf", 
    price: 180, 
    image: "https://images.unsplash.com/photo-1594393933753-413943a41a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rc2hlbGZ8ZW58MHx8fHwxNzgwMDUyMTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "bookshelf", 
    description: "Display your favorite books and decor on this stylish modern bookshelf. Its open design creates a feeling of space and light.",
    rating: 4.7,
    reviews: [
        { id: 12, user: "Linda", avatar: "https://i.pravatar.cc/150?u=linda", rating: 5, comment: "Easy to assemble and looks fantastic in my office." }
    ]
  },
  {
    id: 9,
    name: 'Nordic Nightstand',
    price: 95,
    image: 'https://images.unsplash.com/photo-1594224978135-c895cee65230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuaWdodHN0YW5kfGVufDB8fHx8fDE3ODAzMzUzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'bedside table',
    description: 'A sleek Nordic-style nightstand with a single drawer, offering a simple yet elegant storage solution.',
    rating: 4.9,
    reviews: [
      { id: 13, user: 'Mike', avatar: 'https://i.pravatar.cc/150?u=mike', rating: 5, comment: 'Great little table, fits perfectly in my bedroom.' },
    ],
  },
  {
    id: 10,
    name: 'Industrial TV Stand',
    price: 280,
    image: 'https://images.unsplash.com/photo-1604116318723-73d758993f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxUViUyMHN0YW5kfGVufDB8fHx8fDE3ODAzMzU0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'television stand',
    description: 'A sturdy TV stand with a rustic wood finish and metal frame, perfect for an industrial-style living room.',
    rating: 4.6,
    reviews: [
      { id: 14, user: 'Nancy', avatar: 'https://i.pravatar.cc/150?u=nancy', rating: 4, comment: 'Solid and looks great, but the instructions were a bit unclear.' },
      { id: 15, user: 'Oscar', avatar: 'https://i.pravatar.cc/150?u=oscar', rating: 5, comment: 'Exactly what I was looking for. Holds my large TV with no problem.' },
    ],
  },
  {
    id: 11,
    name: 'Velvet Dining Chair',
    price: 110,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjBjaGFpcnxlbnwwfHx8fDE3ODAzMzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'dining chair',
    description: 'A luxurious velvet dining chair with gold-finished legs, adding a touch of glamour to any dining space.',
    rating: 4.8,
    reviews: [
      { id: 16, user: 'Pam', avatar: 'https://i.pravatar.cc/150?u=pam', rating: 5, comment: 'These chairs are so elegant and comfortable. I bought four!' },
    ],
  },
  {
    id: 12,
    name: 'Leather Sofa',
    price: 499,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1540574163024-57216b8b6b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc29mYXxlbnwwfHx8fDE3ODAzMzU1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'leather sofa',
    tag: 'Sale',
    description: 'A classic leather sofa that combines timeless style with exceptional comfort. Perfect for any living room.',
    rating: 4.7,
    reviews: [
        { id: 17, user: "Quincy", avatar: "https://i.pravatar.cc/150?u=quincy", rating: 5, comment: "Fantastic sofa for the price. Very comfortable and looks high-end." },
        { id: 18, user: "Rita", avatar: "https://i.pravatar.cc/150?u=rita", rating: 4, comment: "The leather is a bit darker than in the pictures, but still beautiful." }
    ]
  },
];

    