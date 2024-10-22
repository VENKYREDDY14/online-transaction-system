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
        <div className='home'>
        <Header/>
        <div className="home-container">
        <Sidebar/>
        <div className="home-main-container">
            <h1>Profile</h1>
        </div>
        </div>
        </div>
    )
}
export default Profile