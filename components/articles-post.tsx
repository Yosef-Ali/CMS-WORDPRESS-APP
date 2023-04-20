import parse from "html-react-parser";

import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";

import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import { CalenderIcon, CommentIcon } from "./icons";

import LoadMore from "./load-more";
import AudioCard from "./audio-payer";

import { GetYoutubeEmbed } from "./misc/get-youtube-embed";

import styles from "./articles-post.module.css";

import defaultImage from "/rosary.jpg";

function Card({ post, path, postType }) {
  const { date, title, content, databaseId } = post;
  const ImageUrl = post.featuredImage?.node.sourceUrl;
  const VideoUrl = post.videoSource?.acfvideosource;
  //console.log("VideoUrl", VideoUrl, databaseId);

  function PodcastCard() {
    const AudioSRC = post.audioUrl.audiourl?.mediaItemUrl;
    function PodcastPlayer() {
      return (
        <audio controls style={{ width: "100%" }} className={styles.audio}>
          <source src={AudioSRC} />
        </audio>
      );
    }
    return (
      <div className="pointer-events-auto flex  flex-col rounded border-2 border-black/10 hover:shadow-md md:flex-row lg:bg-blue-100/80">
        <div className="md:w-2/5 ">
          <Image
            width={2000}
            height={1000}
            alt={title}
            src={ImageUrl || "/default.png"}
            className="aspect-video w-full md:col-span-1"
          />
        </div>
        <div className=" flex flex-1 flex-col px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
          <div className="flex-1 md:flex md:flex-col">
            <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-lg">
              {title}
            </h2>
            <div className="font-noto prose mt-3 line-clamp-2 md:mt-2 md:text-sm md:leading-3 md:line-clamp-2">
              {content && parse(content)}
            </div>
            {AudioSRC && <PodcastPlayer />}
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
      </div>
    );
  }

  function ArticlesCard() {
    const VideoUrl = post.videoSource?.acfvideosource;
    const isVideo = VideoUrl?.slice(0, 17) === "https://youtu.be/";
    const YouTubeUrl = isVideo && GetYoutubeEmbed(VideoUrl);
    console.log("VideoUrl::", VideoUrl, isVideo);

    function ImageThumbnail() {
      return (
        <div className="md:w-2/5 ">
          <Image
            width={2000}
            height={1000}
            alt={title}
            src={ImageUrl || "/rosary.jpg"}
            className="aspect-video w-full md:col-span-1"
          />
        </div>
      );
    }
    function VideoThumbnail() {
      return (
        <div className="md:w-2/5 ">
          <figure>
            <iframe
              className="aspect-[16/9] w-full"
              src={YouTubeUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </figure>
        </div>
      );
    }
    return (
      <Link
        href={`${path}/${databaseId}`}
        className="pointer-events-auto flex  flex-col rounded border-2 border-black/10 hover:shadow-md md:flex-row lg:bg-blue-100/80"
      >
        {isVideo ? <VideoThumbnail /> : <ImageThumbnail />}

        <div className=" flex flex-1 flex-col px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
          <div className="flex-1 md:flex md:flex-col">
            <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-lg">
              {title}
            </h2>
            <div className="font-noto prose mt-3 line-clamp-2 md:mt-2 md:text-sm md:line-clamp-2">
              {content && parse(content)}
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

  return postType === "podcasts" ? <PodcastCard /> : <ArticlesCard />;
}

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
  const Posts = posts?.edges;
  // Use a state variable to track the loading status
  console.log("posts:", posts);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-16">
      <div className="xl-Space-x-4 flex flex-col gap-4 md:gap-0 lg:flex-row  ">
        <div className="relative space-y-4  lg:w-2/3">
          <h2 className="text-md title-font -mb-3  uppercase tracking-widest text-gray-700">
            {header}
          </h2>
          {Posts?.map(({ node }) => (
            <Card
              post={node}
              path={path}
              key={node.databaseId}
              postType={postType}
            />
          ))}

          <LoadMore
            posts={posts}
            setPosts={setPosts}
            postType={postType}
            buttonLabel="Load more"
          />
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          <SideWidget
            posts={widgetPost}
            title={widgetTitle}
            readMoreLink={readMoreLink}
            moreButtonUrl={readMoreLink}
          />
          {audioTracks && <AudioCard tracks={audioTracks} />}

          <SocialMediaLinks color="secondary" />
        </div>
      </div>
    </div>
  );
}
