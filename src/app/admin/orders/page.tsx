
"use client";

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
import { useOrders } from "@/hooks/use-orders";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
  
export default function AdminOrdersPage() {
    const { orders, loading } = useOrders();
    const { toast } = useToast();

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

    if (loading) {
        return <div>Loading orders...</div>
    }

    return (
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
    )
}
