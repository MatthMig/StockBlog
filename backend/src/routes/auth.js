const router = require('express').Router();
const User = require('../models/users');


// Basic home route for the API
router.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
})

router.post('signup', (req, res) => {
    const { email, password } = req.body
  
    // Look up the user entry in the database
    const user = User.findOne({ where: { email: message.userMail } })
  
    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
      bcrypt.compare(password, user.password, function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: 'Invalid password' })
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          }
  
          const token = jwt.sign(loginData, jwtSecretKey)
          res.status(200).json({ message: 'success', token })
        }
      })
      // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    } else if (!user) {
        return res.status(401).json({ message: 'Invalid user' })
    }
    //   bcrypt.hash(password, 10, function (_err, hash) {
    //     console.log({ email, password: hash })
    //     db.get('users').push({ email, password: hash }).write()
  
    //     let loginData = {
    //       email,
    //       signInTime: Date.now(),
    //     }
  
    //     const token = jwt.sign(loginData, jwtSecretKey)
    //     res.status(200).json({ message: 'success', token })
    //   })
  })

// The auth endpoint that creates a new user record or logs a user based on an existing record
router.post('/auth', (req, res) => {
    const { email, password } = req.body
  
    // Look up the user entry in the database
    const user = User.findOne({ where: { email: message.userMail } })
  
    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
      bcrypt.compare(password, user.password, function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: 'Invalid password' })
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          }
  
          const token = jwt.sign(loginData, jwtSecretKey)
          res.status(200).json({ message: 'success', token })
        }
      })
      // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    } else if (!user) {
        return res.status(401).json({ message: 'Invalid user' })
    }
    //   bcrypt.hash(password, 10, function (_err, hash) {
    //     console.log({ email, password: hash })
    //     db.get('users').push({ email, password: hash }).write()
  
    //     let loginData = {
    //       email,
    //       signInTime: Date.now(),
    //     }
  
    //     const token = jwt.sign(loginData, jwtSecretKey)
    //     res.status(200).json({ message: 'success', token })
    //   })
  })

  // The verify endpoint that checks if a given JWT token is valid
    router.post('/verify', async (req, res) => {
        const tokenHeaderKey = 'jwt-token'
        const authToken = req.headers[tokenHeaderKey]
        try {
        const verified = jwt.verify(authToken, jwtSecretKey)
        if (verified) {
            return res.status(200).json({ status: 'logged in', message: 'success' })
        } else {
            // Access Denied
            return res.status(401).json({ status: 'invalid auth', message: 'error' })
        }
        } catch (error) {
        // Access Denied
        return res.status(401).json({ status: 'invalid auth', message: 'error' })
        }
    })

  // An endpoint to see if there's an existing account for a given email address
    router.post('/check-account', async (req, res) => {
        const { email } = req.body
    
        console.log(req.body)
    
        const user = User.findOne({ where: { email: message.userMail } })
    
        console.log(user)
    
        res.status(200).json({
        status: user ? 'User exists' : 'User does not exist',
        userExists: user,
        })
    })

module.exports = router;