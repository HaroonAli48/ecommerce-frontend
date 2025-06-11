import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Cart from './Cart';

const Profile = () => {
  const { userName, userEmail } = useContext(ShopContext);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center text-2xl mb-10">
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      {/* Profile Info */}
      <div className="grid sm:grid-cols-[1fr_2fr] gap-6 items-center bg-white p-6 rounded-lg shadow-md">
        {/* Profile Image */}
        <div className="flex justify-center sm:justify-end">
          <img
            src={assets.user2}
            alt="User"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* User Details */}
        <div>
          <div className="mb-6">
            <h2 className="font-semibold text-lg sm:text-xl text-gray-800">Your Name:</h2>
            <p className="text-gray-600 text-md sm:text-lg mt-1">{userName}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg sm:text-xl text-gray-800">Your Email:</h2>
            <p className="text-gray-600 text-md sm:text-lg mt-1">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <div className="mt-10">
        <Cart />
      </div>
    </div>
  );
};

export default Profile;
