import Header from '../Header'
import Sidebar from '../Sidebar'
import { useContext ,useEffect} from 'react'
import Context from '../../Context/Context'
import './index.css'
const History=()=>{
    const {changeActiveTabId}=useContext(Context);
    useEffect(()=>{
        changeActiveTabId('HISTORY');
    },[changeActiveTabId])
    return(
        <div className='history'>
        <Header/>
        <div className="history-container">
        <Sidebar/>
        <div className="history-main-container">
            <h1>history</h1>
        </div>
        </div>
        </div>
    )
}
export default History