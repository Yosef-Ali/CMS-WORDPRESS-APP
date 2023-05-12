// Importing components and libraries
import Image from "next/image";
import styles from "./articles-post.module.css";
import parse from "html-react-parser";
import { CalenderIcon, CommentIcon } from "./icons";
import Moment from "react-moment";

// PodcastCard component
export default function PodcastCard({ post }) {
  // Destructuring post object
  const { title, content, date, featuredImage } = post;
  const AudioSRC = post.audioUrl.audiourl?.mediaItemUrl;
  const ImageUrl = featuredImage?.node?.sourceUrl;

  // Function to render audio player
  function PodcastPlayer() {
    return (
      <audio controls style={{ width: "100%" }} className={styles.audio}>
        <source src={AudioSRC} />
      </audio>
    );
  }

  // Rendering the component
  return (
    <div className="pointer-events-auto flex  flex-col rounded border-2 border-black/10 hover:shadow-md md:flex-row lg:bg-blue-100/80">
      <div className="md:w-2/5 ">
        <Image
          width={2000}
          height={1000}
          alt={post.title}
          src={ImageUrl || "/default.png"}
          priority
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
