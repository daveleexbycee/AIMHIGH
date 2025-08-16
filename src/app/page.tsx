import { Header } from "@/components/header";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="bg-secondary/30 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Morden Furniture Brands
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Up To 50% OFF
            </p>
            <Button size="lg">Shop The Collection</Button>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Modern yellow armchair next to a small table" 
              width={600} 
              height={400} 
              className="rounded-lg"
              data-ai-hint="yellow armchair"
            />
          </div>
        </section>
        
        <ProductList />

        <FurnitureSuggester />
      </main>
    </div>
  );
}

// Keep furniture suggester for now, but hide it.
function FurnitureSuggester() {
  return (
    <div className="hidden">
      <div className="z-10 w-full flex flex-col items-center text-center space-y-8">
        <header className="space-y-4">
          <p className="max-w-2xl text-lg md:text-xl text-foreground/80">
            Discover furniture that perfectly fits your life.
          </p>
          <p className="max-w-2xl text-base text-muted-foreground">
            Our AI-powered tool helps you visualize and choose complete furniture sets tailored to your unique style, budget, and living space. Let's build your dream home, together.
          </p>
        </header>
      </div>
    </div>
  )
}