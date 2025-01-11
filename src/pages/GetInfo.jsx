import React, { useContext } from 'react'
import useGetAccountDetails from '../hooks/useGetAccountDetails'
import { userContext } from '../contexts/userContext'

const GetInfo = () => {
    const {info} = useGetAccountDetails() 
    const {user} = useContext(userContext)
   
    console.log("user: " , user)
  return (
    <div>
        GetInfo
        {user && <p>Hello, {user.name}!</p>}
      {console.log(info)}
    </div>
  )
}

export default GetInfo