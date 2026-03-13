import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import StockNews from './StockNews'; 
import './Home.css'; 
import Top from './Top';
import Watchlist from './Watchlist';
import TransactionHistory from './TransactionHistory';
import Sumdata from './Sumdata';
import MeriCompany from './MeriCompany'; 
import Buy from './Buy';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate(); 

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); // Redirect to the login page or home page
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term state
    };

    // Handle form submission or pressing Enter
    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        if (searchTerm.trim()) { // Ensure the search term is not empty after trimming
            navigate(`/company/${searchTerm.trim()}`); // Navigate to the CompanyDetails page
        }
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <h1 className="navbar-title">StockSynergy</h1>
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input 
                        type="text" 
                        placeholder="  Search using tickers" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className="search-bar" 
                    />
                </form>
                <ul className="navbar-links">
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/TransactionHistory">Wallet</Link></li>
                    <li><Link to="/Watchlist">Watchlist</Link></li>
                    <li><Link to ="/History">History</Link></li>
                    <li>
                        <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
                            Logout
                        </span>
                    </li>
                </ul>
            </nav>
            <div className="home-content">
                <MeriCompany/>
                <StockNews />
                <h2>Welcome to StockSynergy!</h2>
                <Top/>
                <Sumdata/>
                <Buy/>
            </div>
    
        </div>
    );
};

export default Home;
