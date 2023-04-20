<<<<<<< HEAD
import { TVCardPortrait } from "./card-portrait";

export default function TvNewsSingleCard({ video }) {
  const filteredVideo = video.filter(
    ({ node }) =>
      node.videoSource?.acfvideosource?.slice(0, 17) === "https://youtu.be/"
  );
  return <TVCardPortrait video={filteredVideo} />;
=======
import { TVCardPortrait } from './card-portrait';

export default function TvNewsSingleCard({ video }) {
	const filteredVideo = video.filter(
		({ node }) =>
			node.catholictvnews?.youtubLink?.slice(0, 17) === 'https://youtu.be/'
	);
	return <TVCardPortrait video={filteredVideo} />;
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
