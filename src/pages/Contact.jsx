import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import OurPolicy from '../components/OurPolicy'
import Cart from './Cart'
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row mb-20 gap-10">
        <img src={assets.contact_img} alt="" className="md:max-w-[480px] w-full" />
        <div className="flex flex-col justify-center gap-6 items-start">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className='text-gray-500'>Arooj collection is totally based online<br/>and there is no physical store.</p>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br/>Email: a@gmail.com</p>
          {/* <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button> */}
        </div>
      </div>
      <OurPolicy/>
    </div>
  )
}

export default Contact
