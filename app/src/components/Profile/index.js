import Header from '../Header'
import Sidebar from '../Sidebar'
import Context from '../../Context/Context'
import { useContext ,useEffect} from 'react'
import './index.css'
const Profile=()=>{
    const {changeActiveTabId}=useContext(Context);
    useEffect(()=>{
        changeActiveTabId('PROFILE');
    },[changeActiveTabId])
    
    return(
        <div className='profile'>
        <Header/>
        <div className="profile-container">
        <Sidebar/>
        <div className="profile-main-container">
            <h1>Profile</h1>
        </div>
        </div>
        </div>
    )
}
export default Profile