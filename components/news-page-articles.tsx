// Importing components
import SideWidget from "./side-widget";
import SocialMediaLinks from "./misc/SocialMediaLinks";
import { CardLarge, CardSmall } from "./news-page-articles-cards";

// NewsArticles component
export default function NewsArticles({
  data,
  header,
  path,
  widgetPost,
  title,
  readMoreLink,
  moreUrl,
}) {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <h2 className="text-md title-font mb-1 uppercase tracking-widest text-gray-700">
        {header}
      </h2>
      <div className="flex flex-col gap-4 md:gap-0 lg:flex-row xl:gap-2">
        <div className="lg:w-2/3 ">
          {/* Mapping through the first news article */}
          {data
            .slice(0, 1)
            .map(
              (news) =>
                news && (
                  <CardLarge news={news} path={path} key={news.databaseId} />
                )
            )}
          {/* Mapping through the remaining news articles */}
          <div className="max-w-screen-[800px] mx-auto my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {data
              .slice(1, 4)
              .map(
                (news) =>
                  news && (
                    <CardSmall news={news} path={path} key={news.databaseId} />
                  )
              )}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="-mt-4 flex flex-col items-center lg:w-1/3">
          {/* SideWidget component */}
          <SideWidget
            posts={widgetPost}
            title={title}
            readMoreLink={readMoreLink}
            moreButtonUrl={moreUrl}
          />
          {/* SocialMediaLinks component */}
          <SocialMediaLinks />
        </div>
      </div>
    </div>
  );
}
