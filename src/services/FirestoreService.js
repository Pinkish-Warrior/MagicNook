// src/services/FirestoreService.js

import { db, auth } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const BOOKS_COLLECTION = 'books';

/**
 * Saves a new book and summary to Firestore.
 * @param {object} bookData - The book details, including summaryText and audioUrl.
 */
export const addBookToLibrary = async (bookData) => {
    if (!auth.currentUser) {
        console.error("User not authenticated.");
        return null;
    }

    try {
        const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
            ...bookData,
            userId: auth.currentUser.uid, // Tie the book to the anonymous user ID
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

/**
 * Fetches all books for the currently logged-in user.
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<Array>} - An array of book objects.
 */
export const getBooksForUser = async (userId) => {
    if (!userId) {
        console.error("User ID not provided.");
        return [];
    }

    const q = query(
        collection(db, BOOKS_COLLECTION),
        where("userId", "==", userId)
    );

    try {
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return books;
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return [];
    }
};
