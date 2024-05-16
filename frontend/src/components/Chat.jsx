import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import CustomModal from "./Modal";
import { deleteMessage, fetchMessages, postMessage } from "./intern_api";

export default function Chat({ asset }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const chatWindowRef = useRef(null);

    const updateMessages = () => {
        fetchMessages(asset)
            .then(newMessages => {
                const updatedMessages = newMessages.map(message => ({
                    username: message.user.name,
                    content: message.content,
                    id: message.id
                }));
                setMessages(updatedMessages);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }

    useEffect(() => {
        if (asset) {
            setIsLoading(true);
            updateMessages();
            setIsLoading(false);
        }
    }, [asset]); // Run this effect when the symbol changes

    useEffect(() => {
        // Scroll to the bottom when the chat window or sidebar is displayed
        scrollToBottom();
    }, [messages]); // Run this effect when new messages are received

    const sendMessage = () => {
        if (messageInput.trim() !== "") {
            const token = localStorage.getItem('token');
            if (token === null) {
                setShowModal(true);
                return;
            }
            const newMessage = { text: messageInput, token: token };
            console.log("Sending message:", newMessage);
            // Send the message to the server
            postMessage(asset, newMessage)
                .then(() => {
                    // Update the messages state with the new message locally only if no error occurred
                    const localMessage = { content: newMessage.text, username: localStorage.getItem('username') }
                    setMessages(prevMessages => [...prevMessages, localMessage]);
                    updateMessages();
                })
                .catch(error => {
                    console.error("Error posting message:", error);
                })
                .finally(() => {
                    // Clear the input field regardless of whether an error occurred
                    setMessageInput('');
                });
        }
    };

    const removeMessage = (id) => {
        deleteMessage(id)
            .then(() => {
                // Remove the message from the local state
                setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
            })
            .catch(error => {
                console.error("Error deleting message:", error);
            });
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

    const userRole = localStorage.getItem('role');

    return (
        <Row className="chat-box">
            <h1>Chat</h1>
            <div ref={chatWindowRef} className="chat-messages">
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className="d-flex justify-content-between">
                            <div>
                                <strong>{message.username}:</strong> {message.content}
                            </div>
                            {userRole === 'admin' && (
                                <Button
                                    variant="secondary"
                                    className="ml-2 rounded-circle btn-xs"
                                    onClick={() => removeMessage(message.id)}
                                >
                                    X
                                </Button>
                            )}
                        </div>
                    ))
                )}
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
            <CustomModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                text={'You must be logged in to post messages.'}
            />
        </Row>
    );
}
