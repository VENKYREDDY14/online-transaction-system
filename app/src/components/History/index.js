import Header from '../Header';
import Sidebar from '../Sidebar';
import { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import './index.css';
import TransactionCard from '../TransactionCard';
import Cookies from 'js-cookie';

const History = () => {
    const { changeActiveTabId } = useContext(Context);
    const [transactions, setTransactions] = useState([]);
    const userMail = Cookies.get('gmail');

    const recentTransactions = async () => {
        try {
            const debitResponse = await fetch(`https://online-transaction-system.onrender.com/history/debit/${userMail}`);
            const debitData = await debitResponse.json();

            const creditResponse = await fetch(`https://online-transaction-system.onrender.com/history/credit/${userMail}`);
            const creditData = await creditResponse.json();

            const combinedTransactions = [...debitData, ...creditData];
            setTransactions(combinedTransactions)
          
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    useEffect(() => {
        changeActiveTabId('HISTORY');
        recentTransactions();  
    }, [changeActiveTabId]);

    const convertedTransactions = transactions
    .map(transaction => ({
        id: `TXN${String(transaction.TRANSFER_ID).padStart(3, '0')}`,
        date: new Date(parseFloat(transaction.DATE)).toISOString(),
        amount: parseFloat(transaction.AMOUNT),
        type: transaction.SENDER_MAIL === userMail ? 'debit' : 'credit',
        status: transaction.STATUS.toLowerCase(),
        notes: transaction.NOTE,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 


    return (
        <div className='history'>
            <Header />
            <div className="history-container">
                <Sidebar />
                <div className='hisory-container-transactions'>
                <div className="history-main-container">
                    <h1 className='history-heading'>RECENT TRANSACTIONS</h1>
                    {convertedTransactions.length === 0 ? (
                        <div className='d-flex justify-content-center main-heading-transaction-container align-items-center'>
                            <h1 className='main-heading-transaction'>NO RECENT TRANSACTIONS YET !</h1>
                        </div>
                    ) : (
                        <ul className='transactions-container-history'>
                            {convertedTransactions.map((eachItem) => (
                                <li key={eachItem.id}>
                                    <TransactionCard transaction={eachItem} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default History;
