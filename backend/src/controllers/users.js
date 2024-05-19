const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
require('mandatoryenv').load(['ACCESS_TOKEN_SECRET'])
const { ACCESS_TOKEN_SECRET } = process.env
const messages = require('../models/messages')

function validPassword(password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Split the 'Bearer' prefix from the token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(403).json({ error: 'Invalid token format' });
  }
  const token = parts[1];

  try {
    const isValid = jws.verify(token, 'HS256', ACCESS_TOKEN_SECRET);
    if (!isValid) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const decoded = jws.decode(token);
    const user = await userModel.findOne({ where: { email: decoded.payload } });
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function verifyAdminToken(req, res, next) {
  await verifyToken(req, res, function () {
    if (req.user && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  });
}

async function login(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Verify credentials of user using email and password and return token'
  // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'John.Doe@acme.com', $password: '12345'}}
  if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
  const { email, password } = req.body
  const user = await userModel.findOne({ where: { email } })
  if (user) {
    if (await bcrypt.compare(password, user.passhash)) {
      const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: ACCESS_TOKEN_SECRET })
      res.json({ status: true, message: 'Login/Password ok', token, name: user.name, role: user.role })
      return
    }
  }
  res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
}

async function newUser(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'New User'
  // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
  if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
  const { name, email, password } = req.body
  if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
  await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
  res.json({ status: true, message: 'User Added' })  
}

async function getUsers(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get All users'
  const data = await userModel.findAll({ attributes: ['name', 'email', 'role'] })
  res.json({ status: true, message: 'Returning users', data })
}

async function getUser(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get User by email'
  decoded_email = decodeURIComponent(req.params.email)
  const user = await userModel.findOne({ where: { email: decoded_email } });
  if (user) {
    res.json({ status: true, message: 'Returning user', user });
  } else {
    res.status(404).json({ status: false, message: 'User not found' });
  }
}

async function updateUser(req, res) {
  const userModified = {}
  for (const field of ['name', 'password']) {
    if (req.body.hasOwnProperty(field)) {
      if (field === 'password') {
        if (req.body.password) {
          if (validPassword(req.body.password) === false) {
            throw new CodeError('Weak password!', status.BAD_REQUEST);
          }
          userModified.passhash = await bcrypt.hash(req.body.password, 2)
        }
      } else if (req.body[field]) {
        userModified[field] = req.body[field]
      }
    }
  }

  if (Object.keys(userModified).length === 0) throw new CodeError('You must specify the name or password', status.BAD_REQUEST)

  const decoded_email = decodeURIComponent(req.params.email)
  const user = await userModel.findOne({ where: { email: decoded_email } });

  if (!user) {
    return res.status(404).json({ status: false, message: 'User not found' });
  }

  if (req.user.email !== user.email && req.user.role !== 'admin') {
    return res.status(403).json({ status: false, message: 'Access denied' });
  }

  console.log('User to update:', userModified);
  await userModel.update(userModified, { where: { email: decoded_email } });

  res.json({ status: true, message: 'User updated' })
}

async function deleteUser(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete User'
  if (!req.params.hasOwnProperty('email')) throw new CodeError('You must specify the email', status.BAD_REQUEST)
  decoded_email = decodeURIComponent(req.params.email)

  const user = await userModel.findOne({ where: { email: decoded_email } })
  if (!user) {
    return res.status(404).json({ status: false, message: 'User not found' })
  }

  if (req.user.email !== user.email && req.user.role !== 'admin') {
    return res.status(403).json({ status: false, message: 'Access denied' });
  }
  
  await userModel.destroy({ where: { email: decoded_email } })
  res.json({ status: true, message: 'User deleted' })
}

async function getUserMessages(req, res) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get User Messages'
  if (!req.params.hasOwnProperty('email')) throw new CodeError('You must specify the email', status.BAD_REQUEST)
  const decoded_email = decodeURIComponent(req.params.email)

  const user = await userModel.findOne({ where: { email: decoded_email } })
  if (!user) {
    return res.status(404).json({ status: false, message: 'User not found' })
  }

  if (req.user.email !== user.email && req.user.role !== 'admin') {
    return res.status(403).json({ status: false, message: 'Access denied' });
  }

  const user_messages = await messages.findAll({ where: { userMail: decoded_email } })
  res.json({ status: true, message: 'Returning messages', user_messages })
}

module.exports = {
  verifyToken,
  verifyAdminToken,
  login,
  newUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserMessages
}
