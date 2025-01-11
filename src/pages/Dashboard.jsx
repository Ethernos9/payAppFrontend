import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

import axios from 'axios';

const Dashboard = () => {

  
  const {user, accounts ,  getAccountInfo} = useContext(userContext);
  const [info, setInfo] = useState(null)

  const [creditedAmount, setCreditedAmount] = useState(0);
  const [debitedAmount, setDebitedAmount] = useState(0);
  const [combined, setCombined] = useState([]);
  const navigate = useNavigate();

 

  // const [info, setInfo] = useState(null);
  const [accountNumber, setAccountNumber] = useState();
  useEffect(() => {
    if (accounts.length > 0) {
      setAccountNumber(accounts[0]?.accountNumber);
    }
  }, [accounts]);



  useEffect(() => {
    const getInfo = async () => {
      const accountInfo = await getAccountInfo(accountNumber); // Await the async function
      setInfo(accountInfo); // Then update the state
      console.log("info------------>", accountInfo)
    };
    getInfo();
  
  }, [accountNumber]); // Add accountNumber as a dependency

  useEffect(() => {
    const totalCredited = info?.receiverTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );

    const totalDebited = info?.senderTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );


    setCreditedAmount(totalCredited);
    setDebitedAmount(totalDebited);


    setCombined([
      ...(info?.senderTransactions || []),
      ...(info?.receiverTransactions || []),
    ]);

  }, [info])
 

  // useEffect(() => {
  //   const accountDetails = async (accountNumber) => {
  //     console.log("Inside getInfo");
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/v2/getinfo",
  //         {
  //           accountNumber, // Correct parameter passing
  //         },
  //         {
  //           withCredentials: true, // Include credentials (cookies)
  //         }
  //       );
  //       console.log("Response ----------->", response);
  //       setInfo(response.data.account); // Update state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching account details:", error.message);
  //     }
  //   };

  //   accountDetails("6591699264"); // Pass the account number directly
  // }, [accountNumber]); 

  const onChange = (e) => {

    setAccountNumber(e.target.value)
  }

  const handleTransactionHover = (type) => {
    const creditedDiv = document.getElementById('credited-div');
    const debitedDiv = document.getElementById('debited-div');

    if (type === 'Credited') {
      creditedDiv.classList.add('scale-110', 'z-10');
      debitedDiv.classList.remove('scale-110', 'z-10');
    } else if (type === 'Debited') {
      debitedDiv.classList.add('scale-110', 'z-10');
      creditedDiv.classList.remove('scale-110', 'z-10');
    } else {
      creditedDiv.classList.remove('scale-110', 'z-10');
      debitedDiv.classList.remove('scale-110', 'z-10');
    }
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  function getTodayDate() {
    const today = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  }

  return (
    <div>

      {/* {console.log("Info--------->", info)}
      {console.log("credited--------->", creditedAmount)}
      {console.log("debited--------->", debitedAmount)}
      {console.log("combined--------->", combined)} */}

      <NavBar />
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-white">
        <main className="px-8 py-6">
          <h1 className="text-4xl font-semibold mb-4">Welcome Back, {`${user?.name}`}👋</h1>
          <p className="mb-8">This is your financial overview report</p>
          {/* {console.log("accounts---->", accounts)} */}
          <select value={accountNumber} onChange={onChange} className="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition duration-300">
            <option>Select Bank Account</option>
            {accounts.map((account, index) => (
              <option key={index}>{account.accountNumber}</option>
            ))}

          </select>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Balance</h2>
              <p> {formatDate(info?.createdAt)} - {getTodayDate()}</p>
              <h3 className="text-3xl font-bold mt-2">₹ {info?.balance}</h3>
              <p className="text-red-500">0% from last period</p>
            </div>

            <div id="credited-div" className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Credited</h2>
              <p>{formatDate(info?.createdAt)} - {getTodayDate()}</p>
              <h3 className="text-3xl font-bold mt-2">₹ {creditedAmount}</h3>
              <p className="text-green-500">5% from last period</p>
            </div>

            <div id="debited-div" className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Debited</h2>
              <p>{formatDate(info?.createdAt)} - {getTodayDate()}</p>
              <h3 className="text-3xl font-bold mt-2">₹ {debitedAmount}</h3>
              <p className="text-red-500">1% from last period</p>
            </div>
          </div>

        


          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">

              {combined.length == 0 ? 

              <div>
                 <p className='text-lg font-extrabold text-center text-orange-400'>No transactions found for this account</p>
                </div>
              :


            
                // [...info.senderTransactions, ...info.receiverTransactions]

                  combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (recent first)
                  .slice(0, 5) // Get the 5 most recent transactions
                  .map((transaction, index) => (
                    <div
                      key={transaction.id || index}
                      className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="text-sm text-gray-700">
                        {new Date(transaction.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="font-medium">₹{transaction.amount}</div>
                      <div
                        className={
                          transaction.senderAccountNumber
                            ? transaction.senderAccountNumber === accountNumber
                              ? "text-red-500" // Debited
                              : "text-green-500" // Credited
                            : transaction.receiverAccountNumber
                              ? transaction.receiverAccountNumber === accountNumber
                                ? "text-green-500" // Credited
                                : "text-red-500" // Debited
                              : ""
                        }
                      >
                        {transaction.senderAccountNumber
                          ? transaction.senderAccountNumber === accountNumber
                            ? "Debited"
                            : "Credited"
                          : transaction.receiverAccountNumber
                            ? transaction.receiverAccountNumber === accountNumber
                              ? "Credited"
                              : "Debited"
                            : "Transaction details unavailable"}
                      </div>

                    </div>
                  ))
              
            }
           

            </div>
          </section>


        </main>
      </div>
    </div>
  );
};

export default Dashboard;



























   
            {/* {info &&
                // [...info.senderTransactions, ...info.receiverTransactions]

                  combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (recent first)
                  .slice(0, 5) // Get the 5 most recent transactions
                  .map((transaction, index) => (
                    <div
                      key={transaction.id || index}
                      className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="text-sm text-gray-700">
                        {new Date(transaction.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="font-medium">₹{transaction.amount}</div>
                      <div
                        className={
                          transaction.senderAccountNumber
                            ? transaction.senderAccountNumber === accountNumber
                              ? "text-red-500" // Debited
                              : "text-green-500" // Credited
                            : transaction.receiverAccountNumber
                              ? transaction.receiverAccountNumber === accountNumber
                                ? "text-green-500" // Credited
                                : "text-red-500" // Debited
                              : ""
                        }
                      >
                        {transaction.senderAccountNumber
                          ? transaction.senderAccountNumber === accountNumber
                            ? "Debited"
                            : "Credited"
                          : transaction.receiverAccountNumber
                            ? transaction.receiverAccountNumber === accountNumber
                              ? "Credited"
                              : "Debited"
                            : "Transaction details unavailable"}
                      </div>

                    </div>
                  ))} */}






























































  {/* <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">
              <div
                onMouseEnter={() => handleTransactionHover('Credited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>John</div>
                <div>₹2000</div>
                <div className="text-green-500">Credited</div>
              </div>
              <div
                onMouseEnter={() => handleTransactionHover('Debited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>Alex</div>
                <div>₹2000</div>
                <div className="text-red-500">Debited</div>
              </div>
              <div
                onMouseEnter={() => handleTransactionHover('Credited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>Steve</div>
                <div>₹2000</div>
                <div className="text-green-500">Credited</div>
              </div>
            </div>
          </section> */}
          {/* <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">
              {info  && 
              console.log("Inofr receiver", info.senderTransactions)
              // console.log("Inofr receiver", info.senderTransactions)
              
            }
              {info &&

              info?.receiverTransactions.length + info?.senderTransactions.length > 0 && // Check if there are any transactions available to display
                [...info?.receiverTransactions, ...info?.senderTransactions]
                  .sort((a, b) => new Date(b.time) - new Date(a.time)) // Sort transactions by time (recent first)
                  .map((transaction, index) => (
                    <div
                      key={index}
                      onMouseEnter={() =>
                        handleTransactionHover(
                          transaction.type === "Credit" ? "Credited" : "Debited"
                        )
                      }
                      onMouseLeave={() => handleTransactionHover("")}
                      className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
                    >
                      <div>{transaction.name}</div>
                      <div>₹{transaction.amount}</div>
                      <div
                        className={
                          transaction.type === "Credit"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "Credit" ? "Credited" : "Debited"}
                      </div>
                    </div>
                  ))}
            </div>
          </section> */}


          {/* <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">
              {info &&
                [...info.senderTransactions, ...info.receiverTransactions]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (recent first)
                  .slice(0, 5) // Get the 5 most recent transactions
                  .map((transaction, index) => (
                    <div
                      key={transaction.id || index}
                      className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
                    >
                      <div>
                        {transaction.senderAccountNumber === accountNumber
                          ? transaction.receiverAccountNumber
                          : transaction.senderAccountNumber}
                      </div>
                      <div>₹{transaction.amount}</div>
                      <div
                        className={
                          transaction.senderAccountNumber === accountNumber
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {transaction.senderAccountNumber === accountNumber
                          ? "Debited"
                          : "Credited"}
                      </div>
                    </div>
                  ))}
            </div>
          </section> */}