import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { CoinContext } from './CoinContext'; // Import CoinContext
import './Navbar.css'; // Import the Navbar CSS for styling

const Navbar = ({ handleSearchSubmit, searchTerm, handleSearchChange, handleLogout }) => {
  const { kidCoins } = useContext(CoinContext); // Access kidCoins from context

  return (
    <nav className="navbar">
      <h1 className="navbar-title">StockSynergy</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
      </form>
      <ul className="navbar-links">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/TransactionHistory">Wallet</Link></li>
        <li><Link to="/Watchlist">Watchlist</Link></li> {/* Corrected route */}
        <li><Link to="/History">History</Link></li>
        <li>
          <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
            Logout
          </span>
        </li>
      </ul>
      <div className="navbar-kidcoins">
        {/* Display Kid Coins */}
        <span>Coins: ₹{kidCoins}</span>
      </div>
    </nav>
  );
};

export default Navbar;
