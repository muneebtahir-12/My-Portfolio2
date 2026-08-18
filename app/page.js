import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const About = dynamic(() => import("../components/About"));
const Services = dynamic(() => import("../components/Services"));
const Projects = dynamic(() => import("../components/Projects"));
const Experience = dynamic(() => import("../components/Experience"));
const Contact = dynamic(() => import("../components/Contact"));
const Gallery = dynamic(() => import("../components/Gallery"));
const FloatingWhatsApp = dynamic(() => import("../components/FloatingWhatsApp"));

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-white selection:text-black relative">
      {/* Floating Centered Navbar */}
      <Navbar />

      {/* Global Floating Actions */}
      <FloatingWhatsApp />

      {/* Extracted Modular Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Gallery />
      <Contact />
    </main>
  );
}
