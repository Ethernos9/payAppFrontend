import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const phoneNumber = formData.get("phoneNumber");
  //   const password = formData.get("password");
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/user/signup",
  //       {
  //         name ,
  //         email,
  //         phoneNumber,
  //         password,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log("response: " ,response);

  //     if (response.data.success) {
  //       // await fetchUser();
  //       console.log(response.data)
  //       window.location.href = "/";

  //     } else {
  //       setError(response.data.error);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("Login failed, please try again.");
  //   }
  // };
  return (
    <div>
        <LoginForm isLogin={""}/>
    </div>
  )
}

export default Signup