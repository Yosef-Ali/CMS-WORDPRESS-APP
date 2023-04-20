import { TVCardPortrait } from "./card-portrait";

export default function TvNewsSingleCard({ video }) {
  const filteredVideo = video.filter(
    ({ node }) =>
      node.videoSource?.acfvideosource?.slice(0, 17) === "https://youtu.be/"
  );
  return <TVCardPortrait video={filteredVideo} />;
}
