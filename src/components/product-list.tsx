
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, Product } from "@/hooks/use-cart.tsx";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";

export function ProductList() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headline">Our Products</h2>
        <div className="flex items-center gap-4 text-sm">
          <Button variant="ghost" asChild>
            <Link href="/shop">View All</Link>
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Sort</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="group overflow-hidden">
             <Link href={`/product/${product.id}`}>
              <CardHeader className="p-0 relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={400} 
                  height={400} 
                  className="object-cover w-full h-full aspect-square group-hover:scale-105 transition-transform duration-300" 
                  data-ai-hint={product.hint}
                />
                {product.tag && (
                  <Badge className="absolute top-3 right-3" variant={product.tag === 'Hot' ? 'destructive' : 'default'}>{product.tag}</Badge>
                )}
              </CardHeader>
            </Link>
            <CardContent className="pt-4">
              <Link href={`/product/${product.id}`}>
                <CardTitle className="text-lg font-medium hover:text-primary transition-colors">{product.name}</CardTitle>
              </Link>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="font-bold text-primary text-lg">${product.price}</p>
              <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
