"use client";
import { useState, useEffect } from "react";
import styles from "./GateAnimation.module.css";

interface GateAnimationProps {
  isOpen: boolean;
  onAnimationComplete: () => void;
  leftColor?: string;
  rightColor?: string;
  children: React.ReactNode;
}

export default function GateAnimation({
  isOpen,
  onAnimationComplete,
  leftColor = "#8B4513", // Default to a dark brown color
  rightColor = "#A0522D", // Default to a slightly lighter brown
  children,
}: GateAnimationProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set a timeout to match the animation duration
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete();
      }, 1500); // 1.5s for animation completion

      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <div className={styles.gateContainer}>
      {!animationComplete && (
        <>
          <div
            className={`${styles.gateHalf} ${styles.leftGate} ${
              isOpen ? styles.leftOpen : ""
            }`}
            style={{ backgroundColor: leftColor }}
          >
            {/* Optional: Add decorative elements for the left gate */}
            <div className={styles.gatePattern}></div>
          </div>
          <div
            className={`${styles.gateHalf} ${styles.rightGate} ${
              isOpen ? styles.rightOpen : ""
            }`}
            style={{ backgroundColor: rightColor }}
          >
            {/* Optional: Add decorative elements for the right gate */}
            <div className={styles.gatePattern}></div>
          </div>
        </>
      )}
      <div
        className={`${styles.contentContainer} ${
          isOpen ? styles.contentVisible : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}