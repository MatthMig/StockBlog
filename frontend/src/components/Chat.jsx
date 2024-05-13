import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchMessages, postMessage } from "./intern_api"; // Import your message fetching function

export default function Chat({ asset }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (asset) {
            updateMessages();
        }
    }, [asset]); // Run this effect when the symbol changes

    useEffect(() => {
        // Scroll to the bottom when the chat window or sidebar is displayed
        scrollToBottom();
    }, [messages]); // Run this effect when new messages are received

    const updateMessages = () => {
        fetchMessages(asset)
            .then(newMessages => {
                const updatedMessages = newMessages.map(message => ({
                    username: message.user.name,
                    content: message.content,
                }));
                setMessages(updatedMessages);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }

    const sendMessage = () => {
        if (messageInput.trim() !== "") {
            const token = localStorage.getItem('token');
            if (token === null) {
                alert('You must be logged in to post messages.');
                return;
            }
            const newMessage = { text: messageInput, token: token };
            console.log("Sending message:", newMessage);
            // Send the message to the server
            postMessage(asset, newMessage)
                .then(() => {
                    // Update the messages state with the new message locally only if no error occurred
                    const localMessage = {content: newMessage.text, username: localStorage.getItem('username')}
                    setMessages(prevMessages => [...prevMessages, localMessage]);
                })
                .catch(error => {
                    console.error("Error posting message:", error);
                })
                .finally(() => {
                    // Clear the input field regardless of whether an error occurred
                    setMessageInput('');
                });
            updateMessages();
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

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    return (
        <Row className="chat-box">
            <h1>Chat</h1>
            <div ref={chatWindowRef} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", height: "300px", overflowY: "auto" }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.username}:</strong> {message.content}
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
