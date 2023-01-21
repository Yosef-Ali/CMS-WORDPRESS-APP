import React from "react"
import { getThumbnail } from "./getThumbnail"
import { getYoutubeEmbed } from "./getYoutubeEmbed"
import { CalenderIcon, CommentIcon } from "./Icons"

export default function YouTubSmall({ news, handleClick, indexof }) {
  const youtubeUrl = getYoutubeEmbed(news.ctholictvnews?.youtubLink)

  return (
    <div
      onClick={() => handleClick(indexof)}
      onKeyPress={() => handleClick(indexof)}
      role="button"
      tabIndex={0}
      rel="preload"
      as="script"
      className="flex flex-col border-2 rounded cursor-pointer md:flex-row border-black/10 hover:shadow-lg lg:bg-blue-100/80"
    >
      <div className="md:w-2/5 ">
        <iframe
          className="w-full aspect-video md:col-span-1 md:hidden"
          src={youtubeUrl}
          title="YouTube video player"
          loading="lazy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <img
          className="hidden object-cover w-full aspect-video md:col-span-1 md:flex"
          src={getThumbnail(news.ctholictvnews?.youtubLink)}
          alt=""
        />
      </div>
      <div className="flex flex-col px-6 py-2 md:w-3/5 lg:px-6 lg:py-2 md:p-2">
        <div className="flex-1 md:flex md:flex-col md:justify-between">
          <h2 className="font-medium text-gray-900 md:text-sm title-font font-noto line-clamp-1">
            {news.title}
          </h2>
          <div className="mt-3 font-light text-gray-900 md:mt-0 md:text-sm font-noto md:line-clamp-1 line-clamp-1">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
          <div className="flex items-end flex-none gap-2 mt-3 leading-none text-gray-400 md:hidden xl:flex">
            <span>
              <CalenderIcon className="w-4 h-4" />
            </span>
            {news.date}
            <div className="ml-auto">
              <CommentIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
