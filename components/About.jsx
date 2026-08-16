"use client";

import { motion } from "framer-motion";

const Marquee = ({ text, reverse }) => {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap opacity-[0.05] select-none pointer-events-none">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap text-[60px] md:text-[100px] lg:text-[140px] font-bold uppercase tracking-widest text-white"
      >
        <span className="pr-16">{text}</span>
        <span className="pr-16">{text}</span>
        <span className="pr-16">{text}</span>
        <span className="pr-16">{text}</span>
      </motion.div>
    </div>
  );
};

const TechTicker = () => {
  const techs = [
    "Python", "Computer Vision", "Vision-Language Models (VLMs)", 
    "Machine Learning", "PyTorch", "OpenCV", 
    "React", "Next.js", "Tailwind CSS", "Framer Motion", 
    "Node.js", "REST APIs", "PostgreSQL", "Git"
  ];
  // Duplicate array multiple times to ensure the loop is seamless
  const loopTechs = [...techs, ...techs, ...techs, ...techs];
  
  return (
    <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap border-y border-white/10 py-5 bg-[#050505] z-20 flex">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 md:gap-16 px-4 md:px-8 items-center w-max"
      >
        {loopTechs.map((tech, i) => (
          <span key={i} className="text-zinc-300 font-bold tracking-[0.2em] uppercase text-sm md:text-base flex items-center gap-8 md:gap-16">
            <span className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-default">{tech}</span>
            <span className="w-2 h-2 rounded-full bg-[#84cc16] shadow-[0_0_8px_rgba(132,204,22,0.8)]"></span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="relative w-full bg-black z-20 min-h-screen flex flex-col justify-center overflow-hidden border-t border-white/5 py-24">
      
      {/* Background Infinite Marquees */}
      <div className="absolute inset-0 flex flex-col justify-center gap-8 md:gap-16 pointer-events-none">
        <Marquee text="INTELLIGENT SYSTEMS •" reverse={false} />
        <Marquee text="PIXEL PERFECT DESIGN •" reverse={true} />
      </div>

      {/* Foreground Typography */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#84cc16] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-8 md:mb-12">
              The Philosophy
            </p>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] md:leading-[1.1] tracking-tight mb-8 md:mb-12"
          >
            I build intelligent systems at the intersection of <span className="text-zinc-600 transition-colors duration-500 hover:text-white cursor-default">pixel-perfect design</span> and <span className="text-zinc-600 transition-colors duration-500 hover:text-white cursor-default">complex algorithms</span>.
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-zinc-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            My goal is to bridge the gap between raw data and human experience. Whether training a computer vision model or crafting a seamless user interface, I create applications that don't just look good—they think, learn, and adapt.
          </motion.p>
        </div>

      </div>

      {/* Tech Stack Ticker Tape */}
      <TechTicker />

    </section>
  );
}
