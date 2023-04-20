<<<<<<< HEAD
import { ArticleCardPortrait } from "./card-portrait";

export default function NewsArticleCard({ posts }) {
  const filteredPosts = posts.filter(
    ({ node }) => node.featuredImage?.node.sourceUrl !== ""
  );

  return <ArticleCardPortrait posts={filteredPosts} />;
=======
import { ArticleCardPortrait } from './card-portrait';

export default function NewsArticleCard({ posts }) {
	const filteredPosts = posts.filter(
		({ node }) => node.featuredImage?.node.sourceUrl !== ''
	);

	return <ArticleCardPortrait posts={filteredPosts} />;
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
