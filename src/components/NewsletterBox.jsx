import React from 'react'

const NewsletterBox = () => {

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center'>
        <p className="text-gray-800 text-2xl font-medium">Subscribe Now</p>
        <p className="mt-3 text-gray-400">Subscribe To Our NewsLetter To Get Notified About Amazing Discounts.</p>
        <form onSubmit={onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
           <input type="email" placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' required/>
           <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
    </div>

  )
}

export default NewsletterBox
