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
    <div className="w-[216px] h-[336px] sm:w-[360px] sm:h-[560px] mb-2  mx-auto">
      {/* Inner Card (Original): Keeps the large base size and applies the transform
          - scale-[0.6] is used for clarity (same as scale-60).
          - origin-top-left is crucial: it makes the card scale down from the top-left corner,
            allowing the wrapper to control the resulting space perfectly. 
      */}
      <div
        className="relative w-[360px] h-[560px] rounded-2xl overflow-hidden shadow-lg font-default 
          scale-[0.6] sm:scale-100 origin-top-left transition-transform duration-300"
      >
        {/* Background image */}
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom overlay with text + stars */}
        <div className="absolute bottom-0 w-full h-[272px] p-5 bg-gradient-to-t from-black/100 to-transparent flex flex-col justify-end">
          {/* Quote text */}
          {/* Using Tailwind's native line-clamp utility */}
          <p className="text-white line-clamp-3 text-xl">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
