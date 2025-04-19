import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
const signup = () => {
const [SignUpInfo, setSignUpInfo] = useState({name:"",email:"",password:""})

const navigate= useNavigate()
const HandleSignup=async(e) => {
  e.preventDefault()
  const {name,email,password}=SignUpInfo
  if(!name || !email || !password){
    return handleError('name,email and pass are required')
  }
  try {
    const url="https://authentication-project-server.vercel.app/auth/signup"
    const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(SignUpInfo)
    })
    const result=await response.json()
    const {success,message,error}=result;
    if (success){
      handleSuccess(message)
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    } else if(error){
      const details=error?.details[0].message
      handleError(details)
    }else if(!success){
      handleError(message)
    }
    console.log(result)
  } catch (err) {
    handleError(err)
  }

}



    const HandleChange=(e) => {
      const {name,value}=e.target
      console.log(name,value)
      const copySignUpInfo={...SignUpInfo}
      copySignUpInfo[name]=value;
      setSignUpInfo(copySignUpInfo)
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center ">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-center mb-6">Signup</h1>
      <form onSubmit={HandleSignup} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            onChange={HandleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          className="w-full  py-2 px-4 bg-[#B9FF66] hover:bg-green-400  text-black font-semibold rounded-md transition duration-200"
        >
          Signup
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  </div>
  
  )
}

export default signup