import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import useVoiceRSSTTS from "./TextToSpeech";

import city from "../assets/city-skyline.png";
import car from "../assets/car.gif";

// Styles
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
  height: "74%",
  background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
  zIndex: 0,
};

const roadBackground: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "26%",
  backgroundColor: "gray",
  zIndex: 0,
};

const cityBackground: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${city})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
};

const carStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "5%",
  left: "0%",
  width: "20%",
  transform: "scaleX(-1)",
  animation: "moveCar 5s linear infinite",
  zIndex: 2,
};

// CSS for car animation
const carAnimationStyle = `
@keyframes moveCar {
  0% {
    left: -10%;
  }
  100% {
    left: 100%;
  }
}`;

// Define keyframes for swipe-in animation
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
}`;

// Text style with swipe-in animation (animationDelay added for swipe timing)
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
  opacity: 0, // Initial opacity for fade-in
  animation: "swipeIn 1s ease-out forwards",
  animationDelay: "1s", // Starts after fade-in duration completes
};

const titleText3Style: React.CSSProperties = {
  ...greetingTextStyle,
  top: "200px",
  color: "#374151",
  fontSize: "64px",
  fontWeight: "normal",
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

// Main Component
export const CityWithCar: React.FC<{
  titleText1: string;
  titleText2?: string | null;
  titleText3?: string | null;
}> = ({ titleText1, titleText2 = null, titleText3 }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  // Opacity fade logic
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

  // Concatenate titleText1 and titleText2
  const fullText =
    titleText1 +
    (titleText2 ? ` ${titleText2}!` : "") +
    (titleText3 ? ` ${titleText3}` : "");

  // Use Voice RSS TTS hook
  useVoiceRSSTTS(fullText);

  return (
    <div
      style={{
        ...cityContainer,
        opacity,
      }}
    >
      {/* Background elements */}
      <div style={skyBackground} />
      <div style={roadBackground} />
      <div style={cityBackground} />
      <style>{carAnimationStyle}</style>
      <style>{swipeInAnimationStyle}</style> {/* Include the swipe-in style */}
      {/* Car */}
      <div style={carStyle}>
        <img src={car} alt="Car" style={{ width: "100%" }} />
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
      {titleText3 && <div style={{ ...titleText3Style }}>{titleText3}</div>}
      <div style={redLineStyle} />
    </div>
  );
};
