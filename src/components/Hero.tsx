import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src="/photo/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-70 -z-10"
      ></video>

      {/* Left Text Block */}
      <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center px-10 z-10">
        {/* wrapper with fading overlay */}
        <div className="relative rounded-full">
          {/* gradient overlay that fades to transparent at the edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 90%)",
            }}
          />
          {/* content sits above the overlay */}
          <div className="relative z-10 p-8">
            <h1 className="text-[64px] font-bold font-Raleway text-white mb-4 animate-fadeInDown">
              Sakar Pathak
            </h1>
            <p className="text-[26px] font-Roboto text-white">
              I love{" "}
              <span className="border-b-2 border-[#149DDD] animate-bounceInline inline-block">
                Robotics
              </span>
              <br />
              and{" "}
              <span className="border-b-2 border-[#149DDD] animate-bounceInline inline-block delay-200">
                creating videos
              </span>{" "}
              about building robots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
