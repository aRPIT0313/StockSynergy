from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Allow React to fetch from this backend

URL = "https://groww.in/markets/top-gainers"

@app.route('/scrape-top-gainers', methods=['GET'])
def scrape_top_gainers():
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(URL, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', {'class': 'tb10Table borderPrimary'})

        if not table:
            return jsonify({"error": "Table not found"}), 404

        data = []
        rows = table.find_all('tr')[1:8]  # Skip header and get top 10 rows

        for row in rows:
            cols = row.find_all('td')
            if cols:
                stock_name = cols[0].text.strip()  # Extract only the company name
                data.append(stock_name)

        return jsonify({"top_10_stocks": data})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
