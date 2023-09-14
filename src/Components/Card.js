import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import ReactStars from "react-stars";
  import "./index.css"
import axios from 'axios';
import BasicModal from './BasicModal';


export default function MultiActionAreaCard({viewDetails,setopen,title,image, price , rating , id}) {
  const[productDetails, setProductDetails] = React.useState({})
  // const viewDetails = (id)=>{
  //   console.log(id)
  //   setopen(true)
  //   setopen(true)
  //   axios(`https://fakestoreapi.com/products/${id}`)
  //   .then(res => setProductDetails(res.data))
  //   .catch(err => console.log(err))
  //    }
  const AddtoCart = (id)=>{
      // console.log(id)
      const cartData = JSON.parse(localStorage.getItem('cart') )|| []
      cartData.push(id)
        localStorage.setItem('cart',JSON.stringify(cartData))
      
  }
  return (
    <>
    <Card sx={{ width: 250, marginTop: 4 , height : 400 }}>
      <div>
        <img 
          style={{ width: "100%", height: 180, objectFit: "contain" }}
          src={image}
          alt=""
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rs {price}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {title.slice(0, 28)}...
        </Typography>
         <ReactStars
          edit={false}
          value={rating.rate}
          count={5}
          size={18}
          color2={"#ffd700"}
   /> 
      </CardContent>
      <CardActions className='d-flex justify-content-between btns-container'> 
        <Button onClick={()=>AddtoCart(id)} size="small" color="primary" className='cart-btn'>
            Add to Cart
        </Button>
        <Button onClick={()=> viewDetails(id)} size="small" color="primary"  className='details-btn'>
            View Details
        </Button>
      </CardActions>
    </Card>
      </>
  );
}














