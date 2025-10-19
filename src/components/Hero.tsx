import React, { useState, useRef } from "react";

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleRestart = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
    }
  };

  return (
    <section id="home" className="relative lg:h-screen overflow-hidden">
      {/* Desktop Video Background */}
      <video
        src="/photo/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden lg:block absolute top-0 left-0 w-full h-full object-cover brightness-70 -z-10"
      />

      {/* Desktop Text Block */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 flex-col justify-center px-10 z-10">
        <div className="relative rounded-full">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 90%)",
            }}
          />
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

      {/* Open Video Button (visible on all screens) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="spx-button z-49 absolute bottom-9 right-7 flex items-center gap-2 px-2 md:px-5 py-2 text-sm md:text-base text-white bg-black/24 border border-white/30 hover:bg-white/24 hover:cursor-pointer transition-all duration-500 rounded-md"
      >
        <span className="text">WATCH</span>
        <svg
          className="arrow w-4 h-4 transition-transform duration-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z"
            fill="#F0F0FA"
            fillOpacity="0.8"
          />
        </svg>
      </button>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center px-6 py-8">
        <div className="pt-10 mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-Raleway text-black mb-4">
            Sakar Pathak
          </h1>
          <p className="text-lg sm:text-xl font-Roboto text-black">
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
        <video
          src="/photo/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl">
            <video
              ref={modalVideoRef}
              src="/photo/hero-bg.mp4"
              controls
              autoPlay
              className="w-full h-auto rounded"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleRestart}
                className="spx-button relative z-50 flex items-center gap-2 px-2 md:px-5 py-2 mt-3 text-sm md:text-base text-white bg-black/24  border-white/30 hover:bg-white/24 hover:cursor-pointer transition-all duration-500 rounded-md"
              >
                <span className="text">RESTART</span>
                <svg
                  className="arrow w-4 h-4 transition-transform duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <path
                    d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z"
                    fill="#F0F0FA"
                    fillOpacity="0.8"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="spx-button relative z-50 flex items-center gap-2 px-2 md:px-5 py-2 mt-3 text-sm md:text-base text-white bg-black/24 border-white/30 hover:bg-white/24 hover:cursor-pointer transition-all duration-500 rounded-md"
              >
                <span className="text">CLOSE</span>
                <svg
                  className="arrow w-4 h-4 transition-transform duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <path
                    d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z"
                    fill="#F0F0FA"
                    fillOpacity="0.8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
