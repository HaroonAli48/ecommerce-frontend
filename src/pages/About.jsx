import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import OurPolicy from '../components/OurPolicy'
const About = () => {
  return (
    <div>
      
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'Us'}/>
      </div>

      <div className="gap-16 md:flex-row flex flex-col my-10">
        <img src={assets.about_img } alt="" className="w-full md:max-w-[450px]" />
        <div className="flex md:w-2/4 flex-col gap-6 justify-center text-gray-700">
            <p>At <b>Arooj Collection</b>, we believe fashion is more than just clothing—it’s a reflection of personality and confidence. Our brand is dedicated to providing stylish, high-quality apparel that blends elegance with comfort. Whether you’re looking for everyday essentials or statement pieces, we offer designs that cater to every style and occasion.
            </p>
            <p>Founded with a passion for fashion, <b>Arooj Collection</b> aims to make trendy, premium-quality clothing accessible to everyone. We prioritize craftsmanship, customer satisfaction, and affordability, ensuring that each piece meets the highest standards. With a seamless shopping experience and exceptional service, we are here to help you express yourself effortlessly.</p>
            <b className="text-gray-800">Our Mission</b>
            <p>At <b>Arooj Collection</b>, our mission is to redefine fashion by offering high-quality, stylish, and affordable clothing. We are committed to blending elegance with comfort while ensuring a seamless shopping experience. With a focus on customer satisfaction, we aim to inspire confidence and individuality through every piece we create.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col sm:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At <b>Arooj Collection</b>, we ensure premium quality with carefully selected fabrics, precise craftsmanship, and strict quality checks. Every piece is designed for durability, comfort, and timeless style. Shop with confidence!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convienence:</b>
          <p className='text-gray-600'>Shopping at <b>Arooj Collection</b> is easy and hassle-free. With a user-friendly website, secure payments, and fast delivery, we bring trendy fashion to your doorstep. Enjoy effortless shopping anytime, anywhere!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At <b>Arooj Collection</b>, customer satisfaction is our priority. Our dedicated support team ensures quick responses, hassle-free returns, and a smooth shopping experience. We’re here to assist you every step of the way!</p>
        </div>
      </div>
      <OurPolicy/>

    </div>
  )
}

export default About
