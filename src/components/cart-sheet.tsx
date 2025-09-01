
"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function CartSheet() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>My Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</SheetTitle>
      </SheetHeader>
      <Separator />
      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-1 px-6">
            <div className="flex flex-col gap-6 py-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₦{item.price}</p>
                    <div className="mt-2 flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="h-8 w-14 text-center mx-2"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-secondary/50 px-6 py-4 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₦{totalPrice.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
               <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{totalPrice.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some items to get started.</p>
            <SheetClose asChild>
                <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
