
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Package, ShoppingCart, LogOut, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";

const ADMIN_EMAIL = "agbidave40@gmail.com"; // We can replace this with a more robust role system later

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to view this page.",
      });
      router.push("/login");
    }
  }, [user, loading, router, toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully!' });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "A";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
  };

  if (loading || !user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
             <Logo className="h-8 w-8" />
             <span className="font-bold text-lg font-headline">Aimhigh</span>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/products">
                  <Package />
                  Products
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/orders">
                  <ShoppingCart />
                  Orders
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
                <Avatar>
                    <AvatarImage src={user.photoURL ?? undefined} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.displayName || user.email}</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <SidebarMenuButton variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                    <LogOut />
                </SidebarMenuButton>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
