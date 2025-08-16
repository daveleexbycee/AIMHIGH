import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "Elegant Vase",
    price: 45,
    image: "https://placehold.co/400x400.png",
    hint: "ceramic vase",
    tag: "Hot"
  },
  {
    name: "Wooden Stool",
    price: 80,
    image: "https://placehold.co/400x400.png",
    hint: "wood stool",
    tag: "New"
  },
  {
    name: "Patterned Vase",
    price: 52,
    image: "https://placehold.co/400x400.png",
    hint: "patterned vase"
  },
  {
    name: "Vintage Lamp",
    price: 120,
    image: "https://placehold.co/400x400.png",
    hint: "vintage lamp"
  },
];

export function ProductList() {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headline">Our Products</h2>
        <div className="flex items-center gap-4 text-sm">
          <Button variant="ghost">View All</Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Sort</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.name} className="group overflow-hidden">
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
            <CardContent className="pt-4">
              <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="font-bold text-primary text-lg">${product.price}</p>
              <Button variant="outline" size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
