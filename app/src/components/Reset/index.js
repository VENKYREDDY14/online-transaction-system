import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
import {Link} from 'react-router-dom'
const Reset=()=>{
    return(
        <div className='reset-container'>
        <div className='input-container'>
            <label htmlFor="number" className='styling-label'>ENTER THE NUMBER:</label><br/>
            <input type="text" id="number" className='styling-input' />
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