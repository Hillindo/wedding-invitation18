"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion ,useInView, useAnimation, stagger } from "framer-motion";

const Observer = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref , { once: true })

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    } else {
      mainControls.start("hidden"); // Start the "hidden" animation when leaving the viewport
    }
  }, [isInView])

  return (
      <div  ref={ref} >
      
      <motion.div
      
        variants={{ 
          hidden: { opacity: 0, y: 100 },
          visible: {opacity: 1, y:0}
        }}
        
        initial="hidden"
        animate={mainControls}
        transition={{  duration:0.5, delay:0.25 }}
      >
        {children}
        {/* <style jsx>{`
          .slide-in {
            opacity: 0;
            transform: translateX(-100px);
            transition: opacity 350ms ease-in, transform 350ms ease-in;
          }
  
          .is-visible {
            opacity: 1;
            transform: translateX(0);
          }
        `}</style> */}
      </motion.div>
      </div>
    );
  };
export default Observer;
