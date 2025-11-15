// src/components/ConfettiBadge.jsx

import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiBadge = ({ isNewBook }) => {
    const { width, height } = useWindowSize();

    if (!isNewBook) {
        return null;
    }

    return (
        <>
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
                style={{ zIndex: 2000 }}
            />
            <div className="badge-overlay">
                <div className="badge-popup">
                    🎉 <strong>New Badge Unlocked!</strong> 🎉
                    <p>You're a reading superstar!</p>
                </div>
            </div>
        </>
    );
};

export default ConfettiBadge;