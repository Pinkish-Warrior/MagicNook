// src/services/StorageService.js

import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file (cover image or audio summary) to Firebase Storage.
 * @param {File | Blob} file - The file object to upload.
 * @param {string} path - The storage path (e.g., 'covers/' or 'summaries/').
 * @param {string} filename - The name to save the file as.
 * @returns {Promise<string>} - The public download URL of the uploaded file.
 */
export const uploadFile = async (file, path, filename) => {
    const storageRef = ref(storage, `${path}/${filename}`);
    
    try {
        // Upload the file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, file);
        console.log('Uploaded a blob or file!', uploadResult);

        // Get the public URL for the uploaded file
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
};