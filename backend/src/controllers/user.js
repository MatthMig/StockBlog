const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
require('mandatoryenv').load(['ACCESS_TOKEN_SECRET'])
const { ACCESS_TOKEN_SECRET } = process.env

function validPassword(password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

async function verifyToken(req, res) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  try {
    const decoded = jws.verify(token, 'HS256', ACCESS_TOKEN_SECRET);
    const user = await userModel.findOne({ where: { email: decoded.payload } });
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    return user;
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

async function verifyAdminToken(req, res) {
  const user = await verifyToken(req, res);
  if (user && user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  return user;
}

module.exports = {
  async login(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'John.Doe@acme.com', $password: '12345'}}
    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const user = await userModel.findOne({ where: { email } })
    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: ACCESS_TOKEN_SECRET })
        res.json({ status: true, message: 'Login/Password ok', token, name: user.name, role: user.role})
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
  },
  async newUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'New User'
    // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
    if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
    const { name, email, password } = req.body
    if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
    await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
    res.json({ status: true, message: 'User Added' })
  },
  async getUsers(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get All users'
    const user = await verifyAdminToken(req, res);
    if (!user) return;
    const data = await userModel.findAll({ attributes: ['name', 'email'] })
    res.json({ status: true, message: 'Returning users', data })
  },
  async updateUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Mettre à jour les informations de l utilisateur (réservé à un utilisateur administrateur)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!' }}
    const user = await verifyAdminToken(req, res);
    if (!user) return;
    const userModified = {}
    for (const field of ['name', 'email', 'password']) {
      if (has(req.body, field)) {
        if (field === 'password') {
          userModified.passhash = await bcrypt.hash(req.body.password, 2)
        } else {
          userModified[field] = req.body[field]
        }
      }
    }
    if (Object.keys(userModified).length === 0) throw new CodeError('You must specify the name, email or password', status.BAD_REQUEST)
    await userModel.update(userModified, { where: { id: req.params.id } })
    res.json({ status: true, message: 'User updated' })
  },
  async deleteUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete User'
    const user = await verifyAdminToken(req, res);
    if (!user) return;
    if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params
    await userModel.destroy({ where: { id } })
    res.json({ status: true, message: 'User deleted' })
  }
}
