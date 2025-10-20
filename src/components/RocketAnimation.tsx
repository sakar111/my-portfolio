import React from "react";

const RocketAnimation: React.FC = () => {
  return (
    <div className="relative z-49 w-full h-90 -mt-10 flex justify-center items-end overflow-hidden">
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-10 bg-gray-300 rounded-t-md"></div>

      {/* Rocket */}
      <div className="rocket absolute bottom-[16px] left-1/2 -translate-x-1/2 w-12 h-28 z-50">
        {/* Rocket Nose */}
        <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-b-red-500 border-l-transparent border-r-transparent mx-auto"></div>

        {/* Rocket Body */}
        <div className="w-6 h-16 z-11 bg-gray-500 mx-auto relative rounded-md">
          {/* Window */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-300 border-2 border-blue-500 rounded-full"></div>

          {/* Landing Legs */}
          <div className="leg-left absolute bottom-1 left-1 w-1 h-6 bg-gray-700 origin-bottom-left  transform: -rotate-135"></div>
          <div className="leg-right absolute bottom-1 right-1 w-1 h-6 bg-gray-700 origin-bottom-right transform: rotate-135"></div>
        </div>

        {/* Flame */}
        <div className="flame absolute  bottom-[15px] z-10 left-1/2 -translate-x-1/2 w-3 h-6 bg-orange-500 rounded-full"></div>
      </div>

      <style>{`
        .rocket {
          animation: flyRocket 15s ease-in-out infinite;
        }

        .flame {
          animation: flameFlicker 0.2s infinite alternate;
        }

        @keyframes flyRocket {
            0%, 10% { transform: translate(-15vw, 0px) rotate(0deg); }
            25% { transform: translate(0vw, -200px) rotate(10deg); }
            45%, 55% { transform: translate(15vw, 0px) rotate(0deg); }
            75% { transform: translate(0vw, -200px) rotate(-10deg); }
            100% { transform: translate(-15vw, 0px) rotate(0deg); }
        }

        @keyframes flameFlicker {
          0%   { transform: scaleY(1) scaleX(1); opacity: 1; }
          20%  { transform: scaleY(1.4) scaleX(0.9); opacity: 0.8; }
          40%  { transform: scaleY(1.2) scaleX(1.1); opacity: 0.9; }
          60%  { transform: scaleY(1.5) scaleX(0.95); opacity: 0.7; }
          80%  { transform: scaleY(1.1) scaleX(1); opacity: 0.85; }
          100% { transform: scaleY(1) scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RocketAnimation;
