"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative z-30 bg-black h-screen flex flex-col justify-center border-t border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row h-full pt-24 pb-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#84cc16]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

        {/* Left Side: Editorial Header */}
        <div className="w-full md:w-5/12 flex flex-col justify-between h-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#84cc16] text-xs font-bold tracking-[0.3em] uppercase mb-6">
              Let's Connect
            </p>
            <h2 className="text-6xl md:text-[7rem] lg:text-[9rem] font-black text-white tracking-tighter uppercase leading-[0.9]">
              SAY<br/>HELLO.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, opacity: 0 }}
            whileInView={{ opacity: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase text-zinc-300 mt-12 md:mt-0"
          >
            <a href="mailto:muneebtahir.dev@gmail.com" className="hover:text-[#84cc16] transition-colors py-2 border-b border-zinc-700 w-fit">muneebtahir.dev@gmail.com</a>
            <a href="https://wa.me/923415063387" target="_blank" rel="noreferrer" className="hover:text-[#84cc16] transition-colors py-2 border-b border-zinc-700 w-fit">+92 341 506 3387</a>
            <p className="py-2 w-fit text-zinc-400">Based in Pakistan</p>
          </motion.div>
        </div>

        {/* Right Side: Architectural Form */}
        <div className="w-full md:w-7/12 flex flex-col justify-center h-full relative z-10">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full"
          >
            
            {/* Input Row 1: Name */}
            <div className="group flex items-center border-b border-zinc-600 focus-within:border-[#84cc16] transition-colors">
              <label htmlFor="name" className="w-28 md:w-40 shrink-0 text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-300 group-focus-within:text-[#84cc16] transition-colors uppercase">
                01 // Name *
              </label>
              <input 
                type="text" 
                id="name"
                placeholder="John Doe"
                className="w-full bg-transparent py-6 md:py-8 text-xl md:text-2xl text-white placeholder-zinc-500 focus:outline-none rounded-none"
              />
            </div>

            {/* Input Row 2: Email */}
            <div className="group flex items-center border-b border-zinc-600 focus-within:border-[#84cc16] transition-colors">
              <label htmlFor="email" className="w-28 md:w-40 shrink-0 text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-300 group-focus-within:text-[#84cc16] transition-colors uppercase">
                02 // Email *
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="john@example.com"
                className="w-full bg-transparent py-6 md:py-8 text-xl md:text-2xl text-white placeholder-zinc-500 focus:outline-none rounded-none"
              />
            </div>

            {/* Input Row 3: Phone */}
            <div className="group flex items-center border-b border-zinc-600 focus-within:border-[#84cc16] transition-colors">
              <label htmlFor="phone" className="w-28 md:w-40 shrink-0 text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-300 group-focus-within:text-[#84cc16] transition-colors uppercase">
                03 // Phone
              </label>
              <input 
                type="tel" 
                id="phone"
                placeholder="+1 (234) 567-890"
                className="w-full bg-transparent py-6 md:py-8 text-xl md:text-2xl text-white placeholder-zinc-500 focus:outline-none rounded-none"
              />
            </div>

            {/* Input Row 4: Message */}
            <div className="group flex items-start border-b border-zinc-600 focus-within:border-[#84cc16] transition-colors pt-6 md:pt-8">
              <label htmlFor="message" className="w-28 md:w-40 shrink-0 text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-300 group-focus-within:text-[#84cc16] transition-colors uppercase mt-2">
                04 // Message
              </label>
              <textarea 
                id="message"
                rows="2"
                placeholder="Tell me about your project..."
                className="w-full bg-transparent pb-6 md:pb-8 text-xl md:text-2xl text-white placeholder-zinc-500 focus:outline-none rounded-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-12">
              <button 
                type="submit" 
                onClick={(e) => e.preventDefault()}
                className="w-full py-6 bg-[#84cc16] hover:bg-white text-black font-black tracking-[0.2em] uppercase text-sm md:text-base transition-colors flex items-center justify-center gap-4 group"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>

          </motion.form>
        </div>

      </div>
    </section>
  );
}
