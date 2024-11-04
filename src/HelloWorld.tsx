import { spring } from "remotion";
// import {
//   AbsoluteFill,
//   interpolate,
//   Sequence,
//   useCurrentFrame,
//   useVideoConfig,
//   Audio,
// } from "remotion";
import { Logo } from "./HelloWorld/Logo";
import { Subtitle } from "./HelloWorld/Subtitle";
import { Title } from "./HelloWorld/Title";
import { Box } from "./HelloWorld/Box";
import { Empty } from "./HelloWorld/Empty";
import { Donut } from "./HelloWorld/Donut";
import { CityWithCar } from "./HelloWorld/CityWithCar";
import { HospitalWithAmbulance } from "./HelloWorld/HospitalWithAmbulance";
import { MountainWithBirds } from "./HelloWorld/MountainWithBirds";
import { LandmarksWithPlane } from "./HelloWorld/LandmarksWithPlane";
import { FlowersWithButterfly } from "./HelloWorld/FlowersWithButterfly";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  useCurrentFrame,
  AbsoluteFill,
  interpolate,
  interpolateColors, // Add this line
  Sequence,
  Audio,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "./HelloWorld/constants";

import cloud from "./assets/cloud.png";
import sun from "./assets/sun.png";
import cow from "./assets/cow.png";
import mountain from "./assets/mountain.png";
import aeroplane from "./assets/aeroplane.png";
import birds from "./assets/birds.gif";

import music from "./assets/music2.mp3";

// export const myCompSchema = z.object({
//   titleText1: z.string(),
//   titleText2: z.string(),
//   titleText3: z.string(),
//   titleText4: z.string(),
//   titleColor: zColor(),
// });

// export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
//   titleText1: propOne,
//   titleText2: propTwo,
//   titleText3: propThree,
//   titleText4: propFour,
//   titleColor: propFive,
// }) => {
//   const frame = useCurrentFrame();
//   const { durationInFrames } = useVideoConfig();

//   // Create an animation that smoothly transitions between colors using interpolateColors
//   const backgroundColor = interpolateColors(
//     frame,
//     [0, durationInFrames / 2, durationInFrames],
//     ["#FF8DAA", "#7FBFFF", "#7ED957"] // Colors to transition between
//   );

//   // Fade out the animation at the end
//   const opacity = interpolate(
//     frame,
//     [durationInFrames - 25, durationInFrames - 15],
//     [1, 0],
//     {
//       extrapolateLeft: "clamp",
//       extrapolateRight: "clamp",
//     }
//   );

//   return (
//     <AbsoluteFill style={{ backgroundColor }}>
//       <AbsoluteFill style={{ opacity }}>
//         {/* Place background animation behind */}
//         <BackgroundAnimation frame={frame} />

//         {/* Your audio component */}
//         <Audio
//           src="https://revideo-example-assets.s3.amazonaws.com/chill-beat.mp3"
//           startFrom={550}
//           volume={0.2}
//         />

//         <Sequence from={5}>
//           <Title
//             titleText1="HELLO, "
//             titleText2={propOne}
//             titleColor={propFive}
//           />
//         </Sequence>
//         <Sequence from={125}>
//           <Title
//             titleText1="THIS IS YOUR INSURANCE PREMIUM FOR "
//             titleText2={propTwo}
//             titleColor={propFive}
//           />
//         </Sequence>
//         <Sequence from={245}>
//           <Title
//             titleText1="THE AMOUNT IS TOTAL "
//             titleText2={`$${propThree}`}
//             titleColor={propFive}
//           />
//         </Sequence>
//         <Sequence from={365}>
//           <Title
//             titleText1="THIS IS DUE UNTIL "
//             titleText2={propFour}
//             titleColor={propFive}
//           />
//         </Sequence>
//         <Sequence from={485}>
//           <Title titleText1="THANK YOU!" titleColor={propFive} />
//         </Sequence>
//       </AbsoluteFill>
//     </AbsoluteFill>
//   );
// };

// // BackgroundAnimation component for moving shapes or effects
// const BackgroundAnimation: React.FC<{ frame: number }> = ({ frame }) => {
//   const { width, height } = useVideoConfig();

