import Moment from "react-moment";
import { CalenderIcon, CommentIcon } from "./Icons";
import { useRouter } from "next/router";

export default function YouTubSmall({ news, handleClick, indexof }) {
  const router = useRouter();
  const { title, content, date, videoSource } = news.node;
  const youtubeUrl = videoSource.acfvideosource;
  const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeUrl.slice(
    17
  )}/hqdefault.jpg`;

  return (
    <div
      onClick={() => handleClick(indexof)}
      className="flex cursor-pointer flex-col rounded border-2 border-black/10 hover:shadow-lg md:flex-row lg:bg-blue-100/80"
    >
      <div className="md:w-2/5">
        <img
          className="hidden aspect-video w-full object-cover md:col-span-1 md:flex"
          src={youtubeThumbnail}
          alt=""
        />
      </div>
      <div className="flex flex-col px-6 py-2 md:w-3/5 md:p-2 lg:px-6 lg:py-2">
        <div className="flex-1 md:flex md:flex-col md:justify-between">
          <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-sm">
            {title}
          </h2>
          <div className="font-noto mt-3 font-light text-gray-900 line-clamp-1 md:mt-0 md:text-sm md:line-clamp-1">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <div className="font-noto mt-4 flex items-center justify-between text-xs font-light text-gray-500">
          <span className="flex items-center">
            <CalenderIcon className="mr-1 h-4 w-4" />
            <Moment format="MMM DD, YYYY">{date}</Moment>
          </span>
          <span className="flex items-center">
            <CommentIcon className="mr-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
