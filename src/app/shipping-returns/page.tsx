
import { Header } from "@/components/header";
import { Truck } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Truck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-headline mb-2">Shipping & Returns Policy</h1>
          </div>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">Shipping Information</h2>
              <p className="mb-4">
                At AimHigh Furniture, we are committed to getting your new furniture to you safely and efficiently.
              </p>
              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-semibold text-foreground">Order Processing:</span> Orders are typically processed and shipped within 3-5 business days. Please note that custom or made-to-order items may require a longer processing time, which will be specified on the product page.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Shipping Costs:</span> Shipping fees are calculated at checkout based on the size, weight, and destination of your order. We may offer special promotions for free shipping, which will be announced on our website.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Delivery Times:</span> Once shipped, standard delivery times are between 7-14 business days. You will receive a shipping confirmation email with a tracking number so you can monitor your order's progress. For larger items, a delivery appointment may be scheduled with our freight partner.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Delivery Inspection:</span> Please inspect your order upon arrival. If you notice any damage, document it with photos and refuse the delivery. If you accept a damaged package, please note the damage on the delivery receipt and contact us immediately.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">Returns & Exchanges</h2>
              <p className="mb-4">
                We want you to be completely satisfied with your AimHigh Furniture purchase. If you are not, we're here to help.
              </p>
               <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-semibold text-foreground">Return Window:</span> You may return most new, unopened items within 30 days of delivery for a full refund. Items must be in their original packaging.
                </li>
                 <li>
                  <span className="font-semibold text-foreground">Non-Returnable Items:</span>
                   <ul className="list-disc pl-6 mt-2">
                        <li>Custom or made-to-order items.</li>
                        <li>Final sale or clearance items.</li>
                        <li>Items that have been assembled or used.</li>
                   </ul>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Initiating a Return:</span> To start a return, please contact our customer support team with your order number and the reason for the return. We will provide you with instructions on how and where to send your package.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Refunds:</span> Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
                </li>
                <li>
                    <span className="font-semibold text-foreground">Exchanges:</span> If you would like to exchange an item, the fastest way is to return the item you have and make a separate purchase for the new item.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">Damaged or Incorrect Items</h2>
              <p>
                If an item is defective, damaged, or you receive the wrong item, please contact us immediately so we can evaluate the issue and make it right.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
