// Import some components and libraries from other files
import Image from "next/image";
import Link from "next/link";
import parse from "react-html-parser";
import { GetYoutubeEmbed } from "./misc/get-youtube-embed";
import { CalenderIcon, CommentIcon } from "./icons";
import Moment from "react-moment";

// Define a function component that takes a post and a path as props
export default function ArticlesCard({ post, path }) {
  // Destructure the post prop to get some fields
  const { title, content, date, featuredImage, databaseId } = post;

  // Get the video source URL from the post
  const VideoUrl = post.videoSource?.acfvideosource;
  // Check if the video source is a YouTube link
  const isVideo = VideoUrl?.slice(0, 17) === "https://youtu.be/";
  // Get the YouTube embed URL if it is a video
  const YouTubeUrl = isVideo && GetYoutubeEmbed(VideoUrl);
  // Get the image source URL from the post
  const ImageUrl = featuredImage?.node.sourceUrl;

  // Define a subcomponent for rendering an image thumbnail
  function ImageThumbnail() {
    return (
      <div className="md:w-2/5 ">
        <Image
          width={2000}
          height={1000}
          alt={title}
          src={ImageUrl || "/rosary.jpg"}
          priority
          className="aspect-video w-full md:col-span-1"
        />
      </div>
    );
  }

  // Define a subcomponent for rendering a video thumbnail
  function VideoThumbnail() {
    return (
      <div className="md:w-2/5 ">
        <figure>
          <iframe
            className="aspect-[16/9] w-full"
            src={YouTubeUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </figure>
      </div>
    );
  }

  // Return the JSX code to render the component
  return (
    // Use a Link component to wrap the card with a link to the post details page
    <Link
      href={`${path}/${databaseId}`}
      className="pointer-events-auto flex  flex-col rounded border-2 border-black/10 hover:shadow-md md:flex-row lg:bg-blue-100/80"
    >
      {/* Render either an image or a video thumbnail depending on the post */}
      {isVideo ? <VideoThumbnail /> : <ImageThumbnail />}

      {/* Render some information about the post such as title, content, and date */}
      <div className=" flex flex-1 flex-col px-6 py-2 md:w-2/5 lg:px-6 lg:py-4">
        <div className="flex-1 md:flex md:flex-col">
          <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-lg">
            {title}
          </h2>
          {/* Parse the HTML content of the post and render it */}
          <div className="font-noto prose mt-3 line-clamp-2 md:mt-2 md:text-sm md:line-clamp-2">
            {parse(content)}
          </div>
        </div>
        {/* Render some icons and the date of the post using Moment library */}
        <div className="mt-4 flex items-center justify-between md:mt-0">
          <div className="flex items-center space-x-2 text-gray-500">
            <CalenderIcon className="h-5 w-5" />
            <Moment format="MMM DD, YYYY">{date}</Moment>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <CommentIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
