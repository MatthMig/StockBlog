import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Chat({ onSymbolSelect, symbolsData }) {
    // State to hold the chat messages
    const [messages, setMessages] = useState([]);
    // State to hold the current message being typed
    const [messageInput, setMessageInput] = useState('');

    // Function to handle sending messages
    const sendMessage = () => {
        // Add logic to send message
        // For now, let's just add a dummy message to the state
        setMessages([...messages, { text: messageInput, user: "User" }]);
        // Clear the input field after sending the message
        setMessageInput('');
    };

    // Function to handle key press events in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && messageInput.trim() !== "") {
            sendMessage();
        }
    };

    // Function to handle changes in the input field
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
