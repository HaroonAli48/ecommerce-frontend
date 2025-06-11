import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';

const OurPolicy = () => {
  return (
    <div className="my-10 px-4">
      {/* Title Section (unaltered height) */}
      <div className="text-center text-3xl mb-4">
        <Title text1="Contact" text2="Us" />
      </div>

      {/* Contact Options */}
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700">
        
        {/* Instagram */}
        <div
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() =>
            window.open(
              'https://www.instagram.com/arooj_collection2/?hl=en',
              '_blank'
            )
          }
        >
          <img
            src={assets.instagram}
            className="max-w-15 h-14 mx-auto mb-5"
            alt="Instagram"
          />
          <p className="font-semibold">Instagram</p>
          <p className="text-gray-400 text-xl">@arooj_collection2</p>
        </div>

        {/* WhatsApp */}
        <div
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() =>
            window.open(
              'https://wa.me/923017134100?text=Hello%20there!',
              '_blank'
            )
          }
        >
          <img
            src={assets.whatsapp}
            className="w-14 h-13 mx-auto mb-5"
            alt="WhatsApp"
          />
          <p className="font-semibold">WhatsApp</p>
          <p className="text-gray-400 text-xl">0301-7134100</p>
        </div>

        {/* Facebook */}
        <div className="hover:opacity-90 transition-opacity">
          <img
            src={assets.logo}
            className="w-12 mx-auto mb-5"
            alt="Facebook"
          />
          <p className="font-semibold">Facebook</p>
          <p className="text-gray-400 text-xl">XXXXXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
