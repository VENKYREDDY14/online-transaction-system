import Header from '../Header'
import Sidebar from '../Sidebar'
import { useContext ,useEffect} from 'react'
import Context from '../../Context/Context'
import './index.css'
const Transfer=()=>{
    const {changeActiveTabId}=useContext(Context);
    useEffect(()=>{
        changeActiveTabId('TRANSFER');
    },[changeActiveTabId])
    return(
        <div className='transfer'>
        <Header/>
        <div className="transfer-container">
        <Sidebar/>
        <div className="transfer-main-container">
            <h1>Transfer</h1>
        </div>
        </div>
        </div>
    )
}
export default Transfer
