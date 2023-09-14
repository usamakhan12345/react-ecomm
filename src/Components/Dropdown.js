import React, { useState } from 'react'
import './index.css'
import { useContext } from 'react'
import {Category} from "../Context"
const Dropdown = () => {
    const {category,setCategory} = useContext(Category)
  return (
    <>
    <div className='container d-flex'>
        <div className="row justify-content-between">
        <div className="col-12">

        <label id='select-label'>Select Category:</label>
        <select onChange={(e)=> setCategory(e.target.value)} className='dropdown'>Category
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>

        </select>
        {/* <button id='search-btn'>Search</button> */}
        </div>
        </div>
    </div>
    </>
  )
}

export default Dropdown