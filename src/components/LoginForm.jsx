
import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function LoginForm({ isLogin }) {
  const  {login} = useContext(userContext)
  const navigate   = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // Toggle state for login method

  const toggleLoginMethod = (method) => {
    setLoginMethod(method);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://payappbacknend.onrender.com/api/v1/user/login",
        loginMethod === "email"
          ? { email, password }
          : { phoneNumber, password },
        { withCredentials: true }
      );
      console.log("response: ", response);

      if (response.data.success) {
        // Set the user in the userContext
        console.log("user: ,,,,,,,,,,,,,,,,,,,,", response.data.user)
        login(response.data.user)
        navigate("/")
     
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("Login failed, please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://payappbacknend.onrender.com/api/v1/user/signup",
        { name, email, phoneNumber, password },
        { withCredentials: true }
      );
      console.log("response: ", response);

      if (response.data.success) {
        login(response.data.user)
        navigate("/")
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed, please try again.");
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isLogin ? "Sign in to SBIPay" : "Create Your SBIPay Account"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isLogin
              ? "Welcome back! Please sign in to continue."
              : "Get started by creating a new account."}
          </p>

          {isLogin && (
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-200 rounded-full p-1">
                <button
                  onClick={() => toggleLoginMethod("email")}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    loginMethod === "email"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => toggleLoginMethod("phone")}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    loginMethod === "phone"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  Phone
                </button>
              </div>
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            {(isLogin || (!isLogin && loginMethod === "email")) && (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
          onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email Address"
                  required
                />
              </div>
            )}

            {(isLogin && loginMethod === "phone") && (
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
            )}

            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="text-center mt-4">
            {isLogin ? (
              <p className="text-sm text-gray-500">
                Don’t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
