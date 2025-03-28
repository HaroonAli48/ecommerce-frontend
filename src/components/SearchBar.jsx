import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search , setSearch ,showSearch , setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className="inline-flex justify-center items-center border border-gray-400 px-5 py-2 mx-5 my-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="flex-1 text-sm outline-none bg-inherit" placeholder='Search'/>
        <img src={assets.search_icon} className="w-4" />
      </div>
      <img onClick={ () => setShowSearch(false) } src={assets.cross_icon} className="inline w-3 cursor-pointer" />
    </div>
  ) : null
}

export default SearchBar
