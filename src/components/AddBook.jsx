// src/components/AddBook.jsx

import React, { useState } from 'react';
import { searchBook } from '../services/OpenLibraryAPI';
import { uploadFile } from '../services/StorageService';
import { addBookToLibrary } from '../services/FirestoreService';
import AudioRecorder from './AudioRecorder';

// Placeholder image if a book cover isn't found
const DEFAULT_COVER_URL = '/book-buddy-mascot.png';

/**
 * Handles book search, detail input, audio recording, and saving the final book entry.
 * @param {function} onBookAdded - Callback to refresh the main book list.
 */
const AddBook = ({ onBookAdded }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        coverUrl: DEFAULT_COVER_URL,
        description: '',
        isbn: '',
        summaryText: '',
        audioUrl: '',
        rating: '⭐️', // Default rating
    });
    const [audioBlob, setAudioBlob] = useState(null); // Local state for the recorded audio data

    // Handle input changes for manual details and text summary
    const handleDetailChange = (e) => {
        setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
    };

    // --- Core Feature 1: Open Library Search ---
    const handleSearch = async () => {
        if (!searchQuery) return;
        setIsLoading(true);

        const data = await searchBook(searchQuery);

        if (data) {
            // Auto-fill details from API response
            setBookDetails({
                ...bookDetails,
                title: data.title || '',
                author: data.author || '',
                coverUrl: data.coverUrl || DEFAULT_COVER_URL,
                description: data.description || '',
                isbn: data.isbn || '',
            });
            console.log("Book data loaded:", data.title);
        } else {
            alert('Book not found! Please enter details manually.');
            setBookDetails({
                ...bookDetails,
                title: searchQuery, // Use search term as temporary title
                author: '',
                description: '',
                coverUrl: DEFAULT_COVER_URL,
                isbn: '',
            });
        }
        setIsLoading(false);
    };

    // --- Handle Cover Upload/Preview ---
    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a temporary URL for immediate preview
            const localUrl = URL.createObjectURL(file);
            
            // Note: We don't upload the file until the user clicks 'Save' (in handleSubmit)
            setBookDetails({ ...bookDetails, coverFile: file, coverUrl: localUrl });
        }
    };
    
    // --- Core Feature 3: Receive Audio Blob ---
    const handleAudioComplete = (blob) => {
        setAudioBlob(blob);
    };

    // --- Save Handler (Integrates all services) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!bookDetails.title) {
            alert("Please enter a book title.");
            setIsLoading(false);
            return;
        }

        let finalCoverUrl = bookDetails.coverUrl;
        let finalAudioUrl = '';

        try {
            // 1. Upload Cover Image (if a new file was selected)
            if (bookDetails.coverFile) {
                const coverFileName = `${Date.now()}_${bookDetails.title.replace(/\s/g, '_')}_cover`;
                finalCoverUrl = await uploadFile(bookDetails.coverFile, 'covers', coverFileName);
                console.log("Cover uploaded:", finalCoverUrl);
            }

            // 2. Upload Audio Summary (if recorded)
            if (audioBlob) {
                const audioFileName = `${Date.now()}_${bookDetails.title.replace(/\s/g, '_')}_summary.webm`;
                finalAudioUrl = await uploadFile(audioBlob, 'summaries', audioFileName);
                console.log("Audio uploaded:", finalAudioUrl);
            }

            // 3. Save Final Data to Firestore
            const { coverFile, ...dataToSave } = bookDetails;
            const finalData = {
                ...dataToSave,
                coverUrl: finalCoverUrl,
                audioUrl: finalAudioUrl,
            };
            
            await addBookToLibrary(finalData);
            
            // Success! Reset state and notify parent component
            alert(`"${bookDetails.title}" added to your library!`);
            setBookDetails({
                title: '', author: '', coverUrl: DEFAULT_COVER_URL, description: '', 
                isbn: '', summaryText: '', audioUrl: '', rating: '⭐️'
            });
            setAudioBlob(null);
            setSearchQuery('');
            onBookAdded(); // Triggers refresh and confetti
            
        } catch (error) {
            console.error("Error saving book:", error);
            alert("Failed to save the book. Check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-book-container">
            <h2>Add a New Book 📖</h2>

            {/* --- Search Section --- */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by Title or ISBN"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    disabled={isLoading}
                />
                <button 
                    type="button" 
                    onClick={handleSearch} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : '🔍 Search'}
                </button>
            </div>

            {/* --- Book Details Preview & Manual Edit --- */}
            <div className="book-preview">
                <img 
                    src={bookDetails.coverUrl} 
                    alt="Book Cover" 
                    className="book-preview-img" 
                />
                <div className="book-info">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={bookDetails.title}
                        onChange={handleDetailChange}
                        required
                    />
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={bookDetails.author}
                        onChange={handleDetailChange}
                    />
                    <label>Rating:</label>
                    <select name="rating" value={bookDetails.rating} onChange={handleDetailChange}>
                        <option value="⭐️">⭐️ Amazing</option>
                        <option value="🤩">🤩 Great</option>
                        <option value="😊">😊 Good</option>
                    </select>
                    
                    {/* --- Upload Cover --- */}
                    <label className="file-upload-label">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            style={{ display: 'none' }}
                        />
                        <button type="button" onClick={() => document.querySelector('.file-upload-label input').click()} style={{ width: '100%', backgroundColor: '#00bcd4' }}>
                            📸 Change Cover
                        </button>
                    </label>
                </div>
            </div>
            
            {/* --- Child's Summary Section --- */}
            <h3>Your Summary</h3>
            <label>Type your thoughts:</label>
            <textarea
                name="summaryText"
                rows="3"
                placeholder="What did you like about this book?"
                value={bookDetails.summaryText}
                onChange={handleDetailChange}
                style={{ width: '98%' }}
            ></textarea>
            
            <label>Or record your voice summary:</label>
            <AudioRecorder onRecordingComplete={handleAudioComplete} />
            
            {/* --- Final Submit Button --- */}
            <button type="submit" disabled={isLoading || !bookDetails.title}>
                {isLoading ? 'Saving...' : '✅ Add Book to Library'}
            </button>
        </form>
    );
};

export default AddBook;