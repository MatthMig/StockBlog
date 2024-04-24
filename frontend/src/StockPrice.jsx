import React, { useEffect, useState } from 'react';
import StockChart from './components/StockChart';
import { fetchData } from './components/api';

function StockPrice() {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);

  const ALPACA_KEY_ID = import.meta.env.VITE_ALPACA_KEY_ID;
  const ALPACA_SECRET_KEY = import.meta.env.VITE_ALPACA_SECRET_KEY;
  const symbol = 'AAPL';

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 5);
  const start = startDate.toISOString();

  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() - 16);
  const end = endDate.toISOString();

  const timeframe = '1M';

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchData(symbol, start, end, timeframe, ALPACA_KEY_ID, ALPACA_SECRET_KEY);
        setStockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataFromAPI();
  }, []);

  const title = `${symbol}'s line chart`;

  let tValues = [];
  let cValues = [];
  if(stockData && stockData.hasOwnProperty("bars")) {
    tValues = stockData.bars.map(bar => bar.t);
    cValues = stockData.bars.map(bar => bar.c);
  }

  return (
    <div className="stock-price">
      {error && <p>Error: {error}</p>}
      <StockChart 
        title={title}
        timestamps={tValues}
        prices={cValues}
      />
    </div>
  );
}

export default StockPrice;
