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
         
        <div className='cursor-pointer'   onClick={() => window.open("https://www.instagram.com/arooj_collection2/?hl=en", "_blank")}>
            <img src={assets.instagram} className=' max-w-15 h-14 m-auto mb-5' alt="" />
            <p className='font-semi-bold'>Instagram</p>
            <p className='text-gray-400 text-xl'>@arooj_collection2</p>
        </div>
        <div className='cursor-pointer' onClick={()=> window.open("https://wa.me/923017134100?text=Hello%20there!","_blank")}>
            <img src={assets.whatsapp} className='w-14 h-13 m-auto mb-5' alt="" />
            <p className='font-semi-bold'>Whatsapp</p>
            <a
              href="https://wa.me/923017134100?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
            > 
              <p className='text-gray-400 text-xl'>0301-7134100</p>
            </a>
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
