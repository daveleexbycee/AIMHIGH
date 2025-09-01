
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
  
export default function AdminOrdersPage() {
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
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Liam Johnson</div>
                                <div className="text-sm text-muted-foreground">liam@example.com</div>
                            </TableCell>
                            <TableCell>2023-08-15</TableCell>
                            <TableCell><Badge>Fulfilled</Badge></TableCell>
                            <TableCell className="text-right">₦250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Olivia Smith</div>
                                <div className="text-sm text-muted-foreground">olivia@example.com</div>
                            </TableCell>
                            <TableCell>2023-08-14</TableCell>
                            <TableCell><Badge variant="secondary">Shipped</Badge></TableCell>
                            <TableCell className="text-right">₦150.00</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>
                                <div className="font-medium">Noah Brown</div>
                                <div className="text-sm text-muted-foreground">noah@example.com</div>
                            </TableCell>
                            <TableCell>2023-08-13</TableCell>
                            <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                            <TableCell className="text-right">₦350.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Emma Williams</div>
                                <div className="text-sm text-muted-foreground">emma@example.com</div>
                            </TableCell>
                            <TableCell>2023-08-12</TableCell>
                            <TableCell><Badge>Fulfilled</Badge></TableCell>
                            <TableCell className="text-right">₦450.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
