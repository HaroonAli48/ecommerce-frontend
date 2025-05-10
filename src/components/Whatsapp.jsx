import React from 'react'
import { assets } from '../assets/assets'

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/923017134100?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"      
    >
      <div className="flex items-center justify-center rounded-full w-14 h-14 sm:w-18 sm:h-18 bg-green-500 shadow-xl shadow-green-300/50">
          <img src={assets.whatsapp3} alt="WhatsApp Icon" className="w-full " />
      </div>
    </a>
  )
}

export default Whatsapp
