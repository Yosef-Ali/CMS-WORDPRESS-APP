import FeaturedImage from "./featured-image";
import YouTubePlayer from "./youtube-player";
import Content from "./content-single-page";

interface MainProps {
  videoSource?: {
    acfvideosource: string;
  };
  featuredImageSrc?: string;
  content: string;
}

export default function Main(props: MainProps) {
  const YouTubeUrl = props.videoSource?.acfvideosource;
  return (
    <div>
      {!YouTubeUrl ? (
        <FeaturedImage {...props} />
      ) : (
        <YouTubePlayer videoSrc={props.videoSource?.acfvideosource} />
      )}
      <Content {...props} />
    </div>
  );
}
