import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CloudServices from "./components/CloudServices";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 selection:text-white">
      <div className="bg-glow" />

      <Navbar />

      <Hero />
      <Skills />
      <CloudServices />
      <Projects />
      <Education />
      <Footer />
    </main>
  );
}
