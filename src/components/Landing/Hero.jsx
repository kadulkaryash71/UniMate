import React from "react";
import { red } from "@mui/material/colors";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box position="relative">
      <Typography
        component="img"
        src="/assets/images/landing/young-people-university.jpg"
        sx={{ maxWidth: "100%", opacity: "60%" }}
      />
      <Box
        position="absolute"
        className="text"
        sx={{
          maxWidth: "50%",
          px: 5,
          py: 3,
          backgroundColor: "rgba(220,220,220, 0.8)",
          top: "50%",
          transform: "translateY(-50%)",
          borderRadius: "0 3em 3em 0",
        }}
      >
        <h2 className="text primary-text" sx={{ color: "#FF0060" }}>
          <span role="img" aria-label="grad-emoji">
            🎓
          </span>
          UniMate Connect
        </h2>
        <Typography component="p" color="primary" className="secondary-text">
          Find your university buddies and plan out the journey ahead together
        </Typography>
      </Box>
    </Box>
  );
}
