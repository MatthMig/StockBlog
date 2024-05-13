const router = require('express').Router();
const { fetchData_bars, fetchData_symbols } = require('./alpaca_api'); // Import your Alpaca API functions

router.get('/bars/:asset_class/:symbol/:start/:end/:timeframe', async (req, res) => {
    const { asset_class, symbol, start, end, timeframe } = req.params;
    const data = await fetchData_bars(asset_class, symbol, start, end, timeframe, process.env.ALPACA_KEY_ID, process.env.ALPACA_SECRET_KEY);
    res.json(data);
});

router.get('/symbols', async (req, res) => {
    const data = await fetchData_symbols(process.env.ALPACA_KEY_ID, process.env.ALPACA_SECRET_KEY);
    res.json(data);
});

module.exports = router;