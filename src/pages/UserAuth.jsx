import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import Wall from "./pages/Wall";
import { UserContextProvider } from "../context/userContext";

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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   setCurrentUser(localStorage.getItem("user"));
  // }, [setCurrentUser]);

  // useEffect(() => {
  //   localStorage.setItem("user", currentUser);
  // }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    // convert tabs to AppBar
    // setup routes
    <UserContextProvider>
      <Box
        sx={{
          bgcolor: "background.paper",
          mx: "10em",
          my: "5em",
          width: "75%"
        }}
      >
        <AppBar position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />\{" "}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Signup />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </UserContextProvider>
  );
}
