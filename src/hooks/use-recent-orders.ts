
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order } from './use-orders';

export function useRecentOrders(count: number) {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
        collection(db, 'orders'), 
        orderBy('date', 'desc'), 
        limit(count)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setRecentOrders(ordersData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching recent orders:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [count]);

  return { recentOrders, loading };
}
