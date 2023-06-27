import React from "react";

import Box from "@mui/material/Box";

import HorizontalCard from "../HorizontalCard";

export default function Hero() {
  return (
    <Box className="p-3" style={{ maxWidth: "1440px" }}>
      <h2>Testimonials</h2>
      <Box
        className="w-75 m-auto scrolling-grid"
        style={{
          display: "grid",
          gridAutoColumns: "100%",
          gridAutoFlow: "column",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          gap: "25px"
        }}
      >
        <HorizontalCard
          heading="It has been a great experience so far..."
          subtitle="My name's Yash Kadulkar and I have been using UniMate from the past couple of years"
          previewImage="https://img.freepik.com/free-icon/user_318-804790.jpg"
        />
        <HorizontalCard
          heading="It has been a great experience so far..."
          subtitle="My name's Yash Kadulkar and I have been using UniMate from the past couple of years"
          previewImage="https://img.freepik.com/free-icon/user_318-804790.jpg"
        />
        <HorizontalCard
          heading="It has been a great experience so far..."
          subtitle="My name's Yash Kadulkar and I have been using UniMate from the past couple of years"
          previewImage="https://img.freepik.com/free-icon/user_318-804790.jpg"
        />
      </Box>
    </Box>
  );
}
