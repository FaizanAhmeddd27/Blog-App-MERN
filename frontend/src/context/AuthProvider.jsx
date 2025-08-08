import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, profileRes] = await Promise.all([
          axios.get("/api/blogs/allBlogs", { withCredentials: true }),
          axios.get("/api/users/myProfile", { withCredentials: true }),
        ]);

        setBlogs(blogsRes.data);
        setProfile(profileRes.data.user);
        setAuthenticated(true);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setAuthenticated(false);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
    } catch (error) {
      console.error("Logout request failed:", error.response?.data || error.message);
    } finally {
      setAuthenticated(false);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        authenticated,
        loading,
        setAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
