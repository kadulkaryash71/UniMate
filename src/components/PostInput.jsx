import { useState, useContext, useEffect } from "react";
import {
  firebaseStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "../firebase";
import {
  Input,
  TextField,
  Grid,
  IconButton,
  Box,
  InputLabel,
  Tooltip,
  Divider,
  Typography,
  Stack
} from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import UserContext from "../context/userContext";

function PostInput(props) {
  const { currentUser, setCurrentUser, authToken } = useContext(UserContext);
  const [fileName, setFileName] = useState(false);
  const [post, setPost] = useState({
    body: "",
    file: "",
    username: currentUser.username
  });

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"));
  }, [setCurrentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(post);

    // use this code in yours: https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0#full_example
    fetch("http://127.0.0.1:5000/posts", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken")
      }
    });

    setPost((post) => ({ ...post, body: "", file: "" }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {console.log(currentUser)}
      <Grid container sx={{ m: "auto", p: 4 }}>
        <Grid item xs={12}>
          <TextField
            name="body"
            value={post.body}
            onChange={(e) =>
              setPost((previous) => ({ ...previous, body: e.target.value }))
            }
            placeholder="Share your thoughts"
            multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          {" "}
          <Divider component="hr" color="primary" />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Tooltip title="Post" arrow>
              <IconButton type="submit" variant="contained" color="primary">
                <InputLabel color="primary">
                  <SendIcon color="primary" sx={{ cursor: "pointer" }} />
                </InputLabel>
              </IconButton>
            </Tooltip>
            <Tooltip title="Discard Post" arrow>
              <IconButton type="reset" variant="outlined">
                <InputLabel>
                  <DeleteOutlineIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  />
                </InputLabel>
              </IconButton>
            </Tooltip>
            <Box>
              <Tooltip title="Add Media" arrow>
                <IconButton color="primary" variant="contained">
                  <InputLabel htmlFor="file-input" sx={{ m: 0, p: 0 }}>
                    <CameraAltRoundedIcon
                      variant="contained"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    />
                  </InputLabel>
                </IconButton>
              </Tooltip>
              <Input
                name="file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFileName(file.name);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const storageRef = ref(
                        firebaseStorage,
                        `posts/${post.username}/${file.name}`
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
                              setPost((previous) => ({
                                ...previous,
                                file: downloadURL
                              }));
                            }
                          );
                        }
                      );

                      console.log("post updated!", post);
                    };
                  }
                }}
                color="primary"
                id="file-input"
                sx={{ display: "none" }}
                fullWidth
              />
            </Box>
            {post.file && fileName && (
              <Stack
                direction="row-reverse"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Typography
                  sx={{
                    color: "#111"
                  }}
                >
                  {fileName}
                </Typography>
                <img height="35" alt="FilePreview" src={post.file} style={{}} />
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default PostInput;
