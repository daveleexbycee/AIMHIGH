
"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
    const { toast } = useToast();

    useEffect(() => {
        toast({
            title: "Thank you for shopping with us!",
            description: "Don't forget to write down your review.",
        });
    }, [toast]);
    
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md text-center shadow-lg">
            <CardHeader className="items-center">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/50">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-headline mt-4">Order Confirmed!</CardTitle>
                <CardDescription>Thank you for your purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                    Your order has been placed successfully. You can track its progress using your order ID.
                </p>
                <div className="bg-secondary p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">Your Order ID is:</p>
                    <p className="text-lg font-bold font-mono tracking-widest">{params.orderId}</p>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link href="/shop">
                           <ShoppingBag className="mr-2" /> Continue Shopping
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                         <Link href={`/track-order?id=${params.orderId}`}>
                            Track Your Order
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
