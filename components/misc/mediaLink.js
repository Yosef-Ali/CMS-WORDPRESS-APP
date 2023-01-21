import React, { useState } from "react"
import { Link } from "gatsby"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import "../../styles/audio.css"
import { ChevronRight, ListeningIcon, ReadingIcon } from "./Icons"

export default function MediaLink(props) {
  const [currentTrack, setTrackIndex] = useState(0)
  //props has two data audio and readings
  // if props is audio
  const playlist = props.audio

  const handleClickNext = () => {
    setTrackIndex(currentTrack =>
      currentTrack < playlist?.length - 1 ? currentTrack + 1 : 0
    )
  }

  const handleClickPrevious = () => {
    setTrackIndex(currentTrack =>
      currentTrack < 1 ? playlist?.length - 1 : currentTrack - 1
    )
  }

  const handleEnd = () => {
    console.log("end")
    setTrackIndex(currentTrack =>
      currentTrack < playlist?.length - 1 ? currentTrack + 1 : 0
    )
  }
  return (
    <div className="flex flex-col min-h-[85px] w-full p-3 transition delay-300 border shadow-sm md:flex-row md:items-center hover:shadow-lg ">
      <div className="items-center justify-center hidden w-2/12 border-r-2 md:flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-indigo-500 bg-indigo-100 rounded-full ">
          {playlist?.length > 0 ? (
            <ListeningIcon className="w-8 h-8" aria-hidden="true" />
          ) : (
            <ReadingIcon className="w-8 h-8" aria-hidden="true" />
          )}
        </div>
      </div>
      {playlist?.length > 0 ? (
        <div className="flex-1 px-4 ">
          <AudioPlayer
            autoPlay={false}
            src={playlist[currentTrack].audioUrl.audiourl.localFile.url}
            showSkipControls
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={handleEnd}
            layout="horizontal-reverse"
            showJumpControls={false}
            customVolumeControls={[]}
            customAdditionalControls={[]}
            autoPlayAfterSrcChange={true}
          />
          <h2 className="pl-4 -mt-3 text-xs text-center text-gray-900 font-noto line-clamp-1">
            {playlist[currentTrack].title}
          </h2>
        </div>
      ) : (
        //title for readings
        <h2 className="flex-1 pl-4 text-center text-gray-900 text-md font-noto line-clamp-1 w-fit">
          {props.title}
        </h2>
      )}

      <div className="flex md:h-12 md:w-3/12 lg:w-2/12 md:border-l-2 ">
        <Link
          // Conditional link for audio and readings
          to={
            playlist?.length > 0
              ? props.moreUrl
              : `${props.moreUrl}/${props.databaseId} `
          }
          className="inline-flex items-center pl-5 text-indigo-500 "
        >
          {playlist?.length > 0 ? "Load More" : "Read More"}

          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  )
}
