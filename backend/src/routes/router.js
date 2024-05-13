const router = require('express').Router();
const alpacaRouter = require('./alpaca');
router.use(require('./user'));
router.use('/messages', require('./messages'));
router.use('/alpaca', alpacaRouter);
module.exports = router;