//   // Animate circle positions
//   const circleY = interpolate(frame, [0, 100], [-100, height + 100], {
//     extrapolateLeft: "clamp",
//     extrapolateRight: "clamp",
//   });

//   const circleX = interpolate(frame, [0, 100], [-50, width + 50], {
//     extrapolateLeft: "clamp",
//     extrapolateRight: "clamp",
//   });

//   return (
//     <AbsoluteFill>
//       {/* Animated Circle */}
//       <div
//         style={{
//           position: "absolute",
//           top: circleY,
//           left: circleX,
//           width: 200,
//           height: 200,
//           borderRadius: "50%",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           filter: "blur(20px)",
//         }}
//       />

//       {/* Bokeh / Blinking Lights Effect */}
//       <BokehLights frame={frame} />
//     </AbsoluteFill>
//   );
// };

// // Component to add blinking lights or bokeh effect
// const BokehLights: React.FC<{ frame: number }> = ({ frame }) => {
//   const { width, height } = useVideoConfig();

//   // Animate blinking effect using the frame count and modulating opacity
//   const blinkOpacity = (index: number) =>
//     interpolate(
//       frame % (50 + index * 10), // Vary timing for each light
//       [0, 25, 50],
//       [0, 1, 0], // Blink effect (on-off-on)
//       {
//         extrapolateLeft: "clamp",
//         extrapolateRight: "clamp",
//       }
//     );

//   // Explicitly typing the style object as React.CSSProperties
//   const bokehStyle = (index: number): React.CSSProperties => ({
//     position: "absolute",
//     top: Math.random() * height, // Random position
//     left: Math.random() * width,
//     width: 30 + Math.random() * 20, // Vary size
//     height: 30 + Math.random() * 20,
//     borderRadius: "50%",
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     filter: "blur(15px)",
//     opacity: blinkOpacity(index),
//   });

//   return (
//     <AbsoluteFill>
//       {/* Generate multiple blinking lights */}
//       {Array.from({ length: 10 }).map((_, i) => (
//         <div key={i} style={bokehStyle(i)} />
//       ))}
//     </AbsoluteFill>
//   );
// };

// 1st Video
// export const myCompSchema = z.object({
//   titleText1: z.string(),
//   titleText2: z.string(),
//   titleText3: z.string(),
//   titleText4: z.string(),
//   titleColor: zColor(),
// });

// export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
//   titleText1: propOne,
//   titleText2: propTwo,
//   titleText3: propThree,
//   titleText4: propFour,
//   titleColor: propFive,
// }) => {
//   const frame = useCurrentFrame();
//   const { durationInFrames } = useVideoConfig();

//   // Calculate the aeroplane's horizontal position
//   const aeroplanePosition =
//     frame >= 245 && frame <= 400
//       ? `${(frame - 280) * (100 / 120)}%` // Move from left to right
//       : "-50%"; // Start off screen

//   // Calculate the aeroplane text's horizontal position
//   const aeroplaneTextPosition =
//     frame >= 245 && frame <= 400
//       ? `${(frame - 280) * (100 / 120) + 3}%` // Move from left to right, same speed, with slight offset
//       : "-50%"; // Start off screen

//   return (
//     <AbsoluteFill style={{ backgroundColor: "#87CEEB" }}>
//       {/* Place background animation behind */}
//       <BackgroundAnimation frame={frame} />

//       {/* Your audio component */}
//       {/* <Audio
//         src="https://revideo-example-assets.s3.amazonaws.com/chill-beat.mp3"
//         startFrom={550}
//         volume={0.2}
//       /> */}

//       <Audio
//         src={music} // Use the imported audio file
//         startFrom={0} // Start playback from 550 milliseconds
//         volume={0.3} // Set the volume
//       />

//       <Sequence from={5}>
//         <Title
//           titleText1="HELLO, "
//           titleText2={propOne}
//           titleColor={propFive}
//         />
//       </Sequence>
//       <Sequence from={125}>
//         <Box
//           titleText1="THIS IS YOUR INSURANCE PREMIUM FOR "
//           titleText2={propTwo}
//           titleText3="PREMIUM FOR"
//           titleColor={propFive}
//         />
//       </Sequence>

