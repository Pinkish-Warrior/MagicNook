// src/components/BookCard.jsx

import React, { useState } from 'react';
import SummaryReader from './SummaryReader';

/**
 * Displays an individual book with its details and summary access.
 * @param {object} book - A single book object from the library.
 */
const BookCard = ({ book, onDelete }) => {
    const { id, title, author, coverUrl, summaryText, audioUrl, rating = '😊' } = book;
    
    // State to toggle between showing the full summary text or just a snippet
    const [showFullSummary, setShowFullSummary] = useState(false);

    // Simple text snippet for the card view
    const summarySnippet = summaryText 
        ? summaryText.substring(0, 80) + (summaryText.length > 80 ? '...' : '') 
        : 'No text summary recorded.';

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            onDelete(id, title);
        }
    };

    return (
        <div className="book-card">
            <img 
                src={coverUrl || '/book-buddy-mascot.png'} // Use a default image if none found
                alt={`Cover of ${title}`} 
                className="book-card-cover" 
            />
            
            <div className="book-card-info">
                <h3>{title}</h3>
                <p>By: <strong>{author}</strong></p>
                <p>Rating: <strong>{rating}</strong></p>
            </div>
            
            {/* Summary Display Area */}
            <div className="summary-area">
                <p className="card-summary-text">
                    <strong>Your Summary:</strong> {showFullSummary ? summaryText : summarySnippet}
                </p>

                {summaryText && (
                    <button onClick={() => setShowFullSummary(!showFullSummary)}>
                        {showFullSummary ? 'Less Info' : 'More Info'}
                    </button>
                )}
            </div>

            {/* Audio Playback */}
            {audioUrl && (
                <div className="audio-player-container">
                    <p>🔊 Listen to your voice summary:</p>
                    <audio controls src={audioUrl} className="audio-player"></audio>
                </div>
            )}
            
            {/* Text-to-Speech Button */}
            {summaryText && <SummaryReader text={summaryText} />}

            <button onClick={handleDelete} className="delete-button">
                🗑️ Delete
            </button>
        </div>
    );
};

export default BookCard;