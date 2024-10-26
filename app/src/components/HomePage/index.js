import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'
import Context from '../../Context/Context'
import { useContext ,useEffect} from 'react'
const Home=()=>{
    const {changeActiveTabId}=useContext(Context);
    useEffect(()=>{
        changeActiveTabId('HOME');
    },[changeActiveTabId])
    return(
        <div className='home'>
        <Header/>
        <div className="home-container">
        <Sidebar/>
        <div className="home-main-container">
            <h1>Home</h1>
        </div>
        </div>
        </div>
    )
}
export default Home