import getYouTubeID from "get-youtube-id";
import getThumbnailUrl from "@joegesualdo/get-youtube-video-thumbnail-url-js";

export const getThumbnail = (props) => {
  const YouTubId = getYouTubeID(props);
  return getThumbnailUrl(YouTubId);
};
