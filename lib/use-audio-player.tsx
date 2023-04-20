import { useEffect } from "react";

export default function useAudioPlayer({
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
}) {
  const formatTime = (seconds: number | undefined): string => {
    if (!seconds) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Update progress bar
  const updateProgress = () => {
    const duration = audioElementRef.current.duration;
    const currentTime = audioElementRef.current.currentTime;
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

  // Clear interval
  const clearTimeInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  // Play track
  const playTrack = () => {
    audioElementRef.current.play();
    setIsPlaying(true);
    intervalRef.current = setInterval(updateProgress, 1000);
  };

  // Pause track
  const pauseTrack = () => {
    audioElementRef.current.pause();
    setIsPlaying(false);
    clearTimeInterval();
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
    // update progress only if audio is not playing
    if (!isPlaying) {
      setProgress(audioElementRef.current.currentTime);
    }
  };

  // Go to next track
  const toNextTrack = () => {
    if (isShuffle) {
      // Pick a random track index
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex); // Avoid repeating the same track
      setCurrentTrackIndex(randomIndex);
    } else {
      // Increment track index by one
      setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
    }
    clearTimeInterval();
  };

  // Go to previous track
  const toPrevTrack = () => {
    if (isShuffle) {
      // Pick a random track index
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex); // Avoid repeating the same track
      setCurrentTrackIndex(randomIndex);
    } else {
      // Decrement track index by one
      setCurrentTrackIndex(
        (currentTrackIndex - 1 + tracks.length) % tracks.length
      );
    }
    clearTimeInterval();
  };

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const onSeek = (value: number) => {
    setProgress(value);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = value;
    }
    console.log("onSeekValue", value);
  };

  const onSeekEnd = () => {
    if (audioElementRef.current) {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Pause the current track

    if (isPlaying) {
      pauseTrack();
    }

    // Load the new track

    audioElementRef.current.load();

    // Play the new track

    if (isPlaying) {
      playTrack();
    }

    // Add event listeners for when the track ends or errors
    if (audioElementRef.current) {
      audioElementRef.current.addEventListener("ended", toNextTrack);
      audioElementRef.current.addEventListener("error", pauseTrack);
    }

    // Remove event listeners on cleanup

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.removeEventListener("ended", toNextTrack);
        audioElementRef.current.removeEventListener("error", pauseTrack);
      }

      clearTimeInterval();
    };
  }, [currentTrackIndex]);

  // Return the functions and variables that are needed by the component
  return {
    formatTime,
    updateProgress,
    clearTimeInterval,
    playTrack,
    pauseTrack,
    togglePlayPause,
    toNextTrack,
    toPrevTrack,
    toggleShuffle,
    onSeek,
    onSeekEnd,
  };
}
