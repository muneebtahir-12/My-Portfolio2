"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const ROLES = [
  "Full-Stack Developer",
  "AI & ML Engineer",
  "Computer Vision Specialist"
];

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const frameCount = 240;

  // Typewriter / Role Cycling Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Preload images progressively to avoid blocking the main thread
  useEffect(() => {
    const loadedImagesArray = new Array(frameCount).fill(null);
    let isCancelled = false;

    const loadFrame = (i) => {
      if (isCancelled) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        const frameNumber = i.toString().padStart(6, "0");
        img.src = `/frames/frame_${frameNumber}.jpg`;

        img.onload = () => {
          if (isCancelled) return;
          loadedImagesArray[i] = img;
          
          // Draw the very first frame immediately
          if (i === 0) {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadAll = async () => {
      // 1. Critical path: Load first 10 frames instantly
      const initialLoad = [];
      for (let i = 0; i < Math.min(10, frameCount); i++) {
        initialLoad.push(loadFrame(i));
      }
      await Promise.all(initialLoad);
      if (isCancelled) return;
      setImages([...loadedImagesArray]);

      // 2. Wait until the window is fully loaded (preloader finished) to not steal bandwidth
      if (document.readyState !== "complete") {
        await new Promise(r => window.addEventListener('load', r, { once: true }));
      }
      
      // 3. Background path: Load the rest in small chunks
      for (let i = 10; i < frameCount; i += 10) {
        if (isCancelled) break;
        const chunk = [];
        for (let j = i; j < Math.min(i + 10, frameCount); j++) {
          chunk.push(loadFrame(j));
        }
        await Promise.all(chunk);
        
        // Yield to main thread briefly between chunks
        await new Promise(r => setTimeout(r, 20)); 
      }
      
      if (!isCancelled) {
        setImages([...loadedImagesArray]);
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Set up Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mask Reveal Variants
  const maskVariants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
  };

  // UI Overlay Fade Effect
  const uiOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Map exactly 0 to 1 over the ultra-short 120vh container to guarantee 0 dead scroll time
  const frameTransform = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Add spring physics for fluid interpolation
  const frameSpring = useSpring(frameTransform, {
    stiffness: 300,
    damping: 40,
    mass: 0.1,
  });

  // Update canvas on scroll
  useMotionValueEvent(frameSpring, "change", (latest) => {
    const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(latest)));

    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (canvas && images.length > 0 && images[frameIndex] && images[frameIndex].complete) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
      }
    });
  });

  return (
    <>
      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 bg-zinc-950 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-top"
        />
        {/* Subtle Vignette Edge Gradients: Center remains completely visible */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-black/15 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-black/15 to-transparent pointer-events-none"></div>
        
        {/* Bottom Fade Gradient for seamless blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
      </div>

      {/* Scroll Container for Hero Animation: Height set to 250vh for slower scroll distance */}
      <section ref={containerRef} className="relative w-full h-[250vh]">
        {/* Sticky wrapper pinning the content */}
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

          {/* UI Overlay Layer: Padding dictates the breathable whitespace */}
          <div className="absolute inset-x-0 bottom-0 top-20 md:top-0 z-10 px-6 pb-6 md:px-16 md:pt-12 md:pb-16 flex flex-col justify-center md:justify-end">

            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end pointer-events-auto gap-4 md:gap-0">
              <div className="flex flex-col items-center md:items-start w-full md:w-[55%] max-w-4xl mb-2 md:mb-6">
                <p className="text-[10px] md:text-base uppercase tracking-[0.3em] text-gray-200 md:text-gray-400 mb-2 md:mb-4 font-bold md:font-medium text-center md:text-left drop-shadow-md md:drop-shadow-none">
                  HI THERE! I'M MUNEEB TAHIR
                </p>
                <div className="h-[3.5rem] md:h-[12rem] lg:h-[14rem] overflow-hidden relative w-full">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={roleIndex}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "anticipate" }}
                      className="text-3xl md:text-6xl lg:text-[6rem] font-bold tracking-tighter leading-[1.1] absolute top-0 inset-x-0 mx-auto md:mx-0 md:left-0 w-full text-center md:text-left"
                    >
                      {ROLES[roleIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Experience Timeline & Bio */}
              <motion.div
                className="flex flex-col items-center md:items-start w-full md:w-[45%] max-w-[320px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[460px] mt-2 md:mt-0 mx-auto md:ml-auto md:mr-0 shrink-0"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                  }
                }}
              >
                {/* Mask Reveal Text */}
                <div className="overflow-hidden mb-3 w-full">
                  <motion.p
                    variants={maskVariants}
                    className="text-[12px] md:text-sm xl:text-[15px] text-gray-100 font-medium leading-relaxed md:leading-snug text-center md:text-left drop-shadow-md"
                  >
                    Architecting intelligent digital experiences. I merge scalable full-stack development with advanced machine learning—crafting everything from dynamic web interfaces to complex computer vision pipelines.
                  </motion.p>
                </div>

                {/* Experience Stat Pill */}
                <div className="overflow-hidden mb-5 shadow-sm backdrop-blur-md rounded-full shrink-0">
                  <motion.div
                    variants={maskVariants}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs xl:text-[13px] font-semibold text-white tracking-wide drop-shadow-md">2+ Years of Experience</span>
                  </motion.div>
                </div>

                {/* Experience List - Focus Effect on Hover */}
                <div className="flex flex-col w-full mb-5 group/list">

                  {/* Experience 1 */}
                  <div className="overflow-hidden">
                    <motion.div
                      variants={maskVariants}
                      className="flex items-center justify-center md:justify-start gap-4 py-3 border-b border-white/10 group/item cursor-default transition-all duration-300 group-hover/list:opacity-40 hover:!opacity-100 md:hover:translate-x-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        <img src="/sinnex-logo.png" alt="Sinnex Logo" className="w-full h-full object-cover opacity-90" />
                      </div>
                      <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-sm xl:text-[15px] font-bold text-white tracking-wide transition-colors drop-shadow-md">Web Developer</h3>
                        <p className="text-[11px] xl:text-xs text-gray-300 mt-0.5 uppercase tracking-wider font-medium drop-shadow-sm">Sinnex • 6 Months</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Experience 2 */}
                  <div className="overflow-hidden">
                    <motion.div
                      variants={maskVariants}
                      className="flex items-center justify-center md:justify-start gap-4 py-3 border-b border-white/10 group/item cursor-default transition-all duration-300 group-hover/list:opacity-40 hover:!opacity-100 md:hover:translate-x-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        <img src="/neudym-logo.png" alt="Neudym Logo" className="w-full h-full object-cover opacity-90" />
                      </div>
                      <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-sm xl:text-[15px] font-bold text-white tracking-wide transition-colors drop-shadow-md">AI Intern</h3>
                        <p className="text-[11px] xl:text-xs text-gray-300 mt-0.5 uppercase tracking-wider font-medium drop-shadow-sm">Neudym • 8 Weeks</p>
                      </div>
                    </motion.div>
                  </div>

                </div>

                {/* Actions */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center justify-center md:justify-start gap-4 md:gap-6 shrink-0"
                >
                  <MagneticButton>
                    <a href="/cv.pdf" className="relative overflow-hidden group/btn px-5 py-2.5 md:px-6 md:py-3 bg-white border border-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                      <span className="relative z-10 text-black group-hover/btn:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 whitespace-nowrap">
                        Download CV
                      </span>
                      <div className="absolute inset-0 bg-black origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[0.33,1,0.68,1] z-0"></div>
                    </a>
                  </MagneticButton>

                  <a href="#certifications" className="group relative inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300 whitespace-nowrap drop-shadow-sm">
                    <span>Certifications</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-[0.33,1,0.68,1]"></span>
                  </a>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
