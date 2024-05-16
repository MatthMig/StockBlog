const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')

router.get('/api/users', user.verifyAdminToken, user.getUsers);
router.get('/api/users/:email', user.verifyAdminToken, user.getUser);
router.post('/api/users', user.verifyAdminToken, user.newUser);
router.put('/api/users/:email', user.verifyAdminToken, user.updateUser);
router.delete('/api/users/:email', user.verifyAdminToken, user.deleteUser);
router.post('/api/login', user.login);

module.exports = router
