
import { Header } from "@/components/header";
import { Newspaper } from "lucide-react";

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold font-headline mb-2">Press</h1>
          <p className="text-muted-foreground mb-8">
            This section will feature press releases and media mentions for Aimhigh.
          </p>
        </div>
      </main>
    </>
  );
}
