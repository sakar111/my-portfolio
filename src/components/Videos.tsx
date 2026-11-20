import React, { useCallback, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import VideoCard from "./VideoCard";
import Section from "./Section";
import { youtubeVideos } from "../assets/copies";

/** "For Fun": the Third World Nerd YouTube channel, as a drag-to-scroll row. */
const Videos: React.FC = () => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);

  const start = useCallback((pageX: number) => {
    if (!rowRef.current) return;
    drag.current = { active: true, startX: pageX, scrollLeft: rowRef.current.scrollLeft };
    setDragging(true);
  }, []);
  const move = useCallback((pageX: number) => {
    if (!drag.current.active || !rowRef.current) return;
    rowRef.current.scrollLeft = drag.current.scrollLeft - (pageX - drag.current.startX) * 1.5;
  }, []);
  const end = useCallback(() => {
    drag.current.active = false;
    setDragging(false);
  }, []);

  return (
    <Section id="videos" title="For Fun" bg="bg-[#f7f7f7]">
      <div>
        <a
          href="https://www.youtube.com/@ThirdWorldNerd"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 w-fit"
        >
          <h3 className="subHeading group-hover:text-[#149ddd] transition-colors">Third World Nerd</h3>
          <FiExternalLink className="text-gray-400 group-hover:text-[#149ddd]" />
        </a>
        <p className="description mt-1">
          My YouTube channel: building ridiculous inventions to teach real engineering.
        </p>

        <div
          ref={rowRef}
          className={`mt-6 w-full overflow-x-auto overflow-y-hidden ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={(e) => start(e.pageX)}
          onMouseMove={(e) => {
            if (drag.current.active) e.preventDefault();
            move(e.pageX);
          }}
          onMouseUp={end}
          onMouseLeave={end}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="flex gap-6 w-max pb-2">
            {youtubeVideos.map((v) => (
              <VideoCard key={v.videoId} videoId={v.videoId} videoTitle={v.videoTitle} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Videos;
