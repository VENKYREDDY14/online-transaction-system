import Header from '../Header'
import Sidebar from '../Sidebar'
import { useContext ,useEffect} from 'react'
import Context from '../../Context/Context'
import './index.css'
import TransactionCard from '../TransactionCard'
const transactions = [
    {
      id: 'TXN001',
      date: '2024-10-01T10:30:00+05:30',  
      amount: 250.00,
      type: 'credit',
      status: 'completed',
      notes: 'Salary deposit',
    },
    {
      id: 'TXN002',
      date: '2024-10-05T15:45:00+05:30',  
      amount: 50.00,
      type: 'debit',
      status: 'completed',
      notes: 'Grocery shopping',
    },
    {
      id: 'TXN003',
      date: '2024-10-10T08:00:00+05:30', 
      amount: 100.00,
      type: 'credit',
      status: 'pending',
      notes: 'Freelance project payment',
    },
    {
      id: 'TXN004',
      date: '2024-10-15T18:20:00+05:30',  
      amount: 75.00,
      type: 'debit',
      status: 'completed',
      notes: 'Utility bill payment',
    },
    {
      id: 'TXN005',
      date: '2024-10-20T12:30:00+05:30',  
      amount: 500.00,
      type: 'credit',
      status: 'completed',
      notes: 'Bonus payment',
    },
    {
      id: 'TXN006',
      date: '2024-10-22T10:00:00+05:30',  
      amount: 120.00,
      type: 'debit',
      status: 'pending',
      notes: 'Online shopping',
    },
    {
      id: 'TXN007',
      date: '2024-10-25T09:15:00+05:30', 
      amount: 30.00,
      type: 'debit',
      status: 'completed',
      notes: 'Coffee and snacks',
    },
  ];
  
  
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
          
            <ul className='transactions-container-history'>
                {transactions.map((eachItem)=>(
                    <li key={eachItem.id}>
                        <TransactionCard transaction={eachItem}/>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        </div>
    )
}
export default History