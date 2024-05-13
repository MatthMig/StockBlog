const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/users');

router.get('/:symbol', async (req, res) => {
    const symbol = req.params.symbol;

    const messages = await fetchMessagesFromDatabase(symbol);

    if (!messages) {
        res.status(404).json({ error: 'Messages not found' });
        return;
    }

    res.json(messages);
});

router.post('/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const message = req.body;
    const user = await User.findOne({ where: { email: message.userMail } });

    if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
    }

    // Check if the required fields are present
    if (!symbol || !message || !message.text) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try {
        // Create a new message with the symbol and content
        const newMessage = await Message.create({
            symbol: symbol,
            content: message.text,
            userMail: message.userMail,
            // Add other fields as necessary
        });

        res.json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Error creating message' });
    }
});

async function fetchMessagesFromDatabase(symbol) {
    const messages = await Message.findAll({
        where: {
            symbol: symbol
        },
        include: [{
            model: User,
            attributes: ['name'],
        }]
    });
    return messages;
}

module.exports = router;