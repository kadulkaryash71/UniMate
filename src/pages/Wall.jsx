import { useState, useEffect, useContext } from "react";

import { Grid, Paper, Button, Box, Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

import PostInput from "../components/PostInput";
import Post from "../components/Post";
import Search from "../components/Search";
import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";
import UserContext from "../context/userContext";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

function Wall(props) {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/posts", {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch("http://127.0.0.1:5000/users", {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((users) => {
        const removedCurrentUser = users.filter((user) => {
          return user._id !== currentUser._id;
        });
        const removedFollowing = removedCurrentUser.filter((user) => {
          return currentUser.friends.indexOf(user._id) === -1 ? true : false;
        });
        setUsers(removedFollowing);
      });
  }, [currentUser]);

  function handleFollow(e, userID) {
    fetch(
      `http://127.0.0.1:5000/users/friends/add?from=${currentUser._id}&to=${userID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
  }

  return (
    <Grid container spacing={2}>
      {/* Left sidebar */}
      <Grid item md={3}>
        <Search />
      </Grid>
      {/* Left sidebar */}

      {/* Playground */}
      <Grid item md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #ccc",
            borderRight: "1px solid #ccc",
          }}
          fullWidth
        >
          <PostInput />
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  postID={post._id}
                  username={post.username}
                  likes={post.likes}
                  file={post.file}
                  body={post.body}
                  createdAt={new Date(post.createdAt).toLocaleString()}
                  comments={post.comments}
                />
              );
            })}
        </Box>
      </Grid>
      {/* Playground */}

      {/* Right sidebar */}
      <Grid item md={3}>
        <Box>
          {/* Blogs */}
          <Container sx={{ py: 3 }}>
            {blogs.map((blog, i) => (
              <HorizontalCard
                key={i}
                previewImage={blog.mediaPreview}
                heading={blog.title}
                subtitle={blog.content.slice(0, 30) + "..."}
              />
            ))}
          </Container>
          {/* Blogs */}

          <Divider component="hr" color="primary" />

          {/* Users */}
          <Container sx={{ py: 3 }}>
            <Typography color="primary" component="h4">
              Similar People
            </Typography>
            {users.map((user, i) => (
              <VerticalCard
                key={user._id}
                heading={user.fullName}
                title={user.university}
                subtitle={user.city + ", " + user.country}
                image={user.file}
                altText={user.username}
                actionButton={
                  <Button
                    onClick={(e) => handleFollow(e, user._id)}
                    size="normal"
                    color="primary"
                    fullWidth
                  >
                    <PersonAddRoundedIcon />
                    <Typography sx={{ mx: 1 }}>Follow</Typography>
                  </Button>
                }
              />
            ))}
          </Container>
          {/* Users */}
        </Box>
      </Grid>
      {/* Right sidebar */}
    </Grid>
  );
}

const blogs = [
  {
    mediaPreview:
      "https://png.pngitem.com/pimgs/s/197-1971336_release-notes-icon-hd-png-download.png",
    title: "The first blog ever",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, cupiditate. Libero accusamus reiciendis assumenda magnam quia aliquid, molestiae repudiandae dolorem ipsam dignissimos laudantium aspernatur atque dolores doloremque. Fugiat, aspernatur quod.",
  },
];

// const users = [
//   {
//     fullName: "Yash Kadulkar",
//     city: "Phoenix, Arizona, United States",
//     profileImage:
//       "https://media.licdn.com/dms/image/D4D03AQFHYZSRWMLhSw/profile-displayphoto-shrink_800_800/0/1633016775234?e=2147483647&v=beta&t=gK0kcJ9eaVGpCzqqRgLyxDF1-yu7NCJUm_QLFWSDVHU",
//     username: "yashk"
//     // actionButton={""}
//   },
//   {
//     fullName: "Yash Kadulkar",
//     city: "Dublin 9, Dublin, Ireland",
//     profileImage:
//       "https://res.cloudinary.com/practicaldev/image/fetch/s--yd7MfzCb--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1001603/e5d1fc41-7a53-4e43-8e4c-2d09fad58948.jpg",
//     username: "yash_novice"
//     // actionButton={""}
//   }
// ];

export default Wall;
