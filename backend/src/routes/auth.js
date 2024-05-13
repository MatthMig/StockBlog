const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../controllers/user');

router.post('/signup', async (req, res) => {
  try {
      const userResponse = await User.newUser(req, res);
      return res.json(userResponse);
  } catch (err) {
    console.log('Error in POST /signup route:', err)
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'A user with this email already exists.' });
    }
    return res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
      await User.login(req, res);
  } catch (err) {
    console.log('Error in POST /login route:', err)
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;