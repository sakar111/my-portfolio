import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Startup from "./components/Startup";

const App: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Navbar />

      <main className="w-full xl:w-[calc(100%-16rem)] xl:ml-64">
        <Hero />
        <About />
        <Startup />
      </main>
    </div>
  );
};

export default App;
