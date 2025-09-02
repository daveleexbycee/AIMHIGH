
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Truck, ShieldCheck, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { StarRating } from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addReview } from "@/lib/firestore";
import { Product } from "@/hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const docRef = doc(db, "products", id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setProduct({ id: doc.id, ...doc.data() } as Product);
      } else {
        setProduct(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);


  const isWishlisted = product && wishlist.some(item => item.id === product.id);
  
  if (loading) {
      return (
           <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                 <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <Skeleton className="aspect-square rounded-lg" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-20 w-full" />
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                    </div>
                </div>
            </main>
           </>
      )
  }

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
  
  const totalReviews = product.reviews?.length || 0;
  
  // Use the rating from the product data, not a locally calculated one
  const averageRating = product.rating || 0;

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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment || !user) {
        toast({ variant: "destructive", title: "Please provide a rating and a comment." });
        return;
    }
    setIsSubmitting(true);
    try {
        await addReview(product.id, {
            userId: user.uid,
            user: user.displayName || "Anonymous",
            rating,
            comment,
        });
        toast({ title: "Review submitted!", description: "Thank you for your feedback." });
        setRating(0);
        setComment("");
    } catch (error) {
        console.error("Failed to submit review:", error);
        toast({ variant: "destructive", title: "Failed to submit review. Please try again." });
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
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
                    <StarRating rating={averageRating} />
                    <span className="text-muted-foreground text-sm">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground text-sm">({totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
                {product.originalPrice && (
                    <p className="text-xl text-muted-foreground line-through">₦{product.originalPrice.toFixed(2)}</p>
                )}
                <p className="text-3xl font-bold text-primary">₦{product.price.toFixed(2)}</p>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleWishlistToggle}>
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free shipping on orders over ₦700,000</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid md:grid-cols-2 gap-12">
            <section>
                <h2 className="text-2xl font-bold font-headline mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map(review => (
                            <div key={review.id} className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src={review.avatar} />
                                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold">{review.user}</h4>
                                        <div className="ml-auto">
                                            <StarRating rating={review.rating} />
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </section>
            <section>
                 <Card>
                    <CardHeader>
                        <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user ? (
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="rating" className="mb-2 block">Your Rating</Label>
                                    <StarRating rating={rating} onRatingChange={setRating} interactive />
                                </div>
                                 <div>
                                    <Label htmlFor="comment">Your Review</Label>
                                    <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." required/>
                                 </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Review"}
                                </Button>
                            </form>
                        ) : (
                            <p className="text-muted-foreground">
                                Please <a href="/login" className="underline text-primary">log in</a> to write a review.
                            </p>
                        )}
                    </CardContent>
                 </Card>
            </section>
        </div>
      </main>
    </>
  );
}
