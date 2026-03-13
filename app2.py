from flask import Flask, jsonify, send_file, request
import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import make_interp_spline
import os
from flask_cors import CORS

app2 = Flask(__name__)

@app2.route('/generate-graph', methods=['GET'])
def generate_graph():
    # Get ticker symbol from query params (default is 'TCS')
    ticker = request.args.get('ticker', default='TCS', type=str).upper()

    try:
        # Fetch stock data using yfinance
        stock = yf.Ticker(f"{ticker}.NS")
        data = stock.history(period="1mo")

        if data.empty:
            return jsonify({"error": "No data available for the given ticker"}), 404

        # Convert index (dates) to numerical format for interpolation
        x = np.arange(len(data.index))
        y = data["Close"].values

        # Apply cubic spline interpolation for a smoother curve
        x_smooth = np.linspace(x.min(), x.max(), 300)  # More points for smoothness
        spl = make_interp_spline(x, y, k=3)  # k=3 for cubic interpolation
        y_smooth = spl(x_smooth)

        # Create figure
        fig, ax = plt.subplots(figsize=(12, 6))
        fig.patch.set_facecolor("black")  # Set background to black
        ax.set_facecolor("black")  # Set graph background to black

        # Greenish shadow effect (touching the x-axis)
        shadow_offset = 8
        ax.plot(x_smooth, y_smooth - shadow_offset, color="blue", linewidth=25, alpha=0.2)

        # Main smooth stock price graph with neon-like color
        ax.plot(x_smooth, y_smooth, color="blue", linewidth=2.5, label=f"{ticker} Closing Price")

        # Highlight actual data points
        ax.scatter(x, y, color="red", edgecolor="blue", zorder=3, label="Actual Data Points")

        # Customizing labels
        ax.set_xlabel("Date", fontsize=12, color="white")
        ax.set_ylabel("Price (INR)", fontsize=12, color="white")
        ax.set_title(f"{ticker} Share Price Movement (Last 1 Month)", fontsize=14, fontweight="bold", color="white")
        ax.legend(facecolor="black", edgecolor="white", labelcolor="white")

        # Formatting x-axis ticks
        ax.set_xticks(x)
        ax.set_xticklabels(data.index.strftime("%Y-%m-%d"), rotation=45, color="white")
        ax.set_yticklabels(ax.get_yticks(), color="white")

        # Remove grid
        ax.grid(False)

        # Save the graph as an image
        output_image_path = f"static/{ticker}_graph.png"
        fig.savefig(output_image_path, bbox_inches="tight", transparent=True)

        # Return the graph as an image file
        return send_file(output_image_path, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Ensure static folder exists
    if not os.path.exists("static"):
        os.makedirs("static")
    app2.run(debug=True)
