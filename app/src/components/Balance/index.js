import Header from '../Header';
import Sidebar from '../Sidebar';
import { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Cookies from 'js-cookie';

import './index.css';

const Balance = () => {
    const { changeActiveTabId } = useContext(Context);
    const [password, setPassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [userBalance, setUserBalance] = useState(null);
    
    const userId = Cookies.get('id');

    const getBalance = async (event) => {
        event.preventDefault();
        
        const userDetails = { id: userId, password };
        
        try {
            const response = await fetch(`https://online-transaction-system.onrender.com/balance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });
            
            if (response.ok) {
                const balanceData = await response.json();
                setUserBalance(balanceData.userBalance.BALANCE);
                setErrorStatus(false);
            } else {
                setErrorStatus(true);
                setUserBalance(null); 
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
            setErrorStatus(true);
        }
    };

    useEffect(() => {
        changeActiveTabId('BALANCE');
    }, [changeActiveTabId]);

    return (
        <div className='balance'>
            <Header />
            <div className="balance-container">
                <Sidebar />
                <div className="balance-main-container d-flex flex-column align-items-center">
                    <div className='heading-container-balance'>
                        <h1 className='styling-heading-balance'>Balance</h1>
                    </div>
                    <div className='balance-show-container'>
                        <h1 className='check-balance-heading'>CHECK BALANCE</h1>
                        <form onSubmit={getBalance}>
                            <div className='input-container-balance'>
                                <label htmlFor="password" className='styling-label-login'>Enter Your Password:</label><br />
                                <input
                                    type='password'
                                    id="password"
                                    className='styling-input'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            {errorStatus && <p className='error-message text-center'>Invalid Password</p>}
                            <div className='input-container'>
                                <button className='btn btn-primary button' type='submit'>Show Balance</button>
                            </div>
                        </form>
                        {userBalance !== null && (
                            <div>
                                <h1 className='account-balance'>Your Balance: <span className='user-balance'> {userBalance} </span></h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Balance;
