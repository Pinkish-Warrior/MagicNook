// src/components/BookList.jsx

import React from 'react';
import BookCard from './BookCard';

/**
 * Displays the grid of book cards in the personal library.
 * @param {Array} books - List of book objects from Firestore.
 */
const BookList = ({ books, onDeleteBook }) => {
    return (
        <section className="book-list-section" style={{color:"#212121"}}>
            <h2>Your Reading Journey</h2>
            
            {books.length === 0 ? (
                <p className="empty-message">
                    📚 Your library is empty! Add your first book above.
                </p>
            ) : (
                <div className="book-list-grid">
                    {books.map(book => (
                        // Render a card for each book
                        <BookCard key={book.id} book={book} onDelete={onDeleteBook} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BookList;