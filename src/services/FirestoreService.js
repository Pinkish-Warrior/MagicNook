// src/services/FirestoreService.js

import { db, auth } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';

const BOOKS_COLLECTION = 'books';

/**
 * Saves a new book and summary to Firestore.
 * @param {object} bookData - The book details, including summaryText and audioUrl.
 */
export const addBookToLibrary = async (bookData, profileId) => {
    if (!auth.currentUser) {
        console.error("User not authenticated.");
        throw new Error("User not authenticated");
    }

    try {
        const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
            ...bookData,
            userId: auth.currentUser.uid, // Tie the book to the anonymous user ID
            profileId: profileId, // Associate with the active character's profile
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

/**
 * Fetches all books for a specific profile of the currently logged-in user.
 * @param {string} userId - The user's unique ID.
 * @param {string} profileId - The active profile ID (e.g., 'harry', 'hermione').
 * @returns {Promise<Array>} - An array of book objects.
 */
export const getBooksForProfile = async (userId, profileId) => {
    if (!userId || !profileId) {
        console.error("User ID or Profile ID not provided.");
        return [];
    }

    const q = query(
        collection(db, BOOKS_COLLECTION),
        where("userId", "==", userId),
        where("profileId", "==", profileId) // Filter by the active profile
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

/**
 * Deletes a book from Firestore.
 * @param {string} bookId - The ID of the book document to delete.
 */
export const deleteBook = async (bookId) => {
    if (!auth.currentUser) {
        console.error("User not authenticated to delete.");
        throw new Error("User not authenticated");
    }
    try {
        const bookDocRef = doc(db, BOOKS_COLLECTION, bookId);
        await deleteDoc(bookDocRef);
        console.log(`Document with ID ${bookId} deleted.`);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
};
