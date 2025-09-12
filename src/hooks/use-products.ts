
"use client";

import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from './use-cart';

async function getProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  const productsData: Product[] = [];
  snapshot.forEach((doc) => {
    productsData.push({ id: doc.id, ...doc.data() } as Product);
  });
  return productsData;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, mutate: fetchProducts };
}
