import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    fullName: "",
    email: "",
    username: "",
    file: "",
    university: "",
    city: "",
    country: "",
    dialCode: "",
    mobile: "",
    friends: [],
  });
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
      setAuthToken(localStorage.getItem("authToken"));
    } else {
      // Set initial data if it doesn't exist in localStorage
      setCurrentUser({});
      setAuthToken("");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateUser = (currentUser, authToken) => {
    setCurrentUser(JSON.parse(currentUser));
    setAuthToken(authToken);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUser,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
