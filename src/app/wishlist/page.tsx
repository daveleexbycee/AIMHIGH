
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useCart, Product } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Heart, X } from "lucide-react";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlist.map((product) => {
                const totalReviews = product.reviews?.length || 0;
                const averageRating = product.rating || 0;
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
                   <div className="absolute top-3 right-3 flex flex-col gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background rounded-full" onClick={() => handleRemoveFromWishlist(product.id, product.name)}>
                          <X className="h-4 w-4" />
                      </Button>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <Link href={`/product/${product.id}`} className="flex-grow">
                    <h3 className="font-medium text-sm hover:text-primary transition-colors mb-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{averageRating.toFixed(1)}</span>
                    <span>({totalReviews} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">₦{product.originalPrice.toFixed(2)}</p>
                      )}
                      <p className="font-bold text-primary text-lg">₦{product.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>
        ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-24 border-dashed border-2 rounded-lg">
                <Heart className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
                <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                <Button asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        )}
      </main>
    </>
  );
}
