import React from "react";
import { getYoutubeEmbed } from "./getYoutubeEmbed";

import { CalenderIcon, CommentIcon } from "./Icons";

export default function YouTubLarge(props) {
  const youtubeUrl = getYoutubeEmbed(props.ctholictvnews?.youtubLink);

  return (
    <article
      href="!#"
      className="rounded border-2 border-gray-200 border-opacity-60 md:col-span-3 md:h-fit"
    >
      <iframe
        className="aspect-video w-full bg-slate-200"
        src={youtubeUrl}
        title="YouTube video player"
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="flex flex-col bg-blue-100/80 p-6">
        <div className="flex-1">
          <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-2">
            {props.title}
          </div>

          <div className="font-noto mt-3 justify-self-stretch font-light text-gray-900 line-clamp-3">
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-400">
          <span>
            <CalenderIcon className="h-4 w-4" />
          </span>
          {props.date}
          <div className="ml-auto leading-none">
            <CommentIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
}
