
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
import { Separator } from "@/components/ui/separator";
import { addOrder, updateUserLocationInOrder } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NIGERIA_STATES } from "@/lib/nigeria-data";
import { LoaderCircle, MessageSquare } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"


export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cart, subtotal, shippingFee, totalPrice, selectedState, setSelectedState, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedLGA, setSelectedLGA] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{orderId: string, whatsappUrl: string} | null>(null);


  const handleStateChange = (stateName: string) => {
    const state = NIGERIA_STATES.find(s => s.name === stateName) || null;
    setSelectedState(state);
    setSelectedLGA(""); // Reset LGA when state changes
  };

  const availableLGAs = useMemo(() => {
    return selectedState ? selectedState.lgas : [];
  }, [selectedState]);

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
    const customerName = `${formData.get('firstName')} ${formData.get('lastName')}`;
    const customerLocation = `${formData.get('city')}, ${selectedLGA}, ${selectedState.name} State.`;

    try {
        await addOrder({
            id: orderId,
            userId: user.uid,
            customerName: customerName,
            customerEmail: user.email!,
            items: cart,
            total: totalPrice,
            shippingFee: shippingFee,
            status: "Pending",
            date: new Date(),
            shippingAddress: {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                address: formData.get('address') as string,
                city: formData.get('city') as string,
                state: selectedState.name,
                lga: selectedLGA,
                zip: formData.get('zip') as string,
            }
        });

        // Get user location and add it to the order
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateUserLocationInOrder(orderId, { lat: latitude, lng: longitude });
                },
                (error) => {
                    console.warn("Could not get user location for order:", error.message);
                }
            );
        }
        
        toast({
            title: "Order Placed Successfully!",
            description: `Your Order ID is ${orderId}.`,
        });

        clearCart();
        
        const whatsappNumber = "2348136523066";
        const messageBody = [
          `Hello Aimhigh! I've just placed an order.`,
          `My Order ID is: ${orderId}`,
          `Name: ${customerName}`,
          `Location: ${customerLocation}`
        ].join('\n');
        const message = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        setConfirmationData({ orderId, whatsappUrl });
        setShowConfirmationDialog(true);
        setIsSubmitting(false);

    } catch (error) {
        console.error("Failed to place order:", error);
        toast({ variant: "destructive", title: "Failed to place order. Please try again."})
        setIsSubmitting(false);
    }
  };
  
  const handleConfirmationNo = () => {
    if (confirmationData) {
        router.push(`/order-confirmation/${confirmationData.orderId}`);
    }
    setShowConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    if (confirmationData) {
        window.location.href = confirmationData.whatsappUrl;
    }
    setShowConfirmationDialog(false);
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
                  <p>Total</p>
                  <p>₦{totalPrice.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full" disabled={cart.length === 0 || isSubmitting}>
                {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                ) : (
                    `Place Order`
                )}
            </Button>
          </div>
        </form>
      </main>
      <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <MessageSquare className="text-primary" />
                Talk to us directly?
            </AlertDialogTitle>
            <AlertDialogDescription>
                Do you want to talk to us directly on WhatsApp for your delivery? This is the fastest way to arrange delivery.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfirmationNo}>No, Thanks</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmationYes}>Yes, Chat Now</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

    