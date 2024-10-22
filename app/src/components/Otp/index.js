import { Input } from 'antd'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from 'react-router-dom'
const Otp=()=>{
    const onChange=(text)=>{
        console.log(text);
    }
    const sharedProps={
        onChange,
    }
    return(
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div>
            <h1 className='styling-otp-heading'>ENTER OTP</h1>
            <Input.OTP length={6} {...sharedProps}/>
        </div>
        <div>
            <Link to="/new-password">
            <button className="btn btn-primary submit-button">Submit</button>
            </Link>
        </div>
        </div>
    )
}
export default Otp