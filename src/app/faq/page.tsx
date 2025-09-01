
import { Header } from "@/components/header";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


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
                 Our return policy details will be listed here.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                Shipping times and policies will be detailed here.
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                <AccordionContent>
                Details about international shipping availability will be provided here.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
      </main>
    </>
  );
}
