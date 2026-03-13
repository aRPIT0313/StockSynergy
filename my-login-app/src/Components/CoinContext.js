import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [kidCoins, setKidCoins] = useState(10000); // Default value of Kid Coins

  // Load Kid Coins from localStorage when app starts
  useEffect(() => {
    const storedKidCoins = parseFloat(localStorage.getItem('kidCoins')) || 10000;
    setKidCoins(storedKidCoins);
  }, []);

  // Update Kid Coins and store in localStorage
  const updateKidCoins = (newKidCoins) => {
    setKidCoins(newKidCoins);
    localStorage.setItem('kidCoins', JSON.stringify(newKidCoins));
  };

  return (
    <CoinContext.Provider value={{ kidCoins, updateKidCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;
