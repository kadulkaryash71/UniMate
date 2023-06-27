import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import userContext from "../context/userContext";
import Wall from "./Wall";

function Home() {
  const { currentUser } = useContext(userContext);

  return (
    <Box>
      <Stack spacing={3}>
        {currentUser ? "Hello, " + currentUser.username : "Hello"}
      </Stack>
      <Wall />
    </Box>
  );
}

export default Home;
