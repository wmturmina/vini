import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  const changeLoggedInUser = (value) => {
    setLoggedInUser(value);
  };

  const logout = async () => {
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ loggedInUser, changeLoggedInUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
