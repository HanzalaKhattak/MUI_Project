import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import offersProducts from '../../reuseableComponents/jsons/offersProducts.json';

const OffersProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const CARD_WIDTH = 190;
  const CARD_GAP = 16;
  const CARDS_PER_VIEW = 6;
  
  // Calculate max index to ensure last card is fully visible
  const maxIndex = useMemo(() => {
    if (offersProducts.length <= CARDS_PER_VIEW) {
      return 0; // If we have 6 or fewer products, no scrolling needed
    }
    return offersProducts.length - CARDS_PER_VIEW; // This ensures last card is fully visible
  }, []);
  
  const handlePrevious = useCallback(() => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, [isScrolling]);

  const handleNext = useCallback(() => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [isScrolling, maxIndex]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setIsScrolling(true);
      const scrollPosition = currentIndex * (CARD_WIDTH + CARD_GAP);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Offers Products</Typography>
        <Button variant="outlined" size="small" endIcon={<ArrowForwardIosIcon />}>View All</Button>
      </Box>

      {/* Product Slider */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        

        {/* Cards Container */}
        <Box sx={{ 
          position: 'relative', 
          width: CARDS_PER_VIEW * CARD_WIDTH + (CARDS_PER_VIEW - 1) * CARD_GAP,
          overflow: 'hidden'
        }}>
          <Box 
            ref={scrollContainerRef}
            sx={{ 
              display: 'flex', 
              gap: `${CARD_GAP}px`,
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {offersProducts.map((product) => (
              <Box key={product.id} sx={{ 
                minWidth: CARD_WIDTH, 
                maxWidth: CARD_WIDTH,
                flexShrink: 0
              }}>
                <Card
                  sx={{
                    position: 'relative',
                    height: 230,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                    backgroundImage: `url(${product.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay for content */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.10)',
                    zIndex: 1,
                  }} />

                  {/* Label */}
                  <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                    <Typography sx={{ fontSize: "0.75rem", mb: 0.5, color: "#666", fontWeight: 'bold' }}>
                      {product.label}
                    </Typography>
                  </Box>

                  {/* Heart Icon */}
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton size="small" sx={{ bgcolor: "transparent", "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } }}>
                      <FavoriteBorderIcon sx={{ fontSize: 20, color: "#666" }} />
                    </IconButton>
                  </Box>

                  {/* Cart Icon */}
                  <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
                    <IconButton size="small" sx={{ bgcolor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f5f5f5" } }}>
                      <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: "#333" }} />
                    </IconButton>
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ width: "100%", mt: 2, px: 1 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1rem", mb: 1, lineHeight: 1.3 }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating sx={{ color: "black" }} name="read-only" value={product.rating} readOnly size="small" />
                      <Typography variant="caption" sx={{ color: "text.secondary", ml: 1, fontSize: "1rem" }}>
                        {product.reviews}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        QAR {product.price}
                      </Typography>
                      <Typography sx={{ textDecoration: "line-through", color: "#999", fontSize: "1rem" }}>
                        QAR {product.oldPrice}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box  sx={{display:'flex', justifyContent:'space-between', alignItems:'center', mt:2}}>
              {/* Page Indicators */}
      <Box sx={{ display: 'flex',gap: 1, mt: 2 }}>
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <Box
            key={i}
            onClick={() => setCurrentIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: currentIndex === i ? '#222' : '#ccc',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          />
        ))}
      </Box>
      <Box>
        {/* Previous Arrow */}
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{ 
            bgcolor: 'white', 
            border: '1px solid #ccc', 
            '&:hover': { bgcolor: '#eee' },
            '&.Mui-disabled': { opacity: 0.5 }
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Next Arrow */}
        <IconButton
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          sx={{ 
            bgcolor: 'black', 
            color: 'white', 
            border: '1px solid #ccc', 
            '&:hover': { bgcolor: '#222' },
            '&.Mui-disabled': { opacity: 0.5 }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      </Box>
      </Box>

  );
}
                       

export default OffersProducts;