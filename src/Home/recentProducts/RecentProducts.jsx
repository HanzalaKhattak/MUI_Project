import React from "react";
import { useState, useRef, useEffect } from "react";
import { Box, Container, Typography, Divider, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Rating from "@mui/material/Rating";
import image1 from "../slider/sliderImages/image 1.jpeg";
import QuantityBar from "./quntityBar/QuantityBar";
import products from "../../reuseableComponents/jsons/Products";


const RecentProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  
  // Constants for card sizing and spacing
  const CARD_WIDTH = 205;
  const CARD_GAP = 16;
  const CARDS_PER_VIEW = 3.5; // Show 3 full cards + half of the next one
  
  const maxIndex = Math.max(0, products.length - Math.floor(CARDS_PER_VIEW));

  const handlePrevious = () => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

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

  const visibleProducts = products;

  return (
    <>
      <Box sx={{ height: 600, pl:4, pt:4, pb:4}}>
          {/* Main horizontal layout */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            {/* Hero Section */}
            <Box
              sx={{
                backgroundImage: `url(${image1})`,
                width: 400,
                height: 500,
                textAlign: "center",
                pt: 5,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 2,
                flexShrink: 0
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                Recent Search
              </Typography>
              <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
                Lorem ipsum dolor sit amet consectetur adipiscing
              </Typography>
            </Box>

            {/* Products Section */}
            <Box sx={{ flex: 1 }}>
              {/* Products Container */}
              <Box sx={{ 
                position: 'relative', 
                width: CARDS_PER_VIEW * CARD_WIDTH + (Math.floor(CARDS_PER_VIEW) * CARD_GAP),
                overflow: 'hidden'
              }}>
                <Box 
                  ref={scrollContainerRef}
                  sx={{ 
                    display: "flex", 
                    gap: 2, 
                    // mb: 3,
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                      display: 'none'
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                  }}
                >
                  {visibleProducts.map((product) => (
                    <Box key={product.id} sx={{ 
                      minWidth: CARD_WIDTH,
                      maxWidth: CARD_WIDTH,
                      flexShrink: 0
                    }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: 230,
                          bgcolor: "#f5f5f5",
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden"
                        }}
                      >
                        {/* Labels */}
                        <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                          {product.labels.map((label, index) => (
                            <Typography key={index} sx={{ 
                              fontSize: "0.75rem", 
                              mb: 0.5,
                              color: "#666"
                            }}>
                              {label}
                            </Typography>
                          ))}
                        </Box>
                        
                        {/* Heart Icon */}
                        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                          <IconButton size="small" sx={{ 
                            bgcolor: "transparent",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" }
                          }}>
                            <FavoriteBorder sx={{ fontSize: 20, color: "#666" }} />
                          </IconButton>
                        </Box>

                        {/* Product Image Placeholder */}
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          height: "100%",
                          pt: 4,
                          pb: 4
                        }}>
                          <Box sx={{ 
                            width: 120, 
                            height: 80, 
                            bgcolor: "#ddd", 
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <Typography sx={{ fontSize: "2rem" }}>📷</Typography>
                          </Box>
                        </Box>

                        {/* Cart Icon */}
                        <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
                          <IconButton size="small" sx={{ 
                            bgcolor: "white",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            "&:hover": { bgcolor: "#f5f5f5" }
                          }}>
                            <ShoppingCartOutlinedIcon
                              sx={{
                                fontSize: 20,
                                color: "#333"
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <Typography sx={{ 
                          fontWeight: "bold", 
                          fontSize: "1rem", 
                          mb: 1,
                          lineHeight: 1.3
                        }}>
                          {product.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Rating
                            sx={{ color: "black" }}
                            name="read-only"
                            value={product.rating}
                            readOnly
                            size="small"
                          />
                          <Typography variant="caption" sx={{ 
                            color: "text.secondary", 
                            ml: 1,
                            fontSize: "1rem"
                          }}>
                            {product.rating}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Typography sx={{ 
                            fontWeight: "bold", 
                            fontSize: "1.1rem" 
                          }}>
                            {product.price}
                          </Typography>
                          <Typography sx={{ 
                            textDecoration: "line-through", 
                            color: "#999", 
                            fontSize: "1rem" 
                          }}>
                            {product.oldPrice}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ 
                          fontSize: "0.9rem", 
                          mb: 2,
                          color: "#666"
                        }}>
                          {product.description}
                        </Typography>
                        <QuantityBar available={product.available} total={product.total} />
                        <Typography sx={{ 
                          fontSize: "0.9rem", 
                          mt: 1,
                          color: "#666"
                        }}>
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1
              }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: maxIndex + 1 }, (_, i) => (
                    <Box
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: currentIndex === i ? "#222" : "#ccc",
                        cursor: "pointer",
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: "flex", gap: 1, }}>
                  <IconButton
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    sx={{
                      bgcolor: "#f5f5f5",
                      width: 40,
                      height: 40,
                      "&:hover": { bgcolor: "#e0e0e0" },
                      "&:disabled": { opacity: 0.5 }
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: 20 }} />
                  </IconButton>

                  <IconButton
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                    sx={{
                      bgcolor: "#222",
                      color: "white",
                      width: 40,
                      height: 40,
                      "&:hover": { bgcolor: "#333" },
                      "&:disabled": { opacity: 0.5 }
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
      </Box>
    </>
  );
};

export default RecentProducts;
