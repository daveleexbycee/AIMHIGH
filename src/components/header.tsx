"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, Triangle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const navLinks = ["Home", "Shop", "Product", "Contact Us"];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2">
            <Triangle className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Morden</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => (
              <a key={link} href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Input type="search" placeholder="Search" className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button>Login</Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <a href="#" className="flex items-center gap-2">
                  <Triangle className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-headline">Morden</span>
                </a>
                <nav className="flex flex-col gap-4 text-lg">
                   {navLinks.map(link => (
                    <a key={link} href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="relative">
                        <Input type="search" placeholder="Search" className="pr-10" />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button variant="ghost">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Cart
                    </Button>
                    <Button>Login</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
