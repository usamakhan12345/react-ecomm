import { BrowserRouter, Route , Routes } from "react-router-dom"
import Cart from "./Container/Cart"
import Home from "./Container/Home"
import {Category} from "./Context"
import { useState } from "react"
const App = () => {
  const [category,setCategory] = useState("")
 
  return (
    <>

    <BrowserRouter>
      <Category.Provider value={{category,setCategory}}>

        <Routes>
        <Route path ="/"  element = {<Home/>}/>
        <Route path ="/cart"   element = {<Cart/>}/>
        </Routes>
      </Category.Provider>
    </BrowserRouter>
    </>
  )
}

export default App