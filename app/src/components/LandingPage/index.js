import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import carouselImg from './bgImageHome.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LandingPage = () => {
  return (
    <div className="landing-container">
      
      <div className='d-flex justify-content-between navbar'>
        <img src="https://res.cloudinary.com/dsad92ak9/image/upload/mcvotyiepcy6xlgfobuw.jpg" alt="landing-logo" className='styling-landing-page-icon img-fluid'/>
        <Link to="/login">
        <button className='btn btn-primary'>Login</button>
        </Link>
      </div>
      <div>
        <h1 className='styling-title'>ONLINE TRANSACTION SYSTEM</h1>
      </div>
      <div className="carousel-container">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://res.cloudinary.com/dsad92ak9/image/upload/ecnllwwq8yidzcyw97c6.jpg" className="d-block w-100" alt="Secure Transactions" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Fast & Secure Transactions</h5>
                <p>Experience top-notch security and speed with our platform.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://res.cloudinary.com/dsad92ak9/image/upload/lvyxihakfwhejgiazbgb.jpg" className="d-block w-100" alt="User-Friendly Interface" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Simple & Easy Interface</h5>
                <p>Manage your finances with ease using our intuitive dashboard.</p>
              </div>
            </div>
           
            <div className="carousel-item">
              <img src="https://res.cloudinary.com/dsad92ak9/image/upload/dh6lxiwz92oseagmnoda.jpg" className="d-block w-100" alt="Worldwide Access" />
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
<div>
  
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h3>Secure Transactions</h3>
            <p>Top-tier encryption to ensure your money is safe.</p>
          </div>
          <div className="col-md-4 ">
            <h3>24/7 Support</h3>
            <p>Our team is available round-the-clock to assist you.</p>
          </div>
          <div className="col-md-4">
            <h3>Low Fees</h3>
            <p>Enjoy seamless transactions with minimal charges.</p>
          </div>
        </div>
      </div>

      
      <div className="cta-section text-center py-5 bg-light">
        <h2>Join Now and Start Transacting</h2>
        <p>Sign up today to experience secure and fast transactions.</p>
        <Link to="/login" className="btn btn-primary">Get Started</Link>
      </div>

      <footer className="text-center mt-5 py-4 bg-dark text-light">
        <p>&copy; 2024 TransactNow. All rights reserved.</p>
        <Link  className="text-light">Privacy Policy</Link> | <Link  className="text-light">Terms of Service</Link>
      </footer>
    </div>
    </div>
  );
};

export default LandingPage;
