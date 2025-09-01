
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NIGERIA_STATES, State } from "@/lib/nigeria-data";

export interface Review {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
}
export interface Product {
  id: string; // Changed to string to match Firestore document ID
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hint: string;
  tag?: string;
  description?: string;
  rating: number;
  reviews: Review[];
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  selectedState: State | null;
  setSelectedState: (state: State | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCart([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const shippingFee = selectedState && subtotal > 0
    ? subtotal * selectedState.shippingRate
    : 0;
  
  const totalPrice = subtotal + shippingFee;

  return (
    <CartContext.Provider value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        subtotal, 
        shippingFee, 
        totalPrice,
        selectedState,
        setSelectedState
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
