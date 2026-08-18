"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const minTimePassed = useRef(false);
  const windowLoaded = useRef(false);

  useEffect(() => {
    // 1. Force the beautiful intro to play for at least 2.2 seconds
    const timer = setTimeout(() => {
      minTimePassed.current = true;
      checkExit();
    }, 2200);

    // 2. Track if the actual window (and images) have finished loading
    const handleLoad = () => {
      windowLoaded.current = true;
      checkExit();
    };

    if (document.readyState === "complete") {
      windowLoaded.current = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    const checkExit = () => {
      // Only exit if both the minimum animation time has passed AND the site is loaded
      if (minTimePassed.current && windowLoaded.current) {
        setIsExiting(true);
        // Wait for the door slide animation to finish before removing the component
        setTimeout(() => {
          setIsLoading(false);
        }, 1200);
      }
    };

    // Fallback: If the window takes way too long to load, force exit after 5 seconds
    const fallback = setTimeout(() => {
      if (!isExiting) {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 1200);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      window.removeEventListener("load", handleLoad);
    };
  }, [isExiting]);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          {/* Top Half "Door" */}
          <motion.div
            initial={{ y: "0%" }}
            animate={isExiting ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-zinc-950 pointer-events-auto border-b border-white/5"
          />

          {/* Bottom Half "Door" */}
          <motion.div
            initial={{ y: "0%" }}
            animate={isExiting ? { y: "100%" } : { y: "0%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-zinc-950 pointer-events-auto border-t border-white/5"
          />

          {/* Center Cinematic Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            animate={isExiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Top expanding line */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "160px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-white/30 mb-8"
            />

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="text-white text-lg md:text-2xl uppercase font-bold tracking-[0.5em] ml-[0.5em]"
            >
              Muneeb Tahir
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.6em] ml-[0.6em] mt-4 font-medium"
            >
              Portfolio
            </motion.p>

            {/* Bottom expanding line */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "160px" }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="h-[1px] bg-white/30 mt-8"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
