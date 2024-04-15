import React from "react";
import TopBar from "../components/TopBar";

function HomePage() {
    return (
        <body>
            <header>
                <TopBar />
            </header>
            <main>
                <h1>Welcome to StockBlog</h1>
            </main>
        </body>
    );
}

export default HomePage;