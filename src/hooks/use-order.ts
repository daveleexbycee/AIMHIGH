
"use client";

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order } from './use-orders';

export function useOrder(orderId: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setOrder(null);
      return;
    }

    setLoading(true);
    setError(null);
    const docRef = doc(db, 'orders', orderId);
    
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setOrder({ id: doc.id, ...doc.data() } as Order);
      } else {
        setOrder(null);
        setError("Order not found. Please check the ID and try again.");
      }
      setLoading(false);
    }, (err) => {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details. Please try again later.");
        setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  return { order, loading, error };
}
