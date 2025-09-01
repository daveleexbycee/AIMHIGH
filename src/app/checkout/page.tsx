
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, loading, router]);

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle payment processing here.
    const orderId = `AIMHIGH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    clearCart();
    router.push(`/order-confirmation/${orderId}`);
  };

  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">You can't checkout without any items.</p>
          <Button asChild>
            <a href="/shop">Go Shopping</a>
          </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Shipping Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user.displayName?.split(' ')[0] || ''} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.displayName?.split(' ')[1] || ''} required />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="1234 Main St" required />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" required />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email || ''} required />
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-md has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">Pay Online</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-md has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="delivery" id="delivery" />
                            <Label htmlFor="delivery" className="flex-1 cursor-pointer">Pay on Delivery</Label>
                        </div>
                    </RadioGroup>
                    {paymentMethod === 'card' && (
                        <div className="border p-4 rounded-md space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input id="card-name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry-date">Expiry Date</Label>
                                    <Input id="expiry-date" placeholder="MM/YY" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="•••" required />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>You have {cart.length} items in your cart.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map(item => (
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
                <Separator />
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₦{totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>₦{totalPrice.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full">
              Place Order
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
