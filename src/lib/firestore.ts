
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Product } from '@/hooks/use-cart';

const productsCollection = collection(db, 'products');
const ordersCollection = collection(db, 'orders');
const usersCollection = collection(db, 'users');


export const addProduct = async (product: Omit<Product, 'id'>) => {
    return await addDoc(productsCollection, product);
};

export const updateProduct = async (id: string, product: Omit<Product, 'id'>) => {
    const productDoc = doc(db, 'products', id);
    return await updateDoc(productDoc, product);
};

export const deleteProduct = async (id: string) => {
    const productDoc = doc(db, 'products', id);
    return await deleteDoc(productDoc);
};

export const addOrder = async (order: any) => {
    const orderDoc = doc(ordersCollection, order.id);
    return await setDoc(orderDoc, order);
};

export const addUser = async (user: any) => {
    const userDoc = doc(usersCollection, user.uid);
    // Use setDoc with merge:true to avoid overwriting on google sign in
    return await setDoc(userDoc, user, { merge: true }); 
};
