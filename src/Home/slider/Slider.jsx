import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import image1 from "./sliderImages/image 1.jpeg";
import image2 from "./sliderImages/image 2.jpg";
import image3 from "./sliderImages/image 3.jpg";
import image4 from "./sliderImages/image 4.jpg";

const IMAGES = [
  { image: image1, alt: "Slider Image 1" },
  { image: image2, alt: "Slider Image 2" },
  { image: image3, alt: "Slider Image 3" },
  { image: image4, alt: "Slider Image 4" },
];

const SLIDE_INTERVAL = 3000;
const TRANSITION_DURATION = 500;
const SLIDER_HEIGHT = 400;

const Slider = () => {
  const [current, setCurrent] = useState(1); 
  const [transition, setTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const slides = useMemo(() => [
    IMAGES[IMAGES.length - 1], 
    ...IMAGES,
    IMAGES[0],
  ], []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

 
  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);
  }, [handleNext, clearTimer]);

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      clearTimer();
    }
    
    return clearTimer;
  }, [isHovered, startTimer, clearTimer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
      } else if (!isHovered) {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimer();
    };
  }, [isHovered, startTimer, clearTimer]);

  const handleTransitionEnd = useCallback(() => {
    if (current === 0) {
      setTransition(false);
      setCurrent(IMAGES.length); 
    } else if (current === IMAGES.length + 1) {
      setTransition(false);
      setCurrent(1); 
    }
  }, [current]);

  useEffect(() => {
    if (!transition) {
      const id = setTimeout(() => {
        setTransition(true);
      }, 50);
      return () => clearTimeout(id);
    }
  }, [transition]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const isIndicatorActive = useCallback((idx) => {
    return idx + 1 === current ||
           (current === 0 && idx === IMAGES.length - 1) ||
           (current === IMAGES.length + 1 && idx === 0);
  }, [current]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${SLIDER_HEIGHT}px`,
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transition: transition ? `transform ${TRANSITION_DURATION / 1000}s ease-in-out` : "none",
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
              height: `${SLIDER_HEIGHT}px`,
              objectFit: "cover",
            }}
            loading="lazy" 
            onError={(e) => {
              const target = e.target;
              if (target.src !== "https://via.placeholder.com/1200x400?text=No+Image") {
                target.src = "https://via.placeholder.com/1200x400?text=No+Image";
              }
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
        {IMAGES.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: isIndicatorActive(idx) ? "#222" : "#bbb",
              display: "inline-block",
              transition: "background 0.3s",
              cursor: "pointer",
            }}
            onClick={() => setCurrent(idx + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrent(idx + 1);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Go to slide ${idx + 1}`}
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
          aria-label="Previous slide"
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
          aria-label="Next slide"
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
