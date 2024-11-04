import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

import { Player } from "@remotion/player";

// Each <Composition> is an entry in the sidebar!

// // Function to get a query parameter from the URL
// function getQueryParam(key: string, defaultValue: string): string {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(key) || defaultValue;
// }

// // Store the query parameters in memory, converting values to uppercase
// const queryParams = {
//   username: getQueryParam("username", "new user").toUpperCase(),
//   monthYear: getQueryParam("monthYear", "January 2024").toUpperCase(),
//   totalAmount: getQueryParam("totalAmount", "0.00").toUpperCase(),
//   dueDate: getQueryParam("dueDate", "December 31, 2023").toUpperCase(),
// };

// export const RemotionRoot: React.FC = () => {
//   return (
//     <>
//       <Composition
//         id="HelloWorld"
//         component={HelloWorld}
//         durationInFrames={600}
//         fps={30}
//         width={1920}
//         height={1080}
//         schema={myCompSchema}
//         defaultProps={{
//           // Pass the extracted query params to the title text in uppercase
//           titleText1: queryParams.username,
//           titleText2: queryParams.monthYear,
//           titleText3: queryParams.totalAmount,
//           titleText4: queryParams.dueDate,
//           titleColor: "#000000",
//         }}
//       />
//     </>
//   );
// };

import React, { useState, useEffect } from "react";

// Function to get a query parameter from the URL
function getQueryParam(key: string, defaultValue: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key) || defaultValue;
}

// Store the query parameters in memory, converting values to uppercase
const queryParams = {
  username: getQueryParam("username", "new user"),
  monthYear: getQueryParam("monthYear", "January 2024"),
  totalAmount: getQueryParam("totalAmount", "0.00"),
  dueDate: getQueryParam("dueDate", "December 31, 2023"),
};

// // Store the query parameters in memory, converting values to uppercase
// const queryParams = {
//   username: getQueryParam("username", "new user").toUpperCase(),
//   monthYear: getQueryParam("monthYear", "January 2024").toUpperCase(),
//   totalAmount: getQueryParam("totalAmount", "0.00").toUpperCase(),
//   dueDate: getQueryParam("dueDate", "December 31, 2023").toUpperCase(),
// };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Assuming Player and HelloWorld are defined elsewhere */}
      <Player
        component={HelloWorld} // Directly pass the component
        durationInFrames={750}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        inputProps={{
          titleText1: queryParams.username,
          titleText2: queryParams.monthYear,
          titleText3: queryParams.totalAmount,
          titleText4: queryParams.dueDate,
          titleColor: "#ffffff",
        }}
        controls
        allowFullscreen
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
        }}
      />
    </>
  );
};
