// src/components/ConfettiBadge.jsx

import React, { useEffect, useState } from 'react';
// Note: In a real app, you might use a library like react-confetti. 
// For this MVP, we'll simulate the effect with a simple animation class.

const ConfettiBadge = ({ isNewBook }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isNewBook) {
            setIsVisible(true);
            // Hide the badge and confetti after a few seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [isNewBook]);

    if (!isVisible) return null;

    return (
        // The 'confetti-overlay' class will be styled in App.css to create the effect
        <div className="confetti-overlay">
            <div className="badge-popup">
                🎉 **New Badge Unlocked!** 🎉
                <p>You're a reading superstar!</p>
            </div>
        </div>
    );
};

export default ConfettiBadge;