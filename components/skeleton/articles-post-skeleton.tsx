import Skeleton from "react-loading-skeleton";
import SideWidgetSkeleton from "./side-widget-skeleton";

// Define a new component that represents a single article card
function ArticleCard() {
  // Define a new component that represents the image thumbnail of the card
  function ImageThumbnail() {
    return (
      <div className="md:w-2/5 ">
        <Skeleton width={356} height={200} />
      </div>
    );
  }

  return (
    <div className="pointer-events-auto flex flex-col    md:flex-row ">
      <ImageThumbnail />

      <div className="flex flex-1 flex-col px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
        <div className="ml-6 flex-1 md:flex md:flex-col">
          <h2 className=" font-noto font-medium text-gray-900 line-clamp-1 md:text-lg">
            <Skeleton />
          </h2>
          <div className=" mt-3 line-clamp-2 md:mt-2 md:text-sm md:line-clamp-2">
            <Skeleton count={3} />
          </div>
        </div>
        <div className="ml-6 flex flex-none items-end gap-2 leading-none text-gray-500 md:hidden xl:flex">
          <span>
            <Skeleton width={100} />
          </span>

          <Skeleton width={100} />

          <div className="ml-auto">
            <Skeleton width={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Define a new component that represents the list of article cards
function ArticleListSkeleton() {
  // Create an array of 3 article cards
  const articles = Array.from({ length: 3 }).map((_, i) => (
    <ArticleCard key={i} />
  ));

  return articles;
}

export default function ArticlesPostListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-16">
      <div className="xl-Space-x-4 flex flex-col gap-4 md:gap-0 lg:flex-row  ">
        <div className="relative space-y-4  lg:w-2/3">
          <h2 className="text-md title-font -mb-3  uppercase tracking-widest text-gray-700">
            <Skeleton width={130} />
          </h2>
          <div className="space-y-3">{ArticleListSkeleton()}</div>
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          <SideWidgetSkeleton />

          {/* <AudioCardSkeleton  />

          <SocialMediaLinks  /> */}
        </div>
      </div>
    </div>
  );
}
