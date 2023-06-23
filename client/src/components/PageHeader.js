import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function PageHeader(props) {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getLogStatus();
    })

    const getLogStatus = () => {
        if (localStorage.hasOwnProperty('username')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('username');
        //props.handlePageChange('login');
        window.location.href = '/task-tracker/';
        setLoggedIn(false);
    }

    return (
        <div className="bg-primary min-100-vh">
            <Row> 
                <Col>
                    <h1 className="m-2" style={{'color':'white'}}>Task Manager</h1>
                </Col>
                {loggedIn ? (
                    <Col className="m-2 d-flex justify-content-end">
                        <Button onClick={logout}>Logout</Button>
                    </Col>
                ) : (
                    <></>
                )}
                
            </Row>
        </div>
    );
}