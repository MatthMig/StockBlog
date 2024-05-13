export async function fetchMessages(asset) {
    const response = await fetch(`http://localhost:3000/messages/${asset.symbol}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const messages = await response.json();
    return messages;
}

export async function postMessage(asset, message) {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/messages/${asset.symbol}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error || "Network response was not ok");
    }
}