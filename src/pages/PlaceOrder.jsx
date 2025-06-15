import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  
  const { navigate, backendUrl, setCartItems, cartItems, token, delivery_fee, getCartAmount, products } = useContext(ShopContext)
  const [method, setMethod] = useState('cod');
  const [submit,setSubmit] = useState(false)
  const [loading,setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
  
    if (name === "phone") {
      formattedValue = value.replace(/\D/g, ""); 
  
      if (formattedValue.startsWith("0")) {
        formattedValue = "92" + formattedValue.substring(1);

      }
  
      if (!formattedValue.startsWith("92")) {
        formattedValue = "92" + formattedValue;

      }
  
      if (formattedValue.length > 12) {
        formattedValue = formattedValue.substring(0, 12);
      }

      formattedValue = "+" + formattedValue;

    }
  
    setFormData((data) => ({ ...data, [name]: formattedValue }));
  };
  
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmit(true)
    setLoading(true)
    try {
      let orderItems = []

      if(formData.phone.length!==13){
        toast.error("Enter a valid phone number.");
      }
      else{
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post( backendUrl+'/api/order/place', orderData, { headers: { token } });

          if(response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'online':
          const responseOnline = await axios.post(backendUrl + '/api/order/online',orderData,{headers:{token}}) 

          if (responseOnline.data.success) {
            setCartItems({});
            navigate('/orders')
            toast.success("You will be contacted soon for payment verification on your provided phone number.",{autoClose:15000})
          } else {
            
          }
    
         break;

        default:
          break;
      }
    }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    }finally{
      setLoading(false)
      setSubmit(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row gap-4 justify-between pt-4 sm:pt-14 min-h-[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className="border border-gray-300 rounded py-1 5 outline-none px-3 5 w-full" placeholder='First Name' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className="border border-gray-300 rounded py-1 5 px-3 5 w-full outline-none" placeholder='Last Name' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" className="border border-gray-300 rounded py-1 5 px-3 5 outline-none w-full" placeholder='Email' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" className="border border-gray-300 rounded py-1 5 outline-none px-3 5 w-full" placeholder='Street' required />
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" className="border outline-none border-gray-300 rounded py-1 5 px-3 5 w-full" placeholder='City' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} type="text" className="border border-gray-300 outline-none rounded py-1 5 px-3 5 w-full" placeholder='State' />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className="border outline-none border-gray-300 rounded py-1 5 px-3 5 w-full" placeholder='Zipcode' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" className="border border-gray-300 outline-none rounded py-1 5 px-3 5 w-full" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className="border outline-none border-gray-300 rounded py-1 5 px-3 5 w-full" placeholder='Phone Number' required />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <Carttotal />

          <div className="mt-12">
            <Title text1={'Payment'} text2={'Method'} />
            <div className="flex gap-3 flex-col">
              <div onClick={() => setMethod('jz')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'jz' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">JAZZ CASH</p>
              </div>
              <div onClick={()=>setMethod("easy")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'easy' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">EASY PAISA</p>
              </div>
              <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
              {
                method==='jz'?<div className='border rounded shadow-md p-2'>
                  <h1 className='text-lg mt-1 mb-1'><span className='font-bold'>Jazzcash account</span> : 00000000</h1><h1 className='text-lg'><span className='font-bold'>Name</span> : abcd efgh</h1>
                  <h1 className='text-lg mt-1'><span className='font-bold'>Note </span>: Send screenshot of the bank receipt<br/> on this whatsapp number : 000000000</h1>
                </div>:''}{
                method==='easy'?<div className='border rounded shadow-md p-2'>
                  <h1 className='text-lg mt-1 mb-1'><span className='font-bold'>Easypaisa account</span> : 00000000</h1><h1 className='text-lg'><span className='font-bold'>Name</span> : abcd efgh</h1>
                  <h1 className='text-lg mt-1'><span className='font-bold'>Note </span>: Send screenshot of the bank receipt<br/> on this whatsapp number : 000000000</h1>
                </div>:''
              }
            </div>
            <div className="w-full text-end mt-8">
              <button type='submit' disabled={submit} className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
