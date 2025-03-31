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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quo at quia commodi, illum enim praesentium tenetur adipisci veritatis obcaecati eius, laudantium ex sequi consequatur. Deleniti, dolorum ea? Sit, corporis?
            </p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis temporibus, eum est necessitatibus ab numquam architecto, earum odio dicta commodi optio, repellat odit. Temporibus corrupti iusto a perferendis vel reprehenderit!</p>
            <b className="text-gray-800">Our Mission</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui explicabo, eaque nemo esse nesciunt cupiditate beatae expedita, exercitationem sequi repudiandae tempora dignissimos ullam ea, consectetur facilis enim inventore vitae? Voluptatibus?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col sm:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum consequatur consectetur, architecto deleniti, consequuntur delectus voluptates placeat ut voluptatum incidunt animi commodi, deserunt voluptas reprehenderit. Fugit dolore similique ex maxime?</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convienence:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum consequatur consectetur, architecto deleniti, consequuntur delectus voluptates placeat ut voluptatum incidunt animi commodi, deserunt voluptas reprehenderit. Fugit dolore similique ex maxime?</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum consequatur consectetur, architecto deleniti, consequuntur delectus voluptates placeat ut voluptatum incidunt animi commodi, deserunt voluptas reprehenderit. Fugit dolore similique ex maxime?</p>
        </div>
      </div>
      <OurPolicy/>

    </div>
  )
}

export default About
