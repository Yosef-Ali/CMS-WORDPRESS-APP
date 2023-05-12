// Import some components from other files
import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import LoadMore from "./load-more";
import AudioCard from "./audio-payer";
import ArticlesPostCard from "./articles-post-card";

// Define a function component that takes some props
export default function ArticlesPostList({
  posts,
  setPosts,
  postType,
  header,
  path,
  widgetPost,
  widgetTitle,
  readMoreLink,
  moreUrl,
  audioTracks,
}) {
  // Destructure the posts prop to get an array of posts
  const Posts = posts?.edges;

  // console.log("postType:", postType);
  // console.log("posts:", posts);
  // Return the JSX code to render the component
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-16">
      <div className="xl-Space-x-4 flex flex-col gap-4 md:gap-0 lg:flex-row  ">
        <div className="relative space-y-4  lg:w-2/3">
          <h2 className="text-md title-font -mb-3  uppercase tracking-widest text-gray-700">
            {header}
          </h2>
          {/* Map over the array of posts and render a card for each one */}
          {Posts?.map(({ node }) => (
            <ArticlesPostCard
              post={node}
              path={path}
              key={node.databaseId}
              postType={postType}
            />
          ))}

          {/* Render a load more button that updates the posts state */}
          <LoadMore
            posts={posts}
            setPosts={setPosts}
            postType={postType}
            buttonLabel="Load more"
          />
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          {/* Render a side widget component that shows some other posts */}
          <SideWidget
            posts={widgetPost}
            title={widgetTitle}
            readMoreLink={readMoreLink}
            moreButtonUrl={readMoreLink}
          />
          {/* Render an audio player component if there are any audio tracks */}
          {audioTracks && <AudioCard tracks={audioTracks} />}

          {/* Render some social media links */}
          <SocialMediaLinks color="secondary" />
        </div>
      </div>
    </div>
  );
}
