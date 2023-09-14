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
const Home = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [datalimit, setDataLimit] = useState(8);
  const [loaderDisplay, setLoaderDisplay] = useState("flex");
  const [pagination, setPagination] = useState(false);
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const { category, setCategory } = useContext(Category);

  useEffect(() => {
    const dataFetch = () => {
      if (!category) {
        console.log(category)
        axios(`https://fakestoreapi.com/products?limit=${datalimit}`)
          .then((res) => {
            setdata(res.data);
            console.log(res.data)
            // <CircularIndeterminate display={loaderDisplay}/>
            setLoaderDisplay("none");
            setPagination(true);
          })

          .catch((err) => console.log(err));
      } 
      else {
        console.log(category)
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
  },[category,datalimit]);

  // console.log(data)
  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
    if (value === 1) {
      setDataLimit(8);
    }
    if (value === 2) {
      setDataLimit(12);
    }
  };
  const viewDetails = (id) => {
    console.log("id--->", id);

    axios(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => console.log(err));
    setOpen(true);
  };
  return (
    <>
      <Appbar />
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
              viewDetails={viewDetails}
              setopen={setOpen}
              key={i}
              title={v.title.slice(0, 20) + "..."}
              image={v.image}
              price={v.price}
              rating={v.rating}
              id={v.id}
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
