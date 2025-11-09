// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { auth, loginAnonymously } from './services/firebaseConfig';
import { getBooksForProfile, deleteBook } from './services/FirestoreService';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import ConfettiBadge from './components/ConfettiBadge';
import './styles/App.css'; // Import the friendly CSS

const profiles = ['harry', 'hermione', 'ron', 'ginny', 'albus', 'lily'];

function App() {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewBookAdded, setIsNewBookAdded] = useState(false);
    const [activeProfile, setActiveProfile] = useState(profiles[0]); // Default to the first profile
    const [notification, setNotification] = useState({ message: '', type: '' });

    // --- Notification Helper ---
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    };

    // 1. Function to fetch the user's book list, memoized with useCallback
    const fetchBooks = useCallback(async () => {
        if (user) {
            setIsLoading(true);
            const userBooks = await getBooksForProfile(user.uid, activeProfile);
            setBooks(userBooks);
            setIsLoading(false);
        }
    }, [user, activeProfile]);

    // 2. Authentication and Initialization
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            // Let the next effect handle loading state
        });
        return () => unsubscribe();
    }, []);

    // 3. Fetch books when user/profile changes or fetchBooks is updated
    useEffect(() => {
        if (user) {
            fetchBooks();
        } else {
            // Only try to sign in if we haven't already started
            if (!isLoading) {
                loginAnonymously();
            }
        }
    }, [user, fetchBooks, isLoading]); // Removed activeProfile from here as fetchBooks depends on it

    // 4. Callback function when a new book is successfully added
    const handleNewBookAdded = useCallback(() => {
        fetchBooks(); // Refresh the list for the active profile
        setIsNewBookAdded(true); // Trigger the confetti animation
        
        // Reset the animation flag after it runs
        setTimeout(() => setIsNewBookAdded(false), 4000);
    }, [fetchBooks]);

    // 5. Callback to handle book deletion
    const handleDeleteBook = async (bookId, bookTitle) => {
        // Optimistic UI update: remove book from state immediately
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        showNotification(`"${bookTitle}" removed from your library.`, 'success');

        try {
            await deleteBook(bookId);
            // No need to fetchBooks here due to optimistic update
        } catch (error) {
            showNotification('Error removing book. Restoring list.', 'error');
            fetchBooks(); // Re-fetch to restore the state if delete failed
        }
    };

    // Capitalize profile name for display
    const profileDisplayName = activeProfile.charAt(0).toUpperCase() + activeProfile.slice(1);

    if (!user && isLoading) {
        return <div className="loading-screen">Loading Book Buddy...</div>;
    }

    return (
        <div className="app-container">
            <header>
                <h1>MagicNook 🪄 Book Buddy</h1>
            </header>

            {/* --- Profile Switcher --- */}
            <div className="profile-switcher">
                <p>Choose Your Library:</p>
                {profiles.map(profile => (
                    <button
                        key={profile}
                        onClick={() => setActiveProfile(profile)}
                        className={`profile-button ${activeProfile === profile ? 'active' : ''}`}
                    >
                        {profile.charAt(0).toUpperCase() + profile.slice(1)}
                    </button>
                ))}
            </div>
            
            <div className="library-dashboard">
                <h2>Welcome back, {profileDisplayName}!</h2>
                <p className="progress-counter">
                    You've read <strong>{books.length}</strong> books! Keep reading! 🤩
                </p>
            </div>

            {/* Display notifications for delete actions */}
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <ConfettiBadge isNewBook={isNewBookAdded} />

            {/* Component to add new books */}
            <AddBook onBookAdded={handleNewBookAdded} activeProfile={activeProfile} />

            <BookList books={books} onDeleteBook={handleDeleteBook} />
            
        </div>
    );
}

export default App;