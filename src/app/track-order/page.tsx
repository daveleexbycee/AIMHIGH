
"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PackageSearch, CircleCheck, Truck, Package, PackageOpen } from "lucide-react";
import { useOrder } from "@/hooks/use-order";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { updateUserLocationInOrder } from "@/lib/firestore";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZWNoaWxvcmQiLCJhIjoiY21mNzh0ZnkyMG5saTJtczllajdhbHo1OSJ9.07buYJn6Z-OlYJHDpIYzIw";

const orderStatuses = ["Pending", "Shipped", "Fulfilled", "Cancelled"];

function OrderStatusStepper({ status }: { status: string }) {
    const currentIndex = orderStatuses.indexOf(status);

    if (status === 'Cancelled') {
        return (
             <div className="flex items-center gap-4 p-4 bg-destructive/10 rounded-md">
                <div className="p-3 bg-destructive/20 rounded-full">
                    <PackageOpen className="h-8 w-8 text-destructive" />
                </div>
                <div>
                    <p className="font-semibold text-lg text-destructive">Order Cancelled</p>
                    <p className="text-muted-foreground">This order has been cancelled.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-start justify-between text-center text-sm font-medium text-muted-foreground">
            {orderStatuses.slice(0, 3).map((s, index) => {
                const isActive = index <= currentIndex;
                const isCompleted = index < currentIndex;
                return (
                    <div key={s} className="flex-1">
                        <div className="flex items-center justify-center">
                            {index > 0 && <Separator className={cn("flex-1", (isActive || isCompleted) && 'bg-primary')} />}
                            <div className={cn(
                                "relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-all",
                                isActive ? "border-primary" : "border-border"
                            )}>
                                {isCompleted ? (
                                     <CircleCheck className="h-5 w-5 text-primary" />
                                ) : isActive ? (
                                    <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                                ) : (
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                                )}
                            </div>
                            {index < orderStatuses.slice(0, 3).length - 1 && <Separator className={cn("flex-1", isCompleted && 'bg-primary')} />}
                        </div>
                        <p className={cn("mt-2", isActive && "text-primary font-semibold")}>{s}</p>
                    </div>
                )
            })}
        </div>
    );
}

function OrderTracker() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderIdInput, setOrderIdInput] = useState(searchParams.get('id') || '');
    const orderIdToFetch = searchParams.get('id');

    const { order, loading, error } = useOrder(orderIdToFetch);

    const handleTrackOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (orderIdInput.trim()) {
            router.push(`/track-order?id=${orderIdInput.trim()}`);
        }
    };

    useEffect(() => {
        if (order && !order.userLocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateUserLocationInOrder(order.id, { lat: latitude, lng: longitude });
                },
                (err) => console.error("Could not get user location", err),
                { enableHighAccuracy: true }
            );
        }
    }, [order]);
    
    const viewport = order?.userLocation 
    ? {
        latitude: order.userLocation.lat,
        longitude: order.userLocation.lng,
        zoom: 12
    }
    : {
        latitude: 6.5244, // Default to Lagos
        longitude: 3.3792,
        zoom: 10
    };


    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
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
                                        value={orderIdInput}
                                        onChange={(e) => setOrderIdInput(e.target.value)}
                                        placeholder="e.g., AIM-ABC123XYZ" 
                                        required 
                                    />
                                </div>
                                <Button type="submit">Track</Button>
                            </form>
                        </CardContent>
                    </Card>

                    {loading && orderIdToFetch && (
                         <div className="text-center py-12">
                            <Truck className="h-8 w-8 mx-auto animate-pulse text-primary" />
                            <p className="mt-2 text-muted-foreground">Searching for your order...</p>
                        </div>
                    )}

                    {error && (
                         <Card className="mt-8">
                             <CardHeader>
                                <CardTitle className="text-destructive">Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <p className="text-destructive">{error}</p>
                            </CardContent>
                         </Card>
                    )}

                    {order && (
                        <Card className="mt-8">
                             <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                                <CardDescription>Showing status for order: <span className="font-bold text-primary">{order.id}</span></CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="relative h-96 w-full">
                                    <Map
                                        mapboxAccessToken={MAPBOX_TOKEN}
                                        initialViewState={viewport}
                                        style={{width: '100%', height: '100%'}}
                                        mapStyle="mapbox://styles/mapbox/streets-v11"
                                    >
                                        {order.userLocation && (
                                            <Marker longitude={order.userLocation.lng} latitude={order.userLocation.lat} color="red" />
                                        )}
                                        {order.driverLocation && (
                                            <Marker longitude={order.driverLocation.lng} latitude={order.driverLocation.lat} color="blue" />
                                        )}
                                    </Map>
                                </div>
                                <OrderStatusStepper status={order.status} />
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Order Summary</h3>
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p>₦{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                             <CardFooter className="flex justify-end bg-secondary/50 p-4 font-bold text-lg">
                                Total: ₦{order.total.toFixed(2)}
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <OrderTracker />
        </Suspense>
    )
}
