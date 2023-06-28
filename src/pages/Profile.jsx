import { useContext, useEffect } from "react";
import userContext from "../context/userContext";

import Stack from "@mui/material/Stack";

export default function Profile(props) {
  return (
    <Stack dir="row">
      <h1>This is {props.user.fullName}'s Profile</h1>
    </Stack>
  );
}
