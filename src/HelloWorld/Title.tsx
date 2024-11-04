import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import useVoiceRSSTTS from "./TextToSpeech";

// const title: React.CSSProperties = {
//   fontFamily: FONT_FAMILY,
//   fontWeight: "bold",
//   fontSize: 100,
//   textAlign: "center",
//   position: "absolute",
//   bottom: 160,
//   width: "100%",
// };

// const word: React.CSSProperties = {
//   marginLeft: 10,
//   marginRight: 10,
//   display: "inline-block",
// };

// export const Title: React.FC<{
//   titleText: string;
//   titleColor: string;
// }> = ({ titleText, titleColor }) => {
//   const videoConfig = useVideoConfig();
//   const frame = useCurrentFrame();

//   const words = titleText.split(" ");

//   return (
//     <h1 style={title}>
//       {words.map((t, i) => {
//         const delay = i * 5;

//         const scale = spring({
//           fps: videoConfig.fps,
//           frame: frame - delay,
//           config: {
//             damping: 200,
//           },
//         });

//         return (
//           <span
//             key={t}
//             style={{
//               ...word,
//               color: titleColor,
//               transform: `scale(${scale})`,
//             }}
//           >
//             {t}
//           </span>
//         );
//       })}
//     </h1>
//   );
// };

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 100,
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  margin: 0,
  padding: 0,
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

const highlightedWord: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
  backgroundColor: "red",
  padding: "2px 20px",
  color: "#fff",
};