//       <Sequence from={245}>
//         <Empty
//           titleText1="THE AMOUNT IS TOTAL "
//           titleText2={`$${propThree}`}
//           titleColor={propFive}
//         />
//         {/* Aeroplane moving from left to right */}
//         <img
//           src={aeroplane}
//           alt="Aeroplane"
//           style={{
//             position: "absolute",
//             top: "-20%", // Adjust this value to change the vertical position of the airplane
//             left: aeroplanePosition,
//             width: "700px", // Set width of the aeroplane image
//             height: "auto",
//             transform: "scaleX(-1)", // Flipped aeroplane
//           }}
//         />
//         {/* Text following the aeroplane */}
//         <div
//           style={{
//             position: "absolute",
//             top: "13%", // Align this value with the airplane's top value
//             left: aeroplaneTextPosition,
//             color: "red", // Use the provided color
//             fontSize: "48px", // Set font size
//             fontFamily: FONT_FAMILY,
//             fontWeight: "bold", // Set font weight
//             whiteSpace: "nowrap", // Prevent text wrapping
//           }}
//         >
//           ${propThree} {/* Displaying propThree directly as text */}
//         </div>
//       </Sequence>
//       {/* <Sequence from={365}>
//         <Box
//           titleText1="THIS IS DUE UNTIL "
//           titleText2={propFour}
//           titleText3="DUE UNTIL"
//           titleColor={propFive}
//         />
//       </Sequence> */}
//       <Sequence from={365}>
//         <Donut
//           titleText1="THIS IS DUE UNTIL "
//           titleText2={propFour}
//           titleText3="DUE UNTIL"
//           titleColor={propFive}
//         />
//       </Sequence>
//       <Sequence from={485}>
//         <Title titleText1="THANK YOU!" titleColor={propFive} />
//       </Sequence>
//     </AbsoluteFill>
//   );
// };

// const BackgroundAnimation: React.FC<{ frame: number }> = ({ frame }) => {
//   const { durationInFrames } = useVideoConfig();

//   // Calculate the progress of the animation (0 to 1)
//   const progress = frame / durationInFrames;

//   // Function to interpolate between two colors
//   const interpolateColor = (
//     startColor: string,
//     endColor: string,
//     factor: number
//   ) => {
//     const startRGB = hexToRgb(startColor);
//     const endRGB = hexToRgb(endColor);

//     const resultRGB = startRGB.map((start, index) => {
//       const end = endRGB[index];
//       return Math.round(start + factor * (end - start));
//     });

//     return `rgb(${resultRGB.join(",")})`;
//   };

//   // Helper function to convert hex color to RGB array
//   const hexToRgb = (hex: string) => {
//     const bigint = parseInt(hex.replace("#", ""), 16);
//     return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
//   };

//   // Define colors for smooth gradient transition
//   const colors = [
//     "#87CEEB", // Light Blue
//     "#FFB74D", // Light Orange
//     "#FF7F50", // Coral Orange
//   ];

//   // Create a smooth gradient based on the progress
//   const totalColors = colors.length;
//   const colorIndex = Math.floor(progress * (totalColors - 1));
//   const nextColorIndex = Math.min(colorIndex + 1, totalColors - 1);
//   const factor = progress * (totalColors - 1) - colorIndex;

//   const currentColor = interpolateColor(
//     colors[colorIndex],
//     colors[nextColorIndex],
//     factor
//   );
//   const skyGradient = `linear-gradient(to top, ${currentColor}, #00BFFF)`; // Dark blue at the bottom

//   // Calculate sun position
//   const sunTop = `${5 + progress * 80}%`; // Move sun down from 5% to 85%
//   const sunLeft = "60%"; // Keep sun horizontal position constant

//   // Calculate birds' position (fly from right to left)
//   const birdsLeft = `${100 - progress * 110}%`; // Move birds from 100% to -10%
//   const birdsTop = `${20 + progress * 5}%`; // Slight vertical movement for the birds

//   return (
//     <AbsoluteFill>
//       {/* Sky background with smooth gradient color change */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "70%",
//           background: skyGradient, // Use the gradient for the sky
//         }}
//       />

