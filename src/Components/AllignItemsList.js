import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import "./index.css";
import ReactStars from "react-stars";
import {
  AiFillDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";

export default function AlignItemsList({
  storageData,
  deleteCart,
  Quantity,
  QuantityLess,
}) {
  const totalPrice = storageData.reduce((a,b)=>{
    return  a + parseInt(b.price)

  })
  console.log(totalPrice)
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {storageData.map((v, i) => (
        <ListItem alignItems="flex-start" style={{ position: "relative" }}>
          <div className="drawerImageBox">
            <img className="drawerImage" src={v.image} />
          </div>

          <Typography
            onClick={() => deleteCart(v.id)}
            className="deleteicon"
            style={{ position: "absolute", right: 10 }}
          >
            <AiFillDelete  className="delete-icon"/>
          </Typography>
         <ListItemText
            primary={v.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="h3"
                  variant="body2"
                  color="text.primary"
                  className="fs-6 py-2 fw-bold"
                >
                  Rs {Math.round(v.price * v.qty)}/-
                </Typography>
                <Typography>
                  <ReactStars
                    edit={false}
                    value={v.rating.rate}
                    count={5}
                    size={18}
                    color2={"#ffd700"}
                  />
                </Typography>
                <Typography className="fw-bold">
                  <>
                    {" "}
                    QTY :{" "}
                    <span onClick={() => Quantity(v.id)}>
                      {" "}
                      <AiOutlinePlusCircle className="qty-icon" />{" "}
                    </span>{" "}
                    {v.qty}{" "}
                    <span onClick={() => v.qty > 1 && QuantityLess(v.id)}>
                      {" "}
                      <AiOutlineMinusCircle className="qty-icon" />
                    </span>{" "}
                  </>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      <h5>Total Price :{}</h5>
      {storageData && <button className="btn w-100 bg-success text-light fw-bold px-5">Check Out</button> } 
    </List>
  );
}
