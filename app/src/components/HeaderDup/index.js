
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'
const HeaderDup=()=>{
    const navigate = useNavigate();
    const onLogout=()=>{
        Cookies.remove('jwtToken');
        navigate('/login',{replace:true})
    }
    return(
        <div>
            <div className="headerdup-container">
                <div className="d-flex justify-content-between">
                <div className='d-flex flex-column justify-content-center img-container-header'>
                <Link to="/home">
                <img src='' className="styling-header-logo"/>
                </Link>
                </div>
                <div className='d-flex flex-column justify-content-center logout-button-container'>
               
                <button className="btn btn-primary" onClick={onLogout}>
                    Logout
                </button>
               
                </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderDup