import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
const login = () => {
const [LoginInfo, setLoginInfo] = useState({email:"",password:""})

const navigate= useNavigate()
const HandleLogin=async(e) => {
  e.preventDefault()
  const {email,password}=LoginInfo
  if( !email || !password){
    return handleError('email and pass are required')
  }
  try {
    const url="https://crackheads-three.vercel.app/auth/login"
    const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(LoginInfo)
    })
    const result=await response.json()
    const {success,message,jwtToken,name,error,id}=result;
    if (success){
      handleSuccess(message)
      localStorage.setItem('token',jwtToken)
      localStorage.setItem('loggedInUser',name)
      localStorage.setItem('id',id)
      setTimeout(() => {
        navigate("/home")
      }, 1000);
    } else if(error){
      const details=error?.details[0].message
      handleError(details)
    }else if(!success){
      handleError(message)
    }
  } catch (err) {
    handleError(err)
  }

}



    const HandleChange=(e) => {
      const {name,value}=e.target
      const copyLoginInfo={...LoginInfo}
      copyLoginInfo[name]=value;
      setLoginInfo(copyLoginInfo)
    }
    
  return (
    <div className=" h-[90vh] flex items-center justify-center ">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
      <form onSubmit={HandleLogin} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            onChange={HandleChange}
            type="text"
            name="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            onChange={HandleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#B9FF66] hover:bg-green-400 text-black font-semibold rounded-md transition duration-200"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  </div>
  )
}

export default login