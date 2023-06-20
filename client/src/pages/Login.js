import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataService from '../services/dataService';
import Alert from 'react-bootstrap/alert';
import Modal from 'react-bootstrap/modal';

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function Login() {
    const [username, setUsername] = useState('');
    const [logName, setLogName] = useState('');

    const [showLIAlert, setShowLIAlert] = useState(false);
    const handleShowLIAlert = () => setShowLIAlert(true);

    const [showSUAlert, setShowSUAlert] = useState(false);
    const handleShowSUAlert = () => setShowSUAlert(true);

    const [showLogin, setShowLogin] = useState(false);

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);

    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowSignUp = () => setShowSignUp(true);
    const handleCloseSignUp = () => setShowSignUp(false);


    const [submitted, setSubmitted] = useState(false);
    const [submittedSU, setSubmittedSU] = useState(false);

    useEffect(() => {
        
        async function getUserData(username) {
            let userRef = doc(db, 'users', username);

            const docRef = await getDoc(userRef)
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        console.log(`user ${username} found`);
                        localStorage.setItem("username", username);
                        window.location.href = 'taskDisplay';
                    } else {
                        console.log(`user ${username} not found`);
                        //setUsername('');
                        handleShowLIAlert();
                        setSubmitted(false);
                    }
                })
        }

        async function signUpUser(username) {
            let userRef = doc(db, 'users', username);

            const docRef = await getDoc(userRef)
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        console.log(`${username} already exists`);
                        handleShowSUAlert();
                        setSubmittedSU(false);
                    } else {
                        (DataService.addUser(username)).then((response) => {
                            console.log(`called add user`);
                            console.log(response);
                        });
                        localStorage.setItem('username', username);
                        window.location.href = '/taskDisplay';
                    }
                })
        }
        if (submitted) {
            getUserData(username);
        }
        if (submittedSU) {
            signUpUser(username);
        }
    }, [submitted, submittedSU]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsername(value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        console.log(`username: ${username}`);

        setSubmitted(true);
    };

    const submitSignUp = (event) => {
        event.preventDefault();

        console.log(`sign up user: ${username}`);
        setSubmittedSU(true);
    };

    return (
        <Container style={{'backgroundColor':'white', 'border':'1px solid blue'}}>
            <Button onClick={handleShowLogin}>Login</Button>
            <Button onClick={handleShowSignUp}>Sign Up</Button>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Control placeholder="username" type="text" name="username" value={username} onChange={handleChange} style={{'border':'1px solid blue'}} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit" onClick={submitForm}>
                                    Login
                                </Button>
                            </Col>
                        </Row>
                        {showLIAlert ? (
                            <Alert>User not found</Alert>
                        ) : (
                            <></>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showSignUp} onHide={handleCloseSignUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Control placeholder="username" type="text" name="username" value={username} onChange={handleChange} style={{'border':'1px solid blue'}} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit" onClick={submitSignUp}>
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                        {showSUAlert ? (
                            <Alert>User already exists</Alert>
                        ) : (
                            <></>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>

        </Container>
    )
}

