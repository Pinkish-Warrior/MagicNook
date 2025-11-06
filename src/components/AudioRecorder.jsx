// src/components/AudioRecorder.jsx (MediaRecorder API)

import React, { useState, useRef } from 'react';

/**
 * Component to handle voice recording and provide the audio blob.
 * @param {function} onRecordingComplete - Callback to receive the recorded audio blob.
 */
const AudioRecorder = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Starts the recording process
    const startRecording = async () => {
        try {
            // 1. Request access to the user's microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // 2. Create a new MediaRecorder instance
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = []; // Clear previous chunks

            // Event handler: Fired when data is available (chunks of audio)
            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            // Event handler: Fired when recording stops
            mediaRecorder.onstop = () => {
                // Combine all chunks into a single Blob
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                // Pass the final Blob back to the parent component for upload
                onRecordingComplete(audioBlob); 
                
                // Stop microphone stream tracks to release the mic
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setAudioURL(''); // Clear previous URL
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Cannot access microphone. Please ensure permissions are granted.');
        }
    };

    // Stops the recording process
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="recorder-container">
            <button 
                onClick={isRecording ? stopRecording : startRecording} 
                className={`record-button ${isRecording ? 'recording' : ''}`}
            >
                {isRecording ? '🛑 Stop Recording' : '🎤 Record Summary'}
            </button>
            {audioURL && (
                <div className="audio-preview">
                    <p>Listen to your summary:</p>
                    <audio controls src={audioURL}></audio>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;