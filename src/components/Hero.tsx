import React from "react";
import heroBg from "../assets/hero-bg.jpg"; // relative to Navbar.tsx

const Hero: React.FC = () => {
  return (
    <section className="relative">
      {/* Left Text Block */}
      <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center px-10">
        {/* wrapper with fading overlay */}
        <div className="relative rounded overflow-hidden">
          {/* gradient overlay that fades to transparent at the edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 70%)",
            }}
          />
          {/* content sits above the overlay */}
          <div className="relative z-10 p-8">
            <h1 className="text-5xl font-bold text-white mb-4">Sakar Pathak</h1>
            <p className="text-xl text-white">
              I'm a <span className="font-semibold">PhD Candidate</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Image / Video */}
      <div className="h-screen">
        <img src={heroBg} alt="Hero" className="w-full h-full object-cover" />
        {/* Later you can replace <img> with <video> */}
      </div>
    </section>
  );
};

export default Hero;
