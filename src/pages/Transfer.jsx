import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { userContext } from '../contexts/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
    const { user, loading } = useContext(userContext)
     const [error, setError] = useState(null);
     const [loader,setLoader] = useState(false)
    const { accounts } = useContext(userContext);
    const [senderAccountNumber, setSenderAccountNumber] = useState(accounts[0]?.accountNumber);
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const navigate  = useNavigate()
    const [description, setDescription] = useState("");
    console.log("Accounts from Tarnsfer;::::;;;------>", accounts)
    const OnChange = (e)=>{
      setSenderAccountNumber(e.target.value)
    }
    // if (!user){
    //   navigate("/login")
    // }
    const OnChangeReceiver = (e)=>{
        setReceiverAccountNumber(e.target.value)
    }
    const onChangeAmount = (e)=>{

        setAmount(e.target.value)

    }
    const onDescChange = (e)=>{
        setDescription(e.target.value)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoader(true)
        try {
          const response = await axios.post("https://payappbacknend.onrender.com/api/v3/transfer/money",
            {senderAccountNumber,
              receiverAccountNumber,
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
            setLoader(false)
            // window.alert("Transfer Successful")
            navigate(`/transaction/${response.data.transactionId}`, { state: response.data });
          }
          
        } catch (error) {
          console.log(error)
             console.log(error.response.data.message)
             setError(error.response.data.message)
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col">
      {/* NavBar */}
      <div>
        <NavBar />
      </div>

      {/* Transfer Form */}
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
              htmlFor="senderAccountNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sender Account
            </label>
           <select name="Bank Account" value = {senderAccountNumber} onChange={OnChange} id="senderAccountNumber" className='mb-4 px-4 py-2 bg-wjite text-black rounded shadow hover:bg-gray-200 transition duration-300'>
           <option>Select Bank Account</option>
             {accounts.map((acc)=>{
              return <option key={acc.accountNumber}>{acc.accountNumber}</option>
             })}
                
           </select>
           {console.log("Account Selected  --->", senderAccountNumber)}
          </div>
          <div className="mb-6">
            <label
              htmlFor="receiverAccountNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Receiver Account Number
            </label>
            <input
              type="text"
              id="receiverAccountNumber"
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
                {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loader ?  "Processing...." : "Submit"}
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
