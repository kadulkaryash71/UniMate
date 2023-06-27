import React from "react";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Hero() {
  return (
    <Box className="m-auto p-5">
      <h2 className="primary-text text-primary">Partnered Universities</h2>
      <ImageList className="m-auto" variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="eager"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img:
      "https://logos-world.net/wp-content/uploads/2021/09/MIT-Massachusetts-Institute-of-Technology-Logo.png",
    title: "MIT"
  },
  {
    img:
      "https://logodownload.org/wp-content/uploads/2021/04/stanford-university-logo.png",
    title: "Stanford"
  },
  {
    img: "https://mrvian.com/wp-content/uploads/2022/09/logo-harvard.png",
    title: "Harvard"
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1636px-Oxford-University-Circlet.svg.png",
    title: "Oxford"
  },
  {
    img: "https://cdn.cdnlogo.com/logos/u/49/university-of-cambridge.png",
    title: "Cambridge"
  },
  {
    img:
      "https://download.logo.wine/logo/University_of_Tokyo/University_of_Tokyo-Logo.wine.png",
    title: "Tokyo University"
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/University_of_Michigan_Logo.png",
    title: "Michigan University"
  },
  {
    img: "https://www.qualiaanalytics.org//app/uploads/2018/07/TrinityCD.png",
    title: "Trinity College Dublin"
  },
  {
    img:
      "https://logowik.com/content/uploads/images/university-college-dublin4379.jpg",
    title: "University College Dublin"
  },
  {
    img:
      "https://storage-prtl-co.imgix.net/endor/organisations/780/logos/1541608091_dcu_logo_stacked_slate_yellow-2018-print.png",
    title: "Dublin City University"
  },
  {
    img:
      "https://logos-world.net/wp-content/uploads/2021/10/Penn-State-University-Seal-Logo.png",
    title: "Penn State Univeristy"
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Intel-logo-2022.png",
    title: "Intel Inc."
  }
];
