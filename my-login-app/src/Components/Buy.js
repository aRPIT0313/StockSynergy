import React, { useState, useEffect } from "react";
import "./Buy.css"; // Import the CSS file for styling

const images = [
  "https://cdn-ilblhol.nitrocdn.com/XnlZBwVdGFEIsqfIDFPhmywsxNuecrPL/assets/images/optimized/rev-13b1b0f/tradesmartonline.in/knowledge-hub/wp-content/uploads/2022/02/image1-4.png",
  "https://i0.wp.com/profitbooks.net/wp-content/uploads/2020/01/5-Tips-To-Avoid-Stock-Damage.png?ssl=1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCajML3eC28WYHa-msBuUKqK8cqWQj5zZ1Dg&s",
  "https://fastercapital.com/i/Stock-trading--Mastering-the-Art-of-A-Shares-Trading--Tips-and-Techniques--Developing-a-Trading-Strategy.webp",
  "https://business2business.co.in/uploads/2022/06/1532674456-4433.jpg",
  "https://fastercapital.com/i/Stock-trading--Mastering-the-Art-of-A-Shares-Trading--Tips-and-Techniques--Fundamental-Analysis-for-Stock-Trading.webp",
  "https://www.quantifiedstrategies.com/wp-content/uploads/2024/05/Mastering-Trading-Rules-for-Success.jpg",
];

const Buy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="buy-container">
      <h1>Admonishments</h1>
      {/* Slideshow Container */}
      <div className="slideshow">
        <img src={images[currentIndex]} alt="Trading Insight" className="slideshow-image" />
      </div>
    </div>
  );
};

export default Buy;
