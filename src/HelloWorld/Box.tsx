import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import useVoiceRSSTTS from "./TextToSpeech";

const bigBox: React.CSSProperties = {
  width: 500,
  height: 500,
  paddingTop: 50,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white color
  borderWidth: "4px", // Thicker border
  borderStyle: "dashed", // Dashed style
  borderColor: "darkgrey", // Dark grey color
  borderImage: "none", // Ensure no image is used for the border
  borderRadius: 5, // Optional: rounded corners for a softer look
  position: "absolute", // Absolute positioning for centering
  top: "50%",
  left: "50%",
  transform: "translate(-50%, 100%) scale(1)", // Start off-screen at the bottom
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)", // Shadow for the lifted look
  transition: "transform 0.5s ease-out", // Smooth transition for the swipe-up effect
};

const smallBox: React.CSSProperties = {
  width: "100%", // Stretch from left to right
  height: "40%",
  backgroundColor: "red", // Solid red color
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
};

const text2Style: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 100,
  textAlign: "center",
  color: "black",
  marginTop: 20,
  textShadow: `
    -5px -5px 0 #fff, 
    5px -5px 0 #fff, 
    -5px 5px 0 #fff, 
    5px 5px 0 #fff
  `, // White outline
};

// Box component
export const Box: React.FC<{
  titleText1: string;
  titleText2?: string | null;
  titleText3: string;
  titleColor: string;
}> = ({ titleText1, titleText2 = null, titleText3, titleColor }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");

  // Voice RSS TTS
  useVoiceRSSTTS(fullText);

  const fadeOutStart = videoConfig.fps * 3;
  const fadeOutDuration = videoConfig.fps * 1;

  const opacity =
    frame > fadeOutStart
      ? Math.max(0, 1 - (frame - fadeOutStart) / fadeOutDuration)
      : 1;

  // Swipe up effect
  const swipeUpDuration = videoConfig.fps * 0.5; // Duration of swipe-up effect
  const translateY =
    frame < swipeUpDuration
      ? 100 - (frame / swipeUpDuration) * 150 // Move from 100% to -50%
      : -50; // Stay at the center (-50%) after the duration

  return (
    <div style={{ opacity }}>
      <div
        style={{
          ...bigBox,
          transform: `translate(-50%, ${translateY}%) scale(1)`, // Update translateY based on frame
        }}
      >
        {/* Small box with text1 */}
        <div style={smallBox}>
          <h2
            style={{
              color: titleColor,
              fontSize: 54,
              margin: 0,
              fontFamily: FONT_FAMILY,
            }}
          >
            {titleText3}
          </h2>
        </div>
        {/* Text2 below the small box */}
        {titleText2 && <h1 style={text2Style}>{titleText2}</h1>}
      </div>
    </div>
  );
};
