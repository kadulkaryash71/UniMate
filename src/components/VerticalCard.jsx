import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

// props: heading, title, subtitle, image, imageHeight, altText, actionButton
export default function VerticalCard(props) {
  return (
    <Card sx={{ my: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.imageHeight ? props.imageHeight : "256"}
          image={props.image}
          alt={props.altText}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.heading}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{props.actionButton}</CardActions>
    </Card>
  );
}
