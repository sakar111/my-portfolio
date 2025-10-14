import React from "react";

export interface CardProps {
  title: string;
  organization: string;
  date: string;
  place: string;
  points: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  organization,
  date,
  place,
  points,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <h3 className="subHeading font-bold text-lg">{title}</h3>
      <p className="description">{organization}</p>
      <p className="font-Roboto text-sm text-gray-600 mt-1">
        {date}
        <span className="ml-5">{place}</span>
      </p>

      <ul className="mt-3 list-disc list-outside description leading-relaxed space-y-1 pl-5">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
