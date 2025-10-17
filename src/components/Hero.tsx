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
        className="absolute text-sm lg:text-base bottom-4 right-4 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 duration-500 hover:cursor-pointer transition z-20"
      >
        Open Video
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
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 hover:cursor-pointer duration-500"
              >
                Restart
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 hover:cursor-pointer duration-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
