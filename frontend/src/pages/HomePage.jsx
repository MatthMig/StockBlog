import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chat from '../components/Chat';
import SearchBar from "../components/SearchBar";
import StockPrice from "../components/StockPrice";
import TopBar from "../components/TopBar";

function HomePage() {
    const [symbolsData, setSymbolsData] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);

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

    const handleSymbolSelect = async (symbol) => {
        setSelectedSymbol(symbol);
        try {
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 5);
            const start = startDate.toISOString();

            const endDate = new Date();
            endDate.setMinutes(endDate.getMinutes() - 16);
            const end = endDate.toISOString();

            const timeframe = '1D';

            const response = await fetch(`http://localhost:3000/alpaca/bars/${symbol}/${start}/${end}/${timeframe}`);
            const data = await response.json();
            setStockData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <header>
                <TopBar />
            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={8}>
                            <SearchBar onSymbolSelect={handleSymbolSelect} symbolsData={symbolsData} />
                            {selectedSymbol && <StockPrice symbol={selectedSymbol} stockData={stockData} error={error} />}
                        </Col>
                        <Col xs={12} md={4}>
                            <Chat symbol={selectedSymbol} />
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}

export default HomePage;
