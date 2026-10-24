import Hero from "../components/Hero";
import Education from "../components/Education";
import Skills from "../components/Skills";
import CloudServices from "../components/CloudServices";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Blogs from "../components/Blogs";
import SnapScrollContainer from "../components/SnapScrollContainer";
import { getAllBlogPosts } from "../lib/blog";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllBlogPosts(locale).slice(0, 3);

  return (
    <>
      {/* Unified Background - fixed behind everything */}
      <div className="unified-bg" />
      <div className="bg-glow" />

      {/* Controlled Section-Snap Container */}
      <SnapScrollContainer>
        <Hero />
        <Skills />
        <CloudServices />
        <Projects />
        <Education />
        <Blogs posts={posts} />
        <Contact />
        <Footer />
      </SnapScrollContainer>
    </>
  );
}
