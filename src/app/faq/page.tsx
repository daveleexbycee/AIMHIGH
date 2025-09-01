
import { Header } from "@/components/header";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";


export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
           <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-headline mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Find answers to common questions below.</p>
           </div>
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                 <p className="mb-2">You may return most new, unopened items within 30 days of delivery for a full refund. Items must be in their original packaging.</p>
                 <p>However, please note that custom or made-to-order items, final sale/clearance items, and items that have been assembled or used are non-returnable.</p>
                 <p className="mt-2">For more details, please see our full <Link href="/shipping-returns" className="text-primary underline">Shipping & Returns Policy</Link>.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                <p>Orders are typically processed and shipped within 3-5 business days. Once shipped, standard delivery times are between 7-14 business days. You will receive a shipping confirmation email with a tracking number so you can monitor your order's progress.</p>
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
                <AccordionTrigger>How is shipping calculated?</AccordionTrigger>
                <AccordionContent>
                <p>Shipping fees are calculated at checkout based on the size, weight, and destination of your order. The cost is a percentage of your order total and varies depending on your state's distance from our base in Rivers State.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                <p>We accept major credit/debit cards for online payments. We also offer a "Pay on Delivery" option for your convenience.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>How is my personal information used?</AccordionTrigger>
                <AccordionContent>
                <p>We use your information to fulfill orders, communicate with you, improve our services, and prevent fraud. We share information with trusted third parties like our e-commerce platform provider to make our services possible.</p>
                <p className="mt-2">You can read our full <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link> for more details.</p>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
      </main>
    </>
  );
}
