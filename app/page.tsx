import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CloudServices from "./components/CloudServices";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";

export default function Home() {
  return (
    <>
      {/* Unified Background - fixed behind everything */}
      <div className="unified-bg" />
      <div className="bg-glow" />

      {/* Universal floating shapes that travel when scrolling */}
      <FloatingElements />

      {/* Navigation - fixed on top */}
      <Navbar />

      {/* Scroll Snap Container */}
      <div className="scroll-container">
        <Hero />
        <Skills />
        <CloudServices />
        <Projects />
        <Education />
        <Footer />
      </div>
    </>
  );
}
