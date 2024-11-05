import createAccountImage from './create-account.webp';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import './index.css';


const CreateAccount = () => {
    const [number, setNumber] = useState('');
    const [gmail, setGmail] = useState('');
    const [username, setUsername] = useState('');
    const [isOtp, setOtpStatus] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [isOtpStatusValid, setOtpValidStatus] = useState(false);
    const [otpTimeout, setOtpTimeout] = useState(null);
    const [password, setPassword] = useState('');
    

    const navigate = useNavigate();

    const removeDetails = async () => {
        await fetch(`http://localhost:3001/users/${gmail}`, { method: 'DELETE' });
    };

    const onVerifyingOtp = async (event) => {
        event.preventDefault()
        const OTP = { otp, gmail };
        const url = 'http://localhost:3001/validate/';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(OTP),
        });
        if (response.ok) {
            setOtpValidStatus(false);
            clearTimeout(otpTimeout);
            navigate('/login', { replace: true });
            toast.success('Account created successfully');
        } else {
            setOtpValidStatus(true);
        }
    };

    const onSendingDetails = async (event) => {
        event.preventDefault(); 

        const userDetails = { number, gmail, username, password };
        const response = await fetch('http://localhost:3001/users/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(userDetails),
        });
        alert('Sending OTP')
        if (response.ok) {
            setOtpStatus(true);
            toast.success('Sent OTP')
            setErrorStatus(false);

            const timeout = setTimeout(removeDetails, 1 * 60 * 1000);
            setOtpTimeout(timeout);
        } else {
            setErrorStatus(true);
            toast.success('OTP not sent')
        }
    };

    useEffect(() => {
        return () => clearTimeout(otpTimeout);
    }, [otpTimeout]);

    return (
        <div className='new-account'>
            <div className='main-heading'>
                <h1 className="styling-heading-account">Create New Account</h1>
            </div>
            <div className={`creating-new-account`}>
                <form onSubmit={isOtp ? onVerifyingOtp : onSendingDetails} className='form-width-create'>
                    <div className='new-account-details-container'>
                        <div className='input-container'>
                            <label htmlFor="gmail" className='styling-label'>Email Address:</label><br />
                            <input
                                type="email"
                                id="gmail"
                                className='styling-input'
                                onChange={(event) => setGmail(event.target.value)}
                                value={gmail}
                                required 
                                placeholder={'Enter your email'}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="number" className='styling-label'>Phone Number:</label><br />
                            <input
                                type="text"
                                id="number"
                                className='styling-input'
                                onChange={(event) => setNumber(event.target.value)}
                                value={number}
                                required 
                                placeholder={'Enter your phone number'}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="username" className='styling-label'>Username:</label><br />
                            <input
                                type="text"
                                id="username"
                                className='styling-input'
                                onChange={(event) => setUsername(event.target.value)}
                                value={username}
                                required 
                                placeholder={'Choose a username'}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="password" className='styling-label'>Password:</label><br />
                            <div className='d-flex'>
                                <input
                                    type={'password'}
                                    id="password"
                                    className='styling-input'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    required 
                                    placeholder={'Create a password'}
                                />
                            </div>
                        </div>
                        {isOtp && (
                            <div className='input-container'>
                                <label htmlFor="otp" className='styling-label' >OTP:</label><br />
                                <input
                                    type="text"
                                    id="otp"
                                    className='styling-input'
                                    onChange={(event) => setOtp(event.target.value)}
                                    value={otp}
                                    required 
                                    placeholder={'Enter the OTP sent to your email'}
                                />
                            </div>
                        )}
                        <div className="input-container">
                            <button className='btn btn-primary button' type="submit">
                                Register
                            </button>
                        </div>
                        {errorStatus && <p className='error-message text-center'>Email already exists!</p>}
                        {isOtpStatusValid && <p className='error-message text-center'>Invalid OTP!</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
