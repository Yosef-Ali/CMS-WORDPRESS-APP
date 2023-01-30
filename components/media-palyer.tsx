import AudioWrapper from './audio-wrapper';

export default function MediaPlayer({ audio }) {
	const filteredAudio = audio.filter(
		({ node }) => node.audioUrl?.audiourl?.mediaItemUrl.slice(-3) === 'mp3'
	);
	return <AudioWrapper audio={filteredAudio} />;
}
