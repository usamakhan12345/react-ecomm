import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Container.css";
import Appbar from "../Components/Appbar";

const CheckOut = () => {

  const [name ,setName] = useState('')
  const [email ,setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState(0)


  useEffect(()=>{
    const totalAMount = JSON.parse(localStorage.getItem('totalamount'))
  console.log(totalAMount)
  setAmount(totalAMount) 

  })
  const orderdetails = ()=>{
    const carts = JSON.parse(localStorage.getItem('cart'))
    const userOrderDetails= {
    name,
    email,
    phone,
    amount,
    carts
  }
  console.log(userOrderDetails)
  }
  return (
    <>
      <Appbar/>
      <h4 className="main-head">CheckOut</h4>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex align-items-between justify-content-around mt-5 flex-wrap">
              <TextField label="Name" onChange={(e)=> setName(e.target.value)} className="text-field"  />

              <TextField
                label="Email"
                variant="outlined"
                className="text-field"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center align-item-center">
          <div className="col-12">
            <div className="d-flex align-items-between justify-content-around mt-5 flex-wrap">
              <TextField
                label="Phone"
                variant="outlined"
                className="text-field"
                onChange={(e)=> setPhone(e.target.value)}
              />

              <TextField
                label="Total Amount"
                variant="outlined"
                className="text-field amount-input"
                value={amount}
                
                disabled 
              />
            </div>
            <div className="d-flex ">
              <button onClick={orderdetails} className="btn w-100 place-order-btn">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
