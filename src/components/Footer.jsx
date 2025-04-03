import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:2/3 text-gray-600'>Arooj Collection – Elevate your wardrobe with timeless elegance and trendy fashion.<br/> At Arooj Collection, we offer high-quality, stylish clothing that blends comfort with sophistication. Shop online and redefine your style today!</p>
        </div>
        <div>
            <p  className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/collection">Products</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li><img src={assets.instagram} className='w-14 h-15' alt="" /></li>
                <li><a>@arooj_collection2</a></li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ AF Collection - All Rights Reserved - Powered By HMH Studios</p>
      </div>
    </div>
  )
}

export default Footer
