"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we've scrolled near the end of the 200vh hero section
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1000;
    if (latest > threshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.div 
      className="fixed left-0 w-full flex justify-center z-50 pointer-events-none"
      initial={false}
      animate={{
        top: isScrolled ? "0px" : "32px", // 32px is top-8
        paddingLeft: isScrolled ? "0px" : "1.5rem", // px-6
        paddingRight: isScrolled ? "0px" : "1.5rem",
      }}
      transition={{ duration: 0.5, ease: "anticipate" }}
    >
      <motion.nav 
        className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-between"
        initial={false}
        animate={{
          width: "100%",
          maxWidth: isScrolled ? "100%" : "64rem", // Expands from max-w-4xl/5xl to full width
          borderRadius: isScrolled ? "0px" : "9999px",
          paddingLeft: isScrolled ? "3rem" : "1.5rem", // md:px-12 vs md:px-6
          paddingRight: isScrolled ? "3rem" : "1.5rem",
          paddingTop: isScrolled ? "1.25rem" : "0.75rem", // py-5 vs py-3
          paddingBottom: isScrolled ? "1.25rem" : "0.75rem",
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        
        {/* Left: Logo */}
        <div className="text-sm font-bold tracking-[0.2em] uppercase text-white cursor-pointer">
          PORTFOLIO
        </div>
        
        {/* Center: Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="relative group py-1 overflow-hidden block text-gray-300 transition-colors duration-300 hover:text-white"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: CTA Button with requested hover effect */}
        <div className="flex items-center gap-4">
          <MagneticButton className="hidden md:flex">
            <a 
              href="#contact" 
              className="relative overflow-hidden group/btn px-6 py-2.5 bg-white border border-white text-black text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">Let's Talk</span>
              <div className="absolute inset-0 bg-black origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[0.33,1,0.68,1] z-0"></div>
            </a>
          </MagneticButton>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
            <span className="w-6 h-[2px] bg-white block rounded-full"></span>
            <span className="w-6 h-[2px] bg-white block rounded-full"></span>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
