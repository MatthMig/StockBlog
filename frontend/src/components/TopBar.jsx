import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../css/top_bar.css';
import ConnectionSettingsButton from './ConnectionSettingsButton';

const TopBar = ({ isLoggedIn, username }) => {
    return (
        <Navbar bg="light" variant="light" className={`navbar custom-navbar fixed-top`}>
            <Navbar.Brand href="#home" className="navbar-brand">StockBlog</Navbar.Brand>
                <Nav className="ml-auto right-align">
                    <ConnectionSettingsButton
                        isLoggedIn={isLoggedIn}
                        username={username}
                    />
                </Nav>
        </Navbar>
    );
};

export default TopBar;
