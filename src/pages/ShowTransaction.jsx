 import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

const ShowTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const {user ,accounts,  loading} = useContext(userContext)
 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
const [loadingTransactions, setLoadingTransactions] = useState(true); // State to track loading
  const navigate = useNavigate();
   
   
  if (user && !accounts) {
    navigate("/create/account")

  }
  if (!user && !loading) {
    navigate("/");
  }
  else if (!user && loading) {
    // If user is not available and loading is true, display a loader
     <div>Loading.............................</div>
  }


 
  
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transaction = await axios.post(
          'https://payappbacknend.onrender.com/api/v3/transactions',
          {},
          { withCredentials: true }
        );

        if (transaction.data.success) {
            setLoadingTransactions(false);
          
          setTransactions(transaction.data.transactions);
          setFilteredTransactions(transaction.data.transactions);
        }
      } catch (error) {
        console.error('transactions error --->', error);
      }
    };

    fetchTransactions();
  }, []);

 

  // Debounce logic for search
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = transactions.filter((transaction) =>
      transaction.description?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 100), [transactions]);

  const onClick = (transaction) => {
    navigate(`/transaction/${transaction.id}`, { state: transaction });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <NavBar />
      </div>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold text-center mb-6">Transactions</h2>

        {/* Search Bar */}
        {user && !loading }{

        }
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search by description..."
            className="w-full md:w-1/2 p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                onClick={() => onClick(transaction)}
                className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">Ethernos</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Description:</strong> {transaction?.description}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Amount:</strong> ₹ {transaction?.amount}
                </p>
                <p
                  className={`text-sm font-medium ${
                    transaction?.status === 'SUCCESS'
                      ? 'text-green-600'
                      : transaction?.status === 'Failure'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  <strong>Status:</strong> {transaction?.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No transactions found</p>
          )}
        </div>
          {/* Loader Overlay */}
          {loadingTransactions && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTransaction;




