
import { Header } from "@/components/header";
import { Briefcase } from "lucide-react";

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold font-headline mb-2">Careers</h1>
          <p className="text-muted-foreground mb-8">
            Join our team! This page will list available job opportunities at Aimhigh.
          </p>
        </div>
      </main>
    </>
  );
}
