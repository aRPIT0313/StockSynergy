from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import threading
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

stock_data = {}
active_threads = {}

def fetch_stock_data(ticker):
    global stock_data
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    while True:
        url = f'https://www.screener.in/company/{ticker}/consolidated/'
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')
            name_element = soup.find(class_='margin-0 show-from-tablet-landscape')
            company_name = name_element.text.strip() if name_element else 'Not available'

            values = soup.find_all(class_='nowrap value')
            extracted = [values[i].text.strip() if i < len(values) else 'Not available' for i in range(9)]

            stock_data[ticker] = {
                'company_name': company_name,
                'Market_Cap': extracted[0],
                'Current_Price': extracted[1],  # Ensure this includes the decimal
                'highlow': extracted[2],
                'PE_ratio': extracted[3],
                'Book_value': extracted[4],
                'Dividend': extracted[5],
                'ROCE': extracted[6],
                'ROE': extracted[7],
                'Face_Value': extracted[8]
            }
        except Exception as e:
            print(f"[ERROR] {ticker}: {e}")

        time.sleep(2)  # Every 2 seconds

def clean_data(value):
    if value:
        value = value.replace("\u20b9", "₹").strip()
        value = ' '.join(value.split())
    return value

@app.route('/scrape-stock', methods=['GET'])
def scrape_stock_data():
    ticker = request.args.get('ticker')

    if not ticker:
        return make_response(jsonify({'error': 'Ticker is required'}), 400)

    ticker = ticker.upper()

    if ticker not in active_threads:
        thread = threading.Thread(target=fetch_stock_data, args=(ticker,), daemon=True)
        thread.start()
        active_threads[ticker] = thread
        time.sleep(2)

    data = stock_data.get(ticker, 'Fetching data... Try again in a few seconds.')
    cleaned_data = {key: clean_data(value) for key, value in data.items()} if isinstance(data, dict) else data

    return make_response(jsonify({'ticker': ticker, 'data': cleaned_data}))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
