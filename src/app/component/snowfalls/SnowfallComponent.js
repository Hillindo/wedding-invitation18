"use client";
import React, { useEffect } from 'react';
import styles from './SnowfallComponent.module.css';

const SnowfallComponent = () => {
  useEffect(() => {
    const numFlakes = 35;
    const snowfallContainer = document.getElementById('snowfall-container');

    // Create and append snowflakes
    const createSnowflake = () => {
      const flake = document.createElement('div');
      flake.classList.add(styles.flake);
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${Math.random() * 5 + 10}s`;
      flake.style.animationDelay = `${Math.random() * 2}s`;
      snowfallContainer.appendChild(flake);
    };

    for (let i = 0; i < numFlakes; i++) {
      createSnowflake();
    }
  }, []);

  return (
    <div className='w-[90%] relative h-full'>
      <div id="snowfall-container" className={styles.snowfallContainer}></div>
    </div>
  );
}

export default SnowfallComponent;
