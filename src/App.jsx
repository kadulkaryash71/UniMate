import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Wall from "./pages/Wall";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { Routes, Route } from "react-router-dom";

import UserContext, { UserContextProvider } from "./context/userContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function App() {
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    // convert tabs to AppBar
    // setup routes
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          exact
          path="/login"
          element={currentUser !== null ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={currentUser !== null ? <Home /> : <Signup />}
        />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile user={currentUser} />} />
        <Route exact path="/about" element={<About short={false} />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}
