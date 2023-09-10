import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import {useNavigate , NavLink} from "react"
import HoverRating from "../Components/Star"


export default function MultiActionAreaCard({title,image}) {
  return (
    <Card className='mb-3 mx-1' sx={{ maxWidth: 250,  justifyContent:'space-around'}}>
      <CardActionArea>
        <CardMedia
        style={{objectFit : 'fixed'}}
          component="img"
          height="140"
          image= {image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{color:"#ea9825"}}>
           {title.slice(0,20)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            <HoverRating className="mt-2"/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
            Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
