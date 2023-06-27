import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";

import Stack from "@mui/material/Stack";

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.setItem("user")));
  }, [setCurrentUser]);

  return (
    <Stack dir="row">
      This is {currentUser.fullName.split(" ")[0]}'s Profile
    </Stack>
  );
}
