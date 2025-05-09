import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
 
const Navbar = () => {

  const [visible,setVisible] = useState(false);
  const {setShowSearch , getCartCount, token, setToken, navigate , setCartItems} = useContext(ShopContext);

  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
      <img src={assets.logo} className='w-36' alt="" />
      </Link> 
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col gap-1 items-center'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col gap-1 items-center'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col gap-1 items-center'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col gap-1 items-center'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>  
      <div className="flex items-center gap-6">

        <img onClick={()=>
        {
          setShowSearch(true)
          navigate('/collection')
        }} src={assets.search_icon}  className='w-5 cursor-pointer' alt="" />

        <div className="group relative">
        
          <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
          {token?<div className="group-hover:block hidden z-10 absolute right-0 dropdown-menu pt-4">
            <div className="flex flex-col gap-2 w-36 bg-slate-100 py-3 px-5 text-gray-500 rounded">
             <p className='cursor-pointer hover:text-black'><a href="/profile">My Profile</a></p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>:null}
          
        </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 cursor-pointer min-w-5' alt="" />
            <p className="rounded-full absolute bg-black w-4 right-[-5px] bottom-[-5px] text-white aspect-square text-center text-[8px] leading-4">{getCartCount()}</p>
          </Link>
          <img src={assets.menu_icon} onClick={()=>setVisible(true)} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${visible ? 'w-full':'w-0'}`}>
        <div className='flex flex-col'>
          <div onClick={()=>setVisible(false)} className='cursor-pointer flex items-center text-gray-600 p-3 gap-4'>
            <img className='rotate-180 h-4' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink to='/' className='py-2 pl-6 border' onClick={()=>setVisible(false)}>HOME</NavLink>
          <NavLink to='/collection' className='py-2 pl-6 border' onClick={()=>setVisible(false)}>COLLECTION</NavLink>
          <NavLink to='/about' className='py-2 pl-6 border' onClick={()=>setVisible(false)}>ABOUT</NavLink>
          <NavLink to='/contact' className='py-2 pl-6 border' onClick={()=>setVisible(false)}>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
