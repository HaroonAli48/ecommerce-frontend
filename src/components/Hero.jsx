import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border-gray-400 border'> 
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#41414]">
          <div className="flex gap-2 items-center">
            <p className='bg-[#414141] w-8 md:w-11 h-[2px]'></p>
            <p className='font-medium text-sm md:text-base'>Latest Arrivals</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg-text-5xl leading-relaxed'>Arooj Collection</h1>
          <div className='flex gap-2 items-center'>
            <p className='font-semi-bold font-sm md-text-base'>Shop Now</p>
            <p className='bg-[#414141] w-8 md:w-11 h-[1px]'></p>
          </div>
        </div>
      </div>
      <img src={assets.hero_img} className='w-full sm:w-1/2' alt="" />
    </div>
  )
}

export default Hero
