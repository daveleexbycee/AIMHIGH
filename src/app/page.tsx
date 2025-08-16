import { FurnitureSuggester } from "@/components/furniture-suggester";
import { Waves } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-900/50 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)]"></div>
      <div className="z-10 w-full flex flex-col items-center text-center space-y-8">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <Waves className="h-6 w-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
              AimHigh
            </h1>
          </div>
          <p className="max-w-2xl text-lg md:text-xl text-foreground/80">
            Discover furniture that perfectly fits your life.
          </p>
          <p className="max-w-2xl text-base text-muted-foreground">
            Our AI-powered tool helps you visualize and choose complete furniture sets tailored to your unique style, budget, and living space. Let's build your dream home, together.
          </p>
        </header>

        <FurnitureSuggester />
      </div>
    </main>
  );
}
