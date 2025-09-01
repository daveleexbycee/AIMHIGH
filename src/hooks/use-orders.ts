
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CartItem } from './use-cart';

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Fulfilled' | 'Cancelled';
  date: {
      seconds: number;
      nanoseconds: number;
  };
  shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      lga: string;
      zip: string;
  }
  shippingFee: number;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { orders, loading };
}
