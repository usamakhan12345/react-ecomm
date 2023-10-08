import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import ReactStars from "react-stars";
import "./index.css";
import axios from "axios";
import BasicModal from "./BasicModal";
import { useEffect } from "react";

export default function MultiActionAreaCard({ data, AddtoCart, viewDetails }) {
  const [productDetails, setProductDetails] = React.useState({});
  const [checkLogin, setCheckLogin] = React.useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setCheckLogin(false);
    }
  }, []);

  return (
    <>
      <Card sx={{ width: 250, marginTop: 4, height: 400 }}>
        <div>
          <img
            style={{ width: "100%", height: 180, objectFit: "contain" }}
            src={data.image}
            alt=""
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Rs {data.price}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {data.title.slice(0, 28)}...
          </Typography>
          <ReactStars
            edit={false}
            value={data.rating.rate}
            count={5}
            size={18}
            color2={"#ffd700"}
          />
        </CardContent>
        <CardActions className="d-flex justify-content-between btns-container">
          <Button
            disabled={checkLogin}
            onClick={() => AddtoCart(data)}
            size="small"
            color="primary"
            className="cart-btn"
          >
            Add to Cart
          </Button>
          <Button
            onClick={() => viewDetails(data.id)}
            size="small"
            color="primary"
            className="details-btn"
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
