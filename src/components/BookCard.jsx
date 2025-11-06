// src/components/BookCard.jsx

import React, { useState } from 'react';
import SummaryReader from './SummaryReader';

/**
 * Displays an individual book with its details and summary access.
 * @param {object} book - A single book object from the library.
 */
const BookCard = ({ book }) => {
    const { title, author, coverUrl, summaryText, audioUrl, rating = '😊' } = book;
    
    // State to toggle between showing the full summary text or just a snippet
    const [showFullSummary, setShowFullSummary] = useState(false);

    // Simple text snippet for the card view
    const summarySnippet = summaryText 
        ? summaryText.substring(0, 80) + (summaryText.length > 80 ? '...' : '') 
        : 'No text summary recorded.';

    return (
        <div className="book-card">
            <img 
                src={coverUrl || '/book-buddy-mascot.png'} // Use a default image if none found
                alt={`Cover of ${title}`} 
                className="book-card-cover" 
            />
            
            <h3>{title}</h3>
            <p>By: **{author}**</p>
            <p>Rating: **{rating}**</p>
            
            {/* Summary Display Area */}
            <div className="summary-area">
                <p className="card-summary-text">
                    **Your Summary:** {showFullSummary ? summaryText : summarySnippet}
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
        </div>
    );
};

export default BookCard;