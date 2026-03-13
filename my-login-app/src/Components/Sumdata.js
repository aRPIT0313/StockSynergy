import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StockDashboard = () => {
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlistCount(storedWatchlist.length);

    // Fetch transaction history from localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('soldTransactions')) || [];
    
    // Calculate total profit and total loss
    const profit = storedTransactions.reduce((acc, item) => item.profitLoss > 0 ? acc + item.profitLoss : acc, 0);
    const loss = storedTransactions.reduce((acc, item) => item.profitLoss < 0 ? acc + item.profitLoss : acc, 0);
    
    setTotalProfit(profit);
    setTotalLoss(loss);
  }, []);

  // Maximum values for progress bar limits
  const maxProfit = 10000;  // Set a limit for profit percentage
  const maxLoss = 10000;    // Set a limit for loss percentage
  const maxCompanies = 100;

  // Calculate progress percentages
  const profitPercentage = Math.min((totalProfit / maxProfit) * 100, 100);
  const lossPercentage = Math.min((Math.abs(totalLoss) / maxLoss) * 100, 100);
  const companiesPercentage = (watchlistCount / maxCompanies) * 100;

  return (
    <div style={styles.dashboardWrapper}>
      <div style={styles.widgetContainer}>
        <h2 style={styles.widgetTitle}>Investment Dashboard</h2>

        <div style={styles.circleContainer}>
          <div style={styles.progressBar}>
            <CircularProgressbar
              value={profitPercentage}
              text={`${totalProfit.toFixed(2)}`}
              styles={buildStyles({
                textColor: "black",
                pathColor: "lightgreen",
                trailColor: "lightgrey",
              })}
            />
            <p style={styles.profitText}>Profit Made</p>
          </div>

          <div style={styles.progressBar}>
            <CircularProgressbar
              value={lossPercentage}
              text={`${totalLoss.toFixed(2)}`}
              styles={buildStyles({
                textColor: "black",
                pathColor: "red",
                trailColor: "lightgrey",
              })}
            />
            <p style={styles.lossText}>Loss Made</p>
          </div>

          <div style={styles.progressBar}>
            <CircularProgressbar
              value={companiesPercentage}
              text={String(watchlistCount)}
              styles={buildStyles({
                textColor: "black",
                pathColor: "blue",
                trailColor: "lightgrey",
              })}
            />
            <p style={styles.companiesText}>Companies in Watchlist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '125px',
    position: 'fixed',
    right: '580px',
    top:'340px',
    
  },
  widgetContainer: {
    padding: '20px',
    borderRadius: '10px',
    width: '500px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    height: '350px',
  },
  widgetTitle: {
    fontSize: '28px',
    color: 'black',
    marginBottom: '35px',
  },
  circleContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  progressBar: {
    width: '120px',
    height: '80px',
  },
  profitText: {
    color: 'lightgreen',
    fontSize: '20px',
    marginTop: '10px',
  },
  lossText: {
    color: 'red',
    fontSize: '20px',
    marginTop: '10px',
  },
  companiesText: {
    color: 'blue',
    fontSize: '20px',
    marginTop: '10px',
  }
};

export default StockDashboard;
