import React from 'react'
import { Box } from '@mui/material'
import Slider from './slider/Slider'
import TrackOrder from './trackYourOrder/TrackOrder'
import BuyAgain from './buyAgain/BuyAgain'
import RecentProducts from './recentProducts/RecentProducts'
import Deals from './Deals/Deals'
import Categories from './categories/Categories'
import Offers from './offers/Offers'


const Home = () => {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <Slider/>
        <TrackOrder/>
        <BuyAgain/>
        <Deals/>
        <Categories/>
        <Offers/>
        <RecentProducts/>
      </Box>
    </>
  )
}

export default Home