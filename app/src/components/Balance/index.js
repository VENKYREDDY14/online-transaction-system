import Header from '../Header'
import Sidebar from '../Sidebar'
import { useContext ,useEffect} from 'react'
import Context from '../../Context/Context'
import './index.css'
const Balance=()=>{
    const {changeActiveTabId}=useContext(Context);
    useEffect(()=>{
        changeActiveTabId('BALANCE');
    },[changeActiveTabId])
    return(
        <div className='balance'>
        <Header/>
        <div className="balance-container">
        <Sidebar/>
        <div className="balance-main-container">
            <h1>Balance</h1>
        </div>
        </div>
        </div>
    )
}
export default Balance
