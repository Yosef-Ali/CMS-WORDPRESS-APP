import getYouTubeID from "get-youtube-id"

export const getYoutubeEmbed = props => {
  const YouTubId = getYouTubeID(props)

  return "https://www.youtube.com/embed/" + YouTubId
}
