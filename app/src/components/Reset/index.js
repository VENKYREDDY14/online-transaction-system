import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
import {Link} from 'react-router-dom'
import { useState } from 'react';
const Reset=()=>{
    const [gmail,setGmail]=useState('');
    console.log(gmail)
    return(
        <div className='reset-container'>
        <div className='input-container'>
            <label htmlFor="number" className='styling-label'>ENTER THE GMAIL:</label><br/>
            <input type="gmail" id="gmail" className='styling-input' onChange={(event)=>{setGmail(event.target.value)}} value={gmail}/>
        </div>
        <div className='input-container'>
            <Link to="/otp">
            <button className='btn btn-primary button'>Submit</button>
            </Link>
        </div>
        </div>
    )
}
export default Reset