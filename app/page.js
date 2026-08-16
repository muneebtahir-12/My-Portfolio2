import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Experience from "../components/Experience";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Floating Centered Navbar */}
      <Navbar />

      {/* Extracted Modular Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
    </main>
  );
}
