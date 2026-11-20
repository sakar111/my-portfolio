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
  // Deep links like pathaksakar.com.np/#vtol (used by the resume). The browser tries to
  // jump to the hash before React has rendered, so do it ourselves once the element
  // exists, and again after images/fonts load (they shift the layout).
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    let cancelled = false;
    const jump = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      return !!el;
    };
    // retry each frame until the element exists (max ~3 s)
    let frames = 0;
    const tryJump = () => {
      if (cancelled || jump() || ++frames > 180) return;
      requestAnimationFrame(tryJump);
    };
    requestAnimationFrame(tryJump);

    // re-align after the page finishes loading (late images push content down)
    const realign = () => !cancelled && jump();
    window.addEventListener("load", realign);
    const t = window.setTimeout(realign, 1200);
    // stop correcting once the visitor scrolls on their own
    const stop = () => (cancelled = true);
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", realign);
      window.clearTimeout(t);
    };
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
