const router = require('express').Router();
const { fetchData_bars, fetchData_symbols } = require('../controllers/alpaca'); // Import your Alpaca API functions

router.get('/bars/:asset_class/:symbol/:start/:end/:timeframe', async (req, res) => {
    //#swagger.tags = ['Alpaca extern api']
    //#swagger.description = 'Fetch bars data for a given symbol'
    //#swagger.parameters['asset_class'] = { description: 'Asset class (crypto or stocks).', required: true, type: 'string', example: 'stocks' }
    //#swagger.parameters['symbol'] = { description: 'Symbol to fetch data for.', required: true, type: 'string', example: 'AAPL' }
    //#swagger.parameters['start'] = { description: 'Start date/time.', required: true, type: 'string', example: '2022-01-01T00:00:00Z' }
    //#swagger.parameters['end'] = { description: 'End date/time.', required: true, type: 'string', example: '2022-12-31T23:59:59Z' }
    //#swagger.parameters['timeframe'] = { description: 'Timeframe for the data.', required: true, type: 'string', example: '1D' }
    /*#swagger.responses[200] = { 
        description: 'Successful operation', 
        schema: {
            type: 'object',
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        c: { type: 'number', description: 'Close price' },
                        h: { type: 'number', description: 'High price' },
                        l: { type: 'number', description: 'Low price' },
                        n: { type: 'number', description: 'Number of items' },
                        o: { type: 'number', description: 'Open price' },
                        t: { type: 'string', description: 'Time' },
                        v: { type: 'number', description: 'Volume' },
                        vw: { type: 'number', description: 'Volume Weighted Average Price' }
                    }
                }
            }
        },
        examples: {
            'application/json': {
                "ETH/USD": [
                    {
                        "c": 2259.8,
                        "h": 2278.157,
                        "l": 2193.595,
                        "n": 56,
                        "o": 2193.882,
                        "t": "2023-12-21T06:00:00Z",
                        "v": 3.34456539,
                        "vw": 2232.176877203
                    }
                ]
            }
        }
    } */
    const { asset_class, symbol, start, end, timeframe } = req.params;
    const data = await fetchData_bars(asset_class, symbol, start, end, timeframe, process.env.ALPACA_KEY_ID, process.env.ALPACA_SECRET_KEY);
    res.json(data);
});

router.get('/symbols', async (req, res) => {
    //#swagger.tags = ['Alpaca extern api']
    //#swagger.description = 'Fetch symbols data'
    /*#swagger.responses[200] = { 
        description: 'Successful operation', 
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Name of the symbol' },
                    symbol: { type: 'string', description: 'Symbol identifier' },
                    class: { type: 'string', description: 'Class of the symbol' }
                }
            }
        },
        examples: {
            'application/json': [
                {
                    "name": "Bitcoin  / US Dollar",
                    "symbol": "BTC%2FUSD",
                    "class": "crypto"
                },
                {
                    "name": "Microsoft Corporation Common Stock",
                    "symbol": "MSFT",
                    "class": "us_equity"
                }
            ]
        }
    } */
    const data = await fetchData_symbols(process.env.ALPACA_KEY_ID, process.env.ALPACA_SECRET_KEY);
    res.json(data);
});

module.exports = router;