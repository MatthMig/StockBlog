import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchMessages, postMessage } from "./intern_api"; // Import your message fetching function

export default function Chat({ symbol }) {
    // State to hold the chat messages
    const [messages, setMessages] = useState([]);
    // State to hold the current message being typed
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        if (symbol) {
            updateMessages();
        }
    }, [symbol]); // Run this effect when the symbol changes

    const updateMessages = () => {
        fetchMessages(symbol)
            .then(newMessages => {
                setMessages(newMessages);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }

    const sendMessage = () => {
        if (messageInput.trim() !== "") {
            const newMessage = { text: messageInput, user: "You" };
            // Update the messages state with the new message immediately
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // Send the message to the server
            postMessage(symbol, newMessage)
                .then(() => {
                    // Once the message is sent successfully, clear the input field
                    setMessageInput('');
                })
                .catch(error => {
                    console.error("Error posting message:", error);
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const handleChange = (e) => {
        setMessageInput(e.target.value);
    };

    return (
        <Row className="chat-box">
            <h1>Chat</h1>
            <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", height: "300px", overflowY: "auto" }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.user}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <Row className="bar">
                <Col className="input-field">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Type your message..." 
                        value={messageInput} 
                        onChange={handleChange} 
                        onKeyUp={handleKeyPress} 
                    />
                </Col>
                <Col xs="auto" className="send-button">
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </Col>
            </Row>
        </Row>
    );
}
