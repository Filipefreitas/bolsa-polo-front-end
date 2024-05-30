import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); 

  const login = async (form) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: form.userName, password: form.password })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.userName);
        setUserRole(data.userRole);
        return true;
      } 
      else {
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('There was an error during login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};