"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import servicesData from "../data/services.json";

// Modern SVGs mapping exactly to the services
const icons = {
  "FULL STACK DEV": (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "API INTEGRATION": (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="8" height="8" rx="2" />
      <rect x="14" y="2" width="8" height="8" rx="2" />
      <path d="M6 14v-4a2 2 0 0 1 2-2h10" />
      <path d="M14 6h4" />
    </svg>
  ),
  "MACHINE LEARNING": (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h4l3-9 5 18 3-9h5" />
    </svg>
  ),
  "COMPUTER VISION": (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
};

// Component for individual scrolling card
function ScrollCard({ service, index, scrollYProgress }) {
  // Divide the scroll progress into chunks so cards appear sequentially.
  const start = index * 0.15;
  const end = start + 0.25;

  // Use a slight spring for buttery smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });

  const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
  const y = useTransform(smoothProgress, [start, end], [100, 0]);
  const scale = useTransform(smoothProgress, [start, end], [0.95, 1]); // Very subtle scale

  // For the first card, disable scroll animations so it is always visible
  const style = index === 0 ? { opacity: 1, y: 0, scale: 1 } : { opacity, y, scale };

  return (
    <motion.div
      style={style}
      className="relative group w-full h-[320px] lg:h-[350px] bg-[#0a0a0a] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 flex flex-col items-center justify-center p-6 md:p-8 shadow-2xl"
    >
      {/* Corner brackets - Always visible, highlight on hover */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-zinc-700 group-hover:border-[#84cc16] transition-colors duration-500"></div>

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#84cc16]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 md:mb-8 text-zinc-400 group-hover:text-[#84cc16] transform group-hover:scale-110 transition-all duration-500">
          {icons[service.title]}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-2xl font-bold text-white tracking-wider uppercase mb-3 md:mb-4 transition-colors duration-500">
          {service.title}
        </h3>

        {/* Description - Always visible */}
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[250px] md:max-w-[280px]">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);

  // Track scroll position across the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="services" ref={containerRef} className="relative z-30 bg-black h-[300vh]">
      {/* Sticky container pins to screen while scrolling through the 300vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col pt-24 lg:pt-[14vh] overflow-hidden border-t border-white/5 bg-black">

        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-12">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
            <p className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-2 md:mb-4">
              Our Expertise
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tighter uppercase mb-2 md:mb-4">
              Services We Provide
            </h2>
          </div>

          {/* Grid - The cards will be revealed sequentially as you scroll */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {servicesData.map((service, index) => (
              <ScrollCard
                key={service.id}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
