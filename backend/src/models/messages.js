const Sequelize = require('sequelize');
const db = require('./database');

const Message = db.define('message', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userMail: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // Add other fields as necessary
});

module.exports = Message;