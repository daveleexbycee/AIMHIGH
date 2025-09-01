
import { Header } from "@/components/header";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <ShieldCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-headline">Privacy Policy</h1>
          </div>
          <div className="space-y-4 text-muted-foreground">
             <p>This is where your privacy policy will go. It's important to detail how you collect, use, and protect your users' data.</p>
             <p>This should include information about cookies, data storage, third-party services, and user rights.</p>
          </div>
        </div>
      </main>
    </>
  );
}
