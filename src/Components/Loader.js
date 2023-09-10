import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({display}) {
  return (
    <Box sx={{ display: display , color:"success" , position : 'absolute' , top : '50%' ,margin : 'auto' ,left : '50%'}}>
      <CircularProgress style={{color:"#e3821e"}} /> 
    </Box>
  );
}
