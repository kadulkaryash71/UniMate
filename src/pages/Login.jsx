import { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { TextField, Button } from "@mui/material";

import Home from "./Home";
import userContext from "../context/userContext";

import { Link } from "react-router-dom";

function Login(props) {
  const { currentUser, updateUser, isLoggedIn } = useContext(userContext);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(loginData);
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    fetch("http://127.0.0.1:5000/login", options)
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          setErrorOccurred(data.response);
        } else {
          console.log("inside login", data.userInfo._doc);
          updateUser(data.userInfo._doc, "bearer:" + data.token, true);
        }
      });
  }

  return (
    <div className="container-fluid">
      <Paper
        sx={{
          padding: "10%",
          m: "auto",
          textAlign: "center",
          width: "75%",
        }}
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <TextField
            type="text"
            variant="outlined"
            label="Username"
            color="primary"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            error={errorOccurred}
            sx={{ margin: "1vh" }}
            fullWidth
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            color="primary"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            error={errorOccurred}
            helperText={
              errorOccurred && "Incorrect credentials. Please try again"
            }
            sx={{ margin: "1vh" }}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "1vh" }}
            fullWidth
          >
            Login
          </Button>
        </form>
        <Link to="/signup" sx={{ margin: "1vh" }}>
          Don't have an account? Create one
        </Link>
      </Paper>
    </div>
  );
}

export default Login;
