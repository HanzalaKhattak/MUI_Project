import React, { useState } from 'react';
import { Grid, Card, CardMedia, Typography, Box, Button } from '@mui/material';
import categories from '../../reuseableComponents/jsons/categories.json';

const Categories = () => {
  const [showAll, setShowAll] = useState(false);

  // Toggle categories
  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  // Categories to display
  const displayedCategories = showAll ? categories : categories.slice(0, 16);

  return (
    <Box sx={{ py: 4, backgroundColor: '#fafafa' }}>
      {/* Title */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Categories
      </Typography>

      {/* Categories Grid */}
      <Grid container spacing={2} justifyContent="center">
        {displayedCategories.map((cat) => (
          <Grid item xs={6} sm={3} md={2} key={cat.id}>
            <Card
              sx={{
                width: '140px', // Fixed width
                height: '160px', // Fixed height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 'none',
                cursor: 'pointer',
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardMedia
                component="img"
                image={cat.img}
                alt={cat.name}
                sx={{
                  height: 80,
                  width: 'auto',
                  objectFit: 'contain',
                  mt: 2
                }}
              />
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: 'text.primary',
                  mb: 2
                }}
              >
                {cat.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Show More / Show Less Button */}
      {categories.length > 16 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleToggle}
            sx={{ borderRadius: 20, px: 4, textTransform: 'none', fontWeight: 500 }}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Categories;
