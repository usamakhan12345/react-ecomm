import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Appbar from "../Components/Appbar";
import MultiActionAreaCard from "../Components/Card";
import CircularIndeterminate from "../Components/Loader";
import BasicModal from "../Components/BasicModal";
import Dropdown from "../Components/Dropdown";
import { useContext } from "react";
import { Category } from "../Context";
import TemporaryDrawer from "../Components/Drawer";

const Home = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [datalimit, setDataLimit] = useState(8);
  const [loaderDisplay, setLoaderDisplay] = useState("flex");
  const [pagination, setPagination] = useState(false);
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const { category, setCategory } = useContext(Category);
  const [cartLenght, setCartLenght] = useState();
  const [storageData, setStorageData] = useState([]);

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
        // cartData.splice(idIndex,1,...cartData[idIndex])
        cartData[idIndex].qty++;
        // cartData[idIndex].price = (parseInt(cartData[idIndex].price) * parseInt(cartData[idIndex].qty))
        // console.log(cartData[idIndex].price)

      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  useEffect(() => {
    const cartdata = JSON.parse(localStorage.getItem("cart"));
    if (cartdata) {
      setStorageData(cartdata);
      setCartLenght(cartdata.length);
    }
  }, [cartLenght, QuantityLess]);

  useEffect(() => {
    const dataFetch = () => {
      if (!category) {
        axios(`https://fakestoreapi.com/products?limit=${datalimit}`)
          .then((res) => {
            setdata(res.data);
            // <CircularIndeterminate display={loaderDisplay}/>
            setLoaderDisplay("none");
            setPagination(true);
          })

          .catch((err) => console.log(err));
      } else {
        axios(`https://fakestoreapi.com/products/category/${category}`)
          .then((res) => {
            setdata(res.data);
            setLoaderDisplay("none");
            setPagination(true);
          })

          .catch((err) => console.log(err));
      }
    };
    dataFetch();
  }, [category, datalimit]);

  const AddtoCart = (data) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == data.id);
    if (idIndex !== -1) {
      cartData[idIndex].qty++;
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      cartData.push({ ...data, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCartLenght(cartData.length);
  };
  const deleteCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const idIndex = cartData.findIndex((obj) => obj.id == id);
    if (idIndex !== -1) {
      cartData.splice(idIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartData));
      setCartLenght(cartData.length);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      setDataLimit(8);
    }
    if (value === 2) {
      setDataLimit(12);
    }
  };

  const viewDetails = (id) => {
    axios(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => console.log(err));
    setOpen(true);
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
      {/* <TemporaryDrawer/> */}
      <Dropdown />
      <BasicModal
        productDetails={productDetails}
        handleClose={() => {
          setOpen(false);
          setProductDetails({});
        }}
        open={open}
      />
      <CircularIndeterminate display={loaderDisplay} />

      <div
        className="my-2"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {data.map((v, i) => (
          <div key={i} className="mb-2">
            <MultiActionAreaCard
              AddtoCart={AddtoCart}
              viewDetails={viewDetails}
              setopen={setOpen}
              data={v}
            />
          </div>
        ))}
      </div>
      {pagination ? (
        <div className="justify-content-center margin-auto">
          <Stack spacing={2} style={{ color: "#EC407A" }}>
            <Typography>Page: {page}</Typography>
            <Pagination
              className="text-light"
              style={{ backgroundColor: "#EC407A" }}
              count={8}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
