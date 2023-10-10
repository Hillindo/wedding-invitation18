"use client";
import React, { useRef, useEffect, useState } from 'react';

const Observer = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false); // Renamed from "itVisible" to "isVisible"
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Adjusted threshold to consider more visible area
            rootMargin: "0px 0px -50px 0px", // Adjusted rootMargin for better triggering
        });
        observer.observe(elementRef.current);

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`animate-moveUp ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default Observer;
