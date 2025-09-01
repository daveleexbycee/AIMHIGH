
import { Header } from "@/components/header";
import { Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold font-headline mb-2">About Us</h1>
          <p className="text-muted-foreground mb-8">
            This is where the story of Aimhigh Furniture Brands will be told.
          </p>
        </div>
      </main>
    </>
  );
}
