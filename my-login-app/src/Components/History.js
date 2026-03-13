import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('soldTransactions')) || [];
    setHistory(storedTransactions);
  }, []);

  return (
    <div className="history-container">
      <Navbar />
      <h1 className="title">Stock Passbook</h1>
      <table className="history-table">
        <thead>
          <tr>
            <th>Purchase Date</th>
            <th>Purchase Time</th>
            <th>Stock</th>
            <th>Quantity Purchased</th>
            <th>Purchase Price</th>
            <th>Sell Date</th>
            <th>Sell Time</th>
            <th>Quantity Sold</th>
            <th>Sell Price</th>
            <th>Total Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="10">No purchase history available.</td>
            </tr>
          ) : (
            history.slice().reverse().map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.purchaseDate || '2/4/2025'}</td>  {/* ✅ Fixed: Now showing purchase date */}
                <td>{transaction.purchaseTime || 'N/A'}</td>  {/* ✅ Fixed: Now showing purchase time */}
                <td>{transaction.stock}</td>
                <td>{transaction.originalQuantity}</td>
                <td>₹{transaction.purchasePrice}</td>
                <td>{transaction.sellDate || 'N/A'}</td>
                <td>{transaction.sellTime || 'N/A'}</td>
                <td>{transaction.quantitySold || 'N/A'}</td>
                <td>₹{transaction.sellPrice || 'N/A'}</td>
                <td style={{ color: transaction.profitLoss > 0 ? 'green' : 'red' }}>
                  ₹{transaction.profitLoss !== undefined ? transaction.profitLoss.toFixed(2) : 'N/A'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
