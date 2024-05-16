const router = require('express').Router();
const alpacaRouter = require('./alpaca');
const authRouter = require('./auth');

router.use(require('./user'));
router.use('/api/messages', require('./messages'));
router.use('/api/alpaca', alpacaRouter);
router.use('/api/auth', authRouter);

module.exports = router;