import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Company from './Components/Company'; // Import for CompanyDetails
import Watchlist from './Components/Watchlist'; // Import the Watchlist component
import TransactionHistory from './Components/TransactionHistory';
import CoinProvider from './Components/CoinContext'; // Import the CoinProvider
import History from './Components/History';

function App() {
    return (
        <CoinProvider>  {/* Wrap the entire application in the CoinProvider */}
            <Router>
                <Routes>
                    {/* Redirect root ("/") to home page */}
                    <Route path="/" element={<Navigate to="/home" />} />

                    {/* Home Route */}
                    <Route path="/home" element={<Home />} />

                    {/* Dynamic Route for Company Details */}
                    <Route path="/company/:searchTerm" element={<Company />} />

                    {/* Route for Watchlist */}
                    <Route path="/watchlist" element={<Watchlist />} />

                    {/* Route for TransactionHistory */}
                    <Route path="/TransactionHistory" element={<TransactionHistory />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </Router>
        </CoinProvider>
    );
}

export default App;
