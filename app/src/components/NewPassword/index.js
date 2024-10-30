import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
import {Link} from 'react-router-dom'
const NewPassword=()=>{
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState('');
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const [isPasswordSame,setPasswordSame]=useState(true);
    const [isPasswordEmpty,setPasswordEmpty]=useState(false);
    const [isConfirmPasswordEmpty,setConfirmPasswordEmpty]=useState(false);
    const validtePassword=()=>{
        setPasswordEmpty(!password);
        setConfirmPasswordEmpty(!confirmPassword);
        return password && confirmPassword;
    }
    const onSubmittingPassword=()=>{
        if(!validtePassword()) return ;
        if(password!==confirmPassword){
            setPasswordSame(false);
        }else{
            setPasswordSame(true);
        }
    }
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="input-container">
                <h1 className="set-password-heading">SET PASSWORD</h1>
            </div>
         <div className='input-container'>
            <label htmlFor="password" className='styling-label'>SET NEW PASSWORD:</label><br/>
            <div className="password-container">
            <div>
            <input type={showPassword?password:'password'} id="password" className='styling-password-input' onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
            {isPasswordEmpty && <p className='error-message'>*required</p>}
            </div>
            {showPassword?<BiShow className='styling-icon' onClick={()=>{setShowPassword((prevState)=>!prevState)}}/>:<BiHide className='styling-icon' onClick={()=>{setShowPassword((prevState)=>!prevState)}}/>}
            
            </div>
            </div>
            <div className='input-container'>
            <label htmlFor="confirm-password" className='styling-label'>CONFIRM PASSWORD:</label><br/>
            <div className='password-container'>
            <input type={showConfirmPassword?confirmPassword:'password'} id="confirm-password" className='styling-password-input' onChange={(event)=>{setConfirmPassword(event.target.value)}} value={confirmPassword}/>
            {isConfirmPasswordEmpty && <p className='error-message'>*required</p>}
            {showConfirmPassword?<BiShow className='styling-icon' onClick={()=>{setShowConfirmPassword((prevState)=>!prevState)}}/>:<BiHide className='styling-icon' onClick={()=>{setShowConfirmPassword((prevState)=>!prevState)}}/>}
            
            </div>

            </div>
            <div className="input-container">
                
                <button className="btn btn-primary button" onClick={onSubmittingPassword}>Submit</button>
               
            </div>
            { !isPasswordSame&& <p className='error-message'>passwords not matched</p>}
        </div>
    )
}
export default NewPassword