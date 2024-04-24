export async function fetchData(symbol, start, end, timeframe, apiKeyID, apiSecretKey) {
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
