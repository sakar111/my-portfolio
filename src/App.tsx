import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Videos from "./components/Videos";
import ExperienceSection from "./components/Experience";
import Education from "./components/Education";
import { jobExperience, Projects } from "./assets/copies";
import Footer from "./components/Footer";

const App: React.FC = () => {
  // Deep links like pathaksakar.com.np/#uw-modem (used by the CV) — the page
  // renders after the browser's own hash jump, so scroll once mounted.
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  return (
    <div>
      <Navbar />

      <main className="w-full xl:w-[calc(100%-18.75rem)] xl:ml-[18.75rem]">
        <Hero />
        <About />
        <Research />
        <ExperienceSection id="jobExperience" title="Work Experience" data={jobExperience} bgColor="bg-white" />
        <ExperienceSection id="projects" title="Projects" data={Projects} bgColor="bg-[#f7f7f7]" />
        <Education />
        <Videos />
        <Footer />
      </main>
    </div>
  );
};

export default App;
