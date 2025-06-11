import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { backendUrl } from '../../../admin/src/App';

const Hero = ({ latestCollectionRef }) => {
  const [pic1, setPic1] = useState(null);
  const [pic2, setPic2] = useState(null);
  const [pic3, setPic3] = useState(null);

  useEffect(() => {
    axios.get(`http://192.168.18.84:8080/api/images/latest`)
      .then((res) => {
        setPic1(res.data.pic1);
        setPic2(res.data.pic2);
        setPic3(res.data.pic3);
      })
      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);
console.log(pic1);

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
          swipeScrollTolerance={50}
          preventMovementUntilSwipeScrollTolerance={true}
        >
          {pic1 && (
            <div>
              <img
                className="w-full h-[460px] object-cover object-center"
                src={pic1}
                alt="Image 1"
              />
            </div>
          )}
          {pic2 && (
            <div>
              <img
                className="w-full h-[460px] object-cover object-center"
                src={pic2}
                alt="Image 2"
              />
            </div>
          )}
          {pic3 && (
            <div>
              <img
                className="w-full h-[460px] object-cover object-center"
                src={pic3}
                alt="Image 3"
              />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
