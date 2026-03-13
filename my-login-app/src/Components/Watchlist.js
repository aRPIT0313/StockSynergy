import React, { useState, useEffect, useContext } from 'react';
import './Watchlist.css';
import Navbar from './Navbar';
import { CoinContext } from './CoinContext';

const Watchlist = () => {
  const { kidCoins, updateKidCoins } = useContext(CoinContext);
  const [watchlist, setWatchlist] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Load watchlist and transactions from localStorage
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);

    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  // Remove stock from watchlist
  const removeFromWatchlist = (ticker) => {
    const updatedWatchlist = watchlist.filter(company => company.ticker !== ticker);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  // Purchase stock and update transactions
  const purchaseStock = (company, quantity) => {
    const priceWithoutCurrency = parseFloat(company.current_price.replace(/[^\d.-]/g, ''));
    const totalCost = priceWithoutCurrency * quantity;
    const parsedKidCoins = parseFloat(kidCoins);
  
    if (parsedKidCoins >= totalCost) {
      let storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
      // Generate unique transaction time (both readable and unique)
      const timeKey = new Date().toLocaleTimeString(); // Primary key
      const transactionId = `${timeKey}-${Date.now()}`; // Ensure uniqueness
  
      // Create a new transaction
      const newTransaction = {
        id: transactionId,  // Use time as primary key
        time: timeKey,       // Display time
        stock: company.ticker,
        quantity,
        price: priceWithoutCurrency,
        totalCost,
        profitLoss: 0,
      };
  
      storedTransactions.push(newTransaction);
  
      // Save to localStorage and update state
      localStorage.setItem('transactions', JSON.stringify(storedTransactions));
      setTransactions(storedTransactions);
      updateKidCoins(parsedKidCoins - totalCost);
  
      alert(`${quantity} shares of ${company.name} purchased successfully for ₹${totalCost} Kid Coins!`);
    } else {
      alert('You do not have enough Kid Coins to complete this purchase.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="watchlist-container">
        <div className="watchlist">
          {watchlist.length === 0 ? (
            <p>Your watchlist is empty. Add companies to monitor their stock information.</p>
          ) : (
            watchlist.slice().reverse().map((company) => (
              <WatchlistItem
                key={company.ticker}
                company={company}
                purchaseStock={purchaseStock}
                removeFromWatchlist={removeFromWatchlist}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// WatchlistItem component
const WatchlistItem = ({ company, purchaseStock, removeFromWatchlist }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="watchlist-item">
      <h3>{company.name} ({company.ticker})</h3>
      <div className="stock-info">
        <p><strong>Current Price:</strong> {company.current_price}</p>
      </div>

      <div className="quantity-widget">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button onClick={() => purchaseStock(company, quantity)} className="purchase-button">
        Purchase
      </button>
      <button onClick={() => removeFromWatchlist(company.ticker)} className="remove-button">
        Remove
      </button>
    </div>
  );
};

export default Watchlist;
