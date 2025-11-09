// src/components/ConfettiBadge.jsx

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiBadge = ({ isNewBook }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (isNewBook) {
            setIsVisible(true);
            // Hide the badge and confetti after a few seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4000); // Increased time for better effect

            return () => clearTimeout(timer);
        }
    }, [isNewBook]);

    if (!isVisible) return null;

    return (
        <>
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
            />
            <div className="badge-overlay"> {/* Changed from confetti-overlay */}
                <div className="badge-popup">
                    🎉 <strong>New Badge Unlocked!</strong> 🎉
                    <p>You're a reading superstar!</p>
                </div>
            </div>
        </>
    );
};

export default ConfettiBadge;