import React from "react";
import StockPrice from "../StockPrice";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";

function HomePage() {
    return (
        <>
            <header>
                <TopBar />
            </header>
            <main>
                <SearchBar />
                <StockPrice />
            </main>
        </>
    );
}

export default HomePage;