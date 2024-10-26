import {Link} from 'react-router-dom'
import './index.css'
const ChangeNumber=()=>{
    return(
        <form>
        <div className='change-number-container'>
        <h1 className="set-phone-heading">CHANGE NUMBER</h1>
        <div className="input-container">
            <label for="phone-number" className='styling-label-phone'>ENTER NEW NUMBER:</label><br/>
            <input type="text" id="phone-number" className="styling-input"/>
        </div>
        <div>
            <Link to="/profile">
            <button className='btn btn-primary mt-3 styling-button-phone' >Change</button>
            </Link>
        </div>
        </div>
        </form>
    )
}
export default ChangeNumber