import Script from "next/script";
import { useState, useMemo, useCallback } from "react";
import { GetYoutubeEmbed } from "../components/misc/get-youtube-embed";

export default function YouTubePlayer(props) {
  const VideoUrl = props.videoSource.acfvideosource;
  const isVideo = useMemo(
    () => VideoUrl?.slice(0, 17) === "https://youtu.be/",
    [VideoUrl]
  );
  const YouTubeUrl = useMemo(
    () => isVideo && GetYoutubeEmbed(VideoUrl),
    [isVideo, VideoUrl]
  );
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad = useCallback(() => {
    setIsLoading(false);
    console.log("handleOnLoad:", "...loaded");
  }, []);
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" />
      <>
        {isLoading && (
          <div className="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
        )}
        <iframe
          className="aspect-[16/9] w-full"
          src={YouTubeUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
          allowFullScreen
          onLoad={handleOnLoad}
          style={{ display: isLoading ? "none" : "block" }}
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </>
    </>
  );
}
