import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const { user, loading } = useContext(userContext);
  const [loader,setloader] = useState(false);
  const navigate = useNavigate();
  const[account,setAccount]  = useState([])
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState(100);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const[isChecked, setIsChecked] = useState(false)
  

  // Handle account type change
  const handleAccountChange = (e) => {
    setAccountType(e.target.value);
  };
   const handleCheckChange   = (e)=>{
      setIsChecked(e.target.checked);
   }


  // Handle balance change
  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };
  
  // Redirect to home if the user is not logged in

    if (!user && !loading ) {
      navigate("/");
    }
    else if (!user && loading) {
      // If user is not available and loading is true, display a loader
      return <div>Loading.............................</div>
    }


  // Send accountType and balance in the POST request
  const handleSubmit = async (e) => {
     setloader(true)
    e.preventDefault();
   
    try {
      const response = await axios.post(
        "https://payappbacknend.onrender.com/api/v2/create/account",
        {
          accountType,
          balance,
          isChecked
          
        },  { withCredentials: true }
      );
      console.log("Account created successfully:", response);
      console.log("Account created successfully:", response.data.success);
      console.log("Account created successfully:", response.data.account);
     
      if (response.data.success){
        setloader(false)
        setMessage(response?.data?.message)
        setAccount(response?.data?.account)

        navigate("/dashboard")
      
      }
   
    } catch (err) {
      console.error("Error creating account:", err);
      setError(err.response.data.message);
    }
  };



  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create New Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Account Type Field */}
            <div className="mb-5">
              <label
                htmlFor="accountType"
                className="block text-gray-700 font-semibold mb-2"
              >
                Account Type
              </label>
              <select
                id="accountType"
                onChange={handleAccountChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>
            <div className="mb-5">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckChange}
                  className="mr-2"
                />
                   Default Account
              </label>
             
            </div>
           

            {/* Balance Field */}
            <div className="mb-5">
              <label
                htmlFor="balance"
                className="block text-gray-700 font-semibold mb-2"
              >
                Initial Balance
              </label>
              <input
                type="number"
                id="balance"
                value={balance}
                onChange={handleBalanceChange}
                placeholder="Enter initial balance"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {loader ? "Creating Account....": "Create Account"}
            
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
