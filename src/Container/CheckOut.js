import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Container.css";
import Appbar from "../Components/Appbar";
import axios from 'axios';

const CheckOut = () => {

  const [name ,setName] = useState('')
  const [email ,setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState(0)
 const [storageData,setstorageData] = useState([])
 const [cartLenght,setcartLenght] = useState(0)





  useEffect(()=>{
    const carts = JSON.parse(localStorage.getItem('cart'))
    setstorageData(carts)
    setcartLenght(carts.length)
    const totalAMount = JSON.parse(localStorage.getItem('totalamount'))
   setAmount(totalAMount) 

  })
      
  const deleteCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == id);
    if (idIndex !== -1) {
      cartData.splice(idIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartData));
      setcartLenght(cartData.length);
    }
  };

  const  QuantityLess = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == id);
    if (idIndex !== -1) {
      cartData[idIndex].qty--;
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

   const Quantity = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == id);
    if (idIndex !== -1) {
        cartData[idIndex].qty++;
    

      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }


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
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/order/',
    data: {
      ...userOrderDetails
    }
  }).then(res => {
    console.log(res.data.message)
  })
  .catch(err => console.log(err))


 
  }
  return (
    <>
     <Appbar
        QuantityLess={QuantityLess}
        Quantity={Quantity}
        deleteCart={deleteCart}
        storageData={storageData}
        cartLenght={cartLenght}
      />
      <h4 className="main-head">CheckOut</h4>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex align-items-between justify-content-around mt-5 flex-wrap">
              <TextField value={name} label="Name" onChange={(e)=> setName(e.target.value)} className="text-field"  />

              <TextField
                label="Email"
                variant="outlined"
                className="text-field"
                value={email}
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
                value={phone}
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
