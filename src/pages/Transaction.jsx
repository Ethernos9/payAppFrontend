import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Transaction = () => {
  const { transactionId } = useParams();
  console.log("transactionId from params", transactionId);
  const location = useLocation();
  const transactionData = location.state;

  const [showDetails, setShowDetails] = useState(false);

  if (!transactionData) {
    return (
      <p className="text-center text-red-500 text-lg mt-8">
        No transaction data found!
      </p>
    );
  }
    
  const {
    amount,
    description,
    // receiverName,
    receiverAccountNumber,
    senderAccountNumber,
    status,
 
  } = transactionData;


  const hideAccountNumber = (accountNumber) =>
    `******${accountNumber.slice(-4)}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />

      <div className="flex flex-col items-center justify-center mt-8 px-4">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-8">
          Transaction {status}
        </h1>

        <div className="bg-gray-100 rounded-lg shadow-2xl  p-6 w-full max-w-md">
          {/* Receiver Details */}
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
              {/* {receiverName?.[0]?.toUpperCase()} */}
            </div>
            <div>
              {/* <h2 className="text-lg font-semibold">{receiverName}</h2> */}
              <p className="text-gray-600">{hideAccountNumber(receiverAccountNumber)}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <h2 className="text-sm text-gray-600">Amount</h2>
            <p className="text-2xl font-bold text-purple-700">₹{amount}</p>
          </div>

          {/* Transaction ID */}
          <div className="mb-4">
            <h2 className="text-sm text-gray-600"> Transaction ID</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-800">{transactionId}</p>
              <button
                className="text-purple-600 text-xs hover:underline"
                onClick={() => copyToClipboard(transactionId)}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Debited From */}
          <div className="mb-4">
            <h2 className="text-sm text-gray-600">Debited From</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-800">{hideAccountNumber(senderAccountNumber)}</p>
              <button
                className="text-purple-700 text-xs hover:underline"
                onClick={() => copyToClipboard(senderAccountNumber)}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <h2 className="text-sm text-gray-600">Status</h2>
            <p
              className={`px-3 py-1 text-xs font-bold ${
                status === "SUCCESS"
                  ? "text-blue-500  "
                  : "text-red-500 "
              }`}
            >
              {status}
            </p>
          </div>

          {/* Show/Hide Details */}
          <button
            className="w-full bg-gray-400 text-white text-sm font-semibold py-2 rounded-md hover:bg-black transition"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>

          {showDetails && (
            <div className="mt-6">
              {/* Credited To */}
              <div className="mb-4">
                <h2 className="text-sm text-gray-600">Credited To</h2>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-800">
                    {hideAccountNumber(receiverAccountNumber)}
                  </p>
                  <button
                    className="text-purple-700 text-xs hover:underline"
                    onClick={() => copyToClipboard(receiverAccountNumber)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-sm text-gray-600">Description</h2>
                <p className="text-sm text-gray-800">
                  {description || "No description provided"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Support Button */}
        <button
          className="mt-2 bg-gray-300 shadow-lg text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
          onClick={() => alert("Support feature coming soon!")}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Transaction;

