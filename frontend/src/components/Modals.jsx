import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WarningModal = ({ text, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const UserDetailsModal = ({ user, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user && (
                    <>
                        {user.role === 'admin' && (
                            <p style={{ color: 'red' }}><strong>Admin</strong></p>
                        )}
                        <p><strong>Username:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export { UserDetailsModal, WarningModal };
