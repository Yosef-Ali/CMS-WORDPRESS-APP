<<<<<<< HEAD
// Import components
import MoreButton from "./more-button";
import MoreButtonText from "./more-button-text";

// Define a function to render a single post
function Post({ title, databaseId, readMoreLink }) {
  return (
    <div className="pt-6">
      <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-3">
        <p>{title}</p>
      </div>
      <MoreButtonText
        title="Read More"
        moreURL={`${readMoreLink}/${databaseId}`}
      />
    </div>
  );
}

// Define a function to render a list of posts
function PostsList({ posts, readMoreLink }) {
  return (
    <div className="space-y-6 divide-y divide-black/10">
      {posts.map((post) => (
        <Post
          {...post.node}
          readMoreLink={readMoreLink}
          key={post.node.databaseId}
        />
      ))}
    </div>
  );
}

// Define the main component
export default function SideWidget({
  posts,
  title,
  readMoreLink,
  moreButtonUrl,
}) {
  // Render the component
  return (
    <div className="mb-8 w-full md:px-2 lg:p-4">
      <div className="h-full border-b-16 border-black/10 bg-blue-100/80 p-8 text-center shadow-sm">
        <div className="p-3">
          <h1 className="title-font text-2xl font-medium text-gray-900">
            {title}
          </h1>
        </div>
        {/* Render the list of posts with the first three filtered posts */}
        <PostsList posts={posts.slice(0, 3)} readMoreLink={readMoreLink} />
        <div className="pt-4">
          <MoreButton title="View More" moreURL={`${moreButtonUrl}`} />
        </div>
      </div>
    </div>
  );
=======
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
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
