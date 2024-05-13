import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
    
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            console.log(data.message);
            window.location.href = '/login'
        } else if(data.error == 'Weak password!') {
            alert('Weak password! Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
        } else if(data.error == 'A user with this email already exists.') {
            alert('A user with this email already exists.');  
            window.location.href = '/login'      
        } else {
            console.error('Error creating user:', data);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h4>Sign Up</h4>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUpPage;