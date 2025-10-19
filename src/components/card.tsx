import React from "react";

export interface CardProps {
  title: string;
  organization?: string; // make optional
  date?: string; // make optional
  place?: string; // make optional
  points: string[];
  button?: { title: string; link: string }[];
}

const Card: React.FC<CardProps> = ({
  title,
  organization,
  date,
  place,
  points,
  button,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <h3 className="subHeading font-bold text-lg">{title}</h3>

      {/* Only render organization if it exists */}
      {organization && <p className="description">{organization}</p>}

      {/* Only render date/place if at least one exists */}
      {(date || place) && (
        <p className="font-Roboto text-sm text-gray-600 mt-1">
          {date && <span>{date}</span>}
          {place && <span className={date ? "ml-5" : ""}>{place}</span>}
        </p>
      )}

      <ul className="mt-3 list-disc list-outside description leading-relaxed space-y-1 pl-5 mb-4">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      {/* Buttons */}
      {button && button.length > 0 && (
        <div className="flex gap-3 mt-3 flex-wrap">
          {button.map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-gray-300 description px-4 py-2 rounded-full transition-colors duration-200"
            >
              {btn.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
