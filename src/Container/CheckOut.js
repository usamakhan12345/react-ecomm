import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Container.css";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"


import Appbar from "../Components/Appbar";
import axios from "axios";

const CheckOut = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [storageData, setstorageData] = useState([]);
  const [cartLenght, setcartLenght] = useState(0);
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("cart"));
    if(carts){

      setstorageData(carts);
      setcartLenght(carts.length);
    }
    const totalAMount = JSON.parse(localStorage.getItem("totalamount"));

    setAmount(totalAMount);
    const token = JSON.stringify(localStorage.getItem("token"));
   
  }, []);

  const deleteCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == id);
    if (idIndex !== -1) {
      cartData.splice(idIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartData));
      setcartLenght(cartData.length);
    }
  };

  const QuantityLess = (id) => {
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
  };

  const orderdetails = () => {
    const carts = JSON.parse(localStorage.getItem("cart"));
    const customer = JSON.parse(localStorage.getItem("userid"));

    const userOrderDetails = {
      name,
      email,
      phone,
      amount,
      address,
      carts,
      customer
     
    };
    axios({
      method: "post",
      url: "https://handsome-pear-bikini.cyclic.app/api/order/",
      data: {
        ...userOrderDetails,
      },
    })
      .then((res) => {
        Swal.fire({
          title: ' Successfuly Placed Order',
          text: res.data.message,
          icon: 'success',
         
          confirmButtonText: 'ok'
        })
        localStorage.removeItem('cart')
        localStorage.removeItem('totalamount')
        setstorageData("")
        setcartLenght(0)
        navigate('/')
        
      })
      .catch((err) => console.log(err));
  };
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
      <div className="container mt-2">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex align-items-between justify-content-around mt-5 flex-wrap">
              <TextField
                value={name}
                label="Name"
                onChange={(e) => setName(e.target.value)}
                className="text-field"
              />

              <TextField
                label="Email"
                variant="outlined"
                className="text-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
              />

              <TextField
                label="Total Amount"
                variant="outlined"
                className="text-field amount-input"
                value={amount}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <TextField
                  label="Address"
                  variant="outlined"
                  className="text-field mt-4 address-filed  w-100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="d-flex ">
            <button
              onClick={orderdetails}
              className="btn w-100 place-order-btn "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
