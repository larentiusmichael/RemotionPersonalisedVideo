import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import useVoiceRSSTTS from "./TextToSpeech";
import { FONT_FAMILY } from "./constants";
import { useVideoConfig, useCurrentFrame } from "remotion"; // Assuming you're using remotion

// Register the required components from Chart.js
ChartJS.register(ArcElement, Tooltip);

// Helper function to calculate the difference in months
const calculateMonthDifference = (now: Date, targetDate: Date) => {
  const yearsDiff = targetDate.getFullYear() - now.getFullYear();
  const monthsDiff = targetDate.getMonth() - now.getMonth();
  return yearsDiff * 12 + monthsDiff;
};

// Donut component
export const Donut: React.FC<{
  titleText1: string;
  titleText2?: string | null; // Date format expected: "December 31, 2023"
  titleText3: string;
  titleColor: string;
}> = ({ titleText1, titleText2 = null, titleText3, titleColor }) => {
  const now = new Date();
  const targetDate = titleText2 ? new Date(titleText2) : null;
  const monthsPassed = targetDate
    ? calculateMonthDifference(now, targetDate)
    : 0;
  const remainingMonths = 12 - monthsPassed;

  // Data for the donut chart
  const chartData = {
    datasets: [
      {
        data: [monthsPassed, remainingMonths], // Number of months passed and remaining
        backgroundColor: ["red", "lightgray"],
      },
    ],
  };

  // Chart options without legend
  const chartOptions = {
    responsive: true,
    cutout: "50%", // Donut chart cutout percentage
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  // Remotion hooks
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // Concatenate titleText1 and titleText2
  const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");

  // Use Voice RSS TTS hook
  useVoiceRSSTTS(fullText);

  // CSS for centering the chart and text
  const centerStyles: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Centering horizontally and vertically
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    opacity: 1, // Initial opacity
    transition: "opacity 0.3s ease-out", // Smooth transition for fading out
  };

  // Fade-out effect
  const fadeOutStart = videoConfig.fps * 3; // Start fade out after 3 seconds
  const fadeOutDuration = videoConfig.fps * 1; // Fade out over 1 second

  const opacity =
    frame > fadeOutStart
      ? Math.max(0, 1 - (frame - fadeOutStart) / fadeOutDuration)
      : 1;

  // Pop-in effect for titleText2
  const popInDuration = videoConfig.fps * 0.5; // Duration of pop-in effect
  const scale =
    frame < popInDuration
      ? Math.min(1, frame / popInDuration) // Scale from 0 to 1
      : 1; // Maintain scale at 1 after the duration

  return (
    <div style={{ ...centerStyles, opacity }}>
      {/* Render the Doughnut Chart */}
      <div style={{ width: 300, height: 300 }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* TitleText2 with pop-in effect */}
      {titleText2 && (
        <h1
          style={{
            color: titleColor,
            fontFamily: FONT_FAMILY, // Apply custom font family
            fontSize: 84,
            marginTop: 20,
            transform: `scale(${scale})`, // Apply scale transformation
            transition: "transform 0.3s ease-out", // Smooth transition for scaling
          }}
        >
          {titleText2}
        </h1>
      )}
    </div>
  );
};
