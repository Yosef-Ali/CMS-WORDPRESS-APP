import React from "react";
import { getThumbnail } from "./getThumbnail";
import { getYoutubeEmbed } from "./getYoutubeEmbed";
import { CalenderIcon, CommentIcon } from "./Icons";

export default function YouTubSmall({ news, handleClick, indexof }) {
  const youtubeUrl = getYoutubeEmbed(news.ctholictvnews?.youtubLink);

  return (
    <div
      onClick={() => handleClick(indexof)}
      onKeyPress={() => handleClick(indexof)}
      role="button"
      tabIndex={0}
      rel="preload"
      as="script"
      className="flex cursor-pointer flex-col rounded border-2 border-black/10 hover:shadow-lg md:flex-row lg:bg-blue-100/80"
    >
      <div className="md:w-2/5 ">
        <iframe
          className="aspect-video w-full md:col-span-1 md:hidden"
          src={youtubeUrl}
          title="YouTube video player"
          loading="lazy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <img
          className="hidden aspect-video w-full object-cover md:col-span-1 md:flex"
          src={getThumbnail(news.ctholictvnews?.youtubLink)}
          alt=""
        />
      </div>
      <div className="flex flex-col px-6 py-2 md:w-3/5 md:p-2 lg:px-6 lg:py-2">
        <div className="flex-1 md:flex md:flex-col md:justify-between">
          <h2 className="title-font font-noto font-medium text-gray-900 line-clamp-1 md:text-sm">
            {news.title}
          </h2>
          <div className="font-noto mt-3 font-light text-gray-900 line-clamp-1 md:mt-0 md:text-sm md:line-clamp-1">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
          <div className="mt-3 flex flex-none items-end gap-2 leading-none text-gray-400 md:hidden xl:flex">
            <span>
              <CalenderIcon className="h-4 w-4" />
            </span>
            {news.date}
            <div className="ml-auto">
              <CommentIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
