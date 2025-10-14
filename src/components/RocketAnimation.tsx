import React from "react";

const RocketAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-80 -mt-10 flex justify-center items-end overflow-hidden">
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-10 bg-gray-300 rounded-t-md"></div>

      {/* Rocket */}
      <div className="rocket absolute bottom-[40px] left-1/2 -translate-x-1/2 w-10 h-20 hover:cursor-pointer z-50">
        {/* Rocket Body */}
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-500 rounded-full border border-gray-400 relative flex flex-col items-center justify-end">
          {/* Window */}
          <div className="absolute top-4 w-4 h-4 bg-blue-300 border-2 border-blue-500 rounded-full"></div>
          {/* Flame */}
          <div className="flame absolute bottom-[-8px] w-3 h-3 bg-orange-500 rounded-full"></div>
        </div>
      </div>

      <style>{`
        .rocket {
          animation: flyRocket 10s ease-in-out infinite;
        }

        .flame {
          animation: flameFlicker 0.2s infinite alternate;
        }

        @keyframes flyRocket {
            0% {
              transform: translate(-15vw, 0px) rotate(0deg);
            }
            25% {
              transform: translate(0vw, -200px) rotate(-10deg);
            }
            50% {
              transform: translate(15vw, 0px) rotate(0deg);
            }
            75% {
              transform: translate(0vw, -200px) rotate(10deg);
            }
            100% {
              transform: translate(-15vw, 0px) rotate(0deg);
            }
        }

        @keyframes flameFlicker {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(1.3);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default RocketAnimation;
