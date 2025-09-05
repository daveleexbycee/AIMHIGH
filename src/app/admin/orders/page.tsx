
"use client";

import { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useOrders, Order } from "@/hooks/use-orders";
import { MoreHorizontal, LoaderCircle, PackageSearch, X, PlayCircle, StopCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { updateOrderStatus, updateDriverLocation } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
  
export default function AdminOrdersPage() {
    const { orders, loading } = useOrders();
    const { toast } = useToast();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isTracking, setIsTracking] = useState(false);
    const watchIdRef = useRef<number | null>(null);

    const handleStatusChange = async (orderId: string, status: 'Pending' | 'Shipped' | 'Fulfilled' | 'Cancelled') => {
        try {
            await updateOrderStatus(orderId, status);
            toast({
                title: "Order Status Updated",
                description: `Order ${orderId} has been marked as ${status}.`
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update the order status."
            })
        }
    }

    const startTracking = (orderId: string) => {
        if (navigator.geolocation) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await updateDriverLocation(orderId, { lat: latitude, lng: longitude });
                    // Also mark as shipped if it's currently pending
                    if (selectedOrder?.status === 'Pending') {
                        await updateOrderStatus(orderId, 'Shipped'); 
                    }
                },
                (error) => {
                    console.error("Error watching position:", error);
                    toast({ variant: "destructive", title: "Location Error", description: "Could not get your location." });
                    stopTracking();
                },
                { enableHighAccuracy: true }
            );
            setIsTracking(true);
            toast({ title: "Live tracking started!" });
        } else {
            toast({ variant: "destructive", title: "Geolocation not supported" });
        }
    };

    const stopTracking = () => {
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        if (selectedOrder) {
            updateDriverLocation(selectedOrder.id, null);
        }
        setIsTracking(false);
        toast({ title: "Live tracking stopped." });
    };

    useEffect(() => {
        // Automatically check if the selected order is being tracked
        setIsTracking(!!(selectedOrder && selectedOrder.driverLocation));

        // Stop tracking if dialog is closed
        if (!selectedOrder && watchIdRef.current) {
           stopTracking();
        }
    }, [selectedOrder]);


    useEffect(() => {
        return () => {
            // Cleanup watcher when component unmounts
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                    <div className="p-3 bg-primary/20 rounded-full animate-pulse">
                        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
                <p className="text-muted-foreground mt-4">Loading orders...</p>
            </div>
        )
    }

    return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>View and manage customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                           <TableRow key={order.id}>
                                <TableCell>
                                    <div className="font-medium">{order.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                                </TableCell>
                                <TableCell>{new Date(order.date.seconds * 1000).toLocaleDateString()}</TableCell>
                                <TableCell><Badge variant={order.status === "Fulfilled" ? "default" : order.status === "Shipped" ? "secondary" : "outline"}>{order.status}</Badge></TableCell>
                                <TableCell className="text-right">₦{order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                                <PackageSearch className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Pending")}>Pending</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Shipped")}>Shipped</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Fulfilled")}>Fulfilled</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Cancelled")}>Cancelled</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
            <DialogContent className="sm:max-w-2xl">
                {selectedOrder && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                                Order ID: {selectedOrder.id}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Shipping Address</h4>
                                    <address className="not-italic text-muted-foreground">
                                        {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}<br />
                                        {selectedOrder.shippingAddress.address}<br />
                                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.lga}, {selectedOrder.shippingAddress.state}<br />
                                        {selectedOrder.shippingAddress.zip && `${selectedOrder.shippingAddress.zip}`}
                                    </address>
                                </div>
                                 <div className="space-y-2">
                                    <h4 className="font-semibold">Payment Details</h4>
                                    <div className="text-muted-foreground">
                                        <p>Total: ₦{selectedOrder.total.toFixed(2)}</p>
                                        <p>Amount Paid: ₦{(selectedOrder.amountPaid || 0).toFixed(2)}</p>
                                        {selectedOrder.outstandingAmount && selectedOrder.outstandingAmount > 0 && (
                                           <p>Due on Delivery: ₦{selectedOrder.outstandingAmount.toFixed(2)}</p>
                                        )}
                                        <p>Method: {selectedOrder.isPayOnDelivery ? "Part-payment (Delivery)" : "Paid Online"}</p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-semibold">Live Tracking</h4>
                                {isTracking ? (
                                    <Button variant="destructive" onClick={stopTracking}>
                                        <StopCircle className="mr-2 h-4 w-4" /> Stop Delivery
                                    </Button>
                                ) : (
                                    <Button onClick={() => startTracking(selectedOrder.id)} disabled={selectedOrder.status === 'Fulfilled' || selectedOrder.status === 'Cancelled'}>
                                        <PlayCircle className="mr-2 h-4 w-4" /> Start Delivery
                                    </Button>
                                )}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-semibold">Order Items</h4>
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-4">
                                     {selectedOrder.items.map(item => (
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
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    </>
    )
}
