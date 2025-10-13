import React, { useRef, useState, useCallback } from "react";
import TestimonialCard from "./TestimonialCard";
import VideoCard from "./VideoCard"; // Make sure this exists

export const Startup = () => {
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Generic handlers for mouse
  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!ref.current) return;
      setIsDragging(true);
      setStartX(e.pageX - (ref.current.offsetLeft || 0));
      setScrollLeft(ref.current.scrollLeft);
    },
    []
  );

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!isDragging || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - (ref.current.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      ref.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Generic handlers for touch
  const handleTouchStart = useCallback(
    (
      e: React.TouchEvent<HTMLDivElement>,
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!ref.current || e.touches.length === 0) return;
      setIsDragging(true);
      setStartX(e.touches[0].pageX - (ref.current.offsetLeft || 0));
      setScrollLeft(ref.current.scrollLeft);
    },
    []
  );

  const handleTouchMove = useCallback(
    (
      e: React.TouchEvent<HTMLDivElement>,
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!isDragging || !ref.current || e.touches.length === 0) return;
      const x = e.touches[0].pageX - (ref.current.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      ref.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Example YouTube video IDs
  const youtubeVideos = [
    "0DCpCSC6Efc",
    "jsEMLAb3UFE",
    "VIDEO_ID_3",
    "VIDEO_ID_4",
    "VIDEO_ID_1",
    "VIDEO_ID_2",
    "VIDEO_ID_3",
    "VIDEO_ID_4",
    "VIDEO_ID_1",
    "VIDEO_ID_2",
    "VIDEO_ID_3",
    "VIDEO_ID_4",
  ];

  return (
    <section className="px-[5%] md:px-30 py-16 bg-[#f7f7f7]">
      <div className="flex flex-col items-start mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 relative pb-2 inline-block mb-10">
          My Works
          <span
            className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd] rounded-full"
            style={{ width: "50px" }}
          ></span>
        </h2>
        <h3 className="text-2xl font-semibold mb-4 mt-1">Makit Labs</h3>
        <p className="text-gray-600 mb-4">
          Robotics Lab to ease a student’s entry to robotics.
        </p>
      </div>

      {/* Scrollable Testimonial Cards */}
      <div
        ref={testimonialRef}
        className={`mt-[10px] w-full overflow-x-auto overflow-y-hidden cursor-grab transition-scroll duration-300 ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        onMouseDown={(e) => handleMouseDown(e, testimonialRef)}
        onMouseMove={(e) => handleMouseMove(e, testimonialRef)}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={(e) => handleTouchStart(e, testimonialRef)}
        onTouchMove={(e) => handleTouchMove(e, testimonialRef)}
        onTouchEnd={handleTouchEnd}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="flex gap-[40px] w-max px-2">
          <TestimonialCard image="" quote="Makit Robotics Kit 1" />
          <TestimonialCard image="" quote="Makit Robotics Kit 2" />
          <TestimonialCard image="" quote="Makit Robotics Kit 3" />
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mt-20">
        <h3 className="text-2xl font-semibold mb-4">Third World Nerd</h3>
        <p className="text-gray-600 mb-4">
          Youtube Channel that provides robotics education packaged as
          entertainment using culturally familiar examples.
        </p>

        {/* Scrollable YouTube Videos */}
        <div
          ref={videoRef}
          className={`mt-6 w-full overflow-x-auto overflow-y-hidden cursor-grab transition-scroll duration-300 ${
            isDragging ? "cursor-grabbing" : ""
          }`}
          onMouseDown={(e) => handleMouseDown(e, videoRef)}
          onMouseMove={(e) => handleMouseMove(e, videoRef)}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={(e) => handleTouchStart(e, videoRef)}
          onTouchMove={(e) => handleTouchMove(e, videoRef)}
          onTouchEnd={handleTouchEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="flex gap-6 w-max px-2">
            {youtubeVideos.map((id) => (
              <VideoCard key={id} videoId={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Startup;
