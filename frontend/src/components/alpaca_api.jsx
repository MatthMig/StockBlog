export async function fetchData_bars(symbol, start, end, timeframe, apiKeyID, apiSecretKey) {
    const url = `https://data.alpaca.markets/v2/stocks/` +
                    `${symbol}/bars?` +
                    `start=${start}&` +
                    `end=${end}&` +
                    `timeframe=${timeframe}`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'APCA-API-KEY-ID': apiKeyID,
            'APCA-API-SECRET-KEY': apiSecretKey
        }
    };

    const response = await fetch(url, options);
    return response.json();
}

export async function fetchData_symbols(apiKeyID, apiSecretKey) {
    try {
        const url = 'https://paper-api.alpaca.markets/v2/assets?status=active';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'APCA-API-KEY-ID': apiKeyID,
                'APCA-API-SECRET-KEY': apiSecretKey
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        // Extract symbol values from the array of objects
        const symbols = data.map(asset => asset.symbol);
        
        return symbols;
    } catch (error) {
        console.error('Error fetching symbols:', error);
        throw error;
    }
}
