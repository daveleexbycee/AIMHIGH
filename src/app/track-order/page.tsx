
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch, Truck } from "lucide-react";

function OrderTracker() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('id') || '');
    const [searchedId, setSearchedId] = useState(searchParams.get('id') || null);

    const handleTrackOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (orderId.trim()) {
            setSearchedId(orderId.trim());
            router.push(`/track-order?id=${orderId.trim()}`);
        }
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline flex items-center gap-2">
                                <PackageSearch /> Track Your Order
                            </CardTitle>
                            <CardDescription>Enter your order ID to see its status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleTrackOrder} className="flex items-end gap-4">
                                <div className="flex-grow space-y-2">
                                    <Label htmlFor="orderId">Order ID</Label>
                                    <Input 
                                        id="orderId" 
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        placeholder="e.g., AIM-ABC123XYZ" 
                                        required 
                                    />
                                </div>
                                <Button type="submit">Track</Button>
                            </form>
                        </CardContent>
                    </Card>

                    {searchedId && (
                        <Card className="mt-8">
                             <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                                <CardDescription>Showing status for order: <span className="font-bold text-primary">{searchedId}</span></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Truck className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">In Progress</p>
                                        <p className="text-muted-foreground">Your order is currently being processed and prepared for shipment.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderTracker />
        </Suspense>
    )
}
