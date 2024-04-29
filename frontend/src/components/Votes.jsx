import React from "react";

export default function Votes({ onSymbolSelect, symbolsData }) {
    console.log('Votes.jsx: symbolsData:', symbolsData);
  return (
    <div className="border rounded p-3">
      <h1>Votes</h1>
      <div className="d-flex align-items-center">
        <div className="mr-3">
          <button className="btn btn-light">
            <span role="img" aria-label="up arrow">
              ⬆️
            </span>
          </button>
        </div>
        <span className="mr-3">{symbolsData.votes}</span>
        <div>
          <button className="btn btn-light">
            <span role="img" aria-label="down arrow">
              ⬇️
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
