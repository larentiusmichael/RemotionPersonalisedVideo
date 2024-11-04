import React from "react";
import useVoiceRSSTTS from "./TextToSpeech";

export const Empty: React.FC<{
  titleText1: string;
  titleText2?: string | null;
  titleColor: string;
}> = ({ titleText1, titleText2 = null, titleColor }) => {
  // const videoConfig = useVideoConfig();
  // const frame = useCurrentFrame();

  // Concatenate titleText1 and titleText2
  const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");

  // Use Voice RSS TTS hook
  useVoiceRSSTTS(fullText);

  // Return null to render nothing
  return null;
};
