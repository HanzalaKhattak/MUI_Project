import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const TrackOrder = () => {
  return (
        <Box sx={{bgcolor: '#eee', display : "flex", justifyContent: "space-between", alignItems: "center", px: 10, height: 120}}>
          <Box>
            <Typography variant='h5' sx={{fontWeight :'bold'}}>Track Your Order</Typography>
            <Typography variant='body1' sx={{textDecoration: 'underline'}}>Order no: 1234567</Typography>
            <Typography variant='body2'>Your order is at Stage 3</Typography>
          </Box>
          <Box sx={{display : 'flex', gap: 5}}>
            <Button 
                sx={{ textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',                    
                textDecoration: 'underline',
                border : 1
            }}}>
                Stage No 1
            </Button>
            
            <Button 
                sx={{ textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',                    
                textDecoration: 'underline',
                border : 1
            }}}>
                Stage No 2
            </Button>            
            <Button 
                sx={{ textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',                    
                textDecoration: 'underline',
                border : 1
            }}}>
                Stage No 3
            </Button>
            <Button 
                sx={{ textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',                    
                textDecoration: 'underline',
                border : 1
            }}}>
                Stage No 4
            </Button>
            <Button 
                sx={{ textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',                    
                textDecoration: 'underline',
                border : 1
            }}}>
                Stage No 5
            </Button>
          </Box>
        </Box>
  )
}

export default TrackOrder