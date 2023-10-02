import { BrowserRouter, Route , Routes } from "react-router-dom"
import Cart from "./Container/Cart"
import Home from "./Container/Home"
import {Category,StorageData} from "./Context"
import { useEffect, useState } from "react"
import { CartLenght } from "react"
import TemporaryDrawer from "./Components/Drawer"
import CheckOut from "./Container/CheckOut"
import { TotalPrice } from "./Context/CartLenght"
import DrawerAppBar from "./Components/Appbar"
import Login from "./Container/Login"
import SignUp from "./Container/SignUp"

const App = () => {
  const [category,setCategory] = useState("")
  const [price , setPrice] = useState("")


  useEffect(()=>{

  },[])
 
  return (
    <>

    <BrowserRouter>
      <Category.Provider value={{category,setCategory}}>
        <TotalPrice.Provider value={{price,setPrice}}>
        <Routes>
        <Route path ="/"  element = {<Home/>}/>
        <Route path ="/cart"   element = {<TemporaryDrawer/>}/>
        <Route path ="/checkout"   element = {<CheckOut/>}/>
        <Route path ="/login"   element = {<Login/>}/>
        <Route path ="/signup"   element = {<SignUp/>}/>



        </Routes>
        </TotalPrice.Provider>
      </Category.Provider>
    </BrowserRouter>
    </>
  )
}

export default App