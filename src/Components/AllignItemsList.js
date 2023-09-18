import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TotalPrice } from "../Context/CartLenght";

import "./index.css";
import ReactStars from "react-stars";
import {
  AiFillDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { Navigate } from "react-router-dom";

export default function AlignItemsList({
  storageData,
  deleteCart,
  Quantity,
  QuantityLess,
}) {
  const navigate = useNavigate()
  const [totalPrice,setTotalPrice] = React.useState(0)
  const {setPrice} = useContext(TotalPrice)
  setPrice(totalPrice)
React.useEffect(()=>{
  const totalCartPrice = storageData.reduce((a,b)=>{
    return  a + (b.price) * parseInt(b.qty)

  },0)
  setTotalPrice(Math.floor(totalCartPrice))
  localStorage.setItem('totalamount',JSON.stringify(Math.floor(totalCartPrice)))
})
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
                  {/* {console.log(v.rating.rate)} */}
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
     {storageData.length ? <h5 className="fw-bold mx-5 mt-4 mb-2">Total Price :{totalPrice}</h5> : ""}
      {storageData.length ? <button Quantity={Quantity} deleteCart={deleteCart} QuantityLess={QuantityLess} onClick={()=> navigate('./checkout') } className="btn w-100 bg-success text-light fw-bold px-5">Check Out</button> :   <Alert severity="error" className="fw-bold emptyCartAlert">Cart Empty!</Alert>
      } 
    </List>
  );
}
