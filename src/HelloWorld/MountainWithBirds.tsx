import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import useVoiceRSSTTS from "./TextToSpeech";

import birds from "../assets/birds.gif"; // Birds GIF for flying animation
import mountain from "../assets/mountain.png"; // Mountain background

// Styles for the components
const cityContainer: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const skyBackground: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(to bottom, #87CEFA, #ffffff)", // Sky gradient colors
  zIndex: 0,
};

const mountainBackground: React.CSSProperties = {
  position: "absolute",
  bottom: 0, // Align to bottom
  left: 0,
  width: "100%",
  height: "100%", // Adjust the mountain height
  backgroundImage: `url(${mountain})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
};

const birdsAnimationStyle: React.CSSProperties = {
  position: "absolute",
  top: "10%", // Position the birds in the sky
  right: "-20%", // Start offscreen
  width: "20%",
  height: "auto",
  animation: "flyBirds 10s linear infinite", // Animate birds flying from right to left
  zIndex: 2,
};

// CSS for birds flying animation
const birdsAnimationKeyframes = `
@keyframes flyBirds {
  0% {
    right: -20%;
  }
  100% {
    right: 100%;
  }
}`;

// Swipe-in animation for text
const swipeInAnimationStyle = `
@keyframes swipeIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const greetingTextStyle: React.CSSProperties = {
  position: "absolute",
  top: "100px",
  left: "75px",
  fontFamily: FONT_FAMILY,
  fontSize: "64px",
  zIndex: 3,
  color: "tosca",
  textShadow: "2px 2px 4px rgba(255, 255, 255, 0.6)",
  opacity: 0,
  animation: "swipeIn 1s ease-out forwards",
  animationDelay: "1s",
};

const titleText3Style: React.CSSProperties = {
  ...greetingTextStyle,
  top: "170px",
  color: "#374151",
  fontSize: "84px",
  fontWeight: "bold",
  animationDelay: "1.2s", // Additional delay for third text
};

// Style for the red line below titleText3 with rounded edges and swipe-in animation
const redLineStyle: React.CSSProperties = {
  position: "absolute",
  top: "300px", // Adjust to position the line directly below titleText3
  left: "75px",
  width: "13%", // Adjust width as needed
  height: "10px", // Line height
  backgroundColor: "red",
  borderRadius: "5px", // Rounded edges for the red line
  opacity: 0, // Initial opacity for swipe-in animation
  animation: "swipeIn 1s ease-out forwards",
  animationDelay: "1.4s", // Additional delay for red line
  zIndex: 3,
};

// Main component
export const MountainWithBirds: React.FC<{
  titleText1: string;
  titleText2?: string | null;
  titleText3?: string | null;
}> = ({ titleText1, titleText2 = null, titleText3 }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const fadeInStart = videoConfig.fps * 0.5;
  const fadeInDuration = videoConfig.fps * 0.5;
  const fadeOutStart = videoConfig.fps * 5;
  const fadeOutDuration = videoConfig.fps * 0.5;

  let opacity = 0;
  if (frame < fadeInStart) {
    opacity = 0;
  } else if (frame < fadeInStart + fadeInDuration) {
    opacity = (frame - fadeInStart) / fadeInDuration;
  } else if (frame < fadeOutStart) {
    opacity = 1;
  } else if (frame < fadeOutStart + fadeOutDuration) {
    opacity = 1 - (frame - fadeOutStart) / fadeOutDuration;
  } else {
    opacity = 0;
  }

  const fullText =
    titleText1 +
    (titleText2 ? ` ${titleText2}!` : "") +
    (titleText3 ? ` $${titleText3}` : "");

  // Voice TTS Hook
  useVoiceRSSTTS(fullText);

  return (
    <div
      style={{
        ...cityContainer,
        opacity,
      }}
    >
      <style>{swipeInAnimationStyle}</style>
      <style>{birdsAnimationKeyframes}</style>
      <div style={skyBackground} />
      <div style={mountainBackground} />
      {/* Birds Animation */}
      <div style={birdsAnimationStyle}>
        <img src={birds} alt="Birds flying" style={{ width: "100%" }} />
      </div>
      {/* Greeting Text with Swipe-in Animation */}
      <div style={{ ...greetingTextStyle }}>
        <span style={{ color: "#14b8a6" }}>{titleText1}</span>
        {titleText2 && (
          <span style={{ color: "#14b8a6", marginLeft: "5px" }}>
            {titleText2}!
          </span>
        )}
      </div>
      {titleText3 && <div style={{ ...titleText3Style }}>${titleText3}</div>}
      <div style={redLineStyle} />
    </div>
  );
};
