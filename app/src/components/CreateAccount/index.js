import createAccountImage from './create-account.webp';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";
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
    const [showPassword, setShowPassword] = useState(false);

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
            alert('account created successfully');
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

        if (response.ok) {
            setOtpStatus(true);
            setErrorStatus(false);

            const timeout = setTimeout(removeDetails, 5 * 60 * 1000);
            setOtpTimeout(timeout);
        } else {
            setErrorStatus(true);
        }
    };

    useEffect(() => {
        return () => clearTimeout(otpTimeout);
    }, [otpTimeout]);

    return (
        <div>
            <div className='main-heading'>
                <h1 className="styling-heading-account">Create New Account</h1>
            </div>
            <div className={`creating-new-account`}>
                <form onSubmit={isOtp ? onVerifyingOtp : onSendingDetails} className='form-width-create'>
                    <div className='new-account-details-container'>
                        <div className='input-container'>
                            <label htmlFor="gmail" className='styling-label'>ENTER THE GMAIL:</label><br />
                            <input
                                type="email"
                                id="gmail"
                                className='styling-input'
                                onChange={(event) => setGmail(event.target.value)}
                                value={gmail}
                                required 
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="number" className='styling-label'>ENTER THE NUMBER:</label><br />
                            <input
                                type="text"
                                id="number"
                                className='styling-input'
                                onChange={(event) => setNumber(event.target.value)}
                                value={number}
                                required 
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="username" className='styling-label'>ENTER USERNAME:</label><br />
                            <input
                                type="text"
                                id="username"
                                className='styling-input'
                                onChange={(event) => setUsername(event.target.value)}
                                value={username}
                                required 
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="password" className='styling-label'>SET PASSWORD:</label><br />
                            <div className='d-flex'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className='styling-input'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    required 
                                />
                                {showPassword
                                    ? <BiShow className='styling-icon' onClick={() => setShowPassword(!showPassword)} />
                                    : <BiHide className='styling-icon' onClick={() => setShowPassword(!showPassword)} />}
                            </div>
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
                                />
                            </div>
                        )}
                        <div className="input-container">
                            <button className='btn btn-primary button' type="submit">
                                Register
                            </button>
                        </div>
                        {errorStatus && <p className='error-message text-center'>Gmail already exists!</p>}
                        {isOtpStatusValid && <p className='error-message text-center'>Invalid OTP!</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
