import HeaderImage from './HeaderLogo.webp'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
const Header=()=>{
    return(
        <div>
            <div className="header-container">
                <div className="d-flex justify-content-between">
                <div className='d-flex flex-column justify-content-center img-container-header'>
                <img src={HeaderImage} className="styling-header-logo"/>
                </div>
                <div className='d-flex flex-column justify-content-center logout-button-container'>
                <button className="btn btn-primary">
                    Logout
                </button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Header