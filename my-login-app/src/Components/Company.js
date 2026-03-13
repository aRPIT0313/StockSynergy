import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./CompanyDetails.css"; // Import CSS for styling
import Navbar from "./Navbar";

const CompanyDetails = () => {
  const { searchTerm } = useParams(); // Get the search term (ticker) from the URL
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(""); // To store error message, if any
  const [watchlist, setWatchlist] = useState([]); // Local state for watchlist
  const [isInWatchlist, setIsInWatchlist] = useState(false); // Track if the stock is in watchlist

  // Fetch stock data from Flask API
  const fetchStockData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/scrape-stock?ticker=${searchTerm}` // Use backticks for template string
      );
      const data = await response.json();

      console.log("Stock Data Response:", data); // Log the API response

      if (response.ok && data && data.data) {
        setStockData(data.data); // Corrected to access the actual stock data
      } else {
        setError(data.error || "Failed to fetch stock data");
        setStockData(null);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Error fetching stock data. Please try again later.");
      setStockData(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
    setIsInWatchlist(
      storedWatchlist.some((company) => company.ticker === searchTerm.toUpperCase())
    );
  }, [searchTerm]);

  const addToWatchlist = () => {
    if (isInWatchlist || !stockData) return;

    const newCompany = {
      name: stockData.company_name || "Not available",
      ticker: searchTerm.toUpperCase(),
      market_cap: stockData.Market_Cap || "Not available",
      current_price: stockData.Current_Price || "Not available",
      highlow: stockData.highlow || "Not available",
      pe_ratio: stockData.PE_ratio || "Not available",
      book_value: stockData.Book_value || "Not available",
      dividend: stockData.Dividend || "Not available",
      roce: stockData.ROCE || "Not available",
      roe: stockData.ROE || "Not available",
      face_value: stockData.Face_Value || "Not available"
    };

    const updatedWatchlist = [...watchlist, newCompany];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsInWatchlist(true);
  };

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  if (error) return <div>{error}</div>;
  if (!stockData) {
    return (
      <div className="loading-container">
        <img
          src="https://cdn.dribbble.com/users/1187836/screenshots/5684366/media/270906cfbd368c92a1385ff552a998b6.gif"
          alt="Loading..."
          className="loading-gif"
        />
      </div>
    );
  }

  return (
    <div className="company-details-container">
      <Navbar />
      <div className="company-header">
        <h2>
          {stockData.company_name}
          <span className="ticker-box">{searchTerm.toUpperCase()}</span>
        </h2>
        <button
          className="add-watchlist-btn"
          onClick={addToWatchlist}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
        </button>
      </div>

      <div className="company-info">
        <div>
          <h4>Market Cap: {stockData?.Market_Cap || "N/A"}</h4>
          <h4>Current Price: {stockData?.Current_Price || "N/A"}</h4>
          <h4>PE Ratio: {stockData?.PE_ratio || "N/A"}</h4>
          <h4>Book Value: {stockData?.Book_value || "N/A"}</h4>
          <h4>Dividend: {stockData?.Dividend || "N/A"}</h4>
          <h4>ROCE: {stockData?.ROCE || "N/A"}</h4>
          <h4>ROE: {stockData?.ROE || "N/A"}</h4>
          <h4>Face Value: {stockData?.Face_Value || "N/A"}</h4>
          <h4>High Low: {stockData?.highlow || "N/A"}</h4>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
