import { useState } from "react";
import { Stack, Grid, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary
}));

// props: username, displayImage, fullName, commentBody
function Comment(props) {
  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" sx={{ background: "#ccf", borderRadius: "1em" }}>
        <Item>
          <Avatar alt={props.fullName} src={props.displayImage} />
        </Item>
        <Item>
          <Grid container direction="column" align="left">
            <Grid item sx={{ fontWeight: "bold" }}>
              {props.fullName}
            </Grid>
            <Grid item>{props.commentBody}</Grid>
          </Grid>
        </Item>
      </Stack>
    </Box>
  );
}

export default Comment;
