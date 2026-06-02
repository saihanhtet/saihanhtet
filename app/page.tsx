import Header from "@/components/header/Header";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import Skill from "@/components/skill/Skill";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Works from "@/components/works/Works";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pages">
        <Home />
        <About />
        <Skill />
        <Experience />
        <Education />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
