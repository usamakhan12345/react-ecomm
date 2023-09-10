import React, { useState } from 'react'
import  { useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Appbar from "../Components/Appbar"
import MultiActionAreaCard from "../Components/Card"
import CircularIndeterminate from "../Components/Loader"
const Home = () => {  
    const [data,setdata] = useState([])
    const [page, setPage] = useState(1);
    const [datalimit, setDataLimit] = useState(8)
    const [loaderDisplay , setLoaderDisplay] = useState("flex")
    const [pagination,setPagination] = useState(false)

    useEffect(()=>{
      console.log(datalimit)
      const dataFetch =()=>{

        axios(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${datalimit}`)
        .then((res)=> {
          setdata(res.data);
        // <CircularIndeterminate display={loaderDisplay}/>
        setLoaderDisplay("none")
        setPagination(true)



        })
        .catch((err)=> console.log(err))
      }
      dataFetch();
      })
      console.log("data--->" , data)

      const handleChange = (event, value) => {
        console.log(value)
        setPage(value)
        if(value === 1){
          setDataLimit(8)
        }
        if(value === 2){
          setDataLimit(12)
        }
      };
  return (
    <>
    <Appbar/>
    <CircularIndeterminate display={loaderDisplay}/>

    <div className='my-2' style={{display:'flex' , flexWrap:'wrap' , justifyContent:'space-around'}}>

    {data.map((v,i)=>(
      <div key={i} className='mb-2'>
        <MultiActionAreaCard key={i} title ={v.category.name} image = {v.category.image}/>
      </div>
    ))}
    </div>
    {pagination ? <div className='justify-content-center margin-auto'>

<Stack spacing={2} style={{color: '#ea9825'}}>
<Typography >Page: {page}</Typography>
<Pagination style={{color: 'white' , backgroundColor :'#e3821e' } } count={8} page={page} onChange={handleChange} />
</Stack>
</div> : "" }
    
    
    </>    
)
}

export default Home