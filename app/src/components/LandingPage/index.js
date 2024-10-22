import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="main-title">Secure & Fast Money Transfers</h1>
        <p className="landing-subtitle">Send money securely across the globe with our trusted platform.</p>
        <Link to="/login">
          <button className="btn btn-primary landing-button">Get Started</button>
        </Link>
      </header>

      <section className="landing-section">
        <div className="features-summary">
          <h2>Why Choose Us?</h2>
          <p>We provide fast, secure, and reliable money transactions that you can trust.</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <h3>Global Reach</h3>
            <p>Send money to over 180 countries quickly and easily.</p>
          </div>

          <div className="feature-item">
            <h3>Secure Payments</h3>
            <p>Your transactions are encrypted with the latest security protocols.</p>
          </div>

          <div className="feature-item">
            <h3>24/7 Support</h3>
            <p>Our customer support team is available around the clock for your convenience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
