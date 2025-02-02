import HeaderImage from './HeaderLogo.webp'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link,replace,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './index.css'
const Header=()=>{
    const navigate = useNavigate();
    const onLogout=()=>{
        Cookies.remove('jwtToken');
        navigate('/login',{replace:true})
        toast.success('Logout Successful');
    }
    const onClickHeaderLogo=()=>{
        const role=Cookies.get('role');
        if(role!=='admin'){
            return navigate('/home');
        }
    }
    return(
        <div>
            <div className="header-container">
                <div className="d-flex justify-content-between">
                <div className='d-flex flex-column justify-content-center img-container-header'>
                <img src={HeaderImage} className="styling-header-logo" onClick={onClickHeaderLogo}/>
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
export default Header