import React, { useState, useCallback, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, IconButton, Button, Chip, Grid, useTheme, useMediaQuery, Modal,
  Backdrop, Fade, Paper, Divider, TextField, InputAdornment, Pagination,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API data
const MOCK_ORDERS = [
  {
    id: 1,
    date: '12/12/2025',
    orderNumber: '1223856',
    items: [
      { name: 'Magenta item', quantity: 2 },
      { name: 'Carrot Items', quantity: 7 }
    ],
    status: 'BUY AGAIN',
    price: '$48.00',
    deliveryDate: '15/12/2025',
    category: 'Groceries'
  },
  {
    id: 2,
    date: '12/12/2025',
    orderNumber: '1223857',
    items: [
      { name: 'Blue Widget', quantity: 1 },
      { name: 'Red Gadget', quantity: 3 }
    ],
    status: 'BUY AGAIN',
    price: '$65.00',
    deliveryDate: '16/12/2025',
    category: 'Electronics'
  },
  {
    id: 3,
    date: '11/12/2025',
    orderNumber: '1223858',
    items: [
      { name: 'Green Tool', quantity: 2 },
      { name: 'Yellow Items', quantity: 5 }
    ],
    status: 'BUY AGAIN',
    price: '$32.00',
    deliveryDate: '14/12/2025',
    category: 'Tools'
  },
  {
    id: 4,
    date: '10/12/2025',
    orderNumber: '1223859',
    items: [
      { name: 'Purple Device', quantity: 1 },
      { name: 'Orange Parts', quantity: 4 }
    ],
    status: 'BUY AGAIN',
    price: '$89.00',
    deliveryDate: '13/12/2025',
    category: 'Electronics'
  },
  {
    id: 5,
    date: '09/12/2025',
    orderNumber: '1223860',
    items: [
      { name: 'Silver Component', quantity: 3 },
      { name: 'Gold Element', quantity: 2 }
    ],
    status: 'BUY AGAIN',
    price: '$156.00',
    deliveryDate: '12/12/2025',
    category: 'Premium'
  },
  {
    id: 6,
    date: '08/12/2025',
    orderNumber: '1223861',
    items: [
      { name: 'Black Item', quantity: 2 },
      { name: 'White Product', quantity: 6 }
    ],
    status: 'BUY AGAIN',
    price: '$73.00',
    deliveryDate: '11/12/2025',
    category: 'Home'
  },
  {
    id: 7,
    date: '07/12/2025',
    orderNumber: '1223862',
    items: [
      { name: 'Fashion Item', quantity: 1 },
      { name: 'Style Accessory', quantity: 2 }
    ],
    status: 'BUY AGAIN',
    price: '$95.00',
    deliveryDate: '10/12/2025',
    category: 'Fashion'
  },
  {
    id: 8,
    date: '06/12/2025',
    orderNumber: '1223863',
    items: [
      { name: 'Sports Equipment', quantity: 1 },
      { name: 'Fitness Gear', quantity: 3 }
    ],
    status: 'BUY AGAIN',
    price: '$120.00',
    deliveryDate: '09/12/2025',
    category: 'Sports'
  }
];

const ORDERS_PER_PAGE = 12;

const ViewOrders = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || order.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  }, [filteredOrders.length]);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(MOCK_ORDERS.map(order => order.category))];
    return cats;
  }, []);

  const handleCloseModal = useCallback(() => {
    onClose();
    setSearchTerm('');
    setSelectedCategory('All');
    setCurrentPage(1);
  }, [onClose]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

  const handleBuyAgain = useCallback((orderId) => {
    console.log('Buy again order:', orderId);
  }, []);

  const handleCardClick = useCallback((orderId) => {
    console.log('View order details:', orderId);
  }, []);

  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleCloseModal]);

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClick={handleBackdropClick}
    >
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', md: '90vw', lg: '80vw' },
            maxWidth: '1200px',
            height: { xs: '95vh', md: '90vh' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h2" fontWeight="bold">
                All Orders ({filteredOrders.length})
              </Typography>
              <IconButton 
                onClick={handleCloseModal} 
                size="large"
                sx={{
                  '&:hover': {
                    backgroundColor: 'grey.100'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                placeholder="Search by order number or items..."
                value={searchTerm}
                onChange={handleSearchChange}
                size="small"
                sx={{ minWidth: { xs: '100%', sm: 250 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => handleCategoryChange(category)}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: selectedCategory === category 
                          ? 'primary.dark' 
                          : 'grey.100'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {paginatedOrders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No orders found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {paginatedOrders.map((order) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
                    <Card
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: theme.shadows[4],
                          transform: 'translateY(-2px)',
                        }
                      }}
                      onClick={() => handleCardClick(order.id)}
                    >
                      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Date: {order.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Order: {order.orderNumber}
                            </Typography>
                            <Chip
                              label={order.category}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            {order.price}
                          </Typography>
                        </Box>
                        
                        <Divider sx={{ my: 1 }} />

                        <Box sx={{ flex: 1, mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Items:
                          </Typography>
                          {order.items.map((item, index) => (
                            <Typography key={index} variant="body2" color="text.secondary" sx={{ pl: 1 }}>
                              • {item.quantity} x {item.name}
                            </Typography>
                          ))}
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                            Delivered: {order.deliveryDate}
                          </Typography>
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
                            handleBuyAgain(order.id);
                          }}
                        >
                          {order.status}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    '&:hover': {
                      backgroundColor: 'grey.100'
                    }
                  }
                }}
              />
            </Box>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ViewOrders;
