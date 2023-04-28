import PodcastCard from "./article-podcast-card";
import ArticlesCard from "./article-card";

export default function ArticlesPostCard({ post, path, postType }) {
  return postType === "podcasts" ? (
    <PodcastCard post={post} />
  ) : (
    <ArticlesCard post={post} path={path} />
  );
}
