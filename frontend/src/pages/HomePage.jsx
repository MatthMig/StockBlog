import React from "react";
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
            </main>
        </>
    );
}

export default HomePage;