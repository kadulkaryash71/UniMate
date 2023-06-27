import React from "react";

// material imports
import Box from "@mui/material/Box";

// local imports
import Hero from "../components/Landing/Hero";
import About from "../pages/About";
import Partners from "../components/Landing/Partners";
import Testimonials from "../components/Landing/Testimonials";

export default function LandingPage() {
  return (
    <Box component="main">
      <Hero />
      <About short={true} />
      <Partners />
      <Testimonials />
    </Box>
  );
}
