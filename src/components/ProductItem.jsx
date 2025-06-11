import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, stock }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer block border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
      aria-label={`View details for ${name}`}
    >
      <div className="overflow-hidden rounded-t-md">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="px-3 py-2">
        <p className="pt-3 pb-1 text-sm font-semibold" title={name}>
          {name}
        </p>
        <p className="text-sm font-medium">
          {currency} {price.toFixed(2)}
        </p>
        {!stock && (
          <p className="text-red-600 font-bold mt-1" aria-live="polite">
            Out of stock!
          </p>
        )}
      </div>
    </Link>
  )
}

export default ProductItem
