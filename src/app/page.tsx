import { Header } from "@/components/header";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { FurnitureSuggester } from "@/components/furniture-suggester";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="bg-secondary/30 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Aimhigh Furniture Brands
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Up To 50% OFF
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">Shop The Collection</Link>
            </Button>
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

        <section className="my-16">
         <FurnitureSuggester />
        </section>
      </main>
    </div>
  );
}
