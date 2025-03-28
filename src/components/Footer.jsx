import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:2/3 text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio consequatur dolore animi? Non magni ducimus vitae culpa nesciunt eius ex necessitatibus recusandae officia. Recusandae eligendi voluptatibus laborum laudantium expedita doloribus?</p>
        </div>
        <div>
            <p  className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+1-234-567-890</li>
                <li>contact@forever.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ HHCollection - All Rights Reserved - Powered By HMH Studios</p>
      </div>
    </div>
  )
}

export default Footer
