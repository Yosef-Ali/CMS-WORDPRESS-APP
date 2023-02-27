import React, { useState } from "react";
import Link from "next/link";
import { SearchBox } from "react-instantsearch-dom";

import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import { CalenderIcon, CommentIcon } from "./icons";

import AlgoliaSearchWrapper from "./Search/algoliaSearchWrapper";


import Content from "./Search/content";

//import AudioPlayerWidget from "./misc/audioWidget";


function Card(props) {
  const { date, title, content, databaseId, path } = props;
  const Image = props.featuredImage?.node.localFile;

  return (
    <Link
      href={`${path}${databaseId}`}
      className="flex flex-col border-2 rounded cursor-pointer md:flex-row border-black/10 lg:bg-blue-100/80 hover:shadow-md"
    >
      <div className="md:w-2/5 ">
        <Image
          width={20000}
          hight={10000}
          src={""}
          alt="News"
          className="w-full aspect-video md:col-span-1"
        />
      </div>
      <div className="flex flex-col flex-1 px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
        <div className="flex-1 md:flex md:flex-col">
          <h2 className="font-medium text-gray-900 md:text-lg title-font font-noto line-clamp-1">
            {title}
          </h2>
          <div className="mt-3 prose md:mt-2 md:text-sm font-noto md:line-clamp-2 line-clamp-2">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <div className="flex items-end flex-none gap-2 leading-none text-gray-500 md:hidden xl:flex">
          <span>
            <CalenderIcon className="w-5 h-5" />
          </span>
          {date}
          <div className="ml-auto">
            <CommentIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesPostList({
  data,
  header,
  path,
  widgetPost,
  widgetTitle,
  readMoreLink,
  moreUrl,
  tracks,
  pageContext,
  instant_search,
}) {
  const [searchBoxValue, setSearchBoxValue] = useState("");

  return (
    <AlgoliaSearchWrapper instant_search="wp_posts_post">
      <div className="container px-4 py-8 mx-auto md:px-6 lg:py-16">
        <h2 className="mb-1 tracking-widest text-gray-700 uppercase text-md title-font">
          {header}
        </h2>
        <div className="flex flex-col gap-4 md:gap-0 lg:flex-row xl:gap-6 xl-Space-x-4 ">
          <div className="lg:w-2/3">
            <SearchBox
              onChange={(e) => setSearchBoxValue(e.target.value)}
              className="flex my-4 lg:hidden"
            />
            <div className="mb-6 space-y-6">
              {searchBoxValue ? (
                <Content />
              ) : (
                data.map(({ node }) => (
                  <Card {...node} path={path} key={node.databaseId} />
                ))
              )}
            </div>
            {!searchBoxValue && (
              <div className="my-16 lg:mb-0">
                <Pager {...pageContext} />
              </div>
            )}
          </div>

          {/* Latest News Section */}
          <div className="flex flex-col items-center lg:w-1/3">
            <SearchBox
              onChange={(e) => setSearchBoxValue(e.target.value)}
              className="hidden lg:flex"
            />
            {/* <SideWidget
              posts={widgetPost}
              title={widgetTitle}
              readMoreLink="/news/newsArticle/"
              moreButtonUrl="/news/articlesNews/"
            />
            {/* <AudioPlayerWidget tracks={tracks} /> */}
            <SocialMediaLinks /> */}
          </div>
        </div>
      </div>
    </AlgoliaSearchWrapper>
  );
}
