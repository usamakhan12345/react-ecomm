import React from "react";
import Appbar from "../Components/Appbar";
import "./Container.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
    const navigate = useNavigate()
  const signUp = ()=>{
    console.log("first")
    navigate("/signup")
  }
  const userLoginData = {
    email,
    password
  }
  const userLogin = ()=>{
    console.log(userLoginData)
    if(userLoginData){
      
      axios({
        method: 'post',
      url: 'http://localhost:3000/api/user/login',
      data: {
        ...userLoginData
      }
    }).then(res => {
      console.log(res.data.message)
      console.log("token--->",res.data.token);
      Swal.fire({
        title: 'User Login Successfuly',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'ok'
      })
      localStorage.setItem("token",JSON.stringify(res.data.token))
      navigate("/")
      // console.log()
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'ok'
      })
    })
    
    setEmail("")
    setPassword("")
  }
  }
  return (
    <>
      <Appbar />
      <div>
        <h1 className="fw-bold text-center login mt-3 my-5">Login</h1>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-12 d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <span className="login-icon">
                <AiOutlineMail />
              </span>
              <input
                className="login-input"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
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
              <button className="login-btn" onClick={()=>userLogin()}>Login</button>
            </div>
                <div className="text-center"><button className="forget-pass ">Forget Password ?</button></div>
              <div className="d-flex text-center justify-content-center mt-1 login-text flex-wrap">
              <div className="text-center mt-1">Don't Have an Account ? </div> <div className="fw-bold px-1 fs-5"><button className="signup-btn" onClick={()=>signUp()}>signUp</button></div>
              </div>
            </div>
    </>
  );
};

export default Login;
