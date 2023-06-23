import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataService from '../services/dataService';
import Alert from 'react-bootstrap/alert';
import Modal from 'react-bootstrap/modal';

export default function Login() {
    const [username, setUsername] = useState('');

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsername(value);
    };

    const getUserData = async (userName) => {
        await (DataService.getUserStatus(userName))
            .then((response) => {
                if (response === true) {
                    localStorage.setItem("username", userName);
                    window.location.href = 'taskDisplay';
                } else {
                    handleShowLIAlert();
                    //setSubmitted(false);
                    setUsername('');
                }
            });
    };

    const signUpUser = async (userName) => {
        await (DataService.getUserStatus(userName))
            .then((response) => {
                if (response === true) {
                    handleShowSUAlert();
                    setUsername('');
                } else {
                    addUser(userName);
                    localStorage.setItem('username', userName);
                }
            });
    };

    const addUser = async (userName) => {
        console.log(`calling add user`);
        await (DataService.addUser(userName)).then((response) => {
            console.log(`user added`);
            window.location.href = '/taskDisplay';
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        getUserData(username);
    };

    const submitSignUp = (event) => {
        event.preventDefault();
        signUpUser(username);
    };

    return (
        <Container style={{'backgroundColor':'white'}}>
            <Container className="d-flex flex-column align-items-center m-4 p-0">
                <Button className="m-2 col-lg-4" onClick={handleShowLogin}>Login</Button>
                <Button className="m-2 col-lg-4" onClick={handleShowSignUp}>Sign Up</Button>
            </Container>
            

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
                                    <Form.Text text="muted">* Usernames are case sensitive.</Form.Text>
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
                                    <Form.Text text="muted">* Usernames are case sensitive.</Form.Text>
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

