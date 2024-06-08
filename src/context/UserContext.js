import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const[users, setUsers] = useState([]);
  
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users`)
        .then(response=>response.json())
        .then(json=>{
            setUsers(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
          })
      }, []);
    
    return (
      <UserContext.Provider value={{users, setUsers}}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within an AuthProvider');
    }
    return context;
  };