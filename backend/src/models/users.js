const Sequelize = require('sequelize')
const db = require('./database.js')
const users = db.define('users', {
  name: {
    type: Sequelize.STRING(128),
    unique:true,
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    }
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    primaryKey: true,
    validate: {
      isEmail: true
    }
  },
  passhash: {
    type: Sequelize.STRING(60),
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  }
}, { timestamps: false })
module.exports = users
