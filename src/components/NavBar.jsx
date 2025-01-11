import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { useRef } from "react";
import { useEffect } from "react";

const NavBar = ({}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { user, logout } = useContext(userContext);
  const navigate = useNavigate();
  const profileRef = useRef();

  const gotoProfile = () => navigate("/profile");
  const gotoLogin = () => navigate("/login");
  const gottoHome =()=> navigate("/")
  const gotoAccoutCreation = ()=> navigate("/create/account")
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDialog = () => setIsProfileDialogOpen(!isProfileDialogOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDialogOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 flex items-center justify-between">

      {/* Logo */}
      <div onClick={gottoHome} className="text-2xl cursor-pointer font-bold">SBI</div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/create/account" className="hover:text-yellow-300 transition-colors">
          Account Creation
        </Link>
        <Link to="/dashboard" className="hover:text-yellow-300 transition-colors">
          Dashboard
        </Link>
        <Link to="/transfer" className="hover:text-yellow-300 transition-colors">
        Transfer
        </Link>
        <Link to="/mobile-transfer" className="hover:text-yellow-300 transition-colors">
         PhonePay
        </Link>
        <Link to= "/show-transactions" className="hover:text-yellow-300 transition-colors">
          Transactions
        </Link>
      </div>

      {/* Profile and Login */}
      <div className="relative">
        {user ? (
          <div
            ref={profileRef}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleProfileDialog}
          >
            <span>{user.name}</span>
            {isProfileDialogOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg p-2 text-black z-50 transition-transform duration-300 transform origin-top scale-100">
                <button
                  onClick={gotoProfile}
                  className="block w-full text-left hover:bg-gray-200 px-4 py-2 rounded"
                >
                  View Profile
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={gotoLogin}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="block md:hidden text-white focus:outline-none"
        onClick={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 p-6 md:hidden">
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col space-y-4 mt-12 text-center">
            <a href="#account" className="text-white hover:text-yellow-300 text-lg">
              User Registration
            </a>
            <a href="#send-money" className="text-white hover:text-yellow-300 text-lg">
              Services
            </a>
            <a href="#self-transfer" className="text-white hover:text-yellow-300 text-lg">
              Contacts
            </a>
            <a href="#transactions" className="text-white hover:text-yellow-300 text-lg">
              FAQs
            </a>
            {user ? (
              <div className="text-white text-sm mt-4">
                <p>Welcome, {user.name}</p>
                <button
                  onClick={gotoProfile}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={gotoLogin}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;



















// return(
// <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//   {/* Left Section - Logo */}
//   <div className="flex items-center space-x-2">
//     <span className="text-2xl font-bold">SBI</span>
//   </div>

//   {/* Middle Section - Nav Links */}
//   <div className="hidden md:flex items-center space-x-8">
//     <a href="#account" className="relative group">
//       User Registration
//       <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//     </a>
//     <a href="#send-money" className="relative group">
//       Services
//       <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//     </a>
//     <a href="#self-transfer" className="relative group">
//       Contacts
//       <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//     </a>
//     <a href="#transactions" className="relative group">
//       FAQs
//       <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//     </a>
//   </div>

//   {/* Right Section - Profile and Login */}
//   <div className="hidden md:flex items-center space-x-6 relative">
//     {user ? (
//       <div
//         className="flex items-center space-x-2 cursor-pointer relative"
//         onClick={toggleProfileDialog}
//       >
//         <img
//           src={user.image}
//           alt="User"
//           className="w-8 h-8 rounded-full border-2 border-white"
//         />
//         <span>{user.name}</span>

//         {/* Profile Dialog */}
//         {isProfileDialogOpen && (
//           <div className="absolute top-full mt-2 right-0 w-40 bg-white shadow-lg rounded-md p-4 text-black z-50">
//             <button
//               onClick={gotoProfile}
//               className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mb-2"
//             >
//               View Profile
//             </button>
//             <button
//               onClick={logout}
//               className="block w-full text-left bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     ) : (
//       <button
//         onClick={gotoLogin}
//         className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
//       >
//         Login
//       </button>
//     )}
//   </div>

//   {/* Mobile Menu Button */}
//   <div className="md:hidden">
//     <button
//       type="button"
//       className="text-white focus:outline-none"
//       onClick={toggleMobileMenu}
//     >
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 6h16M4 12h16M4 18h16"
//         />
//       </svg>
//     </button>
//   </div>

//   {/* Mobile Menu */}
//   <div
//     className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
//   >
//     <div className="p-6 flex justify-between items-center">
//       <div className="text-2xl font-bold text-blue-600">SBI</div>
//       <button
//         type="button"
//         className="text-gray-600 focus:outline-none"
//         onClick={toggleMobileMenu}
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//     </div>
//     <div className="mt-4 flex flex-col items-center space-y-4 px-6">
//       <a href="#account" className="text-center">
//         User Registration
//       </a>
//       <a href="#send-money" className="text-center">
//         Services
//       </a>
//       <a href="#self-transfer" className="text-center">
//         Contacts
//       </a>
//       <a href="#transactions" className="text-center">
//         FAQs
//       </a>
//     </div>
//     <div className="mt-6 px-6">
//       {user ? (
//         <div
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={toggleProfileDialog}
//         >
//           <img
//             src={user.image}
//             alt="User"
//             className="w-10 h-10 rounded-full border-2 border-gray-300"
//           />
//           <span>{user.name}</span>
//         </div>
//       ) : (
//         <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
//           Login
//         </button>
//       )}
//     </div>
//   </div>
// </nav>

// )
// return (
//   <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//     {/* Left Section - Logo */}
//     <div className="flex items-center space-x-2">
//       <span className="text-2xl font-bold">SBI</span>
//     </div>

//     {/* Middle Section - Nav Links */}
//     <div className="hidden md:flex items-center space-x-8">
//       <a href="#account" className="relative group">
//         User Registration
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#send-money" className="relative group">
//         Services
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#self-transfer" className="relative group">
//         Contacts
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#transactions" className="relative group">
//         FAQs
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//     </div>

//     {/* Right Section - Profile and Login */}
//     <div className="hidden md:flex items-center space-x-6 relative">
//       {user ? (
//         <div
//           className="flex items-center space-x-2 cursor-pointer relative"
//           onClick={toggleProfileDialog}
//         >
//           <img
//             src={user.image}
//             alt="User"
//             className="w-8 h-8 rounded-full border-2 border-white"
//           />
//           <span>{user.name}</span>

//           {/* Profile Dialog */}
//           {isProfileDialogOpen && (
//             <div className="absolute top-full mt-2 right-0 w-48 bg-white shadow-xl rounded-md p-4 text-black z-50">
//               <div className="flex items-center space-x-2 mb-4">
//                 <img
//                   src={user.image}
//                   alt="User"
//                   className="w-12 h-12 rounded-full border-2 border-blue-600"
//                 />
//                 <div>
//                   <span className="block text-sm font-bold">{user.name}</span>
//                   <span className="block text-xs text-gray-500">{user.email}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={gotoProfile}
//                 className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2"
//               >
//                 View Profile
//               </button>
//               <button
//                 onClick={logout}
//                 className="block w-full text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <button
//           onClick={gotoLogin}
//           className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
//         >
//           Login
//         </button>
//       )}
//     </div>

//     {/* Mobile Menu Button */}
//     <div className="md:hidden">
//       <button
//         type="button"
//         className="text-white focus:outline-none"
//         onClick={toggleMobileMenu}
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>
//     </div>

//     {/* Mobile Menu */}
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
//     >
//       <div className="p-6 flex justify-between items-center">
//         <div className="text-2xl font-bold text-blue-600">SBI</div>
//         <button
//           type="button"
//           className="text-gray-600 focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//       <div className="mt-4 flex flex-col items-center space-y-4 px-6">
//         <a href="#account" className="text-center">
//           User Registration
//         </a>
//         <a href="#send-money" className="text-center">
//           Services
//         </a>
//         <a href="#self-transfer" className="text-center">
//           Contacts
//         </a>
//         <a href="#transactions" className="text-center">
//           FAQs
//         </a>
//       </div>
//       <div className="mt-6 px-6">
//         {user ? (
//           <div
//             className="flex flex-col items-center space-y-4 cursor-pointer"
//             onClick={toggleProfileDialog}
//           >
//             <img
//               src={user.image}
//               alt="User"
//               className="w-12 h-12 rounded-full border-2 border-gray-300"
//             />
//             <span>{user.name}</span>

//             {/* Mobile Profile Dialog */}
//             {isProfileDialogOpen && (
//               <div className="w-full bg-white shadow-md rounded-md p-4 text-black">
//                 <button
//                   onClick={gotoProfile}
//                   className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2"
//                 >
//                   View Profile
//                 </button>
//                 <button
//                   onClick={logout}
//                   className="block w-full text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   </nav>
// );











// return (
//   <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//     {/* Left Section - Logo */}
//     <div className="flex items-center space-x-2">
//       <span className="text-2xl font-bold">SBI</span>
//     </div>

//     {/* Middle Section - Nav Links */}
//     <div className="hidden md:flex items-center space-x-8">
//       <a href="#account" className="relative group">
//         User Registration
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#send-money" className="relative group">
//         Services
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#self-transfer" className="relative group">
//         Contacts
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//       <a href="#transactions" className="relative group">
//         FAQs
//         <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
//       </a>
//     </div>

//     {/* Right Section - Profile and Login */}
//     <div className="hidden md:flex items-center space-x-6 relative">
//       {user ? (
//         <div
//           className="flex items-center space-x-2 cursor-pointer relative"
//           onClick={toggleProfileDialog}
//         >
//           <img
//             src={user.image}
//             alt="User"
//             className="w-8 h-8 rounded-full border-2 border-white"
//           />
//           <span>{user.name}</span>

//           {/* Profile Dropdown */}
//           {isProfileDialogOpen && (
//             <div className="absolute top-full mt-2 right-0 w-60 bg-white shadow-lg rounded-lg p-4 text-black z-50">
//               <div className="flex items-center space-x-2 mb-4">
//                 <img
//                   src={user.image}
//                   alt="User"
//                   className="w-12 h-12 rounded-full border-2 border-blue-600"
//                 />
//                 <div>
//                   <span className="block font-bold text-lg">{user.name}</span>
//                   <span className="block text-sm text-gray-500">{user.email}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={gotoProfile}
//                 className="block w-full text-left bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-2"
//               >
//                 View Profile
//               </button>
//               <button
//                 // onClick={addAccount}
//                 className="block w-full text-left bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded mb-2"
//               >
//                 Add Account
//               </button>
//               <button
//                 onClick={logout}
//                 className="block w-full text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <button
//           onClick={gotoLogin}
//           className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
//         >
//           Login
//         </button>
//       )}
//     </div>
//   </nav>
// );
































































































































































































































































































































































































































































// TODO : Latest Account


// import React, { useState } from "react";

// const NavBar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState("John Doe");
//   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProfileDialog = () => {
//     setIsProfileDialogOpen(!isProfileDialogOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//       {/* Left Section - Logo */}
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold">SBI</span>
//       </div>

//       {/* Middle Section - Nav Links */}
//       <div className="hidden md:flex items-center space-x-8">
//         <a href="#account" className="hover:text-gray-300 transition-colors">
//           User Registration
//         </a>
//         <a href="#send-money" className="hover:text-gray-300 transition-colors">
//           Services
//         </a>
//         <a href="#self-transfer" className="hover:text-gray-300 transition-colors">
//           Contacts
//         </a>
//         <a href="#transactions" className="hover:text-gray-300 transition-colors">
//           FAQs
//         </a>
//         {user && (
//           <a
//             href="#profile"
//             onClick={toggleProfileDialog}
//             className="hover:text-gray-300 flex items-center space-x-2 cursor-pointer"
//           >
//             <img
//               src="https://via.placeholder.com/30"
//               alt="User Avatar"
//               className="w-6 h-6 rounded-full"
//             />
//             <span>Profile</span>
//           </a>
//         )}
//       </div>

//       {/* Right Section - Profile/Login */}
//       <div className="hidden md:flex items-center space-x-6">
//         {user ? (
//           <a
//             href="#profile"
//             onClick={toggleProfileDialog}
//             className="hover:text-gray-300 flex items-center space-x-2 cursor-pointer"
//           >
//             <img
//               src="https://via.placeholder.com/30"
//               alt="User Avatar"
//               className="w-6 h-6 rounded-full"
//             />
//             <span>Profile</span>
//           </a>
//         ) : (
//           <button className="text-white py-1 px-4 rounded">Login</button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           type="button"
//           className="text-white focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-56 bg-blue-700 text-white transform transition-transform duration-300 ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6 flex justify-between items-center">
//           <div className="text-2xl font-bold">SBI</div>
//           <button
//             type="button"
//             className="text-white focus:outline-none"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="mt-4 flex flex-col items-center space-y-4 px-6">
//           <a
//             href="#account"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             User Registration
//           </a>
//           <a
//             href="#send-money"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             Services
//           </a>
//           <a
//             href="#self-transfer"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             Contacts
//           </a>
//           <a
//             href="#transactions"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             FAQs
//           </a>
//           {user ? (
//             <a
//               href="#profile"
//               onClick={toggleProfileDialog}
//               className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//             >
//               Profile
//             </a>
//           ) : (
//             <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Profile Dialog */}
//       {isProfileDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-80">
//             <h3 className="text-lg font-bold mb-4">Profile</h3>
//             <p className="text-gray-700 mb-4">Name: {user}</p>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full mb-2"
//               onClick={() => {
//                 setUser("");
//                 toggleProfileDialog();
//               }}
//             >
//               Logout
//             </button>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded w-full"
//               onClick={toggleProfileDialog}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;
