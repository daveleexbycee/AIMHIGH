
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, Product } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Heart, GitCompareArrows } from "lucide-react";
import { products } from "@/lib/products";

export function ProductList() {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (product: Product) => {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`
      });
    }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          const totalReviews = product.reviews?.length || 0;
          return (
           <Card key={product.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative">
                <Link href={`/product/${product.id}`} className="block">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400} 
                    height={400} 
                    className="object-cover w-full h-full aspect-[1/1] group-hover:scale-105 transition-transform duration-300" 
                    data-ai-hint={product.hint}
                  />
                </Link>
                {product.tag && (
                    <Badge className="absolute top-3 left-3" variant={product.tag === 'Hot' ? 'destructive' : 'secondary'}>{product.tag}</Badge>
                )}
                 <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background rounded-full" onClick={() => handleWishlistToggle(product)}>
                        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background rounded-full">
                        <GitCompareArrows className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col">
                <Link href={`/product/${product.id}`} className="flex-grow">
                  <h3 className="font-medium text-sm hover:text-primary transition-colors mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span>({totalReviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="font-bold text-primary text-lg">${product.price.toFixed(2)}</p>
                  </div>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  );
}

    