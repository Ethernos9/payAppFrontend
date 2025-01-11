import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'

import axios from 'axios'

const useAccounts = () => {

  //  const { user, error, setError } = useContext(userContext)

  const [accounts, setAccounts] = useState([])

///http://localhost:5000/api/v2/get/accounts

  useEffect(() => {
    const getAccounts = async()=>{
      try {
        const response = await axios.get('https://payappbacknend.onrender.com/api/v2/get/accounts',
          { withCredentials: true })
        console.log("response form account", response.data.accounts)
        setAccounts(response.data.accounts)
      } catch (err) {
       console.log("error : ", err)
      }
    }
    getAccounts()
  }, [])
  return {accounts}
 
 
}

export default useAccounts