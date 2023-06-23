import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SettingsForm from './SettingsForm';
import Styler from '../utils/Styler';
import '../style.css';

export default function PageHeader(props) {

    const [loggedIn, setLoggedIn] = useState(false);

    const settingsButton = useRef(null);

    const [showSettings, setShowSettings] = useState(false);
    const [settingsUpdated, setSettingsUpdated] = useState(false);

    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);

    const buttonStyle = {'backgroundColor':(Styler.colors).buttonBack, 'color': (Styler.colors).buttonText};

    useEffect(() => {
        if (localStorage.hasOwnProperty('colorScheme')) {
            let colorScheme = localStorage.getItem('colorScheme');
            Styler.setColorScheme(colorScheme);
            let cssSheet = document.styleSheets[0];
            cssSheet.deleteRule(':root');
            cssSheet.insertRule(Styler.getSchemeCSSRule());
        }
        
        getLogStatus();

        if (settingsUpdated) {
            setSettingsUpdated(false);
        }

    });

    const getLogStatus = () => {
        if (localStorage.hasOwnProperty('username')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('username');
        props.handlePageChange('login');
        setLoggedIn(false);
    };

    const handleSettingsUpdated = () => setSettingsUpdated(true);

    return (
        <>
            <div>
                {loggedIn ? (
                    <Row className="min-100-vh p-3 pageHead" style={{'backgroundColor': (Styler.colors).darkest}}> 
                        <Col>
                            <h1 className="m-3" style={{'color': (Styler.colors).lightText}}>Task Manager</h1>
                        </Col>
                        <Col className="m-2 d-flex justify-content-end">
                            <Button id="myBtn" style={buttonStyle} className="align-self-center" onClick={handleShowSettings}>Settings</Button>
                            <Button id="myBtn" style={buttonStyle} className="align-self-center" onClick={logout}>Logout</Button>
                        </Col>        
                    </Row>
                ) : (
                    <Row className="min-100-vh p-3 bg-primary" style={{'color':'white'}}> 
                        <Col>
                            <h1 className="m-3">Task Manager</h1>
                        </Col>           
                    </Row>
                )}
            </div>
            <Modal show={showSettings} onHide={handleCloseSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>User Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SettingsForm 
                        handleCloseSettings={handleCloseSettings} 
                        handleSettingsUpdated={handleSettingsUpdated} 
                    />
                </Modal.Body>
            </Modal>
        </>
    );

}