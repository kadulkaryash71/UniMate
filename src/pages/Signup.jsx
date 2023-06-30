import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Paper,
  TextField,
  Button,
  Input,
  Box,
  InputLabel,
  Avatar,
  Stack,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Container,
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import {
  firebaseStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase";

import { Link } from "react-router-dom";

import userContext from "../context/userContext";
import ProgressBar from "../components/ProgressBar";
import Home from "./Home";

function Signup() {
  const { updateUser } = useContext(userContext);

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    mobile: "",
    file: "",
    university: "",
    country: "",
    city: "",
    dialCode: "",
  });

  const [fileName, setFileName] = useState("");
  const [progressAmount, setProgressAmount] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);

  function loadCountries(e) {
    fetch("https://countriesnow.space/api/v0.1/countries/")
      .then((res) => res.json())
      .then((res) => setAllCountries(res.data));
    console.log("Inside loadCountries", e.target.value);
  }

  function loadCities(e) {
    console.log("Inside loadCities");
    try {
      fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: `{\n "country": "${signupData.country}" \n}`,
      })
        .then((res) => res.json())
        .then((res) => setAllCities(res.data));
    } catch (e) {
      console.error("Could not fetch", e);
    }
  }

  function loadCountryCode(e) {
    console.log("Inside CountryCode", e.target.value);
    var data = `{\n"country": "${signupData.country}"\n}`;

    fetch("https://countriesnow.space/api/v0.1/countries/codes", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => setCountryCode(res.data.dial_code));
  }

  function loadUniversities() {
    axios({
      url: "./data/world_universities_and_domains.json",
      method: "get",
    })
      .then((res) => res.data)
      .then((res) => setAllUniversities(res));
  }

  function handleChange(e) {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(signupData);
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    };

    fetch("http://127.0.0.1:5000/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          updateUser(data.userInfo, "bearer:" + data.token, true);
        }
      });
  }
  return (
    <Container>
      <Paper
        sx={{
          p: "10%",
          m: "auto",
          textAlign: "center",
          width: "75%",
        }}
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <TextField
            type="text"
            variant="outlined"
            label="Full Name"
            color="primary"
            name="fullName"
            value={signupData.fullName}
            onChange={handleChange}
            sx={{ margin: "1vh" }}
            required
            fullWidth
          />
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            color="primary"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            sx={{ margin: "1vh" }}
            required
            fullWidth
          />
          <TextField
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleChange}
            variant="outlined"
            label="Username"
            placeholder="Choose your username"
            color="primary"
            sx={{ margin: "1vh" }}
            required
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            variant="outlined"
            label="Password"
            color="primary"
            sx={{ margin: "1vh" }}
            required
            fullWidth
            helperText="Must contain 1 capital letter, 1 small letter, 1 special character and must be 10 characters long"
          />

          {/* University selection */}
          <Stack direction="row" spacing={2} sx={{ margin: "1vh" }}>
            <FormControl fullWidth>
              <InputLabel id="university-select">University</InputLabel>
              <Select
                labelId="university-select"
                id="university-selection"
                label="University"
                name="university"
                value={signupData.university}
                onChange={handleChange}
                onFocus={loadUniversities}
              >
                <MenuItem value={undefined}>--Select--</MenuItem>
                {allUniversities &&
                  allUniversities.map((uni) => (
                    <MenuItem value={uni.name}>{uni.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          {/* University selection */}

          {/* Country & City */}
          <Stack direction="row" spacing={2} sx={{ margin: "1vh" }}>
            <FormControl fullWidth>
              <InputLabel id="country-select">Country</InputLabel>
              <Select
                labelId="country-select"
                id="country-selection"
                label="Country"
                name="country"
                value={signupData.country}
                onChange={handleChange}
                onFocus={loadCountries}
              >
                <MenuItem value={undefined}>--Select--</MenuItem>
                {allCountries &&
                  allCountries.map((code) => (
                    <MenuItem value={code.country}>{code.country}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            {signupData.country && (
              <FormControl fullWidth>
                <InputLabel id="city-select">City</InputLabel>
                <Select
                  labelId="city-select"
                  id="city-selection"
                  label="City"
                  name="city"
                  value={signupData.city}
                  onChange={handleChange}
                  onFocus={loadCities}
                >
                  <MenuItem value={undefined}>--Select--</MenuItem>
                  {allCities.map((city) => (
                    <MenuItem value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
          {/* Country & City */}

          <Stack direction="row" spacing={2} sx={{ ml: "1vh" }} fullWidth>
            <FormControl sx={{ minWidth: "10vw" }}>
              <InputLabel
                id="demo-simple-select-label"
                helperText="Choose your country code"
              >
                Dial Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="dialCode"
                value={signupData.dialCode}
                label="Dial Code"
                onChange={handleChange}
                onFocus={loadCountryCode}
              >
                <MenuItem value={countryCode}>{countryCode}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="number"
              name="mobile"
              value={signupData.mobile}
              onChange={handleChange}
              variant="outlined"
              label="Mobile"
              color="primary"
              required
              fullWidth
              helperText="With country code. Eg. +1 655XXXXXX"
            />
          </Stack>

          {/* PFP upload */}
          <Box>
            <Box color="primary" sx={{ height: "200px" }}>
              <Stack
                direction="row"
                justifyContent="left"
                alignItems="center"
                spacing={4}
              >
                <InputLabel
                  htmlFor="file-input"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "left",
                    m: 1,
                    p: 3,
                  }}
                >
                  <Avatar
                    alt={signupData.username}
                    src={signupData.file}
                    sx={{
                      bgcolor: "#1976d2",
                      cursor: "pointer",
                      height: 128,
                      width: 128,
                      m: 1,
                    }}
                  >
                    <CameraAltRoundedIcon />
                  </Avatar>
                </InputLabel>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="left"
                  textColor="primary"
                >
                  <Grid item>
                    {fileName ? fileName : "Add a nice profile picture"}
                  </Grid>
                  {progressAmount && progressAmount < 100 && (
                    <Grid item>
                      <ProgressBar progress={progressAmount} />
                    </Grid>
                  )}
                </Grid>
              </Stack>
            </Box>

            <Input
              name="file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFileName(file.name);
                if (file) {
                  console.log(file);
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const storageRef = ref(
                      firebaseStorage,
                      `users/${signupData.username}/${file.name}`
                    );
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on(
                      "state_changed",
                      (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                          (snapshot.bytesTransferred / snapshot.totalBytes) *
                          100;
                        console.log("Upload is " + progress + "% done");
                        setProgressAmount(progress);
                        switch (snapshot.state) {
                          case "paused":
                            console.log("Upload is paused");
                            break;
                          case "running":
                            console.log("Upload is running");
                            break;
                          default:
                            console.log(
                              "Something went wrong while uploading!"
                            );
                        }
                      },
                      (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                          case "storage/unauthorized":
                            // User doesn't have permission to access the object
                            break;
                          case "storage/canceled":
                            // User canceled the upload
                            break;
                          case "storage/unknown":
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                          default:
                            console.log("Upload couldn't complete.");
                        }
                      },
                      () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            setSignupData((previous) => ({
                              ...previous,
                              file: downloadURL,
                            }));
                          }
                        );
                      }
                    );

                    console.log("post updated!", signupData);
                  };
                }
              }}
              color="primary"
              id="file-input"
              sx={{ display: "none" }}
              fullWidth
            />
          </Box>

          {progressAmount > 0 && progressAmount < 100 && <ProgressBar />}
          {/* PFP upload */}

          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "1vh" }}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Link to="/login" sx={{ margin: "1vh" }}>
          Have an account? Login
        </Link>
      </Paper>
    </Container>
  );
}

export default Signup;
