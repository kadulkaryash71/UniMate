import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Hero({ short }) {
  return (
    <Stack>
      {!short && (
        <h1 className="d-flex justify-content-center" sx={{ m: 1 }}>
          About Us
        </h1>
      )}
      <section className="p-5">
        <h2 className="primary-text text-primary">Motivation & Goals</h2>
        <Box className="d-flex justify-content-around align-items-start">
          <p className="my-3 p-3 secondary-text text-black bg-info bg-opacity-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            sapiente earum, ad quas nihil, debitis quia expedita mollitia non
            eius itaque enim? Voluptate enim eos similique corrupti, expedita
            odio voluptas.
          </p>
          {!short && (
            <img
              src="/assets/images/students-vector.jpg"
              alt=""
              className="img-fluid w-50"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          )}
        </Box>
      </section>
      {!short && (
        <>
          <h3>What do we do?</h3>
          <h3>Why you should join?</h3>
          <h3>Who is a Uni-mate?</h3>
          <p>i.e., UniMate Ambassador</p>
          <h3>Eligibility for Uni-mate</h3>
          <h3>Steps to join as an UniMate Ambassador</h3>
        </>
      )}
    </Stack>
  );
}
