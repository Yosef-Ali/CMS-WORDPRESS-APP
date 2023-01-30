import MoreButton from './more-button';
import MoreButtonText from './more-button-text';

function PostsList(post, readMoreLink) {
	const { title, databaseId } = post.node;
	//const ReadMoreLink = `${props.readMoreLink}${props.databaseId}`;
	return (
		<div className='pt-6'>
			<div className='font-medium text-gray-900 text-md title-font font-noto line-clamp-3'>
				<p>{title}</p>
			</div>
			<MoreButtonText
				title='Read More'
				moreURL={`./${readMoreLink}/${databaseId}`}
			/>
		</div>
	);
}

export default function SideWidget({
	posts,
	title,
	readMoreLink,
	moreButtonUrl,
}) {
	const filteredPosts = posts.filter(({ node }) => {
		const imageType = node.featuredImage?.node.sourceUrl.slice(-3);
		return imageType === 'jpg' || imageType === 'png' || imageType === 'peg';
	});

	return (
		<div className='w-full mb-8 lg:p-4 md:px-2'>
			<div className='h-full p-8 text-center shadow-sm border-b-16 border-black/10 bg-blue-100/80'>
				<div className='p-3'>
					<h1 className='text-2xl font-medium text-gray-900 title-font'>{title}</h1>
				</div>
				<div className='space-y-6 divide-y divide-black/10'>
					{filteredPosts?.slice(0, 3).map((post) => {
						return (
							<PostsList {...post} {...readMoreLink} key={post.node.databaseId} />
						);
					})}
					<div className='pt-4'>
						<MoreButton title='View More' moreURL={`${moreButtonUrl}`} />
					</div>
				</div>
			</div>
		</div>
	);
}
