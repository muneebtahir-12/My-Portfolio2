import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Gallery from "../components/Gallery";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

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
