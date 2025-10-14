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
    <section className={`${bgColor} py-16 px-[5%] lg:px-30 `}>
      <div className="flex flex-col lg:flex-row justify-start gap-10 mx-auto">
        {/* Left Column: Heading */}
        <div className="lg:w-1/3 min-w-[200px] pr-4">
          <h2 className="heading relative pb-2 inline-block mb-10">
            {title}
            <span
              className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd] rounded-full"
              style={{ width: "50px" }}
            ></span>
          </h2>
        </div>

        {/* Right Column: Cards */}
        <div className="flex-grow lg:w-2/3">
          <div className="flex flex-col items-center gap-8">
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
