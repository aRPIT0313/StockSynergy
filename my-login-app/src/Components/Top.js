import React, { useState, useEffect } from "react";
import "./Top.css"; // Ensure correct file name

const Top = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/scrape-top-gainers")
      .then((response) => response.json())
      .then((data) => {
        if (data.top_10_stocks) {
          setStocks(data.top_10_stocks);
        } else {
          setStocks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="topm">
      <h2>Top 10 Gainers (Today)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : stocks.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Top;
