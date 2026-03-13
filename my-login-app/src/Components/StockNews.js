import React, { useEffect, useState } from 'react';
import './StockNews.css';

const StockNews = () => {
  const [headlines, setHeadlines] = useState([]);
  const apiKey = '928e2c3577844dff84a50cba52e8d060'; // Your News API key

  // Function to fetch stock news from News API
  const fetchNews = async () => {
    try {
      const response = await fetch(
       
`https://newsapi.org/v2/top-headlines?category=business&apiKey=928e2c3577844dff84a50cba52e8d060`
      
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'ok') {
        setHeadlines(data.articles); // Set the headlines from the response
      } else {
        console.error('Error in response status:', data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews(); // Initial fetch

    // Set interval to fetch news every 60 seconds
    const intervalId = setInterval(() => {
      fetchNews(); // Fetch news continuously
    }, 60000); // 60000 ms = 60 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array for single invocation on mount

  return (
    <div className="stock-news">
      {headlines.length > 0 ? (
        <div className="news-ticker">
          {headlines.map((article, index) => (
            <div key={index} className="headline">
              {article.title} {/* Display the title of the article */}
            </div>
          ))}
        </div>
      ) : (
        <div className="headline">No stock news available.</div> // Message when no articles
      )}
    </div>
  );
};

export default StockNews;
