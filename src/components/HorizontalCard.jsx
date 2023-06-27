import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NotesIcon from "@mui/icons-material/Notes";

export default function HorizontalCard(props) {
  // props: previewImage, heading, subtitle[, previewImage]

  return (
    <Card sx={{ display: "flex", my: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 125 }}
        image={
          props.previewImage
            ? props.previewImage
            : "https://static.thenounproject.com/png/1087178-200.png"
        }
        alt={props.altText}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {props.heading}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.subtitle}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
