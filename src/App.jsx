// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { auth, loginAnonymously } from './services/firebaseConfig';
import { getBooksForUser } from './services/FirestoreService';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import ConfettiBadge from './components/ConfettiBadge';
import './styles/App.css'; // Import the friendly CSS

function App() {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewBookAdded, setIsNewBookAdded] = useState(false);
    const [nickname, setNickname] = useState('Super Reader'); // Simple local nickname

    // 1. Function to fetch the user's book list, memoized with useCallback
    const fetchBooks = useCallback(async () => {
        if (user) {
            const userBooks = await getBooksForUser(user.uid);
            setBooks(userBooks);
        }
    }, [user]);

    // 2. Authentication and Initialization
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // 3. Fetch books when user changes or fetchBooks is updated
    useEffect(() => {
        if (user) {
            fetchBooks();
        } else if (!isLoading) {
            loginAnonymously();
        }
    }, [user, fetchBooks, isLoading]);

    // 4. Callback function when a new book is successfully added
    const handleNewBookAdded = useCallback(() => {
        fetchBooks(); // Refresh the list
        setIsNewBookAdded(true); // Trigger the confetti animation
        
        // Reset the animation flag after it runs
        setTimeout(() => setIsNewBookAdded(false), 4000);
    }, [fetchBooks]);

    if (isLoading) {
        return <div className="loading-screen">Loading Book Buddy...</div>;
    }

    return (
        <div className="app-container">
            <header>
                <h1>MagicNook 🪄 Book Buddy</h1>
            </header>
            
            <div className="library-dashboard">
                <h2>Welcome back, {nickname}!</h2>
                <p className="progress-counter">
                    You've read **{books.length}** books! Keep reading! 🤩
                </p>
            </div>

            <ConfettiBadge isNewBook={isNewBookAdded} />

            {/* Component to add new books */}
            <AddBook onBookAdded={handleNewBookAdded} userId={user?.uid} />

            <BookList books={books} />
            
        </div>
    );
}

export default App;