import { useEffect, useState, useMemo } from "react";

const TypingText = ({
    speed = 100,
    delay = 2000
}) => {
    const texts = useMemo(() => ["You'll Enjoy Without the Hassle", "No Stress, Just Streaming", "Endless Entertainment"], []); // Memoize texts to avoid re-creating the array on every render
    const [displayed, setDisplayed] = useState("");       // The currently displayed text string
    const [index, setIndex] = useState(0);                // The current character index within the *current* text
    const [isTyping, setIsTyping] = useState(true);       // Boolean to control typing vs. deleting
    const [isWaiting, setIsWaiting] = useState(false);    // Boolean to pause between typing/deleting cycles
    const [textIndex, setTextIndex] = useState(0);        // The current index of the text being displayed from the 'texts' array
    
    // useEffect to handle the typing and deleting effect
    useEffect(() => {
        if (isWaiting) return; // If waiting, do nothing (important for timing)

        const currentText = texts[textIndex]; // Get the text to be displayed

        const interval = setInterval(() => {
          if (isTyping) {
            // Typing logic
            if (index < currentText.length) {
              // If we haven't reached the end of the current text
              setDisplayed((prev) => prev + currentText[index]); // Add the next character
              setIndex((prev) => prev + 1);                      // Move to the next character
            } else {
              // We've finished typing the current text
              setIsWaiting(true);         // Start waiting
              setTimeout(() => {
                setIsTyping(false);       // Switch to deleting after the delay
                setIsWaiting(false);      // Stop waiting
              }, delay);
            }
          } else {
            // Deleting logic
            if (index > 0) {
              // If we haven't reached the beginning of the displayed text
              setDisplayed((prev) => prev.slice(0, -1));      // Remove the last character
              setIndex((prev) => prev - 1);                   // Move to the previous character
            } else {
              // We've finished deleting the current text
              setIsWaiting(true);         // Start waiting
              setTimeout(() => {
                setIsTyping(true);        // Switch to typing after the delay
                setTextIndex((prev) => (prev + 1) % texts.length); // Move to the next text in the array (looping)
                setIsWaiting(false);       // Stop waiting
              }, delay);
            }
          }
        }, isTyping ? speed : speed / 2); // Use 'speed' for typing, 'speed/2' for deleting

        // Cleanup:  Clear the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
    }, [index, isTyping, isWaiting, textIndex, texts, speed, delay]);

  return (
    <h1 aria-live="polite">
      Find <span className='text-gradient'>Movies</span> {displayed}
      <span className={`animate-pulse ${isWaiting ? 'opacity-0' : 'opacity-100'}`}>|</span>
    </h1>
  );
};

export default TypingText;
