import { assets } from '../assets/assets'
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Hero = ({ latestCollectionRef }) => {
  return (
    <div className='h-auto flex flex-col sm:flex-row items-center justify-between border border-gray-300 bg-white rounded-2xl shadow-md overflow-hidden'>
      <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
        <div className="text-gray-800 space-y-4">
          <div className="flex gap-3 items-center">
            <div className='bg-gray-700 w-10 h-[2px]'></div>
            <p className='text-sm md:text-base font-semibold uppercase tracking-wider text-gray-600'>Latest Arrivals</p>
          </div>
          <h1 className='text-4xl lg:text-5xl font-bold font-serif leading-snug text-[#1f1f1f]'>
            Arooj Collection
          </h1>
          <div className='flex gap-3 items-center pt-2'>
            <button
              onClick={() =>
                latestCollectionRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className='bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition'
            >
              Shop Now
            </button>
            <div className='bg-gray-700 w-10 h-[1px]'></div>
          </div>
        </div>
      </div>

      <div className='w-full sm:w-1/2'>
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          stopOnHover={false}
          swipeScrollTolerance={100}
        >
          <div>
            <img className="w-full h-[460px] object-cover object-center"
              src="https://res.cloudinary.com/dsqrvypib/image/upload/v1744549569/sdcwtlncyjb4babqtd32.jpg"
              alt="Arooj Collection"
            />
          </div>
          <div>
            <img
              className="w-full h-[460px] object-cover object-center"
              src="https://res.cloudinary.com/dsqrvypib/image/upload/v1744549638/qvb0qsmjft2wn9hl83jz.jpg"
              alt="Instagram"
            />
          </div>
          <div>
            <img
              className="w-full h-[460px] object-cover object-center"
              src="https://res.cloudinary.com/dsqrvypib/image/upload/v1744549713/lvgpcbawqse7fjhf39ch.jpg"
              alt="WhatsApp"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
