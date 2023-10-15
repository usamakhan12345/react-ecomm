import React, { useState } from "react";
import "./index.css";
import { useContext } from "react";
import { Category } from "../Context";
import {AiOutlineArrowDown} from 'react-icons/ai'
const Dropdown = () => {
  const { category, setCategory } = useContext(Category);
  return (
    <>
      <div className="container-fluid section-1 ">
        <div className="row d-flex ">
          <div className="col-12 d-flex">
            <div className="content col-sm-4 col-6 mx-1">
              <div className="content-div d-flex mx-1 justify-content-center flex-column mt-5"> 
                <div>

              <h1 className="main-head">Winter Sale</h1>
                </div>
              <div className="d-flex justify-conetent-center sales-off">
                
              <h5 className="mt-3 mx-5 fw-bold sale-ofer w-100" >50% off</h5>
              </div>
              <div>
                  <AiOutlineArrowDown className="arrow-icon text-light"/>
              </div>
              </div>
            </div>
            <div className="  mx-2 col-6">
                <div className="content-image">

                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid drop-down-div ">
        <div className="d-flex ">
          <div className="row justify-content-between">
            <div className="col-12">
              
            </div>
            <div className="col-12">
              <label id="select-label">Select Category:</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="dropdown w-100"
              >
                Category
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
