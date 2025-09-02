
import { Header } from "@/components/header";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { FurnitureSuggester } from "@/components/furniture-suggester";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function ProductListFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/5" />
                  <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                  </div>
              </CardContent>
          </Card>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="relative rounded-lg overflow-hidden mb-12 min-h-[400px] flex items-center">
            <Image 
              src="https://images.unsplash.com/photo-1658704278342-201413834ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkYXJrJTIwZnVybml0dXJlfGVufDB8fHx8fDE3NTU2NDA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Modern yellow armchair next to a small table" 
              fill
              className="object-cover"
              data-ai-hint="yellow armchair"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 p-8 text-center text-white w-full">
                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                  Aimhigh Furniture Brands
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  Up To 50% OFF
                </p>
                <Button size="lg" asChild>
                  <Link href="/shop">Shop The Collection</Link>
                </Button>
            </div>
        </section>
        
        <Suspense fallback={<ProductListFallback />}>
          <ProductList />
        </Suspense>

        <section className="my-16">
         <FurnitureSuggester />
        </section>
      </main>
    </div>
  );
}
