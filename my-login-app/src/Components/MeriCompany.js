import React, { useEffect, useState } from 'react';
import './MeriCompany.css'; // Ensure this CSS file is created and linked
import Navbar from './Navbar';

const MeriCompany = () => {
    const [companies, setCompanies] = useState([]); // State to store company data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle errors
    const apiKey = '7d25d66602ac489eb0b46035c6f82101'; // Your Twelve Data API key

    useEffect(() => {
        const fetchTopCompanies = async () => {
            try {
                // Fetch top 60 Indian companies from Twelve Data
                const response = await fetch(`https://api.twelvedata.com/stocks?exchange=NSE&limit=60&apikey=${apiKey}`);

                // Check if response is okay
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data && data.data) {
                    setCompanies(data.data); // Set companies data from API response
                } else {
                    setError('No companies data found'); // Set error message if no data found
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Update loading status
            }
        };

        fetchTopCompanies(); // Call the fetch function
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetching fails
    }

    return (
        <div className="company-list">
     
            <div className="stock-news">
                <div className="news-ticker">
                    {companies.map((company) => (
                        <div className="headline" key={company.symbol}>
                            {company.symbol} {/* Display company symbol */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MeriCompany;
