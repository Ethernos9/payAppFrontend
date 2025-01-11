import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import axios from "axios";

const Login = () => {
 
  return (
    <div className='grid grid-cols-2 border max-h-screen border-red-700'>
           <div className='border w-full h-screen border-yellow-600'>
                 <div className='text-center text-blue-600 pt-12'>
                    <h1>Welcome Back </h1>
                    <p>Let's get back to your dashboard</p>
                 </div>
                <LoginForm isLogin = {true} />
           </div>

           <div className="bg-blue-600 flex items-center justify-center w-full h-screen">
             <img src="./logoSbi.png" alt="" height={100} width={120} />
           </div>
    </div>
  )
}

export default Login