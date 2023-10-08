import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Profile = () => {
    const [file,setFile] = useState({})
    const UploadFile = ()=>{
      const formData = new FormData()
      console.log(file)

      formData.append("file",file)
      axios.post('http://localhost:8000/api/upload',formData)
      .then(res => console.log(res.data))
      .catch(err => {

        Swal.fire({
          title: 'Error!',
      text: err.messa,
    icon: 'error',
    confirmButtonText: 'Cool'
  })
})
    }
  return (
        <>
        
        <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
        <button onClick={UploadFile}>Upload</button>
        </>
    )
}

export default Profile