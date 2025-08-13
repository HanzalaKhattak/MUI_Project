import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import image1 from "./sliderImages/image 1.jpeg";
import image2 from "./sliderImages/image 2.jpg";
import image3 from "./sliderImages/image 3.jpg";
import image4 from "./sliderImages/image 4.jpg";

const images = [
  { image: image1, alt: "Slider Image 1" },
  { image: image2, alt: "Slider Image 2" },
  { image: image3, alt: "Slider Image 3" },
  { image: image4, alt: "Slider Image 4" },
];

const Slider = () => {
  const [current, setCurrent] = useState(1); 
  const [transition, setTransition] = useState(true);
  const trackRef = useRef(null);

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  const handleTransitionEnd = () => {
    if (current === 0) {
      setTransition(false);
      setCurrent(images.length); 
    } else if (current === images.length + 1) {
      setTransition(false);
      setCurrent(1); 
    }
  };


  useEffect(() => {
    if (!transition) {
      const id = setTimeout(() => {
        setTransition(true);
      }, 50);
      return () => clearTimeout(id);
    }
  }, [transition]);


  const slides = [
    images[images.length - 1], 
    ...images,
    images[0],
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
     
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transition: transition ? "transform 0.5s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((img, idx) => (
          <img
            key={idx}
            src={img.image}
            alt={img.alt}
            style={{
              width: `${100 / slides.length}%`,
              height: "400px",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x400?text=No+Image";
            }}
          />
        ))}
      </div>

    
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 32,
          display: "flex",
          gap: 8,
          zIndex: 2,
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background:
                idx + 1 === current ||
                (current === 0 && idx === images.length - 1) ||
                (current === images.length + 1 && idx === 0)
                  ? "#222"
                  : "#bbb",
              display: "inline-block",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: 32,
          display: "flex",
          gap: 8,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            bgcolor: "white",
            border: "1px solid #ccc",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            bgcolor: "black",
            color: "white",
            border: "1px solid #ccc",
            "&:hover": { bgcolor: "grey.800" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Slider;
