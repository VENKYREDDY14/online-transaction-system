import React from 'react';
import './index.css'

const TransactionCard = (props) => {
  const {transaction}=props;
  const { id, date, amount, type, status, notes } = transaction;

  return (
    <div className={`transaction-card`}>
      <div className="transaction-card-header">
        <span className={`transaction-type ${type}`}>{type.toUpperCase()}</span>
        <span className={`transaction-status ${status}`}>{status}</span>
      </div>

      <div className="transaction-card-main">
        <h3 className="transaction-amount">
          {type === 'credit' ? '+' : '-'}₹{amount.toFixed(2)}
        </h3>
        <p className="transaction-id">ID: {id}</p>
        <p className="transaction-date">
          {new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>

    
      <div className="transaction-card-footer">
        <p className="transaction-notes">{notes}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
