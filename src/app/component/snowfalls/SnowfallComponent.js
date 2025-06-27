"use client";
import React, { useEffect, useState, useRef } from 'react';
import styles from './SnowfallComponent.module.css';

const SnowfallComponent = () => {
  const [flakes, setFlakes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('SnowfallComponent: useEffect triggered');
    const numFlakes = 35;
    const newFlakes = [];

    for (let i = 0; i < numFlakes; i++) {
      newFlakes.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 10}s`,
          animationDelay: `${Math.random() * 2}s`,
        },
      });
    }

    setFlakes(newFlakes);
    console.log('SnowfallComponent: Snowflakes created', newFlakes.length);

    // Cleanup function
    return () => {
      console.log('SnowfallComponent: Cleanup');
      setFlakes([]);
    };
  }, []);

  return (
    <div className='w-[90%] relative h-full' ref={containerRef}>
      <div className={styles.snowfallContainer}>
        {flakes.map(flake => (
          <div key={flake.id} className={styles.flake} style={flake.style} />
        ))}
      </div>
    </div>
  );
}

export default SnowfallComponent;
