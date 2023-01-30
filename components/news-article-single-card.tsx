import { ArticleCardPortrait } from './card-portrait';

export default function NewsArticleCard({ posts }) {
	const filteredPosts = posts.filter(
		({ node }) => node.featuredImage?.node.sourceUrl !== ''
	);

	return <ArticleCardPortrait posts={filteredPosts} />;
}
