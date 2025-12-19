import Hero from "../components/Hero";
import Education from "../components/Education";
import Skills from "../components/Skills";
import CloudServices from "../components/CloudServices";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import Blogs from "../components/Blogs";
import { getAllBlogPosts } from "../lib/blog";

export default function Home() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Unified Background - fixed behind everything */}
      <div className="unified-bg" />
      <div className="bg-glow" />

      {/* Scroll Snap Container */}
      <div className="scroll-container">
        <Hero />
        <Skills />
        <CloudServices />
        <Projects />
        <Education />
        <Blogs posts={posts} />
        <Footer />
      </div>
    </>
  );
}
