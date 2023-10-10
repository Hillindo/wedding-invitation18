import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from "framer-motion";

const Observer3 = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

    useEffect(() => {
    if (isInView) {
      mainControls.start("show");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView]);

  const containerAnimation = {
    hidden: {
      scale: 0.5,
      opacity: 0.5,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div ref={ref} variants={containerAnimation} initial="hidden" animate={mainControls}>
      {children}
    </motion.div>
  );
};

export default Observer3;
