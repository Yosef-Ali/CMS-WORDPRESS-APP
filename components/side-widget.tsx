import MoreButton from "./more-button";
import MoreButtonText from "./more-button-text";

function PostsList(post, readMoreLink) {
  const { title, databaseId } = post.node;
  //const ReadMoreLink = `${props.readMoreLink}${props.databaseId}`;
  return (
    <div className="pt-6">
      <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-3">
        <p>{title}</p>
      </div>
      <MoreButtonText
        title="Read More"
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
  //console.log("postsInwidget", posts);
  const filteredPosts = posts.filter(({ node }) => {
    const imageType = node.featuredImage?.node.sourceUrl.slice(-3);
    return imageType === "jpg" || imageType === "png" || imageType === "peg";
  });

  return (
    <div className="mb-8 w-full md:px-2 lg:p-4">
      <div className="h-full border-b-16 border-black/10 bg-blue-100/80 p-8 text-center shadow-sm">
        <div className="p-3">
          <h1 className="title-font text-2xl font-medium text-gray-900">
            {title}
          </h1>
        </div>
        <div className="space-y-6 divide-y divide-black/10">
          {filteredPosts?.slice(0, 3).map((post) => {
            return (
              <PostsList
                {...post}
                {...readMoreLink}
                key={post.node.databaseId}
              />
            );
          })}
          <div className="pt-4">
            <MoreButton title="View More" moreURL={`${moreButtonUrl}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
