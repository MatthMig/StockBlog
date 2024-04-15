import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import ConnectionSettingsButton from './ConnectionSettingsButton';

const TopBar = ({ isLoggedIn, onLogin, onSignUp, onUserSettings }) => {
    return (
        <Navbar bg="light" expand="lg" variant="light" className={`navbar custom-navbar fixed-top navbar-expand-lg`}>
            <Navbar.Brand href="#home" className="navbar-brand">StockBlog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto right-align">
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