export const Title: React.FC<{
  titleText1: string;
  titleText2?: string | null;
  titleColor: string;
}> = ({ titleText1, titleText2 = null, titleColor }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // Concatenate titleText1 and titleText2
  const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");

  // Use Voice RSS TTS hook
  useVoiceRSSTTS(fullText);

  const fadeOutStart = videoConfig.fps * 3; // Frame at which fade-out starts (3 seconds)
  const fadeOutDuration = videoConfig.fps * 1; // Duration of fade-out (1 second)

  const opacity =
    frame > fadeOutStart
      ? Math.max(0, 1 - (frame - fadeOutStart) / fadeOutDuration)
      : 1;

  return (
    <h1 style={{ ...title, opacity }}>
      {titleText1.split(" ").map((t, i) => {
        const delay = i * 5;
        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: { damping: 200 },
        });

        return (
          <span
            key={`title1-${t}`}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale})`,
            }}
          >
            {t}
          </span>
        );
      })}

      {titleText2 && (
        <span
          style={{
            ...highlightedWord,
            opacity,
            transform: `scale(${spring({
              fps: videoConfig.fps,
              frame: frame - titleText1.split(" ").length * 5,
              config: { damping: 200 },
            })})`,
          }}
        >
          {titleText2}
        </span>
      )}
    </h1>
  );
};

// const title: React.CSSProperties = {
//   fontFamily: FONT_FAMILY,
//   fontWeight: "bold",
//   fontSize: 100,
//   textAlign: "center",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "100%",
//   margin: 0,
//   padding: 0,
// };

// const word: React.CSSProperties = {
//   marginLeft: 10,
//   marginRight: 10,
//   display: "inline-block",
// };

// const highlightedWord: React.CSSProperties = {
//   marginLeft: 10,
//   marginRight: 10,
//   display: "inline-block",
//   backgroundColor: "red",
//   padding: "2px 20px",
//   color: "#fff",
// };

// export const Title: React.FC<{
//   titleText1: string; // First title text
//   titleText2?: string | null; // Second title text with red background, can be null or undefined
//   titleColor: string;
// }> = ({ titleText1, titleText2 = null, titleColor }) => {
//   const videoConfig = useVideoConfig();
//   const frame = useCurrentFrame();

//   // Function to handle text-to-speech
//   const speakText = (text: string) => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       speechSynthesis.speak(utterance);
//     }
//   };

//   // Calculate total delay for the speech
//   const totalSpeechTime = 4; // Total time for speech in seconds

//   // Effect to handle speaking titleText1 and titleText2 together
//   React.useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       // Speak both titleText1 and titleText2 together
//       const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");
//       speakText(fullText);
//     });

//     // Cleanup timeout on unmount
//     return () => clearTimeout(timeoutId);
//   }, [titleText1, titleText2, totalSpeechTime]); // Dependency array

//   const fadeOutStart = videoConfig.fps * 3; // Frame at which fade-out starts (3 seconds)
//   const fadeOutDuration = videoConfig.fps * 1; // Duration of fade-out (1 second)

//   // Calculate opacity for fade out based on current frame
//   const opacity =
//     frame > fadeOutStart
//       ? Math.max(0, 1 - (frame - fadeOutStart) / fadeOutDuration)
//       : 1;

//   return (
//     <h1 style={{ ...title, opacity }}>
//       {/* Apply opacity to the whole title */}
//       {titleText1.split(" ").map((t, i) => {
//         const delay = i * 5; // Calculate the delay for each word

//         const scale = spring({
//           fps: videoConfig.fps,
//           frame: frame - delay,
//           config: {
//             damping: 200,
//           },
//         });

//         return (
//           <span
//             key={`title1-${t}`}
//             style={{
//               ...word,
//               color: titleColor,
//               transform: `scale(${scale})`,
//             }}
//           >
//             {t}
//           </span>
//         );
//       })}

//       {/* Render titleText2 if it is not null */}
//       {titleText2 && (
//         <span
//           style={{
//             ...highlightedWord,
//             opacity, // Apply the same opacity for fade out
//             transform: `scale(${spring({
//               fps: videoConfig.fps,
//               frame: frame - titleText1.split(" ").length * 5,
//               config: {
//                 damping: 200,
//               },
//             })})`,
//           }}
//         >
//           {titleText2}
//         </span>
//       )}
//     </h1>
//   );
// };

// import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

// // Style definitions (unchanged)
// const title: React.CSSProperties = {
//   fontFamily: FONT_FAMILY,
//   fontWeight: "bold",
//   fontSize: 100,
//   textAlign: "center",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "100%",
//   margin: 0,
//   padding: 0,
// };

// const word: React.CSSProperties = {
//   marginLeft: 10,
//   marginRight: 10,
//   display: "inline-block",
// };

// const highlightedWord: React.CSSProperties = {
//   marginLeft: 10,
//   marginRight: 10,
//   display: "inline-block",
//   backgroundColor: "red",
//   padding: "2px 20px",
//   color: "#fff",
// };

// // Amazon Polly TTS Hook
// const usePollyTTS = (text: string) => {
//   useEffect(() => {
//     const pollyClient = new PollyClient({
//       region: "us-east-1", // Specify the AWS region
//       credentials: {
//         accessKeyId: "AKIA5JMSUDXXOQUHHLPT", // Replace with your AWS access key
//         secretAccessKey: "mL7AF2lyxvno32M+Sko+IUmHfVURqjvdwd2WvWXd", // Replace with your AWS secret key
//       },
//     });

//     // const voiceId = "Matthew";
//     // const voiceId = "Joanna";
//     // const voiceId = "Ivy";
//     const voiceId = "Salli";

//     // const voiceId = "Justin"; // Choose the Polly voice
//     const format = "mp3"; // Audio format

//     const synthesizeSpeech = async () => {
//       try {
//         const command = new SynthesizeSpeechCommand({
//           OutputFormat: format,
//           Text: text,
//           VoiceId: voiceId,
//         });

//         const data = await pollyClient.send(command);

//         if (data.AudioStream instanceof ReadableStream) {
//           const reader = data.AudioStream.getReader();
//           const chunks = [];

//           let result = await reader.read();
//           while (!result.done) {
//             chunks.push(result.value);
//             result = await reader.read();
//           }

//           // Combine chunks into a single Uint8Array
//           const byteArray = new Uint8Array(
//             chunks.reduce((acc, val) => acc.concat(Array.from(val)), [])
//           );

//           // Create a Blob from the byteArray
//           const blob = new Blob([byteArray], { type: "audio/mp3" });

//           // Create a URL for the Blob
//           const url = URL.createObjectURL(blob);

//           // Use AudioContext to control gain
//           const audioContext = new window.AudioContext();
//           const gainNode = audioContext.createGain();
//           const audioElement = new Audio(url);
//           const track = audioContext.createMediaElementSource(audioElement);

//           track.connect(gainNode).connect(audioContext.destination);

//           // Increase gain (volume boost) beyond default (1.0 is default)
//           gainNode.gain.value = 2.0; // Amplifies the sound (2x louder)

//           // Play the audio
//           await audioElement.play();
//         } else {
//           console.error("Unexpected AudioStream format:", data.AudioStream);
//         }
//       } catch (error) {
//         console.error("Error with Polly TTS:", error);
//       }
//     };

//     if (text) {
//       synthesizeSpeech();
//     }

//     return () => {
//       // Clean-up code if needed
//     };
//   }, [text]);
// };

// export default usePollyTTS;

// // Title Component
// export const Title: React.FC<{
//   titleText1: string;
//   titleText2?: string | null;
//   titleColor: string;
// }> = ({ titleText1, titleText2 = null, titleColor }) => {
//   // Concatenate titleText1 and titleText2
//   const fullText = titleText1 + (titleText2 ? ` ${titleText2}` : "");

//   // Use Polly TTS Hook
//   usePollyTTS(fullText);

//   const videoConfig = useVideoConfig();
//   const frame = useCurrentFrame();

//   const fadeOutStart = videoConfig.fps * 3; // Frame at which fade-out starts (3 seconds)
//   const fadeOutDuration = videoConfig.fps * 1; // Duration of fade-out (1 second)

//   const opacity =
//     frame > fadeOutStart
//       ? Math.max(0, 1 - (frame - fadeOutStart) / fadeOutDuration)
//       : 1;

//   return (
//     <h1 style={{ ...title, opacity }}>
//       {titleText1.split(" ").map((t, i) => {
//         const delay = i * 5;
//         const scale = spring({
//           fps: videoConfig.fps,
//           frame: frame - delay,
//           config: { damping: 200 },
//         });

//         return (
//           <span
//             key={`title1-${t}`}
//             style={{
//               ...word,
//               color: titleColor,
//               transform: `scale(${scale})`,
//             }}
//           >
//             {t}
//           </span>
//         );
//       })}

//       {titleText2 && (
//         <span
//           style={{
//             ...highlightedWord,
//             opacity,
//             transform: `scale(${spring({
//               fps: videoConfig.fps,
//               frame: frame - titleText1.split(" ").length * 5,
//               config: { damping: 200 },
//             })})`,
//           }}
//         >
//           {titleText2}
//         </span>
//       )}
//     </h1>
//   );
// };
