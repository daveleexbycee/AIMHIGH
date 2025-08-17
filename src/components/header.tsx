"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Triangle, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact Us" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully!' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  const renderThemeChanger = () => {
    if (!mounted) return null;

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Triangle className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Aimhigh</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Input type="search" placeholder="Search" className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          {renderThemeChanger()}
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {user ? (
            <>
              <Avatar>
                <AvatarImage src={user.photoURL ?? undefined} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          {renderThemeChanger()}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2">
                  <Triangle className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-headline">Aimhigh</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg">
                   {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
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
                    {user ? (
                        <>
                         <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={user.photoURL ?? undefined} />
                                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.displayName || user.email}</span>
                         </div>
                         <Button onClick={handleLogout}>
                            <LogOut className="mr-2 h-5 w-5" />
                            Logout
                        </Button>
                        </>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
