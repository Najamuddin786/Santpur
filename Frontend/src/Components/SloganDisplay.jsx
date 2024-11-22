import React, { useState, useEffect } from "react";

const SloganDisplay = () => {
  const englishSlogans = [
    "Your Dream Phone, Now on Easy EMI with Aadhaar!",
    "Own Your Mobile Today, Pay Later with Aadhaar EMI!",
    "Simple Steps to Your Smartphone Dreams!",
    "Buy Now, Pay Flexibly – Aadhaar Makes It Easy!",
    "Smartphones for Everyone – Hassle-Free EMI with Aadhaar!"
  ];

  const hindiSlogans = [
    "आपका सपना फोन, अब आधार कार्ड से आसान ईएमआई पर!",
    "आज ही अपना मोबाइल लाएं, भुगतान आसान बनाएं!",
    "आधार से स्मार्टफोन लेना अब हुआ बेहद आसान!",
    "खरीदें आज, चुकाएं आराम से – आधार ईएमआई के साथ!",
    "हर किसी के लिए स्मार्टफोन – आसान ईएमआई आधार कार्ड से!"
  ];

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"]; // Different colors

  const [currentSlogan, setCurrentSlogan] = useState(englishSlogans[0]); // Initial slogan
  const [currentColor, setCurrentColor] = useState(colors[0]); // Initial color
  const [isEnglish, setIsEnglish] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % englishSlogans.length; // Calculate next index

      // Set next slogan and color
      if (isEnglish) {
        setCurrentSlogan(englishSlogans[nextIndex]);
      } else {
        setCurrentSlogan(hindiSlogans[nextIndex]);
      }
      setCurrentColor(colors[nextIndex]);

      // Toggle language and update index
      setIsEnglish(!isEnglish);
      setIndex(nextIndex);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index, isEnglish]);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        color: currentColor,
        transition: "color 0.5s ease",
        marginTop:'5vh'
      }}
    >
      {currentSlogan}
    </div>
  );
};

export default SloganDisplay;
