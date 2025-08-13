import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import image1 from '../../assets/sliderimages/image 1.jpeg';
import image2 from '../../assets/sliderimages/image 2.jpg';
import image3 from '../../assets/sliderimages/image 3.jpg';
import image4 from '../../assets/sliderimages/image 4.jpg';

const images = [image1, image2, image3, image4];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px', 
      overflow: 'hidden',
    }}>
      
      <img
        src={images[current]}
        alt={`slide-${current}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onError={e => { e.target.src = 'https://via.placeholder.com/1200x400?text=No+Image'; }}
      />

      <div style={{
        position: 'absolute',
        left: 32,
        bottom: 32,
        display: 'flex',
        gap: 8,
        zIndex: 2,
      }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === current ? '#222' : '#bbb',
              display: 'inline-block',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      <div style={{
        position: 'absolute',
        right: 32,
        bottom: 32,
        display: 'flex',
        gap: 8,
        zIndex: 2,
      }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            bgcolor: 'white',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: 'grey.200' }
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            bgcolor: 'black',
            color: 'white',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: 'grey.800' }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Slider;