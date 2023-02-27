import React, { useState } from "react";
import { Link } from "gatsby";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../styles/audio.css";
import { ChevronRight, ListeningIcon, ReadingIcon } from "./Icons";

export default function MediaLink(props) {
  const [currentTrack, setTrackIndex] = useState(0);
  //props has two data audio and readings
  // if props is audio
  const playlist = props.audio;

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist?.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < 1 ? playlist?.length - 1 : currentTrack - 1
    );
  };

  const handleEnd = () => {
    console.log("end");
    setTrackIndex((currentTrack) =>
      currentTrack < playlist?.length - 1 ? currentTrack + 1 : 0
    );
  };
  return (
    <div className="flex min-h-[85px] w-full flex-col border p-3 shadow-sm transition delay-300 hover:shadow-lg md:flex-row md:items-center ">
      <div className="hidden w-2/12 items-center justify-center border-r-2 md:flex">
        <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
          {playlist?.length > 0 ? (
            <ListeningIcon className="h-8 w-8" aria-hidden="true" />
          ) : (
            <ReadingIcon className="h-8 w-8" aria-hidden="true" />
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
          <h2 className="font-noto -mt-3 pl-4 text-center text-xs text-gray-900 line-clamp-1">
            {playlist[currentTrack].title}
          </h2>
        </div>
      ) : (
        //title for readings
        <h2 className="text-md font-noto w-fit flex-1 pl-4 text-center text-gray-900 line-clamp-1">
          {props.title}
        </h2>
      )}

      <div className="flex md:h-12 md:w-3/12 md:border-l-2 lg:w-2/12 ">
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

          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
