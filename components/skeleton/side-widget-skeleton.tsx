// Import components
import Skeleton from "react-loading-skeleton";

// Define a function to render a single post
function Post() {
  return (
    <div className="pt-6">
      <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-3">
        <p>
          <Skeleton />
        </p>
      </div>
      <button>
        <Skeleton />
      </button>
    </div>
  );
}

// Define a function to render a list of posts
function PostsList() {
  return (
    <div className="space-y-6 divide-y divide-black/10">
      <Post />
    </div>
  );
}

// Define a new component that represents the list of posts list card
function PostsListCard() {
  // Create an array of 3 article cards
  const cards = Array.from({ length: 3 }).map((_, i) => <PostsList key={i} />);

  return cards;
}

// Define the main component
export default function SideWidget() {
  return (
    <div className="mb-8 w-full md:px-2 lg:p-4">
      <div className="h-full border border-b-16 border-black/10  p-8 text-center">
        <div className="p-3">
          <h1 className="title-font  text-2xl font-medium text-gray-900">
            <Skeleton />
          </h1>
        </div>
        <div className="space-y-3">{PostsListCard()}</div>
        <div className="pt-4">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
