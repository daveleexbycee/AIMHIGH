
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc, runTransaction } from 'firebase/firestore';
import { Product, Review } from '@/hooks/use-cart';
import { Order } from '@/hooks/use-orders';

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

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const orderDoc = doc(db, 'orders', orderId);
    return await updateDoc(orderDoc, { status: status });
}

export const addUser = async (user: any) => {
    const userDoc = doc(usersCollection, user.uid);
    // Use setDoc with merge:true to avoid overwriting on google sign in
    return await setDoc(userDoc, user, { merge: true }); 
};

export const addReview = async (productId: string, review: Omit<Review, 'id' | 'avatar'> & { userId: string, user: string }) => {
    const productRef = doc(db, "products", productId);
    try {
        await runTransaction(db, async (transaction) => {
            const productDoc = await transaction.get(productRef);
            if (!productDoc.exists()) {
                throw "Product not found!";
            }

            const productData = productDoc.data() as Product;
            const newReview: Review = {
                ...review,
                id: doc(collection(db, "reviews")).id, // Generate a unique ID
                avatar: `https://i.pravatar.cc/150?u=${review.userId}`, // Generate a consistent avatar
            };

            const existingReviews = productData.reviews || [];
            const updatedReviews = [...existingReviews, newReview];

            const newAverageRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;

            transaction.update(productRef, { 
                reviews: updatedReviews,
                rating: newAverageRating 
            });
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw e;
    }
};
