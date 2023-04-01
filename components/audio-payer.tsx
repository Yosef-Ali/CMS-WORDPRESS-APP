import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import useAudioPlayer from "../lib/use-audio-player";
import styles from "./audio-player.module.css";
import {
  DownloadIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  ShuffleIcon,
} from "./icons";

// Define prop types for tracks prop
interface Track {
  node: {
    title: string;
    content: string;
    audioUrl: {
      audiourl: {
        mediaItemUrl: string;
      };
    };
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

// Define AudioPlayer component
function AudioPlayer({ tracks }: { tracks: Track[] }) {
  // Use state variables
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);

  // Destructure current track object

  const {
    title,
    content: artist,
    audioUrl,
    featuredImage,
  } = tracks[currentTrackIndex].node;
  const audioSrc = audioUrl?.audiourl?.mediaItemUrl ?? "";
  const ImageUrl = featuredImage?.node?.sourceUrl ?? "";

  // Use ref variables
  const audioElementRef = useRef<HTMLAudioElement>();
  const intervalRef = useRef<any>();

  // Use custom hook for audio player logic
  const {
    formatTime,
    togglePlayPause,
    toNextTrack,
    toPrevTrack,
    toggleShuffle,
    onSeek,
    onSeekEnd,
  } = useAudioPlayer({
    audioElementRef,
    intervalRef,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    isShuffle,
    setIsShuffle,
    setProgress,
    tracks,
  });

  return (
    <>
      <div className="mb-8 w-full md:px-2 lg:p-4">
        <div className="relative flex w-full  flex-col rounded-xl border">
          <div className="z-50 flex  items-center px-10 pt-10 pb-4">
            <Image
              width={500}
              alt="image"
              height={500}
              className="border-bg-player-light-background dark:border-cover-dark-border mr-6 h-24 w-24 rounded-md border"
              src={ImageUrl || "/default.png"}
            />
            <div className="flex flex-col">
              <span
                data-amplitude-song-info="name"
                className="font-noto text-md font-sans font-medium leading-5 text-slate-900 dark:text-white"
              >
                {title}
              </span>
              <span
                data-amplitude-song-info="artist"
                className="font-sans text-xs font-medium  text-gray-500 dark:text-gray-400"
              >
                {artist && parse(artist)}
              </span>
            </div>

            <audio ref={audioElementRef}>
              <source src={audioSrc} />
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="z-50 flex w-full flex-col px-10 pb-6">
            <input
              type="range"
              value={progress}
              step="1"
              min="0"
              max={
                audioElementRef.current
                  ? audioElementRef.current.duration
                  : undefined
              }
              className={styles.range}
              onChange={(e) => onSeek(Number(e.target.value))}
              onMouseUp={onSeekEnd}
              onKeyUp={onSeekEnd}
              style={{ backgroundSize: "0% 100%" }}
            />

            <div className="flex w-full justify-between">
              <span className="font-sans text-xs font-medium tracking-wide text-sky-500">
                {formatTime(progress)}
              </span>
              <span className="font-sans text-xs font-medium tracking-wide text-gray-500">
                {formatTime(
                  audioElementRef.current
                    ? audioElementRef.current.duration
                    : undefined
                )}
              </span>
            </div>
          </div>
          <div>
            <div className="z-50 flex h-[4.0rem] items-center justify-between rounded-b-xl border-t border-gray-200 bg-[#F9FAFB] px-10">
              <button className="shuffle" onClick={toggleShuffle}>
                <ShuffleIcon
                  className={isShuffle ? "stroke-sky-300" : "stroke-[94A3B8]"}
                />
              </button>
              <button
                className="prev"
                onClick={toPrevTrack}
                disabled={!tracks.length || tracks.length === 1}
              >
                <PrevIcon />
              </button>
              <button
                onClick={togglePlayPause}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border bg-white shadow-xl"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                className="next cursor-pointer"
                onClick={toNextTrack}
                disabled={!tracks.length || tracks.length === 1}
              >
                <NextIcon />
              </button>
              <a
                className="inline-block cursor-pointer"
                href={`/api/download?audioSrc=${audioSrc}`}
              >
                <DownloadIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
