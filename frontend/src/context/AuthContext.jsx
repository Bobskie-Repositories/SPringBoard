import React, { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the token & id in local storage
    const storedToken = localStorage.getItem("jwt");
    const storedId = localStorage.getItem("id");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      // Check token expiration
      const decodedToken = jwt_decode(storedToken);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime / 60) {
        // Token has expired
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("jwt");
      }
    }
    if (storedId) {
      setId(storedId);
    }

    setIsLoading(false);
  }, []);

  const getUser = async () => {
    try {
      const decodedToken = jwt_decode(localStorage.getItem("jwt"));
      const role = decodedToken.role;

      // Attempt to fetch student data
      if (role === "student") {
        const studentResponse = await fetch(
          "http://127.0.0.1:8000/api/active-student",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          return studentData;
        }
      } else {
        // Attempt to fetch teacher data
        const teacherResponse = await fetch(
          "http://127.0.0.1:8000/api/active-teacher",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          return teacherData;
        }
      }

      throw new Error("Failed to fetch both student and teacher data");
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const loginStudent = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.jwt;
        localStorage.setItem("jwt", token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        console.error("Login failed. Please check your credentials.");
        return response;
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error.message);
      return response;
    }
  };

  const loginTeacher = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.jwt;
        localStorage.setItem("jwt", token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        console.error("Login failed. Please check your credentials.");
        return response;
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error.message);
      return response;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout-student", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setToken(null);
        setId(null);
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
        localStorage.removeItem("id");
      } else {
        console.error("Server-side logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error.message);
    }
  };

  const authValue = {
    token,
    id,
    loginStudent,
    loginTeacher,
    logout,
    getUser,
    isAuthenticated,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
