import { useState } from "react";

interface VideoCardProps {
  videoId: string;
  videoTitle: string;
}

// Small sleek play icon (SVG)
const PlayIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="presentation"
    className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110"
    viewBox="0 0 20 20"
  >
    <path fill="currentColor" d="M7.5 5.5v9l7-4.5-7-4.5z" />
  </svg>
);

const VideoCard = ({ videoId, videoTitle }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1&controls=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="w-[300px] flex-shrink-0 rounded-2xl mb-2 overflow-hidden shadow-lg bg-[#f7f7f7] hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-[200px] bg-gray-900">
        {/* Video Player */}
        {isPlaying ? (
          <>
            <iframe
              className="w-full h-full absolute inset-0 rounded-2xl"
              src={embedUrl}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold transition hover:cursor-pointer"
              aria-label="Close video"
            >
              ×
            </button>
          </>
        ) : (
          /* Thumbnail + Small Play Button */
          <button
            type="button"
            className="group w-full h-full relative flex items-center justify-center cursor-pointer focus:outline-none"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${videoTitle}`}
          >
            <img
              className="w-full h-full object-cover transition-opacity duration-500"
              src={thumbnailUrl}
              alt={`Thumbnail for ${videoTitle}`}
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex justify-start items-end p-4 bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
              <div className="rounded-full bg-gray-600 shadow-2xl transition-all duration-300 group-hover:scale-110">
                <PlayIcon />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Video title */}
      <div className="p-3">
        <h3 className="description leading-tight line-clamp-4">{videoTitle}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
