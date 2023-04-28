import Link from "next/link";
import { CalenderIcon, CommentIcon } from "./Icons";
import YouTubePlayer from "../youtube-player";
import Moment from "react-moment";

export default function YouTubLargeCard({ news }) {
  const { title, content, date } = news.node;

  return (
    <Link
      href={"!#"}
      className="rounded border-2 border-gray-200 border-opacity-60 md:col-span-3 md:h-fit"
    >
      <YouTubePlayer {...news.node} />
      <div className="flex flex-col bg-blue-100/80 p-6">
        <div className="flex-1">
          <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-2">
            {title}
          </div>

          <div className="font-noto mt-3 justify-self-stretch font-light text-gray-900 line-clamp-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-gray-400">
          <span>
            <CalenderIcon className="h-4 w-4" />
          </span>
          <Moment format="MMM DD, YYYY">{date}</Moment>
          <div className="ml-auto leading-none">
            <CommentIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
