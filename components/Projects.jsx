"use client";

import { motion } from "framer-motion";
import projectsData from "../data/projects.json";

export default function Projects() {
  return (
    <section id="projects" className="relative z-30 bg-black py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <p className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tighter uppercase mb-6">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-[10px] md:text-xs text-zinc-400 tracking-[0.05em] leading-relaxed uppercase">
            Carefully designed applications focused on performance, usability, and modern aesthetics across web and mobile platforms.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-16">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group cursor-pointer h-full"
            >
              {/* Image Container - Pure image, no background box */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-[0.16,1,0.3,1]"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col px-1 flex-grow">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight group-hover:text-[#84cc16] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Action Links - Modern Pills with Sweep Animation */}
                <div className="flex items-center gap-4 mt-auto">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex items-center gap-2 px-6 py-2.5 bg-white border border-white text-black text-xs font-bold rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-none"
                    >
                      <div className="absolute inset-0 bg-black origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[0.33,1,0.68,1] z-0"></div>
                      <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">Live Demo</span>
                      <svg className="relative z-10 w-3.5 h-3.5 transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/github relative overflow-hidden flex items-center gap-2 px-6 py-2.5 bg-transparent border border-zinc-700 hover:border-white text-white text-xs font-semibold rounded-full transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-white origin-left scale-x-0 group-hover/github:scale-x-100 transition-transform duration-500 ease-[0.33,1,0.68,1] z-0"></div>
                      <svg className="relative z-10 w-4 h-4 opacity-70 group-hover/github:opacity-100 group-hover/github:text-black transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span className="relative z-10 group-hover/github:text-black transition-colors duration-500">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
