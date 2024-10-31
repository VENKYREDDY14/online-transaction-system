import { useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';
import { useNavigate} from 'react-router-dom';

const ChangeNumber = () => {
    const [gmail, setGmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtp, setOtpStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [numberButton, setNumberButton] = useState(false);
    const [number, setNumber] = useState('');    
    const [isGmailValid,setGmailStatus]=useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (numberButton) {
            await handleNumber();
        } else if (isOtp) {
            await handleOtpSubmit();
        } else {
            await handleOtp();
        }
    };

    const handleOtp = async () => {
        const gMail = Cookies.get('gmail');
        if (gmail !== gMail) {
            setGmailStatus('Invalid Gmail')
            return;
        }
        setGmailStatus('')
        if (gmail) {
            const userDetails = { gmail };
            const response = await fetch('http://localhost:3001/resetotp', {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                setOtpStatus(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to send OTP. Please try again.');
            }
        }
    };

    const handleOtpSubmit = async () => {
        if (otp) {
            const userDetails = { otp, gmail };
            const response = await fetch('http://localhost:3001/verify-reset-otp', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                setNumberButton(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        }
    };

    const navigate=useNavigate();
    const handleNumber = async () => {
        if (number) {
            const userDetails = { number, gmail };
            const response = await fetch('http://localhost:3001/reset-number', {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                alert('Number changed successfully');
                navigate('/profile',{replace:true})
            } else {
                setErrorMessage('Failed to change the number. Please try again.');
            }
        }
    };

    return (
        <div className='change-number-container'>
            <h1 className="set-phone-heading">CHANGE NUMBER</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor="gmail" className='styling-label'>ENTER THE GMAIL:</label><br />
                    <input
                        type="email"
                        id="gmail"
                        className='styling-input'
                        onChange={(event) => setGmail(event.target.value)}
                        value={gmail}
                        required
                        disabled={isOtp || numberButton}
                    />
                </div>
                {isGmailValid!==''? <p className='error-message text-center'>{isGmailValid}</p>:''}
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
                            disabled={numberButton}
                        />
                    </div>
                )}
                
                {errorMessage && <p className='error-message'>{errorMessage}</p>}

                {numberButton && (
                    <div className='input-container'>
                        <label htmlFor="number" className='styling-label'>NEW PHONE NUMBER:</label><br />
                        <input
                            type='text'
                            id="number"
                            className='styling-input'
                            onChange={(event) => setNumber(event.target.value)}
                            value={number}
                            required
                        />
                    </div>
                )}

            

                <div>
                    <button className='btn btn-primary  styling-button-phone mt-2' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeNumber;
