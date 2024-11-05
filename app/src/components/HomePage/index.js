import Header from '../Header';
import Sidebar from '../Sidebar';
import './index.css';
import Context from '../../Context/Context';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import tranferImage from './transactionImage.webp'
import tr1 from './tr1.webp'
import tr2 from './tr2.webp'
import tr4 from './tr4.webp'
import { toast } from 'react-toastify';



const Home = () => {
  const user=Cookies.get('user');
    const [recipientMail, setRecipientMail] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { changeActiveTabId } = useContext(Context);
    const [contactUsName,setContactUsName]=useState('');
    const [contactUsMail,setContactUsMail]=useState('');
    const [contactUsMessage,setContactUsMessage]=useState('');

    useEffect(() => {
        changeActiveTabId('HOME');
    }, [changeActiveTabId]);

    const onSendFeedback = async (event) => {
      event.preventDefault();
      
      const userDetails = {
          contactUsName,
          contactUsMail,
          contactUsMessage,
      };
  
      try {
          const response = await fetch('http://localhost:3001/contactus', {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userDetails),
          });
        
          if (response.ok) {
            
              toast.success( 'Message added successfully');
          } else {
              const errorData = await response.json();
              toast.error('Message adding failed');
          }
      } catch (error) {
          
          toast.error('An unexpected error occurred. Please try again later.');
      }
  };
  
    const onTransferMoney = async (event) => {
        event.preventDefault();

        const senderMail = Cookies.get('gmail');
        if (!senderMail) {
            setErrorMessage("Please log in to perform a transfer.");
            return;
        }

        if (parseFloat(amount) <= 0) {
            setErrorMessage("Amount should be greater than zero.");
            return;
        }

        const moneyDetails = { senderMail, recipientMail, amount, note, password };

        try {
            const response = await fetch('http://localhost:3001/transfer', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moneyDetails)
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage(null);
                setRecipientMail('');
                setAmount('');
                setNote('');
                setPassword('');
                toast.success('Transfer successful')
            } else {
                setErrorMessage(result.error);
                setSuccessMessage(null);
                toast.error('Transfer failed')
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setSuccessMessage(null);
        }
    };

    return (
        <div className='home'>
            <Header />
            <div className="home-container">
                <Sidebar />
                <div className="transfer-main-container">
                   
                    <marquee className="scrolling-text-transfer">
                        "Initiate a quick and secure money transfer by filling out the recipient information, transfer amount, and any additional notes. Our easy-to-use form ensures your transactions are smooth and hassle-free."
                    </marquee>

                    <h1 className="main-heading-transfer text-center">Welcome {user}</h1>
                    <div className="carousel-container">
        <div id="carouselExampleIndicators" className="carousel slide fixed" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={tranferImage} className="d-block w-100" alt="Secure Transactions" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Fast & Secure Transactions</h5>
                <p>Experience top-notch security and speed with our platform.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={tr1} className="d-block w-100" alt="User-Friendly Interface" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Simple & Easy Interface</h5>
                <p>Manage your finances with ease using our intuitive dashboard.</p>
              </div>
            </div>
           
            <div className="carousel-item">
              <img src={tr2} className="d-block w-100" alt="Worldwide Access" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Global Access</h5>
                <p>Send and receive money anywhere, anytime.</p>
              </div>
            </div>
            
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
                    <h1 className='m-4 transaction-main-heading'>Start Doing Transactions</h1>
                    <div className='form-image-container'>
                    <div >
                        <img src={tr4} className='img-form'/>
                    </div>
                    <form onSubmit={onTransferMoney} >
                        <div className='money-container-transfer card'>
                            <div className='input-container'>
                                <label className='styling-label'>ENTER RECIPIENT EMAIL:</label><br />
                                <input
                                    type="email"
                                    value={recipientMail}
                                    onChange={(event) => setRecipientMail(event.target.value)}
                                    className='styling-input p-1'
                                    placeholder='Enter recipient email'
                                    required
                                />
                            </div>
                            <div className='input-container'>
                                <label className='styling-label'>AMOUNT:</label><br />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                    className='styling-input'
                                    placeholder='Enter amount'
                                    required
                                />
                            </div>
                            <div className='input-container'>
                                <label className='styling-label'>NOTE:</label><br />
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                    className='styling-input'
                                    placeholder='Add a note for the recipient'
                                />
                            </div>
                            <div className='input-container'>
                                <label className='styling-label'>ENTER YOUR PASSWORD:</label><br />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className='styling-input'
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                            <div className='input-container'>
                                <button className='btn btn-primary mt-3 send-button-transfer' type="submit">Send Money</button>
                            </div>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                    </form>
                    </div>
                    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={onSendFeedback}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required onChange={(event)=>{setContactUsName(event.target.value)}}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required onChange={(event)=>{setContactUsMail(event.target.value)}}/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Enter your message" required onChange={(event)=>{setContactUsMessage(event.target.value)}}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Send Message</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Get in Touch</h4>
          <p>If you have any questions, feel free to reach out to us via the form or the contact information below.</p>
          <p><strong>Email:</strong> ro200212@rguktong.ac.in</p>
          <p><strong>Phone:</strong> +91 9948167365</p>
          <p><strong>Address:</strong> ongole</p>
        </div>
      </div>
    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Home;
