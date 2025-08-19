
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, Truck, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart.tsx";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  const { addToCart } = useCart();
  const { toast } = useToast();

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

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

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
              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
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
