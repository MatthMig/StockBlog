let messageStore = {
    AXAC: [
        { id: 1, text: "Hi there!", user: "LaHasba22" },
        { id: 2, text: "What's up?", user: "FarfadetMalicieux"},
    ],
    AXAS: [
        { id: 1, text: "Hello!", user:"antikafir95"},
        { id: 2, text: "Not much, you?", user:"zanpakuto"},
    ]
};

let messageIdCounter = {
    AXAC: 3,
    AXAS: 3
};

// Function to fetch messages for a given symbol
export async function fetchMessages(symbol) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const messages = messageStore[symbol];
            if (messages) {
                resolve(messages);
            } else {
                reject(new Error("Symbol not found"));
            }
        });
    });
}

// Function to add a new message for a given symbol
export async function postMessage(symbol, newMessage) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const messages = messageStore[symbol];
            if (messages) {
                // Add a unique id to the new message
                const id = messageIdCounter[symbol]++;
                newMessage.id = id;
                // Add the new message to the message store
                messageStore[symbol].push(newMessage);
                resolve();
            } else {
                reject(new Error("Symbol not found"));
            }
        });
    });
}
