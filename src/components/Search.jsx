import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HorizontalCard from "./HorizontalCard";

export default function Search(props) {
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const query = e.target.value.toLowerCase();

    if (query) {
      fetch(`http://127.0.0.1:5000/s?q=${query}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken")
        }
      })
        .then((res) => res.json())
        .then(setResults);
    } else {
      console.log(query);
      setResults([]);
    }
  }

  return (
    <Box>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search people, posts, universities"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {results !== [] &&
        results.map((item) => (
          <HorizontalCard
            key={item.id}
            previewImage={item.file}
            heading={item.username}
            subtitle={
              item.body.length > 50 ? item.body.slice(0, 50) + "..." : item.body
            }
            altText={item.username}
          />
        ))}
    </Box>
  );
}
