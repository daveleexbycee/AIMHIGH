
"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useCart, Product } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Heart, GitCompareArrows, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Shop() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const { products, loading } = useProducts();

  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");

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
  
  const filteredAndSortedProducts = useMemo(() => {
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';

    let filtered = products.filter(product => {
      const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const averageRating = product.reviews?.length > 0
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0;
      const matchesRating = selectedRating > 0 ? Math.round(averageRating) >= selectedRating : true;
      return matchesSearch && matchesPrice && matchesRating;
    });

    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
             filtered.sort((a, b) => {
                const ratingA = a.reviews?.length > 0 ? a.reviews.reduce((acc, review) => acc + review.rating, 0) / a.reviews.length : 0;
                const ratingB = b.reviews?.length > 0 ? b.reviews.reduce((acc, review) => acc + review.rating, 0) / b.reviews.length : 0;
                return ratingB - ratingA;
            });
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return filtered;
  }, [searchParams, products, priceRange, selectedRating, sortBy]);

  const FilterSidebar = () => (
     <aside className={`${isFilterSidebarOpen ? 'block' : 'hidden'} lg:block lg:w-64 lg:flex-shrink-0 lg:mr-8`}>
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="font-semibold">Filters</h3>
                     <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsFilterSidebarOpen(false)}>
                         <X className="h-4 w-4" />
                     </Button>
                </div>
                <div className="space-y-6">
                    <div>
                        <Label>Price Range</Label>
                        <Slider
                            defaultValue={[0, 500000]}
                            max={500000}
                            step={1000}
                            onValueChange={(value) => setPriceRange(value)}
                        />
                         <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>₦{priceRange[0]}</span>
                            <span>₦{priceRange[1]}</span>
                        </div>
                    </div>
                    <div>
                        <Label>Rating</Label>
                        <RadioGroup onValueChange={(value) => setSelectedRating(parseInt(value))} value={String(selectedRating)} className="mt-2 space-y-2">
                           {[4, 3, 2, 1].map(rating => (
                             <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={String(rating)} id={`r${rating}`} />
                                <Label htmlFor={`r${rating}`} className="flex items-center cursor-pointer">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                    <span className="ml-2 text-sm text-muted-foreground">& up</span>
                                </Label>
                            </div>
                           ))}
                        </RadioGroup>
                    </div>
                     <div>
                        <Button variant="outline" className="w-full" onClick={() => { setPriceRange([0, 500000]); setSelectedRating(0); }}>Clear Filters</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
     </aside>
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-headline">Shop Products</h1>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="lg:hidden" onClick={() => setIsFilterSidebarOpen(true)}>
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                 <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex">
            <FilterSidebar />
            <div className="flex-1">
                {loading ? (
                    <div>Loading...</div>
                ) : filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => {
                    const isWishlisted = wishlist.some(item => item.id === product.id);
                    const totalReviews = product.reviews?.length || 0;
                    const averageRating = totalReviews > 0
                        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
                        : 0;
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
                    )
                })}
                </div>
                ) : (
                    <div className="text-center col-span-full py-24">
                        <h2 className="text-2xl font-semibold">No products found</h2>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
      </main>
    </>
  );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Shop />
        </Suspense>
    )
}
