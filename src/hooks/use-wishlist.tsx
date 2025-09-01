
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./use-cart";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
        setWishlist([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find((item) => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
