import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Cart from './Cart'

const Profile = () => {
  const{userName,userEmail} = useContext(ShopContext)
  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title text1={'MY'} text2={'PROFILE'}/>
      </div>
      <div className='grid sm:grid-cols-[1fr_3fr] gap-5 mb-0 sm:mb-20'>
        <div className='flex m-auto'>
          <img src={assets.user2} className='h-25' alt="" />
        </div>
        <div className='sm:py-8 sm:px-10 py-8'>
          <h1 className='font-bold text-2xl'>Your Name:</h1>
          <p className='text-xl text-gray-700 my-3'>{userName}</p>
          <h1 className='font-bold text-2xl'>Your Email:</h1>
          <p className='text-xl text-gray-700 my-3'>{userEmail}</p>
        </div>
      </div>
      <Cart/>
    </div>
  )
}

export default Profile
