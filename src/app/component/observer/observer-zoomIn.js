"use client";
import React, { useEffect, useState, useRef } from 'react';

const Observer2 = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
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
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        });

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`animate-zoomIn ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default Observer2;
