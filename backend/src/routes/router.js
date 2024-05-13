const router = require('express').Router();
const alpacaRouter = require('./alpaca');
const authRouter = require('./auth');

router.use(require('./user'));
router.use('/messages', require('./messages'));
router.use('/alpaca', alpacaRouter);
router.use('/auth', authRouter);

module.exports = router;