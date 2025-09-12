
import { getProduct, getProducts } from "@/lib/firestore";
import ProductDetails from "./product-details";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

function ProductPageFallback() {
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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
        <Header />
        <ProductDetails product={product} />
    </>
  );
}
