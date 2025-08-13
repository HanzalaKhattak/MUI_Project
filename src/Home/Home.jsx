import React from 'react'
import Slider from './slider/Slider'
import TrackOrder from './trackYourOrder/TrackOrder'


const Home = () => {
  return (
    <>
      <div className='flex flex-col gap-20'>
        <Slider/>
        <TrackOrder/>
      </div>
    </>
  )
}

export default Home