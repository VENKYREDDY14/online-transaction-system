import { useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header';
import HeaderDup from '../HeaderDup';
import { toast } from 'react-toastify';
import './index.css';

const Admin = () => {
    const [rgmail, setGmail] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onAddMoney = async (event) => {
        event.preventDefault();
        const senderGmail = Cookies.get('gmail');
        const role = Cookies.get('role');
        const recipientData = { senderGmail, password, role, rgmail, amount, note };
        
        if (senderGmail === rgmail) {
            setErrorMessage("Cannot deposit to sender's own account");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/deposit', {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(recipientData)
            });
            
            const resultMessage = await response.text();

            if (response.ok) {
                setSuccessMessage(resultMessage);
                setErrorMessage('');
                setGmail('');
                setAmount('');
                setNote('');
                setPassword('');
                toast.success('Transfer successfull');
            } else {
                setErrorMessage(resultMessage);
                setSuccessMessage('');
                toast.error('Transfer Failed');
            }
        } catch (error) {
            console.error("Request failed", error);
            setErrorMessage("An unexpected error occurred.");
        }
    }

    return (
        <div className='main-sending-money-container'>
            <Header/>
            <HeaderDup/>
            
            <form onSubmit={onAddMoney} className='sending-money-container-form d-flex flex-column justify-content-center align-items-center'>
            <h1 className='admin-heading'>Add Money to Customers</h1>
                <div className='sending-money-admin'>
                    
                <div>
                    <label htmlFor="gmail" className='styling-label'>Enter Customer Gmail</label><br/>
                    <input type="email" required className='styling-input' id="gmail" onChange={(event) => setGmail(event.target.value)} value={rgmail} />
                </div>
                <div>
                    <label htmlFor="amount" className='styling-label'>Enter Amount</label><br/>
                    <input type="text" required className='styling-input' id="amount" onChange={(event) => setAmount(event.target.value)} value={amount} />
                </div>
                <div>
                    <label htmlFor="note" className='styling-label'>Enter Note</label><br/>
                    <input type="text" className='styling-input' id="note" onChange={(event) => setNote(event.target.value)} value={note} />
                </div>
                <div>
                    <label htmlFor="password" className='styling-label'>Enter Password</label><br/>
                    <input type="password" required className='styling-input' id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
                </div>
                <div className='input-container'>
                    <button className='btn btn-primary styling-button-submit' type='submit'>Submit</button>
                </div>
                {errorMessage && <p className='text-center error-message'>{errorMessage}</p>}
                {successMessage && <p className='text-center success-message'>{successMessage}</p>}
            </div>
            </form>
        </div>
    );
}

export default Admin;
