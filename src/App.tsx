import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Startup from "./components/Startup";
import ExperienceSection from "./components/Experience";
import {
  jobExperience,
  teachingExperience,
  Projects,
  awardsScholarships,
} from "./assets/copies";

const App: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Navbar />

      <main className="w-full xl:w-[calc(100%-16rem)] xl:ml-64">
        <Hero />
        <About />
        <Startup />
        <ExperienceSection
          title="Job Experience"
          data={jobExperience}
          bgColor="bg-white"
        />
        <ExperienceSection
          title="Teaching Experience"
          data={teachingExperience}
          bgColor="bg-gray-50"
        />
        <ExperienceSection
          title="Projects"
          data={Projects}
          bgColor="bg-white"
        />
      </main>
    </div>
  );
};

export default App;
