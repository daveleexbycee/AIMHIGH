
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, Truck, ShieldCheck, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const isWishlisted = product && wishlist.some(item => item.id === product.id);

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

  const handleWishlistToggle = () => {
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

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    // Note: half star implementation is simplified. For a real app, you might need a half-star icon.
    if (halfStar) {
        stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    for (let i = 0; i < 5 - Math.ceil(product.rating); i++) {
        stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-muted-foreground fill-muted-foreground/50" />);
    }
    return stars;
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
                <Badge className="absolute top-4 left-4" variant={product.tag === 'Hot' ? 'destructive' : 'secondary'}>{product.tag}</Badge>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{product.name}</h1>
             <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {renderStars()}
                    </div>
                    <span className="text-muted-foreground text-sm">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
                {product.originalPrice && (
                    <p className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                )}
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <div className="flex items-center gap-4 mb-8">
              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
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
