import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chat from '../components/Chat';
import SearchBar from "../components/SearchBar";
import StockPrice from "../components/StockPrice";
import TopBar from "../components/TopBar";

function HomePage() {
    const [symbolsData, setSymbolsData] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const response = await fetch('http://localhost:3000/alpaca/symbols');
                const data = await response.json();
                setSymbolsData(data);
            } catch (error) {
                console.error('Error fetching symbols:', error);
            }
        };

        fetchDataFromAPI();
    }, []);

    const isLoggedIn = Boolean(localStorage.getItem('token'));

    const role = localStorage.getItem('role');

    const username = localStorage.getItem('username');

    const handleAssetSelect = async (asset) => {
        setSelectedAsset(asset);
        setIsLoading(true);
        try {
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 5);
            const start = startDate.toISOString();

            const endDate = new Date();
            endDate.setMinutes(endDate.getMinutes() - 16);
            const end = endDate.toISOString();

            const timeframe = '1D';

            const response = await fetch(`http://localhost:3000/alpaca/bars/${asset.class}/${asset.symbol}/${start}/${end}/${timeframe}`);
            let data = await response.json();
            if (typeof data.bars === 'object' && data.bars[decodeURIComponent(asset.symbol)]) {
                data.bars = data.bars[decodeURIComponent(asset.symbol)];
            }
            setStockData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return (
        <>
            <header>
                <TopBar isLoggedIn={isLoggedIn} username={username} role={role} />
            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={8}>
                            <SearchBar onAssetSelect={handleAssetSelect} symbolsData={symbolsData} />
                            {selectedAsset && <StockPrice symbol={decodeURIComponent(selectedAsset.symbol)} stockData={stockData} error={error} isLoading={isLoading} />}
                        </Col>
                        <Col xs={12} md={4}>
                            {selectedAsset && <Chat asset={selectedAsset} />}
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}

export default HomePage;
