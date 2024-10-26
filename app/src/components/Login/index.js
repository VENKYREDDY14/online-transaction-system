import React from 'react';
import ebankLogin from './ebank-login-img.png'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 
import {useState} from 'react'
import Reset from '../Reset';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const [number,setNumber]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const handlingLogin=(event)=>{
        event.preventDefault();
        navigate('/home');
    }
    const handlingForgotPassword=()=>{
        <Reset/>
    }
  return (
    <div className="container-fluid login-container">
      <div className="row ">

        <div className="col-md-6 d-none d-md-block">
          <img src={ebankLogin} alt="bank-logo" className="img-fluid styling-login-image" />
        </div>
       
        <div className="col-md-6 credentials-container">
         <form className='form-container'>
            <div className='input-container'>
            <label htmlFor="number" className='styling-label-login'>ENTER THE GMAIL:</label><br/>
            <input type="text" id="number" className='styling-input' onChange={(event)=>{setNumber(event.target.value)}} value={number}/>
            </div>
            <div className='input-container'>
            <label htmlFor="password" className='styling-label-login'>ENTER THE PASSWORD:</label><br/>
            <input type={showPassword?password:'password'} id="password" className='styling-input' onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
            </div>
            <div className='input-container'>
                <input type="checkbox" id="show-password" onClick={()=>{setShowPassword((prevState)=>!prevState)}}/>
                <label htmlFor="show-password" className='show-password-label'>Show Password</label>
            </div>
            <div className='input-container'>
                <button className='btn btn-primary button' onClick={handlingLogin}>Login</button>
            </div>
            <div className='input-container'>
                <Link to="/reset-password" className='link-item'>
                <p className='forgot-password' onClick={handlingForgotPassword}>forgot password</p>
                </Link>
            </div>
            <div className='input-container'>
                <Link to="/create-account" className='link-item'>
                <p className='create-new-account'>create new account</p>
                </Link>
               
            </div>
         </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
