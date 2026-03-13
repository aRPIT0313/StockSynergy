import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CoinContext } from './CoinContext';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { kidCoins, updateKidCoins } = useContext(CoinContext);
  const [transactions, setTransactions] = useState([]);
  const [sharesToSell, setSharesToSell] = useState({});
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem('transactions')) || [];
    stored = stored.map(transaction => ({
      ...transaction,
      time: transaction.time || new Date(transaction.id.split('-')[0]).toLocaleTimeString(),
      originalQuantity: transaction.originalQuantity || transaction.quantity,
      currentPrice: transaction.price,
    }));
    localStorage.setItem('transactions', JSON.stringify(stored));
    setTransactions(stored);
  }, []);

  useEffect(() => {
    const updatePrices = async () => {
      const updated = await Promise.all(
        transactions.map(async (transaction) => {
          try {
            const res = await fetch(`${BACKEND_URL}/scrape-stock?ticker=${transaction.stock}`);
            const data = await res.json();
            const livePrice = parseFloat(data?.data?.Current_Price?.replace(/[₹,]/g, '') || transaction.price);
            return { ...transaction, currentPrice: livePrice.toFixed(2) };
          } catch (error) {
            console.error(`Error fetching ${transaction.stock}`, error);
            return transaction;
          }
        })
      );
      setTransactions(updated);
    };

    const interval = setInterval(updatePrices, 2000); // Every 2 seconds
    return () => clearInterval(interval);
  }, [transactions]);

  const handleSharesChange = (id, value) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      const max = transaction.quantity;
      const validated = Math.max(0, Math.min(value, max));
      setSharesToSell(prev => ({ ...prev, [id]: validated }));
    }
  };

  const handleSell = (id) => {
    const qty = sharesToSell[id] || 0;
    if (qty <= 0) {
      alert('Enter valid quantity');
      return;
    }

    const updated = [...transactions];
    const index = updated.findIndex(t => t.id === id);
    const transaction = updated[index];

    const totalValue = qty * transaction.currentPrice;
    const profitLoss = (transaction.currentPrice - transaction.price) * qty;

    const sellData = {
      stock: transaction.stock,
      purchaseDate: transaction.date,
      purchaseTime: transaction.time,
      purchasePrice: transaction.price,
      originalQuantity: transaction.originalQuantity,
      sellDate: new Date().toLocaleDateString(),
      sellTime: new Date().toLocaleTimeString(),
      quantitySold: qty,
      sellPrice: transaction.currentPrice,
      profitLoss,
    };

    const sold = JSON.parse(localStorage.getItem('soldTransactions')) || [];
    sold.push(sellData);
    localStorage.setItem('soldTransactions', JSON.stringify(sold));

    if (transaction.quantity === qty) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity -= qty;
    }

    localStorage.setItem('transactions', JSON.stringify(updated));
    setTransactions(updated);
    updateKidCoins(kidCoins + totalValue);
    setSharesToSell(prev => ({ ...prev, [id]: 0 }));

    alert(`Sold ${qty} shares of ${transaction.stock} for ₹${totalValue.toFixed(2)}`);
  };

  return (
    <div className="transaction-history-container">
      <Navbar />
      <h1 className="title">Know your stocks -</h1>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Stock</th>
            <th>Original Qty</th>
            <th>Qty Hold</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Profit/Loss</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="8">No transactions available.</td>
            </tr>
          ) : (
            transactions.slice().reverse().map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.time}</td>
                <td>{transaction.stock}</td>
                <td>{transaction.originalQuantity}</td>
                <td>{transaction.quantity}</td>
                <td>₹{transaction.price}</td>
                <td>₹{transaction.currentPrice}</td>
                <td style={{ color: transaction.currentPrice - transaction.price > 0 ? 'green' : 'red' }}>
                  ₹{((transaction.currentPrice - transaction.price) * transaction.quantity).toFixed(2)}
                </td>
                <td>
                  {transaction.quantity > 0 ? (
                    <div>
                      <input
                        type="number"
                        value={sharesToSell[transaction.id] || ''}
                        onChange={(e) => handleSharesChange(transaction.id, parseInt(e.target.value))}
                        min="0"
                        max={transaction.quantity}
                        placeholder="Shares to sell"
                      />
                      <button onClick={() => handleSell(transaction.id)}>Sell</button>
                    </div>
                  ) : (
                    <button disabled style={{ backgroundColor: 'green', color: 'white' }}>
                      Sold Out
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
