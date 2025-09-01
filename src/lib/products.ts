
import type { Product } from "@/hooks/use-cart.tsx";

// This is now mock data and is not used in the application.
// The data is fetched from Firestore in real-time.
export const products: Product[] = [
  { 
    id: "1", 
    name: "Elegant Vase", 
    price: 3800.00,
    originalPrice: 4500.00,
    image: "https://images.unsplash.com/photo-1578941323382-0b3a2de54628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdmFzZXxlbnwwfHx8fDE3ODAwNTE3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    hint: "ceramic vase", 
    tag: "Hot", 
    description: "A beautifully crafted ceramic vase, perfect for adding a touch of elegance to any room. Its minimalist design complements a variety of decor styles.",
    rating: 4.8,
    reviews: [
        { id: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?u=alice", rating: 5, comment: "Absolutely stunning! Looks even better in person." },
        { id: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?u=bob", rating: 4, comment: "Great quality, but a little smaller than I expected." }
    ],
    category: "Decor"
  },
];
