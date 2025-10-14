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
      <h3 className="text-gray-700 font-bold text-lg">{title}</h3>
      <p className="text-gray-600 font-sm">{organization}</p>
      <p className="text-sm text-gray-500 mt-1">
        {date}
        <span className=" text-gray-500 ml-5">{place}</span>
      </p>

      <ul className="mt-3 list-disc list-inside text-gray-700 text-sm leading-relaxed space-y-1">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
