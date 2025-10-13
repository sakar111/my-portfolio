interface VideoCardProps {
  videoId: string;
}

const VideoCard = ({ videoId }: VideoCardProps) => {
  return (
    <div className="w-[300px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="w-full h-[200px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoCard;
