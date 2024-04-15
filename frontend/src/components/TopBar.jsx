import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import ConnectionSettingsButton from './ConnectionSettingsButton';

const TopBar = ({ isLoggedIn, onLogin, onSignUp, onUserSettings }) => {
    return (
        <Navbar bg="light" expand="lg" variant="light" className="scrolled">
            <Navbar.Brand href="#home" className="logo">StockBlog</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <ConnectionSettingsButton 
                        isLoggedIn={isLoggedIn}
                        onLogin={onLogin}
                        onSignUp={onSignUp}
                        onUserSettings={onUserSettings}
                    />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar;
