import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // CHECK EXISTING LOGIN SESSION
  // =========================================================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        console.log("ME RESPONSE:", response.data);

        if (response.data.success) {
          console.log("ME USER:", response.data.user);

          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "ME ERROR:",
          error.response?.data || error.message
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data.success) {
        console.log(
          "SETTING USER:",
          response.data.user
        );

        setUser(response.data.user);
      }

      return response;
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// =========================================================
// useAuth
// =========================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};