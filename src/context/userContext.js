import { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    console.log(storedData);
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
      setAuthToken(localStorage.getItem("authToken"));
    } else {
      // Set initial data if it doesn't exist in localStorage
      setCurrentUser(null);
      setAuthToken(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateUser = (currentUser) => {
    setCurrentUser(currentUser);
    setAuthToken(authToken);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUser,
        authToken,
        setAuthToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
