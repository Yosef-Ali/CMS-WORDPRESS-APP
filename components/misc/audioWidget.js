import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../styles/audio.css";
import { Link } from "gatsby";
import { ChevronRight } from "./Icons";

export default function AudioPlayerWidget(props) {
  const [currentTrack, setTrackIndex] = useState(0);

  const playlist = props.tracks;
  const image = playlist[currentTrack].featuredImage?.node.localFile;
  const title = playlist[currentTrack].title;

  const handleClickNext = () => {
    console.log("click next", playlist?.length, currentTrack);
    setTrackIndex((currentTrack) =>
      currentTrack < playlist?.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    console.log("click Previous", playlist?.length, currentTrack);
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
    <div className="mb-8 w-full md:px-2 lg:p-4">
      <div className="track-info h-full space-y-4 border-b-16 border-black/10 bg-blue-100/80 p-8 text-center shadow-sm lg:p-6">
        <div className="flex flex-col space-y-4 md:flex-row lg:flex-col">
          <div className="md:w-2/5 lg:w-full">
            <GatsbyImage
              image={getImage(image)}
              alt={`track artwork for ${title}`}
              className="aspect-video h-44 w-full transition-all"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="font-noto">{title}</h2>
            <h3 className="font-noto line-clamp-2">
              <div dangerouslySetInnerHTML={{ __html: playlist.content }} />
            </h3>
            {playlist?.length > 0 && (
              <div className="flex-1 md:px-4 ">
                <AudioPlayer
                  autoPlay={false}
                  src={playlist[currentTrack].audioUrl.audiourl.localFile.url}
                  showSkipControls
                  onClickNext={handleClickNext}
                  onClickPrevious={handleClickPrevious}
                  onEnded={handleEnd}
                  showJumpControls={false}
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                  autoPlayAfterSrcChange={true}
                />
              </div>
            )}
          </div>
        </div>
        <div className="pt-6">
          <Link
            to="/songs"
            className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white hover:bg-secondary/90 hover:shadow-lg"
          >
            View More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
