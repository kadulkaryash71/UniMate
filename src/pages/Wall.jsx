import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import { Grid, Paper, Button, Box, Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

import PostInput from "../components/PostInput";
import Post from "../components/Post";
import Search from "../components/Search";
import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";
import Loading from "../components/Loading";

import UserContext from "../context/userContext";
import { GET_USERS, GET_POSTS } from "../graphqlQueries";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

function Wall(props) {
  const { currentUser, authToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/posts", {
      headers: {
        Authorization: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch("http://127.0.0.1:5000/users", {
      headers: {
        Authorization: authToken,
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
          Authorization: authToken,
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
          <Posts />
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
            <FriendsList />
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

const FriendsList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Loading />;
  if (error) return <p>Something went wrong! (use 404 box here)</p>;
  return data.users.map((user) => (
    <VerticalCard
      key={user.id}
      heading={user.fullName}
      title={user.university}
      subtitle={user.city + ", " + user.country}
      image={user.file}
      altText={user.username}
      actionButton={
        <Button
          onClick={(e) => handleFollow(e, user.id)}
          size="normal"
          color="primary"
          fullWidth
        >
          <PersonAddRoundedIcon />
          <Typography sx={{ mx: 1 }}>Follow</Typography>
        </Button>
      }
    />
  ));
};

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <Loading />;
  if (error) return console.error("Something went wrong:", error);
  return data.posts.map((post) => {
    return (
      <Post
        key={post.id}
        postID={post.id}
        username={post.user.username}
        likes={post.likes}
        file={post.file}
        body={post.body}
        createdAt={new Date(Date(post.createdAt)).toLocaleString()}
        comments={post.comments}
      />
    );
  });
};

export default Wall;
