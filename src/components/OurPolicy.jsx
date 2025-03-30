import React from 'react'
import {assets} from '../assets/assets'
import Title from './Title'

const OurPolicy = () => {
  return (
    <div className='my-10'>
    <div className="text-center text-3xl ">
    <Title text1={'Contact'} text2={'Us'}/>
    </div>
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 text-xs sm:text-sm  md:text-base text-gray-700'>
         
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semi-bold'>Instagram</p>
            <p className='text-gray-400 text-xl'>XXXXXXXX</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semi-bold'>Whatsapp</p>
            <p className='text-gray-400 text-xl'>0300-xxxxxxx</p>
        </div>
        <div>
            <img src={assets.logo} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semi-bold'>Facebook</p>
            <p className='text-gray-400 text-xl'>XXXXXXXX</p>
        </div>

    </div></div>
  )
}

export default OurPolicy
