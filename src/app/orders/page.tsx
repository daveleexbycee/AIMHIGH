
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useUserOrders } from "@/hooks/use-user-orders";
import { Badge } from "@/components/ui/badge";
import { History, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const { orders, loading: ordersLoading } = useUserOrders();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login?redirect=/orders');
        }
    }, [user, authLoading, router]);

    if (authLoading || ordersLoading) {
        return (
             <div className="flex h-screen items-center justify-center">
                <p>Loading your orders...</p>
            </div>
        )
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold font-headline mb-8">My Orders</h1>
                
                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <Card key={order.id}>
                                <CardHeader className="flex flex-row justify-between items-start">
                                    <div>
                                        <CardTitle>Order ID: {order.id}</CardTitle>
                                        <CardDescription>
                                            Placed on {new Date(order.date.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={order.status === "Fulfilled" ? "default" : order.status === "Shipped" ? "secondary" : "outline"}>
                                        {order.status}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <ul className="divide-y">
                                        {order.items.map(item => (
                                            <li key={item.id} className="py-2 flex justify-between items-center">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
                                     <div className="font-bold">Total: ₦{order.total.toFixed(2)}</div>
                                     <Button variant="outline" asChild>
                                        <Link href={`/track-order?id=${order.id}`}>Track Order</Link>
                                     </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-24 border-dashed border-2 rounded-lg">
                        <History className="h-16 w-16 text-muted-foreground" />
                        <h3 className="text-xl font-semibold">You have no orders yet</h3>
                        <p className="text-muted-foreground">Looks like you haven't made a purchase.</p>
                        <Button asChild>
                            <Link href="/shop">
                                <ShoppingBag className="mr-2 h-4 w-4"/>
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                )}
            </main>
        </>
    )
}
