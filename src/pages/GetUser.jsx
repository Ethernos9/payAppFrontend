import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import { userContext } from '../contexts/userContext'

const GetUser = () => {
  const {getUser,fetchUser}  =  useContext(userContext)
  return (
    <div>
        <NavBar/>
        <h1>Get User Page</h1>

        <div  className='flex justify-between'>
        <button
             className='bg-blue-300'
             onClick={getUser}>Get User</button>
       
          <button
             className='bg-blue-300'
             onClick={fetchUser}>Get  ----User</button>
       

        </div>
         

    </div>
  )
}

export default GetUser