//       {/* Sun image with changing position */}
//       <img
//         src={sun} // Use your sun image
//         alt="Sun"
//         style={{
//           position: "absolute",
//           top: sunTop, // Update sun's vertical position based on progress
//           left: sunLeft, // Keep sun's horizontal position constant
//           width: "500px",
//           height: "auto",
//         }}
//       />

//       {/* Scattered clouds with images */}
//       <ScatteredClouds frame={frame} />

//       {/* Mountain image field at the bottom */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: `url(${mountain})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       />

//       {/* Birds GIF */}
//       <img
//         src={birds} // Replace with your birds GIF path
//         alt="Flying Birds"
//         style={{
//           position: "absolute",
//           top: birdsTop, // Vertical position for birds
//           left: birdsLeft, // Horizontal position for birds
//           width: "15%", // Adjust size as needed
//           height: "auto",
//         }}
//       />

//       {/* Cow image */}
//       <img
//         src={cow}
//         alt="Cow"
//         style={{
//           position: "absolute",
//           bottom: "10%",
//           left: "85%",
//           width: "7%",
//           height: "auto",
//           transform: "scaleX(-1)",
//         }}
//       />
//     </AbsoluteFill>
//   );
// };

// // Array of cloud image URLs
// const cloudImages = [cloud, cloud, cloud, cloud];

// // Component to render scattered clouds that move to the right
// const ScatteredClouds: React.FC<{ frame: number }> = ({ frame }) => {
//   const cloudPositions = [
//     { top: "10%", left: "-65%" },
//     { top: "25%", left: "-35%" },
//     { top: "10%", left: "5%" },
//     { top: "10%", left: "70%" },
//   ];

//   const cloudStyle = (position: {
//     top: string;
//     left: string;
//   }): React.CSSProperties => ({
//     position: "absolute",
//     top: position.top,
//     left: `${parseFloat(position.left) + frame * 0.1}%`, // Move clouds to the right based on frame
//     width: "500px", // Set a fixed width for the clouds
//     height: "auto",
//     transition: "left 0.1s ease-in-out", // Smooth transition for movement
//   });

//   return (
//     <AbsoluteFill>
//       {/* Render scattered clouds with images */}
//       {cloudPositions.map((position, index) => (
//         <img
//           key={index}
//           src={cloudImages[index % cloudImages.length]} // Loop through cloud images
//           style={cloudStyle(position)}
//           alt="Cloud"
//         />
//       ))}
//     </AbsoluteFill>
//   );
// };

export const myCompSchema = z.object({
  titleText1: z.string(),
  titleText2: z.string(),
  titleText3: z.string(),
  titleText4: z.string(),
  titleColor: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
  titleText1: propOne,
  titleText2: propTwo,
  titleText3: propThree,
  titleText4: propFour,
  titleColor: propFive,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <Audio
        src={music} // Use the imported audio file
        startFrom={0} // Start playback from 550 milliseconds
        volume={0.3} // Set the volume
      />

      <Sequence from={5}>
        <CityWithCar
          titleText1="Hi, "
          titleText2={propOne}
          titleText3="here is your personal quote"
        />
      </Sequence>
      <Sequence from={155}>
        <HospitalWithAmbulance
          titleText1="This is your insurance premium for "
          titleText3={propTwo}
        />
      </Sequence>
      <Sequence from={305}>
        <MountainWithBirds
          titleText1="The amount is total "
          titleText3={propThree}
        />
      </Sequence>
      <Sequence from={455}>
        <LandmarksWithPlane
          titleText1="It is due until  "
          titleText3={propFour}
        />
      </Sequence>
      <Sequence from={605}>
        <FlowersWithButterfly titleText1="Thank You!" />
      </Sequence>
      {/*
      <Sequence from={365}>
        <Donut
          titleText1="THIS IS DUE UNTIL "
          titleText2={propFour}
          titleText3="DUE UNTIL"
          titleColor={propFive}
        />
      </Sequence>
      <Sequence from={485}>
        <Title titleText1="THANK YOU!" titleColor={propFive} />
      </Sequence> */}
    </AbsoluteFill>
  );
};
