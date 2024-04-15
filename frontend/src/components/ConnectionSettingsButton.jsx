import React from 'react';
import { Button } from 'react-bootstrap';

const ConnectionSettingsButton = ({ isLoggedIn, onLogin, onSignUp, onUserSettings }) => {
    return (
        isLoggedIn ? (
            <span onClick={onUserSettings}>User Settings</span>
        ) : (
            <>
                <Button variant="outline-primary" className="ml-2" onClick={onLogin}>Log In</Button>
                <Button variant="primary" className="ml-2" onClick={onSignUp}>Sign Up</Button>
            </>
        )
    );
};

export default ConnectionSettingsButton;
