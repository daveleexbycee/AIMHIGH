
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
import { useUsers } from "@/hooks/use-users";
import { DollarSign, Users, CreditCard, MoreHorizontal, LoaderCircle } from "lucide-react";
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
import { AdminSalesChart } from "@/components/admin-sales-chart";

export default function AdminDashboard() {
  const { orders, loading: ordersLoading } = useOrders();
  const { users, loading: usersLoading } = useUsers();
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

  if (ordersLoading || usersLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground mt-2">Loading dashboard data...</p>
        </div>
    )
  }
  
  const fulfilledOrders = orders.filter(order => order.status === 'Fulfilled');

  const totalRevenue = fulfilledOrders.reduce((sum, order) => sum + order.total, 0);

  const totalSales = fulfilledOrders.length;

  const recentOrders = orders.slice(0, 5);

    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Based on fulfilled orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                Total fulfilled orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{users.length}</div>
              <p className="text-xs text-muted-foreground">
                Total registered users
              </p>
            </CardContent>
          </Card>
        </div>
        
        <AdminSalesChart orders={fulfilledOrders} />

        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of the 5 most recent orders from your store.</CardDescription>
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
                       {recentOrders.map(order => (
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
      </div>
    )
  }
