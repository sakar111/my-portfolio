import React from "react";
import Card, { type CardProps } from "./card"; // Make sure CardProps is exported from Card

interface ExperienceSectionProps {
  title: string;
  data: CardProps[]; // Correct type
  bgColor?: string; // Optional background color
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title,
  data,
  bgColor = "bg-[#f7f7f7]",
}) => {
  return (
    <section className={`${bgColor} py-16 px-6 lg:px-32`}>
      <div className="flex justify-start gap-10 mx-auto max-w-6xl">
        {/* Left Column: Heading */}
        <div className="w-1/3 min-w-[200px] pr-4">
          <h2 className="text-4xl font-semibold text-gray-800 relative pb-2 inline-block mb-10">
            {title}
            <span
              className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd] rounded-full"
              style={{ width: "50px" }}
            ></span>
          </h2>
        </div>

        {/* Right Column: Cards */}
        <div className="flex-grow">
          <div className="flex flex-col gap-8">
            {data.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
