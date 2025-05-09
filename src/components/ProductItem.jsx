import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price,stock}) => {

    const {currency} = useContext(ShopContext);

  return (
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className='pb-1 pt-3 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency} {price}</p>
        {stock?null:<p className='text-red-600 font-bold'>Out of stock!</p>}
      </Link>
  )
}

export default ProductItem
