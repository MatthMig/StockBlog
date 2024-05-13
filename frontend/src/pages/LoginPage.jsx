import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
      event.preventDefault();
  
      const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          console.log('User successfully logged in:', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.name);
          window.location.href = '/'; // Redirect to the home page
      } else if (data.message == 'Wrong email/password') {
          alert('Wrong email/password');
      } else {
          console.error('Error logging in:', data);
      }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h4>Login</h4>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;