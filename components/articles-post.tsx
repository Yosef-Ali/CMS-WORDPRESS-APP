import parse from "html-react-parser";

import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";

import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import { CalenderIcon, ChevronRight, CommentIcon } from "./icons";

import LoadMore from "./load-more";
import AudioCard from "./audio-payer";

function Card({ post, path }) {
  const { date, title, content, databaseId } = post;
  const ImageUrl = post.featuredImage?.node.sourceUrl;

  return (
    <Link
      href={`${path}/${databaseId}`}
      className="flex cursor-pointer flex-col rounded border-2 border-black/10 hover:shadow-md md:flex-row lg:bg-blue-100/80"
    >
      <div className="md:w-2/5 ">
        <Image
          width={2000}
          height={1000}
          alt={title}
          src={ImageUrl}
          className="aspect-video w-full md:col-span-1"
        />
      </div>
      <div className=" flex flex-1 flex-col px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
        <div className="flex-1 md:flex md:flex-col">
          <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-lg">
            {title}
          </h2>
          <div className="font-noto prose mt-3 line-clamp-2 md:mt-2 md:text-sm md:line-clamp-2">
            {parse(content)}
          </div>
        </div>
        <div className="flex flex-none items-end gap-2 leading-none text-gray-500 md:hidden xl:flex">
          <span>
            <CalenderIcon className="h-5 w-5" />
          </span>

          <Moment date={date} format="DD MMM YYYY" />
          <div className="ml-auto">
            <CommentIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesPostList({
  posts,
  setPosts,
  header,
  path,
  widgetPost,
  widgetTitle,
  readMoreLink,
  moreUrl,
  audioTracks,
}) {
  const Posts = posts?.edges;
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-16">
      <div className="xl-Space-x-4 flex flex-col gap-4 md:gap-0 lg:flex-row  ">
        <div className="relative space-y-4  lg:w-2/3">
          <h2 className="text-md title-font -mb-3  uppercase tracking-widest text-gray-700">
            {header}
          </h2>
          {Posts.map(({ node }) => (
            <Card post={node} path={path} key={node.databaseId} />
          ))}

          <LoadMore
            posts={posts}
            setPosts={setPosts}
            buttonLabel="Load more"
            postType="eventCalendars"
          />
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          <SideWidget
            posts={widgetPost}
            title={widgetTitle}
            readMoreLink="/news/newsArticle/"
            moreButtonUrl="/news/articlesNews/"
          />
          <AudioCard tracks={audioTracks} />

          <SocialMediaLinks color="secondary" />
        </div>
      </div>
    </div>
  );
}
