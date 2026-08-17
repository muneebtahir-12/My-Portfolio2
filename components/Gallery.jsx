"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    title: "School Days",
    role: "Early Beginnings",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", // Graduation/school
    className: "absolute top-[10%] left-[5%] md:left-[10%] w-[60vw] md:w-[25vw] max-w-[350px] aspect-[4/5]"
  },
  {
    id: 2,
    title: "College",
    role: "Higher Education",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop", // College campus
    className: "absolute top-[30%] right-[5%] md:right-[15%] w-[70vw] md:w-[30vw] max-w-[450px] aspect-[16/9]"
  },
  {
    id: 3,
    title: "Certificates",
    role: "Achievements",
    image: "https://images.unsplash.com/photo-1589330694653-efa647530664?q=80&w=800&auto=format&fit=crop", // Certificate
    className: "absolute top-[60%] left-[10%] md:left-[25%] w-[65vw] md:w-[28vw] max-w-[400px] aspect-square"
  },
  {
    id: 4,
    title: "Hackathon",
    role: "First Prize",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", // Tech/Team
    className: "absolute top-[80%] right-[10%] md:right-[10%] w-[55vw] md:w-[22vw] max-w-[300px] aspect-[3/4]"
  }
];

export default function Gallery() {
  const containerRef = useRef(null);

  // Track scroll position across the 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });

  // Parallax effects for different elements
  // The background text will scale down and fade slightly
  const textScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const textOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section id="gallery" ref={containerRef} className="relative z-30 bg-black h-[300vh]">
      {/* Sticky background layer for the massive text */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-black pointer-events-none">
        <div className="flex flex-col items-center mb-10 text-center z-0">
          <motion.p
            style={{ opacity: textOpacity }}
            className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4"
          >
            My Journey
          </motion.p>
          <motion.h2
            style={{ scale: textScale, opacity: textOpacity }}
            className="text-[18vw] md:text-[15vw] leading-[0.85] font-bold text-white tracking-tighter uppercase whitespace-nowrap"
          >
            MEMORIES
          </motion.h2>
        </div>
      </div>

      {/* Floating Images Layer (scrolls normally over the sticky background) */}
      {/* Container is absolute over the 300vh section so items scroll relative to it */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="relative w-full h-full max-w-[1500px] mx-auto px-4 md:px-8">
          {galleryItems.map((item, index) => {
            // Give each item a slightly different scroll speed for a parallax effect
            // We use transform relative to the smoothProgress
            const yStart = 100 + (index * 50);
            const yEnd = -100 - (index * 50);

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(smoothProgress, [0, 1], [yStart, yEnd]);

            return (
              <motion.div
                key={item.id}
                style={{ y }}
                className={`${item.className} group bg-[#0a0a0a] border border-zinc-800 p-3 md:p-4 pointer-events-auto hover:border-zinc-600 transition-colors duration-500 shadow-2xl flex flex-col`}
              >
                {/* Corner brackets similar to services */}
                <div className="absolute top-0 left-0 w-4 md:w-6 h-4 md:h-6 border-t-2 border-l-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
                <div className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t-2 border-r-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-l-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-r-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>

                {/* Image Container */}
                <div className="relative w-full flex-grow overflow-hidden bg-zinc-900 mb-3 md:mb-4">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110 origin-center"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>

                {/* Image Info */}
                <div className="flex flex-col mt-auto">
                  <h3 className="text-base md:text-xl font-bold text-white tracking-wider uppercase mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                    <span>{item.role}</span>
                    <span className="text-zinc-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
