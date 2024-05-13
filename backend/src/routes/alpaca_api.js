const axios = require('axios');

async function fetchData_bars(symbol, start, end, timeframe, apiKeyID, apiSecretKey) {
    const url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?start=${start}&end=${end}&timeframe=${timeframe}`;

    const options = {
        headers: {
            accept: 'application/json',
            'APCA-API-KEY-ID': apiKeyID,
            'APCA-API-SECRET-KEY': apiSecretKey
        }
    };

    const response = await axios.get(url, options);
    return response.data;
}

async function fetchData_symbols(apiKeyID, apiSecretKey) {
    try {
        const url = 'https://paper-api.alpaca.markets/v2/assets?status=active';
        const options = {
            headers: {
                accept: 'application/json',
                'APCA-API-KEY-ID': apiKeyID,
                'APCA-API-SECRET-KEY': apiSecretKey
            }
        };

        const response = await axios.get(url, options);
        const data = response.data;

        const symbols = data.map(asset => asset.symbol);
        return symbols;
    } catch (error) {
        console.error('Error fetching symbols:', error);
    }
}

module.exports = { fetchData_bars, fetchData_symbols };