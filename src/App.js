import { BrowserRouter, Route , Routes } from "react-router-dom"
import Cart from "./Container/Cart"
import Home from "./Container/Home"
import {Category,StorageData} from "./Context"
import { useEffect, useState } from "react"
import { CartLenght } from "react"
import TemporaryDrawer from "./Components/Drawer"
const App = () => {
  const [category,setCategory] = useState("")

  useEffect(()=>{

  },[])
 
  return (
    <>

    <BrowserRouter>
      <Category.Provider value={{category,setCategory}}>

        <Routes>
        <Route path ="/"  element = {<Home/>}/>
        <Route path ="/cart"   element = {<TemporaryDrawer/>}/>
        </Routes>
      </Category.Provider>
    </BrowserRouter>
    </>
  )
}

export default App