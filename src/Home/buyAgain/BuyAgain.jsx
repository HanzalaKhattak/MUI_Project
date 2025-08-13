import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, IconButton, Button, Container, useTheme, useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Visibility as ViewAllIcon,
} from '@mui/icons-material';
import ViewOrders from './viewOrder/ViewOrders';
import { MOCK_ORDERS } from '../../reuseableComponents/jsons/MockOrders';

// Constants for better maintainability
const CARD_WIDTH = 280;
const CARDS_PER_VIEW = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
  large: 5
};

const BuyAgain = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('xl'));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const scrollContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const cardsPerView = useMemo(() => {
    if (isMobile) return CARDS_PER_VIEW.mobile;
    if (isTablet) return CARDS_PER_VIEW.tablet;
    if (isLarge) return CARDS_PER_VIEW.large;
    return CARDS_PER_VIEW.desktop;
  }, [isMobile, isTablet, isLarge]);

  const maxIndex = useMemo(() => {
    return Math.max(0, MOCK_ORDERS.length - cardsPerView);
  }, [cardsPerView]);

  const handlePrevious = useCallback(() => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, [isScrolling]);

  const handleNext = useCallback(() => {
    if (isScrolling) return;
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [isScrolling, maxIndex]);

  const handleViewAll = useCallback(() => {
    setShowViewAllModal(false);
  }, []);

  const handleCloseViewAll = useCallback(() => {
    setShowViewAllModal(false);
  }, []);

  const handleBuyAgain = useCallback((orderId) => {
    console.log('Buy again order:', orderId);
  }, []);

  const handleCardClick = useCallback((orderId) => {
    console.log('View order details:', orderId);
  }, []);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }
  }, [currentIndex, maxIndex, handleNext, handlePrevious]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setIsScrolling(true);
      const scrollPosition = currentIndex * (CARD_WIDTH + 16); 
      
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

  const OrderCard = React.memo(({ order, onClick, onBuyAgain }) => (
    <Card
      sx={{
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        height: 200,
        cursor: 'pointer',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)',
        }
      }}
      onClick={() => onClick(order.id)}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Date: {order.date}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="bold">
            {order.price}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Order No: {order.orderNumber}
        </Typography>

        <Box sx={{ flex: 1, mb: 2 }}>
          {order.items.map((item, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {item.quantity} x {item.name}
            </Typography>
          ))}
        </Box>

        <Button
          variant="contained"
          size="small"
          fullWidth
          sx={{
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: 'grey.800',
            },
            textTransform: 'none',
            fontWeight: 'bold'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onBuyAgain(order.id);
          }}
        >
          {order.status}
        </Button>
      </CardContent>
    </Card>
  ));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Buy again
          </Typography>

          <Button
            variant="outlined"
            endIcon={<ViewAllIcon />}
            onClick={handleViewAll}
            sx={{
              textTransform: 'none',
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'grey.600',
                backgroundColor: 'grey.50'
              }
            }}
          >
            View All
          </Button>
        </Box>

        

        <Box sx={{ position: 'relative' }}>
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {MOCK_ORDERS.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={handleCardClick}
                onBuyAgain={handleBuyAgain}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5, position: 'absolute', bottom:8, zIndex:1     }}>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'black' : 'grey.300',
                transition: 'background-color 0.2s ease'
              }}
            />
          ))}
        </Box>

          {!isMobile && (
            <Box sx={{display:'flex', justifyContent: "right", mt:3, gap:1}}>
              <IconButton
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5
                  }
                }}
                aria-label="Previous orders"
              >
                <ChevronLeftIcon />
              </IconButton>
              
              <IconButton
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  border: '1px solid #ccc',
                  '&:hover': {
                    bgcolor: 'grey.800'
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5
                  }
                }}
                aria-label="Next orders"
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <ViewOrders 
        isOpen={showViewAllModal} 
        onClose={handleCloseViewAll} 
      />
    </Container>
  );
};

export default BuyAgain;
