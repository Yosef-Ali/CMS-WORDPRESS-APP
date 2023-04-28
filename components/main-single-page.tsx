import FeaturedImage from "./featured-image";
import YouTubePlayer from "./youtube-player";
import Content from "./content-single-page";

export default function Main(props) {
  const YouTubeUrl = props.videoSource?.acfvideosource;
  return (
    <div>
      {!YouTubeUrl ? (
        <FeaturedImage {...props} />
      ) : (
        <YouTubePlayer {...props} />
      )}
      <Content {...props} />
    </div>
  );
}
