const messages = require('../models/messages');
const users = require('../models/users');
const jws = require('jws')
require('mandatoryenv').load(['ACCESS_TOKEN_SECRET'])
const { ACCESS_TOKEN_SECRET } = process.env

async function fetchMessagesFromDatabase(symbol) {
    const messages_data = await messages.findAll({
        where: {
            symbol: symbol
        },
        include: [{
            model: users,
            attributes: ['name'],
        }]
    });
    return messages_data;
}

async function getMessages(req, res) {
    const symbol = req.params.symbol;
    const messages_data = await fetchMessagesFromDatabase(symbol);
    if (!messages_data) {
        res.status(404).json({ error: 'Messages not found' });
        return;
    }
    res.json(messages_data);
}

async function postMessage(req, res) {
    const symbol = req.params.symbol;
    const message = req.body;

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    let decodedToken;
    try {
        decodedToken = jws.decode(token);
    } catch (error) {
        console.error('Invalid token');
        return;
    }
    const email = decodedToken.payload;

    const user = await users.findOne({ where: { email: email } });

    if (!user) {
        res.status(402).json({ error: 'User not found' });
        return;
    }

    // Check if the required fields are present
    if (!symbol || !message || !message.text) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try {
        // Create a new message with the symbol and content
        const newMessage = await messages.create({
            symbol: symbol,
            content: message.text,
            userMail: user.email,
            // Add other fields as necessary
        });

        res.json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Error creating message' });
    }
}

async function deleteMessage(req, res) {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    let decodedToken;
    try {
        decodedToken = jws.decode(token);
    } catch (error) {
        console.error('Invalid token');
        return;
    }
    const email = decodedToken.payload;

    const user = await users.findOne({ where: { email: email } });

    if (!user ) {
        res.status(403).json({ error: 'User not authorized' });
        return;
    }

    try {
        const message = await messages.findOne({ where: { id: id } });

        if (!message) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }

        await message.destroy();

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Error deleting message' });
    }
}

module.exports = {
    getMessages,
    postMessage,
    deleteMessage
}