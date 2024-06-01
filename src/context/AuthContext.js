import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [roles, setRoles] = useState(() => {
    const savedRoles = localStorage.getItem('roles');
    return savedRoles ? JSON.parse(savedRoles) : [];
  }); 

  const [permissions, setPermissions] = useState(()=>{
    const savedPermissions = localStorage.getItem('permissions');
    return savedPermissions ? JSON.parse(savedPermissions) : [];
  }); 

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } 
    else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem('roles', JSON.stringify(roles));
    } 
    else {
      localStorage.removeItem('roles');
    }
  }, [roles]);

  useEffect(() => {
    if (permissions.length > 0) {
      localStorage.setItem('permissions', JSON.stringify(permissions));
    } 
    else {
      localStorage.removeItem('permissions');
    }
  }, [permissions]);

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
        setRoles(data.userRole);
        
        const usePermissions = data.userPermissions.map(permission => permission.name).join(', ')
        setPermissions(usePermissions);

        localStorage.setItem('user', JSON.stringify(data.userName));
        localStorage.setItem('roles', JSON.stringify(data.userRole));
        localStorage.setItem('permissions', JSON.stringify(usePermissions));

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
    setRoles([]);
    setPermissions([]);

    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
  };

  return (
    <AuthContext.Provider value={{ user, roles, permissions, login, logout }}>
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