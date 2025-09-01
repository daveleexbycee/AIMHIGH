
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
  
export default function AdminOrdersPage() {
    const { orders, loading } = useOrders();

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
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
