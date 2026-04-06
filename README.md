# 📈 StockSynergy — Stock Market Simulation & Analysis Platform

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=flat&logo=flask&logoColor=white)
![TwelveData](https://img.shields.io/badge/TwelveData-Stock%20API-6001D2?style=flat)
![NewsAPI](https://img.shields.io/badge/NewsAPI-Market%20News-blue?style=flat)
![Status](https://img.shields.io/badge/Status-Complete-2ea44f?style=flat)

> A full-stack stock market simulation platform where users can search real companies, track watchlists, simulate buying/selling stocks with virtual currency (KidCoins), monitor portfolio P&L in real time, and query a stock chatbot — all backed by live market data.

---

## 🎯 What This Project Does

- 🔍 **Search** any stock ticker and view real company metrics
- 📋 **Watchlist** — track stocks you're interested in
- 💰 **Simulate trades** — buy/sell shares using virtual KidCoins
- 📊 **Portfolio dashboard** — real-time profit/loss tracking
- 📰 **Live market news** — updated every 60 seconds via NewsAPI
- 🤖 **Chatbot** — ask for any stock's current data by ticker

---

## 🏗️ System Architecture

```
User
  ↓
React Frontend (React Router + Context API)
  ↓
Components: Home | CompanyDetails | Watchlist | Dashboard | Chatbot | News
  ↓
Flask Backend API
  ↓
TwelveData API / Stock Scraper
  ↓
JSON response → React state
```

---

## 📂 Project Structure

```
stocksynergy/
├── frontend/
│   ├── src/
│   │   ├── App.js                  # Routing
│   │   ├── context/
│   │   │   └── CoinContext.js      # Global KidCoins state
│   │   └── components/
│   │       ├── Home.js
│   │       ├── CompanyDetails.js   # Stock search + buy
│   │       ├── Watchlist.js        # Tracked stocks
│   │       ├── TransactionHistory.js
│   │       ├── History.js          # Completed trades
│   │       ├── Dashboard.js        # Portfolio analytics
│   │       ├── StockNews.js
│   │       └── Chatbot.js
│   └── package.json
├── backend/
│   ├── app.py                      # Flask API
│   └── scraper.py                  # Stock data fetching
└── README.md
```

---

## ⚙️ Core Features & Implementation

### 1. Stock Search
User enters a ticker → React Router navigates to `/company/:searchTerm` → Flask API fetches real data from TwelveData → company metrics displayed.

```
GET /scrape-stock?ticker=TCS
→ Returns: price, volume, 52W high/low, company info
```

### 2. Watchlist
```javascript
// Store in localStorage
{
  name: "Reliance",
  ticker: "RELIANCE",
  current_price: "₹2500"
}
```

### 3. Simulated Trading — KidCoins
```javascript
// Buy
totalCost = price × quantity
if (kidCoins >= totalCost) → deduct and store transaction

// Sell
profitLoss = (currentPrice - purchasePrice) × quantity
```

### 4. Real-Time Price Simulation
```javascript
// Price updates every 2 seconds
const fluctuation = (Math.random() * 0.25 - 0.125) * price;  // ±12.5%
setInterval(updatePrices, 2000);
```

### 5. Portfolio Dashboard
Displays total profit, total loss, and watchlist size via **CircularProgressBar** visualizations.

### 6. Stock News
```
GET https://newsapi.org/v2/top-headlines?category=business
→ Refreshed every 60 seconds
```

### 7. Chatbot
```
User types: "TCS"
→ Flask fetches stock data for TCS
→ Bot replies: "TCS | Current Price: ₹3450 | Change: +1.2%"
```

---

## 📊 Portfolio Metrics

| Metric | Formula |
|---|---|
| Profit per trade | `currentPrice − purchasePrice` |
| Total portfolio profit | `Σ(profit across all positions)` |
| Portfolio value | `Σ(currentPrice × shares held)` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 |
| Routing | React Router v6 |
| State Management | React Context API |
| HTTP Requests | Fetch API, Axios |
| Backend | Flask (Python) |
| Stock Data | TwelveData API |
| News | NewsAPI |
| Storage | localStorage |

---

## 🚀 Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# → Running on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# → Running on http://localhost:3000
```

---

## 💡 Key Design Decisions

**Why React Context API?**
KidCoins balance is needed across multiple components (Watchlist, Dashboard, History). Context avoids prop drilling and keeps state globally consistent.

**Why localStorage?**
Lightweight client-side persistence for a simulation — no database needed. Stores watchlist, active transactions, and trade history.

**Why Flask for backend?**
Lightweight Python backend ideal for API proxying and web scraping. Keeps the data-fetching logic separate from the React frontend.

---

## 🔮 Future Improvements

- [ ] Replace localStorage with a real database (PostgreSQL)
- [ ] Add actual user authentication (JWT)
- [ ] Integrate LSTM-based price prediction
- [ ] Add portfolio optimization (Markowitz model)
- [ ] Deploy on cloud (Render + Vercel)

---

## Results
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/home_page.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/search.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/history.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/watchlist.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/passbook.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/forcast.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/chatbot.png)
![Output](https://raw.githubusercontent.com/aRPIT0313/images/main/stock/modeloutput.png)

