
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import PortfolioAssistant from "./components/PortfolioAssistant";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("main > section");

      sections.forEach((section) => {
        const content = section.querySelectorAll(
          "h1, h2, h3, p, .about-info, .project-card, .experience-card, .contact-container"
        );

        if (!content.length) return;

        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <PortfolioAssistant />
    </>
  );
}

export default App;
