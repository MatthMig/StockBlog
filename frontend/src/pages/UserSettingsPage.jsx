import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ConfirmPasswordModal } from '../components/Modals';
import { postAuthLogin, updateUser } from '../components/api';

const UserSettings = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalErrorMessage, setConfirmModalErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page if not
            navigate("/login");
        } else {
            // Fetch current username from local storage
            setNewUsername(localStorage.getItem('username'));
        }
    }, [navigate]);

    const handleSaveUsername = () => {
        if (!newUsername) {
            setErrorMessage('Username cannot be empty.');
            return;
        }
        setShowConfirmModal(true);
        setNewUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    const handleSavePassword = () => {
        if (!newPassword) {
            setErrorMessage('Password cannot be empty.');
            return;
        }
        setShowConfirmModal(true);
        setNewPassword(newPassword);
    };

    const handleConfirm = async (enteredPassword) => {
        const email = localStorage.getItem('email');
        try {
            const response = await postAuthLogin(email, enteredPassword);
            if (response.token) {
                // The password is correct, you can save the changes
                const email = localStorage.getItem('email');
                try {
                    setIsLoading(true);
                    await updateUser(email, newUsername, newPassword);
                    setIsLoading(false);
                    setShowConfirmModal(false);
                    navigate('/');
                } catch (error) {
                    setIsLoading(false);
                    setShowConfirmModal(false);
                    // There was an error updating the user
                    if (error.message === 'Weak password!') {
                        // The password is weak, show a warning message
                        setErrorMessage('Your password is too weak. Please use a stronger password.');
                    } else if (error.message === 'Validation error: Validation is on name failed') {
                        setErrorMessage('Invalid username.');
                    } else {
                        // Some other error occurred, show a generic error message
                        setErrorMessage('An error occurred while updating your information.');
                    }
                }
            } else {
                // The password is incorrect, show an error message
                setConfirmModalErrorMessage('Incorrect password');
            }
        } catch (error) {
            // There was an error, show an error message
            setErrorMessage('An error occurred while checking the password.');
        }
    };

    return (
        <div className={isLoading ? 'loading' : ''}>
            <Container>
                <h2>User Settings</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Form>
                    <Form.Group as={Row} controlId="formUsername">
                        <Form.Label>New Username:</Form.Label>
                        <Col>
                            <Form.Control type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" type="button" onClick={handleSaveUsername}>Save</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPassword">
                        <Form.Label>New Password:</Form.Label>
                        <Col>
                            <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" type="button" onClick={handleSavePassword}>Save</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <ConfirmPasswordModal show={showConfirmModal} handleClose={() => { setShowConfirmModal(false); setConfirmModalErrorMessage(''); }} handleConfirm={handleConfirm} errorMessage={confirmModalErrorMessage} />
            </Container>
        </div>
    );
};

export default UserSettings;