import type { FC } from "react";

interface CardProps {
  image: string;
  quote: string;
}

const TestimonialCard: FC<CardProps> = ({ image, quote }) => {
  return (
    // Outer Wrapper (New): Defines the actual space the scaled card occupies on mobile
    // 360px * 0.6 = 216px
    // 560px * 0.6 = 336px
    // mx-auto centers this container.
    <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mb-2  mx-auto">
      {/* Inner Card (Original): Keeps the large base size and applies the transform
          - scale-[0.6] is used for clarity (same as scale-60).
          - origin-top-left is crucial: it makes the card scale down from the top-left corner,
            allowing the wrapper to control the resulting space perfectly. 
      */}
      <div
        className="group relative w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg font-default 
          scale-[0.8] sm:scale-100 origin-top-left transition-transform duration-300"
      >
        {/* Background image */}
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom overlay with text + stars */}
        <div className="absolute bottom-0 w-full h-[50px] bg-black p-3">
          {/* Quote text */}
          {/* Using Tailwind's native line-clamp utility */}
          <p className="text-white/85 font-Roboto text-base line-clamp-1 group-hover:text-white transition duration-300">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
