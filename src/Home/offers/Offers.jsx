import React from 'react';
import { Grid, Card, CardMedia, Typography, Button, Box } from '@mui/material';
import offersData from '../../reuseableComponents/jsons/offers.json';
import image from '../slider/sliderImages/image 2.jpg'

const Offers = () => {
  const { mainBanner, sideBanners } = offersData;

  return (
    <Box sx={{ p: 4, display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Box>
        <Grid container spacing={2}>
        {/* Left Side - Main Banner */}
        <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: 500,
                width: 600,
                bgcolor: '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 2,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color:'white', fontWeight: 'bold', fontSize: '2rem' }}>
                  {mainBanner.title}
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<span>→</span>}
                  sx={{ textTransform: 'none', borderColor: 'white', mt: 2, fontWeight: 'bold', color:'white', '&:hover': { bgcolor: 'gray', borderColor: 'white', } }}
                >
                  {mainBanner.cta}
                </Button>
              </Box>
            </Card>
        </Grid>

        {/* Right Side - Three Small Banners */}
        <Grid item xs={12} md={4} container direction="column" spacing={2} sx={{width:500}}>
          {sideBanners.map((banner, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  height: 155,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor:'#eee',
                  p: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: 1,
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{}}
                >
                  <Typography variant="h6" sx={{ mb: 1, color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {banner.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    endIcon={<span>→</span>}
                    sx={{ textTransform: 'none', color: 'white', borderColor: 'white', fontWeight: 'bold', '&:hover': { bgcolor: 'gray', borderColor: 'black' } }}
                  >
                    {banner.cta}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default Offers;
