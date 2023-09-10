import Home from "./Container/Home"
import { BrowserRouter, Route , Routes} from "react-router-dom"
import Cart from "./Container/Cart"
const App = () => {
 
  return (
    <>
    <BrowserRouter>
    <Home/>
      <Routes>
        <Route path={"/"} elment = {<Home/>}></Route>
        <Route path={"/cart"} elment = {<Cart/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App