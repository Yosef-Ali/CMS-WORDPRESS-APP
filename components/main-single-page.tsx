import FeaturedImage from "./featured-image";
import YouTubePlayer from "./youtube-player";
import Content from "./content-single-page";

interface MainProps {
  content: string;
  featuredImageSrc: string;
  videoSource?: {
    acfvideosource: string;
  };
}

export default function Main(props: MainProps) {
  // Destructure the props object to get the individual properties
  const { content, featuredImageSrc, videoSource } = props;

  // Destructure the videoSource object to get the acfvideosource property
  const { acfvideosource: YouTubeUrl } = videoSource || {};

  return (
    <div>
      {!YouTubeUrl ? (
        // Use the destructured properties directly instead of props
        <FeaturedImage featuredImageSrc={featuredImageSrc} />
      ) : (
        <YouTubePlayer videoSrc={YouTubeUrl} />
      )}
      <Content content={content} />
    </div>
  );
}
