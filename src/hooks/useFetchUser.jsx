
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://payappbacknend.onrender.com/api/v1/get/user", {
          withCredentials: true,
        });
        if (isMounted) setUser(response.data.user);
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || "Error fetching user");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, []);

  return { user,setUser,loading,setLoading,  error, setError };
};

export default useFetchUser;
