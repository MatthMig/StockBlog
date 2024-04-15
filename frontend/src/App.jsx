import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './css/style.css';
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
