// src/services/StorageService.js

import { storage, auth } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file (cover image or audio summary) to Firebase Storage in a user-specific folder.
 * @param {File | Blob} file - The file object to upload.
 * @param {string} path - The base storage path (e.g., 'covers' or 'summaries').
 * @param {string} filename - The name to save the file as.
 * @returns {Promise<string>} - The public download URL of the uploaded file.
 */
export const uploadFile = async (file, path, filename) => {
    if (!auth.currentUser) {
        console.error("User not authenticated for file upload.");
        throw new Error("User not authenticated. Cannot upload file.");
    }
    const userId = auth.currentUser.uid;

    // Construct the full path including the user's ID to match security rules
    const storageRef = ref(storage, `${path}/${userId}/${filename}`);
    
    try {
        // Upload the file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, file);
        console.log('Uploaded a blob or file!', uploadResult);

        // Get the public URL for the uploaded file
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Re-throw error to be handled by the calling component
    }
};