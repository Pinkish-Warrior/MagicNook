// src/services/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration is loaded from environment variables.
// Create a .env.local file in the root of your project and add your Firebase keys there.
// See .env.example for the structure.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Initialize Firebase


/**
 * Attempts to sign in the user anonymously.
 * This is crucial for a free, child-friendly app to avoid complex login forms.
 */
export const loginAnonymously = async () => {
    try {
        await signInAnonymously(auth);
        console.log("Anonymous user signed in!");
    } catch (error) {
        console.error("Error signing in anonymously:", error);
    }
};

// Immediately call the login function when the app loads
loginAnonymously();

// Export the app instance for use elsewhere if needed
export default app;