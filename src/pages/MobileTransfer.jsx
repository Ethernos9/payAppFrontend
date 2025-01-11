import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MobileTransfer = () => {
    const [receiverPhoneNumber,setReceiverPhoneNumber] = useState("")
    const [amount,setAmount] = useState(0)
    const [description,setDescription] = useState("")
    const navigate = useNavigate()
    const[error, setError] = useState("")

    const OnChangeReceiver = (e)=>{
        setReceiverPhoneNumber(e.target.value)
    }
    const onChangeAmount = (e)=>{

        setAmount(e.target.value)
    }
    const onDescChange = (e)=>{
        setDescription(e.target.value)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("submitted ")
        try {
          const response = await axios.post("https://payappbacknend.onrender.com/api/v3/transfer/money/phonenumber",
            {
            receiverPhoneNumber,
            description,
            amount: parseFloat(amount)
            },
            {
              withCredentials: true,
            }
          )
         
          if (response.data.success){
            // navigate("/dashboard")
            console.log(" Response from Transfer :----------------(@#$%^)---------------> ", response);
            console.log(" Response from Transfer data:----------------(@#$%^)---------------> ", response.data);
            // window.alert("Transfer Successful")
            // window.alert("Transfer Successful")
            navigate(`/transaction/${response.data.transactionId}`, { state: response.data});
          }
          
        } catch (error) {
          console.log(error)
             console.log(error.message)
             setError(error.response.data.message)
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col'>
        <div>
            <NavBar/>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-4 text-center md:text-4xl">
          Transfer Money
        </h1>
        <p className="text-gray-200 mb-8 text-center text-sm md:text-base">
          Safely transfer money through your account.
        </p>
        <form onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg animate-fadeIn"
        >
        
          <div className="mb-6">
            <label
              htmlFor="receiverPhoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Receiver Mobile  Number
            </label>
            <input
              type="text"
              id="receiverPhoneNumber"
              onChange={OnChangeReceiver}
              required
              placeholder="Enter receiver's account number"
              className="border px-3 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              onChange={onChangeAmount}
              required
              placeholder="Enter the amount"
              className="border px-3 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              onChange={onDescChange}
              placeholder="Enter a brief description"
              className="border px-3 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>



  )
}

export default MobileTransfer