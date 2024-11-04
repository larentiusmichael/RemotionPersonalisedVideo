import { useEffect } from 'react';

const useVoiceRSSTTS = (text: string) => {
  useEffect(() => {
    //const apiKey = "ad9ab4855cd84adb87195b59a3155dd8"; // Replace with your Voice RSS API key
    const apiKey = "f9dfdc45901f4ee89537c5a5dd4b1fab";
    const language = "en-us"; // Language code
    const voice = "Mary"; // Voice selection without language prefix
    const format = "mp3"; // Output format
    const rate = "0.95"; // Normal speed
    const volume = "100"; // Maximum volume

    // Update the URL to match the correct format
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=${language}&src=${encodeURIComponent(text)}&v=${voice}&f=${format}&r=${rate}&c=${volume}`;

    const audio = new Audio(url);

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    if (text) {
      playAudio();
    }

    return () => {
      audio.pause(); // Stop the audio if the component unmounts
      audio.currentTime = 0; // Reset audio time
    };
  }, [text]);
};

export default useVoiceRSSTTS; // Exporting the hook as default