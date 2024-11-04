import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import useVoiceRSSTTS from "./TextToSpeech";

import flowers from "../assets/flowers.png";
import butterfly1 from "../assets/butterfly1.gif";
import butterfly2 from "../assets/butterfly2.gif";

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

const flowersBackground: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${flowers})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
};

// Butterfly flying animations
const butterfly1AnimationStyle: React.CSSProperties = {
  position: "absolute",
  top: "15%",
  left: "-10%", // Start outside the left side
  width: "10%",
  height: "auto",
  animation: "flyButterfly1 8s ease-in-out infinite",
  zIndex: 2,
};

const butterfly2AnimationStyle: React.CSSProperties = {
  position: "absolute",
  top: "25%",
  right: "-10%", // Start outside the right side
  width: "10%",
  height: "auto",
  animation: "flyButterfly2 8s ease-in-out infinite",
  zIndex: 2,
};

// Keyframes for butterfly animations with one moving left-to-right and the other right-to-left
const butterflyAnimationKeyframes = `
@keyframes flyButterfly1 {
  0% { left: -10%; top: 15%; transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(10deg); }
  50% { left: 50%; top: 20%; transform: translateY(10px) rotate(-10deg); }
  75% { transform: translateY(-10px) rotate(5deg); }
  100% { left: 110%; top: 25%; transform: translateY(0) rotate(0deg); }
}

@keyframes flyButterfly2 {
  0% { right: -10%; top: 25%; transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(20px) rotate(-10deg); }
  50% { right: 50%; top: 30%; transform: translateY(-20px) rotate(10deg); }
  75% { transform: translateY(10px) rotate(-5deg); }
  100% { right: 110%; top: 35%; transform: translateY(0) rotate(0deg); }
}
`;

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
  fontSize: "84px",
  fontWeight: "bold",
  zIndex: 3,
  color: "tosca",
  textShadow: "2px 2px 4px rgba(255, 255, 255, 0.6)",
  opacity: 0,
  animation: "swipeIn 1s ease-out forwards",
  animationDelay: "1s",
};

// const titleText3Style: React.CSSProperties = {
//   ...greetingTextStyle,
//   top: "200px",
//   color: "#374151",
//   fontSize: "64px",
//   fontWeight: "normal",
//   animationDelay: "1.2s",
// };

// Style for the red line below titleText3 with rounded edges and swipe-in animation
const redLineStyle: React.CSSProperties = {
  position: "absolute",
  top: "225px", // Adjust to position the line directly below titleText3
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
export const FlowersWithButterfly: React.FC<{
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
    (titleText3 ? ` ${titleText3}` : "");

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
      <style>{butterflyAnimationKeyframes}</style>
      <div style={skyBackground} />
      <div style={flowersBackground} />
      {/* Butterfly Animations */}
      <div style={butterfly1AnimationStyle}>
        <img
          src={butterfly1}
          alt="Butterfly 1 flying"
          style={{ width: "100%" }}
        />
      </div>
      <div style={butterfly2AnimationStyle}>
        <img
          src={butterfly2}
          alt="Butterfly 2 flying"
          style={{ width: "100%" }}
        />
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
      <div style={redLineStyle} />
    </div>
  );
};
