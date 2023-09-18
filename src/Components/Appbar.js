import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {FiShoppingCart} from "react-icons/fi"
import {BiCartAdd} from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TemporaryDrawer from './Drawer';

const drawerWidth = 240;
function DrawerAppBar(props) {

  const[open,setOpen] = React.useState(false)
  // const [cartLenght,setCartLenght] = React.useState()
  const navigate = useNavigate()
  // console.log(props.cartLenght)
      const navItems = ['About', 'Contact','Login', <>  <Badge className='mt-1' badgeContent={props.cartLenght} color="primary"> <BiCartAdd onClick={()=>setOpen(true)}  style={{fontSize:'42'}} /> </Badge>  </>];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartDrawer, setcartDrawer] = React.useState(false);


  
//  React.useEffect(()=>{
//   const CartLenth = ()=>{
//     const carts = JSON.parse(localStorage.getItem('cart'))
//     if(carts){

//       setCartLenght(carts.length)
//     }
//   }
//   CartLenth()
//  })
//  console.log(cartLenght)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
//  const pageChange = (item)=>{
//           console.log(item)  
//         if(item === 'About' || item === 'Contact' || item === 'Login'){
        
//         }else{
//           navigate("/cart")
//         }
//  }
 
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <FiShoppingCart/>
      
      <Typography variant="h6" sx={{ my: 2 }}>
        Smit Store
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
              <div>

              </div>
            <div>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{backgroundColor : "#EC407A"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <div className='fs-3  d-flex'>
              <div className='fs-1 px-2'>

            <FiShoppingCart/>
              </div>
              <div className='mt-3'>
            SMIT STORE
              </div>
            </div>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
             
            <Button style={{}}  key={item} sx={{ color: '#fff' }}>
                {item}
            </Button>
            ))}
           </Box>
          {/* <Box>
            <span className='fs-3' style={{marginLeft :15 , color:'blue',cursor:'pointer',fontWeight:'bold'}}>{"cartLenght"}</span>
           <BiCartAdd style={{cursor: 'pointer'}} onClick={()=> navigate("/cart")} className='fs-1'/> 
          </Box>  */}
        </Toolbar>
      </AppBar>
          <TemporaryDrawer QuantityLess = {props.QuantityLess} Quantity={props.Quantity} deleteCart={props.deleteCart} storageData = {props.storageData} open={open} setOpen = {setOpen}/>
      <nav>
        <Drawer
          style={{color : "#e3821e", backgroundColor :  "#EC407A"}}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none', color : "#EC407A" },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , color : "#ffff", backgroundColor :"#EC407A" ,fontWeight : 'bold' , fontSize : "30px"},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
       
        </Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
 
  window: PropTypes.func,
};

export default DrawerAppBar;
