// src/components/SummaryReader.jsx (Web Speech API)

import React from 'react';

/**
 * Component to read text aloud using the Web Speech API (Text-to-Speech).
 * @param {string} text - The text content to be read aloud.
 */
const SummaryReader = ({ text }) => {
    const speakSummary = () => {
        if ('speechSynthesis' in window && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set language
            utterance.pitch = 1.2; // A bit higher pitch for a friendly tone
            utterance.rate = 1.0; // Normal speed

            // Use the Web Speech API to read the text
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-Speech is not supported in this browser.");
        }
    };

    return (
        <button onClick={speakSummary} className="read-aloud-button">
            🔊 Read Aloud
        </button>
    );
};

export default SummaryReader;