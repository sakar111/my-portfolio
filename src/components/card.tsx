import React from "react";
import { MediaGallery } from "./Research";
import type { Media } from "../assets/research";
import YouTubeClip, { type Clip } from "./YouTubeClip";

export interface CardProps {
  clip?: Clip; // YouTube section that autoplays muted, like a GIF
  media?: Media[]; // photos/clips shown under the bullets (missing files auto-hide on the live site)
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
  media,
  clip,
}) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 w-full ${
        clip ? "md:grid md:grid-cols-5 md:gap-8 md:items-center" : ""
      } border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
    >
      {clip && (
        <div className="mb-4 md:mb-0 md:order-2 md:col-span-2">
          <YouTubeClip clip={clip} />
        </div>
      )}
      <div className="md:order-1 md:col-span-3">
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

      {media && media.length > 0 && (
        <div className="mb-4">
          <MediaGallery items={media} />
        </div>
      )}

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
    </div>
  );
};

export default Card;
