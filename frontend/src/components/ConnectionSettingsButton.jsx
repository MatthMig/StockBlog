import React from 'react';
import { Button } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";


const ConnectionSettingsButton = React.memo(({ isLoggedIn, username }) => {
    const navigate = useNavigate()
    function onLogin() {
        navigate("/login");
    }    
    
    function onSignUp() {
        navigate("/sign-up");
    }

    function onLogOut() {
        console.log("Logging out");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate("/");
        console.log("Logged out");
    }

    function onUserSettings() {
        navigate("/user-settings");
    }
    
    return (
            isLoggedIn ? (
                <div className="log-buttons">
                    <span>You're connected as {username}</span>
                    <Button variant="outline-primary" className="ml-2" onClick={onLogOut}>Log Out</Button>
                    <GearFill onClick={onUserSettings} className="gear" />
                </div>
            ) : (
                <div className="log-buttons">
                    <Button variant="outline-primary" className="ml-2" onClick={onLogin}>Log In</Button>
                    <Button variant="primary" className="ml-2" onClick={onSignUp}>Sign Up</Button>
                </div>
            )
    );
});

export default ConnectionSettingsButton;
