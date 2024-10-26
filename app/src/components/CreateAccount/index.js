import createAccountImage from './create-account.webp';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import {Link} from 'react-router-dom'
import './index.css';
const CreateAccount=()=>{
    const [number,setNumber]=useState('');
    
    return(
        <div >
          <div className='main-heading'>
              <h1 className="styling-heading-account ">Create New Account</h1>
            </div>
           <div className="creating-new-account">
          <div className="d-none d-md-block  new-account-img-container">
            <img src={createAccountImage} alt="bank-logo" className='styling-login-image'/>
          </div>
          <div >
            <div className='new-account-details-container'>
          <div className='input-container'>
            <label htmlFor="number" className='styling-label'>ENTER THE GMAIL:</label><br/>
            <input type="text" id="number" className='styling-input' onChange={(event)=>{setNumber(event.target.value)}} value={number}/>
            </div>
            <div className='input-container'>
            <label htmlFor="number" className='styling-label'>ENTER THE NUMBER:</label><br/>
            <input type="text" id="number" className='styling-input' onChange={(event)=>{setNumber(event.target.value)}} value={number}/>
            </div>
            <div className='input-container'>
            <label htmlFor="number" className='styling-label'>ENTER USERNAME:</label><br/>
            <input type="text" id="number" className='styling-input' onChange={(event)=>{setNumber(event.target.value)}} value={number}/>
            </div>
            <div className="input-container">
              <Link to="/otp">
              <button className='btn btn-primary button'>Register</button>
              </Link>
            </div>
            </div>
          </div>
          </div>
          </div>
          
    )
}
export default CreateAccount