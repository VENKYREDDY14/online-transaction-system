import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { toast } from 'react-toastify';

const Reset = () => {
    const [gmail, setGmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtp, setOtpStatus] = useState(false);
    const [passwordButton, setPasswordButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    

    const navigate=useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (passwordButton) {
            handlePassword();
        } else if (isOtp) {
            await handleOtpSubmit();
        } else {
            await handleGmailSubmit();
        }
    };

    const handleGmailSubmit = async () => {
        if (gmail) {
            const userDetails = { gmail };
            
                const response = await fetch('https://online-transaction-system.onrender.com/resetotp', {
                    method: "PUT",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(userDetails)
                });
                if (response.ok) {
                    setOtpStatus(true);
                    setErrorMessage('');
                    toast.success('OTP sent')
                } else {
                   
                    toast.error('Failed to send OTP. Please try again.')
                }
            } 
        
    };

    const handleOtpSubmit = async () => {
        if (otp) {
            const userDetails = { otp, gmail };
           
                const response = await fetch('https://online-transaction-system.onrender.com/verify-reset-otp', {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(userDetails)
                });
                if (response.ok) {
                    setPasswordButton(true);
                    setErrorMessage('');
                } else {
                    setErrorMessage('Invalid OTP. Please try again.');
                    toast.error('Invalid OTP. Please try again.')
                }
            } 
        
    };

    const handlePassword = async () => {
        if(password){
            const userDetails={password,gmail}
            const response=await fetch('https://online-transaction-system.onrender.com/reset-password',{
                method:"PUT",
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(userDetails)
            })
            if(response.ok){
                navigate('/login',{replace:true});
                toast.success('Password changed successfully');
            }
        }
        
    };

    return (
        <form className='reset-container' onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor="gmail" className='styling-label'>ENTER THE EMAIL:</label><br />
                <input
                    type="email"
                    id="gmail"
                    className='styling-input'
                    onChange={(event) => setGmail(event.target.value)}
                    value={gmail}
                    required
                    disabled={isOtp || passwordButton}
                />
            </div>
            {isOtp && (
                <div className='input-container'>
                    <label htmlFor="otp" className='styling-label'>ENTER OTP:</label><br />
                    <input
                        type="text"
                        id="otp"
                        className='styling-input'
                        onChange={(event) => setOtp(event.target.value)}
                        value={otp}
                        required
                        disabled={passwordButton}
                    />
                </div>
            )}
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {passwordButton&&(
                 <div className='input-container'>
                 <label htmlFor="password" className='styling-label'>SET PASSWORD:</label><br />
                 <div className='d-flex'>
                     <input
                         type='password'
                         id="password"
                         className='styling-input'
                         onChange={(event) => setPassword(event.target.value)}
                         value={password}
                         required 
                     />
                     
                 </div>
             </div>
            )}
            <div className='input-container'>
                <button className='btn btn-primary button' type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Reset;
