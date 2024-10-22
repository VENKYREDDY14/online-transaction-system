import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'
const Profile=()=>{
    return(
        <div className='profile'>
        <Header/>
        <div className="profile-container">
        <Sidebar/>
        <div className="profile-main-container">
            <h1>Home</h1>
        </div>
        </div>
        </div>
    )
}
export default Profile