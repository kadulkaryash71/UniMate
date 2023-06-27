import { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AddCommentIcon from "@mui/icons-material/AddComment";
import userContext from "../context/userContext";

export default function AddComment({ postID }) {
  const { currentUser, authToken } = useContext(userContext);
  const [comment, setComment] = useState({
    commentBody: "",
    username: currentUser.username,
    displayImage: currentUser.file
  });

  function handleAddComment(e) {
    e.preventDefault();
    console.log(comment);
    // need postID during fetch
    fetch(`http://127.0.0.1:5000/posts/c/?id=${postID}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken")
      },
      body: JSON.stringify(comment)
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((e) => console.error("Could not add comment.", e));
    setComment((comment) => ({ ...comment, commentBody: "" }));
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "4px",
        display: "flex",
        alignItems: "center",
        borderRadius: "1em"
      }}
    >
      <Avatar alt={currentUser.username} src={currentUser.file} />
      <InputBase
        value={comment.commentBody}
        onChange={(e) =>
          setComment((prevState) => ({
            ...prevState,
            commentBody: e.target.value
          }))
        }
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add comment..."
        inputProps={{ "aria-label": "add comment" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleAddComment}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
      >
        <Tooltip title="Post Comment">
          <AddCommentIcon />
        </Tooltip>
      </IconButton>
    </Paper>
  );
}
