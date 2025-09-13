
import { getProduct } from "@/lib/firestore";
import ProductDetails from "./product-details";
import { Header } from "@/components/header";
import { notFound } from 'next/navigation';

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
