// Import Oswald font from Google Fonts dynamically
const loadFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins&display=swap';
    //link.href = 'https://fonts.googleapis.com/css2?family=Oswald&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  loadFont(); // Call this function to load the font

// Change any of these to update your video live.

export const COLOR_1 = "#86A8E7";

export const FONT_FAMILY = "Poppins, SF Pro Text, Arial, sans-serif";

//export const FONT_FAMILY = "Oswald, SF Pro Text, Helvetica, Arial, sans-serif";
