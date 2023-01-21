import React from "react"
import { getYoutubeEmbed } from "./getYoutubeEmbed"

import { CalenderIcon, CommentIcon } from "./Icons"

export default function YouTubLarge(props) {
  const youtubeUrl = getYoutubeEmbed(props.ctholictvnews?.youtubLink)

  return (
    <article
      href="!#"
      className="border-2 border-gray-200 rounded md:col-span-3 border-opacity-60 md:h-fit"
    >
      <iframe
        className="w-full aspect-video bg-slate-200"
        src={youtubeUrl}
        title="YouTube video player"
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="flex flex-col p-6 bg-blue-100/80">
        <div className="flex-1">
          <div className="font-medium text-gray-900 text-md title-font font-noto line-clamp-2">
            {props.title}
          </div>

          <div className="mt-3 font-light text-gray-900 justify-self-stretch font-noto line-clamp-3">
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-400">
          <span>
            <CalenderIcon className="w-4 h-4" />
          </span>
          {props.date}
          <div className="ml-auto leading-none">
            <CommentIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  )
}
