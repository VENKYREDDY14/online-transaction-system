import React from 'react';
import ebankLogin from './ebank-login-img.png'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 
import {useState} from 'react'
import Reset from '../Reset';
import {Link, useNavigate,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = () => {
  const navigate=useNavigate();
    const [gmail,setGmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [errorStatus,setErrorStatus]=useState(false);

    const jwtToken=Cookies.get('jwtToken');
    if (jwtToken !== undefined) {
      return <Navigate to="/home" replace />;
    }

    const handlingLogin=async (event)=>{
        event.preventDefault();
        const userDetails={gmail,password}
        const response=await fetch('http://localhost:3001/login',{
          method:"POST",
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(userDetails)
        })
        if(response.ok){
          const token=await response.json();
          const jwtToken=token.jwtToken;
          Cookies.set('jwtToken',jwtToken,{expires:7});
          Cookies.set('id',token.id);
          Cookies.set('gmail',token.gmail);
          Cookies.set('role',token.role)
          if(token.role==='admin'){
            navigate('/admin',{replace:true})
          }
          else{
            navigate('/home',{replace:true});
          }
        }
        else{
          setErrorStatus(true);
        }
    }
    const handlingForgotPassword=()=>{
        <Reset/>
    }
    
  
  return (
  <>
 
    <div className="container-fluid login-container">
      <div className="row ">

        <div className="col-md-6 d-none d-md-block">
          <img src={ebankLogin} alt="bank-logo" className="img-fluid styling-login-image" />
        </div>
       
        <div className="col-md-6 credentials-container">
         <form className='form-container' onSubmit={handlingLogin}>
            <div className='input-container'>
            <label htmlFor="gmail" className='styling-label-login'>ENTER THE EMAIL:</label><br/>
            <input type="gmail" id="gmail" className='styling-input' onChange={(event)=>{setGmail(event.target.value)}} value={gmail} required placeholder={'Enter your email'}/>
            </div>
            <div className='input-container'>
            <label htmlFor="password" className='styling-label-login'>ENTER THE PASSWORD:</label><br/>
            <input type={showPassword?password:'password'} id="password" className='styling-input' onChange={(event)=>{setPassword(event.target.value)}} value={password} required placeholder={'Enter your password'}/>
            </div>
            <div className='input-container'>
                <input type="checkbox" id="show-password" onClick={()=>{setShowPassword((prevState)=>!prevState)}}/>
                <label htmlFor="show-password" className='show-password-label'>Show Password</label>
            </div>
            <div className='input-container'>
                <button className='btn btn-primary button' type='submit'>Login</button>
            </div>
            {errorStatus&&<p className='error-message text-center'>Invalid credentials</p>}
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
    </>
  );
};

export default Login;
