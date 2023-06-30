import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

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
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
      setAuthToken(localStorage.getItem("authToken"));
      setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    } else {
      // Set initial data if it doesn't exist in localStorage
      setCurrentUser({
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
      setAuthToken("");
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [currentUser, authToken, isLoggedIn]);

  const updateUser = (updatedUser, updatedAuthToken, loginStatus) => {
    setCurrentUser(updatedUser);
    setAuthToken(updatedAuthToken);
    setLoggedIn(loginStatus);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUser,
        authToken,
        setAuthToken,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
