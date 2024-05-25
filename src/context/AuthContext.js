import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (form) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: form.userName, password: form.password }) // Ensure correct keys
      });

      const data = await response.json();

      if (data.success) {
        setUser({ username: form.userName }); // Use form.userName
        return true;
      } else {
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('There was an error during login:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext as default, useAuth };
