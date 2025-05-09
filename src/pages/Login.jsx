import React, { useContext, useState, useEffect  } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState,setCurrentState] = useState('Sign Up');

  const {token,setToken,backendUrl,navigate} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [submit,setSubmit] = useState(false)

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    setLoading(true)
    setSubmit(true)
    try{
        if (currentState === 'Sign Up') {
          const response = await axios.post(backendUrl+'/api/user/register',{name,password,email})
          console.log(response.data)
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else {
            toast.error(response.data.message)
          }
        }
        else{

          const response = await axios.post(backendUrl+'/api/user/login',{email,password})

          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }

        } 
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
    finally{
      setLoading(false)
      setSubmit(false)
    }
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center mb-2 mt-10 gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none w-8 bg-gray-800 h-[1.5px]" />
      </div>
      {currentState === 'Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className={`w-full border border-gray-800 px-3 py-2`} required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className="w-full border border-gray-800 px-3 py-2" required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className="w-full border border-gray-800 px-3 py-2" required/>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {
          currentState === 'Login'
          ? <p className="cursor-pointer" onClick={()=>setCurrentState('Sign Up')}>Create Account</p>
          : <p className="cursor-pointer" onClick={()=>setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button disabled={submit} className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'?loading?'Signing In...':'Sign In':loading?'Signing Up...':'Sign Up'}</button>
    </form>
  )
}

export default Login
