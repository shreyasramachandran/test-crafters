'use client';
import React from 'react';

const OrigamiAnimation = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#38B6FF', // Background color
    };

    const imageContainerStyle = {
        position: 'relative' as 'relative',
        width: '450px',
        height: '450px',
        overflow: 'hidden', // Ensure the gradient stays within the container
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
    };

    const gradientStyle = {
        position: 'absolute' as 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, #38B6FF, transparent)',
        animation: 'fillUp 8s infinite cubic-bezier(0.33, 1, 0.68, 1)',
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                <img src="images/splash_screen_logo.png" alt="Origami Bird" style={imageStyle} />
                <div style={gradientStyle}></div>
            </div>
            <style jsx>{`
                @keyframes fillUp {
                    0% {
                        height: 0;
                    }
                    80% {
                        height: 80%;
                    }
                    100% {
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default OrigamiAnimation;
