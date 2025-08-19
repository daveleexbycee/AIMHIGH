
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useCart, Product } from "@/hooks/use-cart.tsx";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";

export default function ShopPage() {
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
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">Shop All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
      </main>
    </>
  );
}
