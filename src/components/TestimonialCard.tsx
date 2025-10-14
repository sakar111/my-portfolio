import { useState } from "react";
import heroBg from "../assets/hero-bg.jpg"; // your image path

interface CardProps {
  image?: string; // optional, fallback to heroBg
  quote: string;
  backText: string;
}

const FlipCard = ({ image = heroBg, quote, backText }: CardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mx-auto perspective-1000 cursor-pointer my-12"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full rounded-2xl shadow-lg transform-style-preserve-3d transition-transform duration-500 ${
          flipped ? "rotate-y-180" : "hover:tilt"
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 w-full h-[50px] bg-black p-3">
            {" "}
            {/* Quote text */}{" "}
            {/* Using Tailwind's native line-clamp utility */}{" "}
            <p className="text-white/85 font-Roboto line-clamp-1 group-hover:text-white transition duration-300">
              {" "}
              {quote}{" "}
            </p>{" "}
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute flex-col inset-0 w-full h-full backface-hidden overflow-hidden rotate-y-180 rounded-2xl bg-black/90 text-white flex items-center justify-center p-6 text-center">
          <p className="font-Roboto text-white/85">{backText}</p>
          <div className="absolute bottom-0 w-full h-[50px] bg-black p-3">
            {" "}
            {/* Quote text */}{" "}
            {/* Using Tailwind's native line-clamp utility */}{" "}
            <p className="text-white/85 font-Roboto line-clamp-1 group-hover:text-white transition duration-300">
              {" "}
              {quote}{" "}
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
