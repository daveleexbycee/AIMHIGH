
import { getProduct, getProducts } from "@/lib/firestore";
import ProductDetails from "./product-details";
import { Header } from "@/components/header";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
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
