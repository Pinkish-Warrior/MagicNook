// src/services/OpenLibraryAPI.js

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';

/**
 * Searches the Open Library API by title or ISBN.
 * @param {string} query - The book title or ISBN to search for.
 * @returns {Promise<object>} - The first matching book data.
 */
export const searchBook = async (query) => {
    // Determine if the query is an ISBN (simple check for now)
    const isIsbn = /^\d{10}$|^\d{13}$/.test(query);
    const searchType = isIsbn ? 'isbn' : 'title';

    try {
        // Use the search API for titles, or the book API for direct ISBN lookup
        const url = isIsbn
            ? `${OPEN_LIBRARY_BASE_URL}/api/books?bibkeys=ISBN:${query}&format=json&jscmd=data`
            : `${OPEN_LIBRARY_BASE_URL}/search.json?q=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isIsbn) {
            // Handle direct ISBN lookup (returns an object keyed by the ISBN)
            const key = Object.keys(data)[0];
            const bookData = data[key];
            if (!bookData) return null;

            return {
                title: bookData.title,
                author: bookData.authors ? bookData.authors[0].name : 'Unknown Author',
                // Use the largest cover size available
                coverUrl: bookData.cover ? bookData.cover.large : null,
                description: bookData.notes || 'No description available.',
                isbn: query,
            };
        } else {
            // Handle title search (returns a list of results)
            const firstResult = data.docs[0];
            if (!firstResult) return null;

            return {
                title: firstResult.title,
                author: firstResult.author_name ? firstResult.author_name[0] : 'Unknown Author',
                // Construct the cover URL using the cover_i
                coverUrl: firstResult.cover_i ? `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-L.jpg` : null,
                // Note: Full description isn't in search results, would need a second API call (omitted for MVP simplicity)
                description: 'No description available from search.',
                isbn: firstResult.isbn ? firstResult.isbn[0] : 'N/A',
            };
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
        return null;
    }
};