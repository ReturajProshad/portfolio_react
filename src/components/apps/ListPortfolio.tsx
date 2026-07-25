"use client";

import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function ListPortfolio() {
  return (
    <div className="list-portfolio">
      <About />
      <Experience />
      <Skills />
      <Projects />
      <OpenSource />
      <Achievements />
      <Contact />
    </div>
  );
}
