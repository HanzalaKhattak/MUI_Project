import { Box } from '@mui/material'
import React from 'react'
import image2 from '../slider/sliderImages/image 2.jpg';
import image3 from '../slider/sliderImages/image 3.jpg';


const Deals = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', gap:4}}>
        <Box>
            <Box sx={{height:150, width:500, border:"1px solid black", borderRadius:2, backgroundImage: `url(${image2})`,}}>
            </Box>
            <Box sx={{textAlign:'center'}}>
              Flash Deals
            </Box>
        </Box>

        <Box>
            <Box sx={{ height:150, width:500, border:"1px solid black", borderRadius:2, backgroundImage: `url(${image3})`,}}>
            </Box>
            <Box sx={{textAlign:'center'}}>
              Time Limited Offers
            </Box>
        </Box> 
    </Box>
  )
}

export default Deals