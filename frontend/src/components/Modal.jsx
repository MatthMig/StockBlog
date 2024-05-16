import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({ text, show, handleClose }) => {
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

export default CustomModal;