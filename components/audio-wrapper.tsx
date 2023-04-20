import { useState } from "react";
import { ChevronRight, ListeningIcon } from "./icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./audio-wrapper.module.css";
import Link from "next/link";

function Card({ children }) {
  return (
    <div className="flex min-h-[85px] w-full flex-col border p-3 shadow-sm transition delay-300 hover:shadow-lg md:flex-row md:items-center ">
      <div className="hidden w-2/12 items-center justify-center border-r-2 md:flex">
        <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
          <ListeningIcon className="h-8 w-8" aria-hidden="true" />
        </div>
      </div>
      <div className="flex-1 px-4">{children}</div>
      <div className="flex md:h-12 md:w-2/12 md:border-l-2">
        <Link
          href={`/podcasts`}
          className="inline-flex items-center pl-5 text-indigo-500 "
        >
          More
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function AudioWrapper({ audio }) {
  const [currentTrack, setTrackIndex] = useState(0);
  const { title, audioUrl } = audio[currentTrack].node;
  const AudioSRC = audioUrl.audiourl.mediaItemUrl;

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < audio?.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < 1 ? audio?.length - 1 : currentTrack - 1
    );
  };

  const handleEnd = () => {
    console.log("end");
    setTrackIndex((currentTrack) =>
      currentTrack < 1 ? audio?.length - 1 : currentTrack - 1
    );
  };

  return (
    <Card>
      <AudioPlayer
        autoPlay={false}
        src={AudioSRC}
        showSkipControls
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onEnded={handleEnd}
        layout="horizontal-reverse"
        showJumpControls={false}
        customVolumeControls={[]}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={true}
        className={styles.rhap_container}
      />
      <h2 className="font-noto -mt-2 pl-4 text-center text-xs text-gray-900 line-clamp-1">
        {title}
      </h2>
    </Card>
  );
}
