"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import experienceData from "../data/experience.json";

function ExperienceItem({ item, activeItem, setActiveItem }) {
  const ref = useRef(null);
  const isActive = activeItem.id === item.id;

  // Narrowed the detection band to the exact middle 20% of the screen
  // This prevents multiple items from being "in view" simultaneously and causing race conditions
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveItem(item);
    }
  }, [isInView, item, setActiveItem]);

  return (
    <div 
      ref={ref} 
      className="py-10 md:py-14 flex flex-col justify-center relative cursor-pointer"
      onMouseEnter={() => setActiveItem(item)}
    >
      <h3
        className={`text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black uppercase transition-all duration-500 origin-left tracking-tighter ${isActive
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

  const experiences = experienceData.filter(item => item.category === "Experience");
  const educations = experienceData.filter(item => item.category === "Education");
  const certifications = experienceData.filter(item => item.category === "Certification");

  return (
    <section id="experience" className="relative z-30 bg-black min-h-screen border-t border-white/5 py-24 lg:py-32">
      <div className="max-w-[1500px] mx-auto w-full px-6 md:px-12 flex flex-col relative">

        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <p className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tighter uppercase mb-6">
            Experience & Education
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 relative">

          <div className="w-full md:w-1/2 relative z-10">
            <div className="hidden md:flex flex-col pt-[30vh] pb-[30vh]">

              {experiences.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-4">Experience</h3>
                  {experiences.map((item) => (
                    <ExperienceItem key={item.id} item={item} activeItem={activeItem} setActiveItem={setActiveItem} />
                  ))}
                </div>
              )}

              {educations.length > 0 && (
                <div className="mt-16 mb-4">
                  <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-4">Education</h3>
                  {educations.map((item) => (
                    <ExperienceItem key={item.id} item={item} activeItem={activeItem} setActiveItem={setActiveItem} />
                  ))}
                </div>
              )}

              {certifications.length > 0 && (
                <div className="mt-16 mb-4">
                  <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-4">Certifications</h3>
                  {certifications.map((item) => (
                    <ExperienceItem key={item.id} item={item} activeItem={activeItem} setActiveItem={setActiveItem} />
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Right Side: Sticky Detail Panel (Desktop) */}
          <div className="hidden md:block w-full md:w-1/2 h-screen sticky top-0 py-[15vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full max-h-[800px] bg-[#0a0a0a] border border-zinc-800/50 p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-y-auto rounded-2xl flex flex-col custom-scrollbar group"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-50 z-20 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#84cc16] to-transparent opacity-50 z-20 pointer-events-none"></div>

                {/* Smooth Accordion Hover Image */}
                {activeItem.image && (
                  <div className="overflow-hidden transition-all duration-700 ease-in-out w-full max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 group-hover:mb-8 flex-shrink-0 origin-top">
                    <div className="w-full h-[240px] xl:h-[300px] bg-zinc-900/60 rounded-xl border border-white/10 p-4 flex items-center justify-center relative shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#84cc16]/10 to-transparent opacity-50"></div>
                      <img 
                        src={activeItem.image} 
                        alt={activeItem.title} 
                        className="w-full h-full object-contain relative z-10 drop-shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-700 delay-100" 
                      />
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex-grow transition-transform duration-700">
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

                  <div className="flex flex-wrap gap-2 mt-auto">
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

          {/* Mobile View: Simple Stacked Cards with Category Grouping */}
          <div className="md:hidden flex flex-col w-full">

            {experiences.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-6">Experience</h3>
                <div className="flex flex-col gap-6">
                  {experiences.map((item) => (
                    <div key={item.id} className="bg-[#0a0a0a] border border-zinc-800/50 p-6 sm:p-8 shadow-xl relative overflow-hidden rounded-2xl flex flex-col">
                        
                        {item.image && (
                          <div className="w-full h-[220px] mb-6 bg-zinc-900/60 rounded-xl border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16]/10 to-transparent opacity-50"></div>
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-contain relative z-10 drop-shadow-xl" 
                            />
                          </div>
                        )}

                        <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-30"></div>
                        <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-[#84cc16] to-transparent opacity-30"></div>
                        
                        <div className="relative z-10">
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-6">Education</h3>
                <div className="flex flex-col gap-6">
                  {educations.map((item) => (
                    <div key={item.id} className="bg-[#0a0a0a] border border-zinc-800/50 p-6 sm:p-8 shadow-xl relative overflow-hidden rounded-2xl flex flex-col">
                        
                        {item.image && (
                          <div className="w-full h-[220px] mb-6 bg-zinc-900/60 rounded-xl border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16]/10 to-transparent opacity-50"></div>
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-contain relative z-10 drop-shadow-xl" 
                            />
                          </div>
                        )}

                        <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-30"></div>
                        <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-[#84cc16] to-transparent opacity-30"></div>
                        
                        <div className="relative z-10">
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[#84cc16] text-sm font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 mb-6">Certifications</h3>
                <div className="flex flex-col gap-6">
                  {certifications.map((item) => (
                    <div key={item.id} className="bg-[#0a0a0a] border border-zinc-800/50 p-6 sm:p-8 shadow-xl relative overflow-hidden rounded-2xl flex flex-col">
                        
                        {item.image && (
                          <div className="w-full h-[220px] mb-6 bg-zinc-900/60 rounded-xl border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16]/10 to-transparent opacity-50"></div>
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-contain relative z-10 drop-shadow-xl" 
                            />
                          </div>
                        )}

                        <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-[#84cc16] to-transparent opacity-30"></div>
                        <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-[#84cc16] to-transparent opacity-30"></div>
                        
                        <div className="relative z-10">
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
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
