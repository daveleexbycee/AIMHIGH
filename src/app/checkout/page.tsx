
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { addOrder } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NIGERIA_STATES } from "@/lib/nigeria-data";
import { LoaderCircle } from "lucide-react";


export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cart, subtotal, shippingFee, totalPrice, selectedState, setSelectedState, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStateChange = (stateName: string) => {
    const state = NIGERIA_STATES.find(s => s.name === stateName) || null;
    setSelectedState(state);
    setSelectedLGA(""); // Reset LGA when state changes
  };

  const availableLGAs = useMemo(() => {
    return selectedState ? selectedState.lgas : [];
  }, [selectedState]);

  const amountDueNow = useMemo(() => {
    if (paymentMethod === 'delivery') {
        return shippingFee + (subtotal / 2);
    }
    return totalPrice;
  }, [paymentMethod, shippingFee, subtotal, totalPrice]);

  const outstandingAmount = useMemo(() => {
    return totalPrice - amountDueNow;
  }, [totalPrice, amountDueNow]);


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/checkout");
    }
    // Clear selected state on mount if cart is empty
    if (cart.length === 0) {
      setSelectedState(null);
    }
  }, [user, loading, router, cart.length, setSelectedState]);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!user) {
        toast({ variant: "destructive", title: "You must be logged in to place an order."});
        setIsSubmitting(false);
        return;
    }
    if (!selectedState || !selectedLGA) {
        toast({ variant: "destructive", title: "Please select your state and LGA for shipping."});
        setIsSubmitting(false);
        return;
    }

    const formData = new FormData(e.currentTarget);
    const orderId = `AIMHIGH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    try {
        await addOrder({
            id: orderId,
            userId: user.uid,
            customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
            customerEmail: user.email!,
            items: cart,
            total: totalPrice,
            shippingFee: shippingFee,
            status: "Pending", // Or based on payment
            date: new Date(),
            shippingAddress: {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                address: formData.get('address') as string,
                city: formData.get('city') as string,
                state: selectedState.name,
                lga: selectedLGA,
                zip: formData.get('zip') as string,
            },
            isPayOnDelivery: paymentMethod === 'delivery',
            amountPaid: amountDueNow,
            outstandingAmount: outstandingAmount
        });
        
        toast({
            title: "Order Placed Successfully!",
            description: `Your Order ID is ${orderId}. Redirecting to WhatsApp...`,
        });

        clearCart();
        
        const whatsappNumber = "2348136523066";
        const message = encodeURIComponent(`Hello Aimhigh! I've just placed an order. My Order ID is: ${orderId}`);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;

    } catch (error) {
        console.error("Failed to place order:", error);
        toast({ variant: "destructive", title: "Failed to place order. Please try again."})
        setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                    <div className="p-3 bg-primary/20 rounded-full animate-pulse">
                         <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
            </div>
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
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input name="firstName" id="firstName" defaultValue={user.displayName?.split(' ')[0] || ''} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input name="lastName" id="lastName" defaultValue={user.displayName?.split(' ')[1] || ''} required />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input name="address" id="address" placeholder="1234 Main St" required />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select onValueChange={handleStateChange} required>
                            <SelectTrigger id="state">
                                <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                            <SelectContent>
                                {NIGERIA_STATES.map(state => (
                                    <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lga">LGA</Label>
                         <Select value={selectedLGA} onValueChange={setSelectedLGA} required disabled={!selectedState}>
                            <SelectTrigger id="lga">
                                <SelectValue placeholder="Select your LGA" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableLGAs.map(lga => (
                                    <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input name="city" id="city" placeholder="e.g. Port Harcourt" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input name="zip" id="zip" placeholder="10001" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input name="email" id="email" type="email" defaultValue={user.email || ''} required />
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
                            <Label htmlFor="card" className="flex-1 cursor-pointer">Pay Full Amount Online</Label>
                        </div>
                        <div className="flex flex-col p-4 border rounded-md has-[[data-state=checked]]:border-primary">
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="delivery" id="delivery" />
                                <Label htmlFor="delivery" className="flex-1 cursor-pointer">Part-payment (Pay on Delivery)</Label>
                             </div>
                             <p className="text-sm text-muted-foreground mt-2 pl-6">
                                Pay the shipping fee and 50% of the item cost now. Pay the outstanding balance on delivery.
                             </p>
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
                  <p>₦{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{selectedState ? `₦${shippingFee.toFixed(2)}` : 'Select state to see'}</p>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                  <p>Total Order Value</p>
                  <p>₦{totalPrice.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 bg-secondary p-4">
                 <div className="w-full flex justify-between font-bold text-lg text-primary">
                    <p>Amount Due Now</p>
                    <p>₦{amountDueNow.toFixed(2)}</p>
                </div>
                {paymentMethod === 'delivery' && outstandingAmount > 0 && (
                    <div className="w-full flex justify-between text-sm text-muted-foreground">
                        <p>Due on Delivery</p>
                        <p>₦{outstandingAmount.toFixed(2)}</p>
                    </div>
                )}
              </CardFooter>
            </Card>
            <Button type="submit" size="lg" className="w-full" disabled={cart.length === 0 || isSubmitting}>
                {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                ) : (
                    `Pay ₦${amountDueNow.toFixed(2)} & Place Order`
                )}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

    