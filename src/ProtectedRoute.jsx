import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from './contexts/userContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(userContext);
   console.log("user---------------------------->", user)
   console.log("loading---------------------------->", loading)
   const navigate = useNavigate()
  if (loading) {

     <div>Loading...</div>;
    
     // Show a spinner or placeholder while loading
  }
  if (loading === false){
     if (user === null){
         navigate("/login")
     }
  }

       return children;
  
  
};

export default ProtectedRoute;
