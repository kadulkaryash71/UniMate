import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "") {
      fetch("http://127.0.0.1:5000/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" }
      });
    }
    setEmail("");
  }

  return (
    <Stack
      direction="row"
      component="footer"
      className="footer px-3 py-5 justify-content-between flex-wrap flex-md-nowrap"
    >
      <Box className="container m-2 p-auto d-flex flex-column align-items-center">
        <Box className="row align-items-center">
          <div className="col-6">
            <SchoolIcon className="logo fs-1" />
          </div>
          <div className="col-6 company-info">
            <p className="company-title fs-2">ABCD</p>
            <p className="company-desc fs-4 fw-normal">
              Ladies and gentlemen, we got 'em!
            </p>
          </div>
        </Box>
        <Stack direction="row" className="">
          <IconButton
            component="a"
            target="_blank"
            href="https://www.instagram.com/post.coke.skinny.bloke/"
          >
            <InstagramIcon color="warning" />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://www.youtube.com/channel/UCpbcjE30ZYl2ZNBBSADmj_A"
          >
            <YouTubeIcon color="warning" />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://twitter.com/kadulkaryash71"
          >
            <TwitterIcon color="warning" />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://github.com/kadulkaryash71"
          >
            <GitHubIcon color="warning" />
          </IconButton>
        </Stack>
      </Box>
      {/* <Box className="container m-2">
        <p className="border-bottom border-3">Services</p>
        <Stack component="div">
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
        </Stack>
      </Box> */}
      <Box className="container m-2">
        <p className="border-bottom border-3">Quick Links</p>
        <Stack>
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
          <Link href="/login" className="links m-2 text-decoration-none">
            Find People
          </Link>
        </Stack>
      </Box>
      <Box className="container m-2">
        <p className="border-bottom border-3">Newsletter</p>
        <p className="fw-normal">
          Subscribe to our newsletter to get the latest updates on the
          development of this product. Feel free to drop a message from our{" "}
          <Link href="/contact">contact</Link> to suggest features and services
          you would like to see us cover
        </p>
        <Stack component="form" onSubmit={handleSubmit}>
          <Box component="div" className="newsletter">
            <TextField
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Your email"
              className="newsletter-input"
            />
            <Button type="submit" className="newsletter-btn">
              Subscribe
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
