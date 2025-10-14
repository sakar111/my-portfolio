import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Startup from "./components/Startup";
import ExperienceSection from "./components/Experience";
import { jobExperience, teachingExperience, Projects } from "./assets/copies";
import RocketAnimation from "./components/RocketAnimation";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />

      <main className="w-full xl:w-[calc(100%-18.75rem)] xl:ml-[18.75rem]">
        <Hero />
        <About />
        <Startup />
        <ExperienceSection
          id="jobExperience"
          title="Job Experience"
          data={jobExperience}
          bgColor="bg-white"
        />
        <ExperienceSection
          id="teachingExperience"
          title="Teaching Experience"
          data={teachingExperience}
          bgColor="bg-gray-50"
        />
        <ExperienceSection
          id="projects"
          title="Projects"
          data={Projects}
          bgColor="bg-white"
        />
        <RocketAnimation />
      </main>
    </div>
  );
};

export default App;
