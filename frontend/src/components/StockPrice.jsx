import React from 'react';
import StockChart from './StockChart';

function StockPrice({ symbol, stockData, error }) {
  const title = `${symbol}'s line chart`;

  let tValues = [];
  let cValues = [];
  const data_available = stockData && stockData.hasOwnProperty("bars") && stockData.bars !== null;
  if (data_available) {
    tValues = stockData.bars.map(bar => bar.t);
    cValues = stockData.bars.map(bar => bar.c);
  }

  return (
    <div className="stock-price">
      {error && <p>Error: {error}</p>}
      {!data_available ? (
        <p>No data available for {symbol}</p>
      ) : (
        <StockChart 
          title={title}
          timestamps={tValues}
          prices={cValues}
        />
      )}
    </div>
  );
}

export default StockPrice;
