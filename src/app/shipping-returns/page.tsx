
import { Header } from "@/components/header";
import { Truck } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Truck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold font-headline mb-2">Shipping & Returns</h1>
          <p className="text-muted-foreground mb-8">
            This page will contain detailed information about our shipping and return policies.
          </p>
        </div>
      </main>
    </>
  );
}
