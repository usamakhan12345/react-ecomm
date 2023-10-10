import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReactStars from "react-stars";
import { Button, CardActions } from '@mui/material';
import CircularIndeterminate from "../Components/Loader"
import { useState } from "react";



export default function MediaControlCard({ productDetails }) {
  const [loader , setLoader] = useState("flex")

  const theme = useTheme();
  setTimeout(() => {
    setLoader('none')
  }, 700);
  return (

    <Card className="media-control-card" sx={{ display: "flex" }}>
    <CircularIndeterminate display={loader}/>

      <CardMedia
        className="px-2 mx-2"
        style={{ objectFit: "contain" }}
        component="img"
        sx={{ width: 151 }}
        image={productDetails.image}
        alt="Live from space album cover"
      />

      <Box sx={{ display: "flex", flexDirection: "column " }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography className="my-3" component="div" variant="h4">
            {productDetails.title}
          </Typography>
          <Typography
       
          >
            {productDetails.description}
            <div className="mt-1 my-2">
              <ReactStars
                edit={false}
                value={productDetails.rate}
                count={productDetails.count}
                size={25}
                color2={"#ffd700"}
              />
            </div>
            <div>
              <h3 className="details-price"> Rs {productDetails.price}/-</h3>
            </div>
            <CardActions className="d-flex justify-content-between ">
              <Button size="large" color="primary" className="but-now-btn">
                Buy Now
              </Button>
             
            </CardActions>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
