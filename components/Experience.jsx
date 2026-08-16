"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import experienceData from "../data/experience.json";

function ExperienceItem({ item, activeItem, setActiveItem }) {
  const ref = useRef(null);
  const isActive = activeItem.id === item.id;
  
  // Trigger when the item reaches the center of the screen
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveItem(item);
    }
  }, [isInView, item, setActiveItem]);

  return (
    <div ref={ref} className="py-8 md:py-12 flex flex-col justify-center relative">
      <h3
        className={`text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-black uppercase transition-all duration-500 origin-left tracking-tighter ${
          isActive 
            ? "text-white scale-100" 
            : "text-zinc-800 scale-95"
        }`}
      >
        {item.title}
      </h3>
    </div>
  );
}

export default function Experience() {
  const [activeItem, setActiveItem] = useState(experienceData[0]);

  return (
    <section id="experience" className="relative z-30 bg-black min-h-screen border-t border-white/5 py-24 lg:py-32">
      <div className="max-w-[1500px] mx-auto w-full px-6 md:px-12 flex flex-col relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <p className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tighter uppercase mb-6">
            Experience & Education
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 relative">
          
          {/* Left Side: Scrollable List */}
          <div className="w-full md:w-1/2 relative z-10">
            {/* Added padding top/bottom so the first/last items can reach the center of the screen */}
            <div className="hidden md:flex flex-col pt-[30vh] pb-[30vh]">
              {experienceData.map((item) => (
                <ExperienceItem 
                  key={item.id} 
                  item={item} 
                  activeItem={activeItem}
                  setActiveItem={setActiveItem} 
                />
              ))}
            </div>
          </div>

          {/* Right Side: Sticky Detail Panel (Desktop) */}
          <div className="hidden md:block w-full md:w-1/2 h-screen sticky top-0 py-[15vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full bg-[#0a0a0a] border border-zinc-800/50 p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group overflow-hidden rounded-2xl"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-50"></div>
                <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#84cc16] to-transparent opacity-50"></div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-[#84cc16]/10 border border-[#84cc16]/20 text-[#84cc16] text-[10px] font-bold tracking-widest uppercase mb-6 rounded-full">
                    {activeItem.category}
                  </div>
                  
                  <h4 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                    {activeItem.title}
                  </h4>
                  <p className="text-lg lg:text-xl text-zinc-400 mb-8 font-medium">
                    {activeItem.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 mb-8 text-sm text-zinc-500 border-y border-white/5 py-4">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {activeItem.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {activeItem.location}
                    </span>
                  </div>

                  <p className="text-zinc-300 leading-relaxed mb-8 text-base lg:text-lg">
                    {activeItem.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activeItem.tags.map((tag) => (
                      <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile View: Simple Stacked Cards */}
          <div className="md:hidden flex flex-col gap-6 w-full">
             {experienceData.map((item) => (
               <div key={item.id} className="bg-[#0a0a0a] border border-zinc-800/50 p-6 sm:p-8 shadow-xl relative group overflow-hidden rounded-2xl">
                  <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-30"></div>
                  <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-[#84cc16] to-transparent opacity-30"></div>
                  
                  <div className="inline-block px-3 py-1 bg-[#84cc16]/10 border border-[#84cc16]/20 text-[#84cc16] text-[10px] font-bold tracking-widest uppercase mb-4 rounded-full">
                    {item.category}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-sm sm:text-base text-zinc-400 mb-6">{item.subtitle}</p>
                  
                  <div className="flex flex-col gap-3 mb-6 text-xs text-zinc-500 border-y border-white/5 py-4">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {item.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {item.location}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 leading-relaxed mb-6 text-sm">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-medium text-zinc-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
