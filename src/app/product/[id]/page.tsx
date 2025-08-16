import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, Truck, ShieldCheck } from "lucide-react";

const products = [
  { id: 1, name: "Elegant Vase", price: 45, image: "https://placehold.co/400x400.png", hint: "ceramic vase", tag: "Hot", description: "A beautifully crafted ceramic vase, perfect for adding a touch of elegance to any room. Its minimalist design complements a variety of decor styles." },
  { id: 2, name: "Wooden Stool", price: 80, image: "https://placehold.co/400x400.png", hint: "wood stool", tag: "New", description: "Solid wood stool with a natural finish. Versatile and sturdy, it can be used as a seat, a side table, or a plant stand." },
  { id: 3, name: "Patterned Vase", price: 52, image: "https://placehold.co/400x400.png", hint: "patterned vase", description: "A unique vase featuring an intricate pattern. This statement piece is sure to draw attention and spark conversation." },
  { id: 4, name: "Vintage Lamp", price: 120, image: "https://placehold.co/400x400.png", hint: "vintage lamp", description: "Add a warm, nostalgic glow to your space with this vintage-inspired table lamp. Features a fabric shade and a sturdy metal base." },
  { id: 5, name: "Minimalist Chair", price: 150, image: "https://placehold.co/400x400.png", hint: "white chair", tag: "Sale", description: "Clean lines and a simple silhouette define this minimalist chair. Its ergonomic design provides comfort without sacrificing style." },
  { id: 6, name: "Round Coffee Table", price: 200, image: "https://placehold.co/400x400.png", hint: "coffee table", description: "A modern round coffee table with a sleek metal frame and a durable top. The perfect centerpiece for your living area." },
  { id: 7, name: "Cozy Armchair", price: 350, image: "https://placehold.co/400x400.png", hint: "armchair", description: "Sink into this cozy armchair, upholstered in a soft, high-quality fabric. It's the perfect spot for reading or relaxing." },
  { id: 8, name: "Modern Bookshelf", price: 180, image: "https://placehold.co/400x400.png", hint: "bookshelf", description: "Display your favorite books and decor on this stylish modern bookshelf. Its open design creates a feeling of space and light." },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-cover rounded-lg"
                data-ai-hint={product.hint}
              />
               {product.tag && (
                <Badge className="absolute top-4 left-4" variant={product.tag === 'Hot' ? 'destructive' : 'default'}>{product.tag}</Badge>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-6">${product.price}</p>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 text-muted-foreground fill-muted-foreground" />
              </div>
              <span className="text-muted-foreground text-sm">(123 reviews)</span>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <div className="flex items-center gap-4 mb-8">
              <Button size="lg">Add to Cart</Button>
              <Button size="lg" variant="outline">Buy Now</Button>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
