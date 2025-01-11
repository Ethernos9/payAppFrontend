import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAccountDetails = () => {
  const [info, setInfo] = useState(null); // Initialize as null or an empty object

  useEffect(() => {
    const getInfo = async (accountNumber) => {
      console.log("Inside getInfo");
      try {
        const response = await axios.post(
          "https://payappbacknend.onrender.com/api/v2/getinfo",
          {
            accountNumber, // Correct parameter passing
          },
          {
            withCredentials: true, // Include credentials (cookies)
          }
        );
        console.log("Response ----------->", response);
        setInfo(response.data.account); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching account details:", error.message);
      }
    };

    getInfo(accountNumber); // Pass the account number directly
  }, []); // Empty dependency array for one-time fetch

  return { info };
};

export default useGetAccountDetails;
