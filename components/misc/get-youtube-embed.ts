import getYouTubeID from "get-youtube-id"

export const GetYoutubeEmbed = props => {
  const YouTubId = getYouTubeID(props)

  return "https://www.youtube.com/embed/" + YouTubId
}
