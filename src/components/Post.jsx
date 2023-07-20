import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import userContext from "../context/userContext";
import Comment from "./Comment";
import AddComment from "./AddComment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// props: postID, username, likes, comments, file, body, createdAt
export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isStacked, setStacked] = useState(false);
  const { currentUser, authToken } = useContext(userContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleLike(e) {
    fetch(
      `http://127.0.0.1:5000/posts/l/?id=${props.postID}&liked=${!isLiked}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ username: currentUser.username }),
      }
    );
  }

  useEffect(() => {
    console.log("Inside 'like' useEffect");
    // fetch(
    //   `http://127.0.0.1:5000/posts/l/?id=${props.postID}&liked=${!isLiked}`,
    //   {
    //     method: "PATCH",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: localStorage.getItem("authToken")
    //     },
    //     body: JSON.stringify({ username: currentUser.username })
    //   }
    // );
  }, [isLiked, currentUser, props.postID]);

  return (
    <Card sx={{ mx: 5, my: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.username ? props.username : "Monke Talking"}
        subheader={props.createdAt}
      />
      <CardMedia component="img" image={props.file && props.file} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-evenly" alignItems="flex-start">
          <Grid item sx={{ m: "auto", p: "auto" }}>
            <Stack alignItems="center">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                value={isLiked}
                onClick={(e) => setLiked(!isLiked)}
                checked={isLiked}
              />
              <Typography paragraph>{props.likes.length}</Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ m: "auto", p: "auto" }}>
            <Stack alignItems="center">
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <CommentIcon />
              </ExpandMore>
              <Typography paragraph>
                {props.comments ? props.comments.length : "Comments"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ m: "auto", p: "auto" }}>
            <Stack alignItems="center">
              <IconButton>
                <ShareIcon />
              </IconButton>
              <Typography paragraph>Share</Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ m: "auto", p: "auto" }}>
            <Stack alignItems="center">
              <IconButton>
                {!isStacked ? (
                  <LayersOutlinedIcon onClick={() => setStacked(true)} />
                ) : (
                  <LayersRoundedIcon onClick={() => setStacked(false)} />
                )}
              </IconButton>
              <Typography paragraph>Stack Post</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* Comment Section */}
        <Paper sx={{ bgcolor: "#eef" }}>
          <CardContent>
            {/* Comment Input */}
            <AddComment
              postID={props.postID}
              username={currentUser.username}
              displayImage={currentUser.file}
            />
            {/* Comment Input */}

            {/* Rendering Comments */}
            {props.comments.length > 0 ? (
              props.comments.map((comment, i) => (
                <Typography key={i} paragraph>
                  <Comment
                    commenter={comment.user}
                    commentBody={comment.commentString}
                    displayImage={comment.displayImage}
                  />
                </Typography>
              ))
            ) : (
              <Typography paragraph>No comments</Typography>
            )}
            {/* Rendering Comments */}
          </CardContent>
        </Paper>
        {/* Comment Section */}
      </Collapse>
    </Card>
  );
}
