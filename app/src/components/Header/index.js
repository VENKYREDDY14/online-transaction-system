import HeaderImage from './HeaderLogo.webp'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from 'react-router-dom';
import './index.css'
const Header=()=>{
    return(
        <div>
            <div className="header-container">
                <div className="d-flex justify-content-between">
                <div className='d-flex flex-column justify-content-center img-container-header'>
                <Link to="/home">
                <img src={HeaderImage} className="styling-header-logo"/>
                </Link>
                </div>
                <div className='d-flex flex-column justify-content-center logout-button-container'>
               <Link to='/'>
                <button className="btn btn-primary">
                    Logout
                </button>
                </Link>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Header