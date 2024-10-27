import Header from '../Header'
import Sidebar from '../Sidebar'
import { useContext ,useEffect,useState} from 'react'
import Context from '../../Context/Context'
import './index.css'
const Transfer=()=>{
    const [senderNumber,setSenderNumber]=useState(0);
    const [recipientNumber,setRecipientNumber]=useState(0);
    const [amount,setAmount]=useState(0);
    const [note,setNote]=useState('');

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
        <p className='alert-text'><span className='styling-note-text'>Note:</span> Ensure your account has sufficient funds before adding a transaction.</p>
        <marquee className="scrolling-text-transfer">"Initiate a quick and secure money transfer by filling out the recipient information, transfer amount, and any additional notes. Our easy-to-use form ensures your transactions are smooth and hassle-free."</marquee>
    
            <h1 className="main-heading-transfer">Transfer Money</h1>
            <form >
                <div className='money-container-tranfer'>
                    <div>
                        <label className='styling-label-transfer'>Enter your number:</label><br/>
                        <input type="text" onChange={(event)=>{setSenderNumber(event.target.value)}} className='styling-input-transfer' placeholder='Enter sender number'/>
                    </div>
                    <div className='input-container'>
                        <label className='styling-label-transfer'>Enter recipient number:</label><br/>
                        <input type="text" onChange={(event)=>{setRecipientNumber(event.target.value)}} className='styling-input-transfer' placeholder='Enter recipient number'/>
                    </div >
                    <div className='input-container'>
                        <label className='styling-label-transfer'>Amount:</label><br/>
                        <input type="text" onChange={(event)=>{setAmount(event.target.value)}} className='styling-input-transfer' placeholder='Enter amount'/>
                    </div>
                    <div className='input-container'>
                        <label className='styling-label-transfer'>Note:</label><br/>
                        <input type="text" onChange={(event)=>{setNote(event.target.value)}} className='styling-input-transfer' placeholder='Add a note for the recipient'/>
                    </div>
                    <div className='input-container'>
                        <button className='btn btn-primary mt-3 send-button-transfer'>Send Money</button>
                    </div>
                </div>
                
            </form>
        </div>
        
        </div>
        </div>
    )
}
export default Transfer
