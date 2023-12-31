import React, { useState } from "react";
import Appbar from "../Components/Appbar";
import "./Container.css";
import { AiOutlineMail ,AiOutlineUser} from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import {BsFillTelephoneFill} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Swal from 'sweetalert2'


const SignUp = () => {
    const[name,setName] = useState("")
    const[phone,setPhone] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[check,setCheck] = useState("")


    const navigate = useNavigate()
    const login = ()=>{
      console.log("first")
      navigate("/login")
    }
    const userSignUpData = {
      name,
      phone,
      email,
      password
    }
    console.log(userSignUpData)

    const userSignUp = ()=>{


      console.log(userSignUpData)
      axios({
        method: 'post',
        url: 'https://handsome-pear-bikini.cyclic.app/api/user/',
        data: {
          ...userSignUpData
        }
      }).then(res => {
        console.log(res.data.message)
        console.log("token--->",res.data.token)
        Swal.fire({
          title: 'User Registered Successfuly',
          text: res.data.message,
          icon: 'success',
         
          confirmButtonText: 'ok'
        })
        // localStorage.setItem("token",JSON.stringify(res.data.token))
        navigate("/login")
      })
      .catch(err => {
        console.log(err)
        const errMesg = err.response.data.message
        if(errMesg.includes("duplicate")){
            setCheck("User Already Registered")
            console.log("check")
        }
        console.log(check)

        Swal.fire({
          title: 'User Not Registered',
          text: check ? check : err.response.data.message ,
          icon: 'error',
          confirmButtonText: 'ok'
        })
      })
        
      
          
      // setName("")
      // setPhone("")
      // setEmail("")
      // setPassword("")
    }
  return (
    <>
      <Appbar />
      <div>
        <h1 className="fw-bold text-center login ">Sign Up</h1>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-12 d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <span className="login-icon">
                <AiOutlineUser />
              </span>
              <input
                className="login-input"
                type="text"
                placeholder="Enter Fullname"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
              <span className="login-icon">
                <BsFillTelephoneFill />
              </span>
              <input
                className="login-input"
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <span className="login-icon">
                <AiOutlineMail />
              </span>
              <input
                className="login-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <span className="login-icon">
                <RiLockPasswordFill />
              </span>
              <input
                className="login-input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center mt-3">
              <button className="login-btn" onClick={()=>userSignUp()}>SignUp</button>
            </div>
              <div className="d-flex text-center justify-content-center mt-1 login-text flex-wrap">

              <div className="text-center mt-1">Already Have an Account ? </div> <div className="fw-bold px-1 fs-5 signup-login-btn"><button className="signup-btn" onClick={()=>login()} >Login</button></div>
              </div>
            </div>
    
    
    
    </>
  )
}

export default SignUp