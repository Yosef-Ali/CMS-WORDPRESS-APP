import { useState } from 'react';
import { ListeningIcon } from './icons';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './audio-wrapper.module.css';

function Card({ children }) {
	return (
		<div className='flex flex-col min-h-[85px] w-full p-3 transition delay-300 border shadow-sm md:flex-row md:items-center hover:shadow-lg '>
			<div className='items-center justify-center hidden w-2/12 border-r-2 md:flex'>
				<div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-indigo-500 bg-indigo-100 rounded-full '>
					<ListeningIcon className='w-8 h-8' aria-hidden='true' />
				</div>
			</div>
			<div className='flex-1 px-4 '>{children}</div>
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
		console.log('end');
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
				layout='horizontal-reverse'
				showJumpControls={false}
				customVolumeControls={[]}
				customAdditionalControls={[]}
				autoPlayAfterSrcChange={true}
				className={styles.rhap_container}
			/>
			<h2 className='pl-4 -mt-3 text-xs text-center text-gray-900 font-noto line-clamp-1'>
				{title}
			</h2>
		</Card>
	);
}
